import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  region: "global",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  },
});

export async function POST(req) {
  return new Promise(async (resolve, reject) => {
    const contentType = req.headers.get('content-type');

    if (!contentType) {
      return reject(NextResponse.json({ error: 'Missing Content-Type' }, { status: 400 }));
    }

    const bb = Busboy({
      headers: {
        'content-type': contentType,
      },
    });

    let fileUploaded = false;

    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const randomPrefix = crypto.randomBytes(10).toString('hex');
      const key = `${randomPrefix}_${filename.filename}`; 
      /* not sure about the filename.filename here, ideally should've been
      just filename, but the current filename object contains object with description
      of file which has another filename attribute that has actual string filename */

      const chunks = [];

      file.on('data', (chunk) => chunks.push(chunk));

      file.on('end', async () => {
        const fileBuffer = Buffer.concat(chunks);

        try {
          await s3Client.send(new PutObjectCommand({
            Bucket: 'openmediabucket',
            Key: key,
            Body: fileBuffer,
            ContentType: mimetype,
          }));

          fileUploaded = true;

          resolve(NextResponse.json({
            message: 'File uploaded successfully',
            url: `https://s3.tebi.io/openmediabucket/${key}`,
          }));
        } catch (err) {
          console.error('Upload error:', err);
          reject(NextResponse.json({ error: 'Upload failed', message: err.message }, { status: 500 }));
        }
      });
    });

    bb.on('error', (err) => {
      console.error('Busboy error:', err);
      reject(NextResponse.json({ error: 'Parsing failed', message: err.message }, { status: 500 }));
    });

    const reader = req.body.getReader();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      },
    });

    const nodeStream = require('stream').Readable.from(stream);
    nodeStream.pipe(bb);
  });
}

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import crypto from 'crypto';
import fs from 'fs';

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET
};

// Create an S3 service client object.
const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global"
});

// Set up formidable for handling file uploads
const form = formidable({});
form.keepExtensions = true; // Keep file extensions

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse the incoming form (file upload)
  form.parse(req, async (err, fields, files) => {
    const randomPrefix = crypto.randomBytes(10).toString('hex');
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    const file = files.file[0]; // Assuming 'file' is the form field name
    const fileName = randomPrefix + "_" + file.originalFilename;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Prepare S3 upload parameters
      const uploadParams = {
        Bucket: 'openmediabucket', 
        Key: fileName,
        Body: fs.readFileSync(file.filepath, 'utf8'),
        ContentType: file.mimetype,
      };

      // Upload the file to S3
      const data = await s3Client.send(new PutObjectCommand(uploadParams));

      res.status(200).json({ message: 'File uploaded successfully', url: `https://s3.tebi.io/openmediabucket/${fileName}` });
    } catch (uploadError) {
      console.error('Error uploading to S3:', uploadError);
      res.status(500).json({ error: 'Failed to upload file to S3' });
    }
  });
}

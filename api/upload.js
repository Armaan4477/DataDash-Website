import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = await req.formData();
    const file = form.get('file');
    const blob = await put(file.name, file, { access: 'public' });
    res.status(200).json({ url: blob.url });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
}

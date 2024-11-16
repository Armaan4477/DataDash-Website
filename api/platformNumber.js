// JavaScript
export default async function handler(req, res) {
  const { platform } = req.query;

  try {
    // Fetch the platform values from the remote JSON file
    const response = await fetch('https://raw.githubusercontent.com/Project-Bois/DataDash-files/main/version.json');
    const platformValues = await response.json();

    // Validate the platform and respond accordingly
    if (platform in platformValues) {
      res.status(200).json({ value: platformValues[platform] });
    } else {
      res.status(400).json({ error: 'Invalid platform specified.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch platform values.' });
  }
}
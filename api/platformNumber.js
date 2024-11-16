export default function handler(req, res) {
  // Updated values for each platform
  const platformValues = {
    python: "7",
    android: "7.6.6"
  };

  // Extract platform type from query parameters
  const { platform } = req.query;

  // Validate the platform and respond accordingly
  if (platform in platformValues) {
    res.status(200).json({ value: platformValues[platform] });
  } else {
    res.status(400).json({ error: 'Invalid platform specified.' });
  }
}

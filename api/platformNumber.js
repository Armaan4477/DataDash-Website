export default function handler(req, res) {
  // Updated values for each platform
  const platformValues = {
    python_linux: "7.0.0",
    python_macos: "8.0.0",
    python_windows: "9.0.0",
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


// Function to fetch the version numbers from the JSON file and update the UI
async function fetchVersionNumbers() {
    try {
        // Fetch the JSON file containing the version details
        const response = await fetch('https://raw.githubusercontent.com/Project-Bois/data-dash-test-files/refs/heads/main/version.json');
        const data = await response.json();

        // Extract platform values from the JSON response
        const platformValues = data.platformValues;

        // Mapping the platform version IDs to their corresponding platform names and labels
        const platforms = {
            'version': { platformKey: 'python', label: 'Desktop Version' },
            'android-version': { platformKey: 'android', label: 'Android Version' }
        };

        // Update the version numbers on the page
        for (const [elementId, { platformKey, label }] of Object.entries(platforms)) {
            const version = platformValues[platformKey] || 'Unknown';
            document.getElementById(elementId).textContent = `${label}: ${version}`;
        }
    } catch (error) {
        console.error('Error fetching version numbers:', error);
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', () => {
    fetchVersionNumbers(); // Fetch and display the version numbers
});

// Get the modal
const modal = document.getElementById("help-modal");

// Get the button that opens the modal
const btn = document.getElementById("help-button");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to fetch the version numbers from the JSON file and update the UI
async function fetchVersionNumbers() {
    try {
        // Fetch the JSON file containing the version details
        const response = await fetch('https://raw.githubusercontent.com/Project-Bois/DataDash-files/refs/heads/main/version.json');
        const data = await response.json();

        // Extract platform values from the JSON response
        const platformValues = data.platformValues;

        // Mapping the platform version IDs to their corresponding platform names
        const platforms = {
            'windows-version': 'python_windows',
            'macos-version': 'python_macos',
            'linux-version': 'python_linux',
            'android-version': 'android'
        };

        // Update the version numbers on the page
        for (const [elementId, platformName] of Object.entries(platforms)) {
            const version = platformValues[platformName] || 'Unknown'; // Default to 'Unknown' if version is not found
            document.getElementById(elementId).textContent = `Version: ${version}`;
        }
    } catch (error) {
        console.error('Error fetching version numbers:', error);
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', () => {
    fetchVersionNumbers(); // Fetch and display the version numbers
});

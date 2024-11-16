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

// Function to display version numbers
function displayVersionNumbers() {
    const platforms = {
        'windows-version': 'python_windows',
        'macos-version': 'python_macos',
        'linux-version': 'python_linux',
        'android-version': 'android'
    };

    for (const [elementId, platformName] of Object.entries(platforms)) {
        const version = window.platformValues[platformName] || 'Unknown';
        document.getElementById(elementId).textContent = `Version: ${version}`;
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', () => {
    displayVersionNumbers();
});

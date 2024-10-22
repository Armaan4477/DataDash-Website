// navigation.js
window.navigateTo = function(page) {
    window.location.href = page;
};

// Set the logo source dynamically based on the current location
document.addEventListener('DOMContentLoaded', () => {
    const logoImage = document.getElementById('navbar-logo');
    // Directly using the relative path
    logoImage.src = 'photos/logo.png'; // Update this path if necessary
});

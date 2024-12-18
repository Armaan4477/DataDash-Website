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

// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, icon);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, icon);
    });
});

// Update theme icon based on current theme
function updateThemeIcon(theme, icon) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

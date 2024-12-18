// navigation.js
window.navigateTo = function(page) {
    window.location.href = page;
};

// Initialize theme function
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        updateThemeIcon(savedTheme, icon);
    }
}

// Set the logo source and handle theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const logoImage = document.getElementById('navbar-logo');
    logoImage.src = 'photos/logo.png';

    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

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

// Export for use in inline script
window.initializeTheme = initializeTheme;

// Initialize theme immediately
initializeTheme();

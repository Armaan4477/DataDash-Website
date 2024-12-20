// JavaScript
const testimonialList = document.querySelector('.testimonial-list');
const testimonials = document.querySelectorAll('.testimonial-item');

// Clone the first testimonial and append it to the end
const firstTestimonialClone = testimonials[0].cloneNode(true);
testimonialList.appendChild(firstTestimonialClone);

let currentIndex = 0;
const testimonialCount = testimonials.length;

function updateTestimonials() {
    currentIndex++;
    testimonialList.style.transition = 'transform 0.5s ease-in-out';
    testimonialList.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === testimonialCount) {
        // Reset back to the start after the transition
        setTimeout(() => {
            testimonialList.style.transition = 'none';
            testimonialList.style.transform = 'translateX(0)';
            currentIndex = 0;
        }, 500); // Match this to your transition duration (500ms here)
    }
}

setInterval(updateTestimonials, 3000);
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-btn');
    
    // Ripple effect
    downloadBtn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        downloadBtn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMain = document.querySelector('.nav-main');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMain.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMain.contains(e.target)) {
            hamburger.classList.remove('active');
            navMain.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-main a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMain.classList.remove('active');
        });
    });
});
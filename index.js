const testimonials = document.querySelectorAll('.testimonial-item');
let currentIndex = 0;

function updateTestimonials() {
    // Remove active and visible classes from all testimonials
    testimonials.forEach((testimonial) => {
        testimonial.classList.remove('active');
        testimonial.classList.remove('visible');
    });

    // Set active class on current three testimonials
    testimonials[currentIndex].classList.add('active');
    testimonials[(currentIndex + 1) % testimonials.length].classList.add('active');
    testimonials[(currentIndex + 2) % testimonials.length].classList.add('active');

    // Set visible class to create the visual effect
    testimonials[currentIndex].classList.add('visible');
    testimonials[(currentIndex + 1) % testimonials.length].classList.add('visible');
    testimonials[(currentIndex + 2) % testimonials.length].classList.add('visible');

    // Move testimonials in a circular manner
    currentIndex = (currentIndex + 1) % testimonials.length;
}

// For mobile, show one testimonial at a time
function updateTestimonialsMobile() {
    testimonials.forEach((testimonial) => testimonial.classList.remove('active'));
    testimonials[currentIndex].classList.add('active');
    currentIndex = (currentIndex + 1) % testimonials.length;
}

// Detect screen width and adjust animation
function startCarousel() {
    if (window.innerWidth <= 768) {
        setInterval(updateTestimonialsMobile, 3000); // 3s interval for mobile
    } else {
        setInterval(updateTestimonials, 3000); // 3s interval for desktop
    }
}

// Start carousel and update on resize
startCarousel();
window.addEventListener('resize', startCarousel);

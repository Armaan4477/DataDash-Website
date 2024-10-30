const testimonials = document.querySelectorAll('.testimonial-item');
let currentIndex = 0;

function updateTestimonials() {
    // Remove active classes from all testimonials
    testimonials.forEach((testimonial) => {
        testimonial.classList.remove('active');
    });

    // Calculate the total width for sliding
    const totalTestimonials = testimonials.length;
    const visibleTestimonialsCount = 3; // Number of testimonials to show
    const offset = currentIndex * -1 * (300 + 30); // 300px width + 30px for margins

    // Move testimonial list
    const testimonialList = document.querySelector('.testimonial-list');
    testimonialList.style.transform = `translateX(${offset}px)`;

    // Set active class for current three testimonials
    for (let i = 0; i < visibleTestimonialsCount; i++) {
        testimonials[(currentIndex + i) % totalTestimonials].classList.add('active');
    }

    // Update the index for the next round
    currentIndex = (currentIndex + 1) % totalTestimonials;
}

// Start the carousel
setInterval(updateTestimonials, 3000); // Change every 3 seconds

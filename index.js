const testimonials = document.querySelectorAll('.testimonial-item');
const testimonialList = document.querySelector('.testimonial-list');
let currentIndex = 0;

// Function to update the testimonials
function updateTestimonials() {
    // Calculate new position for the testimonials
    currentIndex = (currentIndex + 1) % testimonials.length;
    
    // Update the transform property to slide the testimonials
    testimonialList.style.transform = `translateX(${-currentIndex * (100 / 3)}%)`;

    // Update visibility of the items
    testimonials.forEach((testimonial, index) => {
        if (index >= currentIndex && index < currentIndex + 3) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
}

// Start carousel with interval
setInterval(updateTestimonials, 3000); // Change testimonials every 3 seconds

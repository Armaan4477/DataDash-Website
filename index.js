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
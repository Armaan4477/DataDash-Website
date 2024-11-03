// JavaScript
const testimonials = document.querySelectorAll('.testimonial-item');
let currentIndex = 0;

function updateTestimonials() {
    testimonials.forEach((testimonial) => {
        testimonial.classList.remove('active');
    });

    testimonials[currentIndex].classList.add('active');

    const testimonialList = document.querySelector('.testimonial-list');
    const offset = currentIndex * -100;
    testimonialList.style.transform = `translateX(${offset}%)`;

    currentIndex = (currentIndex + 1) % testimonials.length;
}

setInterval(updateTestimonials, 3000);
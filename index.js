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

// Feedback Form Submission
const feedbackForm = document.getElementById('feedback-form');
feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const feedbackType = document.getElementById('feedback-type').value;
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const message = document.getElementById('details').value;

    // Prepare the email parameters
    const templateParams = {
        feedbackType: feedbackType,
        userName: userName,
        userEmail: userEmail,
        message: message
    };

    // Send the email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('feedback-message').innerText = 'Thank you for your feedback!';
        feedbackForm.reset();
    }, function(error) {
        console.log('FAILED...', error);
        document.getElementById('feedback-message').innerText = 'An error occurred while submitting your feedback. Please try again later.';
    });
});
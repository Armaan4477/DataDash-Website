document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('q9tVbleQ2wLKetQGl'); // Replace with your actual Public Key

    // Feedback Form Submission Logic
    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', function (event) {
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
        emailjs.send('service_pkzzkvw', 'template_dczsrp9', templateParams)
            .then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById('feedback-message').innerText = 'Thank you for your feedback!';
                    feedbackForm.reset();
                },
                function (error) {
                    console.log('FAILED...', error);
                    document.getElementById('feedback-message').innerText = 'An error occurred while submitting your feedback. Please try again later.';
                }
            );
    });
});

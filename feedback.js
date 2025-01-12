document.querySelectorAll('.feedback-type-card').forEach(card => {
    card.addEventListener('click', () => {
        const feedbackType = card.dataset.type;
        document.getElementById('feedback-type').value = feedbackType;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('q9tVbleQ2wLKetQGl'); // Replace with your actual Public Key

    // Feedback Form Submission Logic
    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const feedbackType = document.getElementById('feedback-type').value;
        const name = document.getElementById('user-name').value; // Fetches the value of the name field
        console.log("Name value:", name);

        const userEmail = document.getElementById('email').value;
        const message = document.getElementById('details').value;

        const templateParams = {
            feedbackType: feedbackType, // Feedback type (e.g., Feature Request, Bug Report)
            name: name,         // User's name
            userEmail: userEmail,       // User's email
            message: message            // Feedback message
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
document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      document.getElementById('result').textContent = `File uploaded: ${data.url}`;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  import { put } from '@vercel/blob/client';

async function uploadFile(file) {
  const filename = file.name;
  const tokenResponse = await fetch(`/api/upload-token?filename=${encodeURIComponent(filename)}`);
  const { clientToken } = await tokenResponse.json();

  const blob = await put(filename, file, {
    access: 'public',
    token: clientToken,
  });

  console.log('File uploaded:', blob.url);
}

document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadFile(file);
  }
});

  

document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('logsHelpDialog');
    const showButton = document.getElementById('showLogsHelp');
    const closeButton = dialog.querySelector('.close-dialog');
    const platformSelection = dialog.querySelector('.platform-selection');
    const platformInstructions = dialog.querySelector('.platform-instructions');
    const backButton = dialog.querySelector('.back-button');
    const platformButtons = dialog.querySelectorAll('.platform-button');
    
    const platformData = {
        windows: {
            video: 'videos/logs/windows.mov',
            steps: [
                'Press Windows + R to open Run dialog',
                'Type %temp% and press Enter',
                'Look for the DataDash folder',
                'Inside you\'ll find the log files'
            ]
        },
        linux: {
            video: 'videos/logs/linux.mov',
            steps: [
                'Open terminal',
                'Navigate to ~/.config/DataDash/logs',
                'Log files are stored here'
            ]
        },
        macos: {
            video: 'videos/logs/macos.mov',
            steps: [
                'Open Finder',
                'Press Cmd + Shift + G',
                'Enter ~/Library/Application Support/DataDash/logs',
                'Log files are stored here'
            ]
        },
        android: {
            video: 'videos/logs/android.mp4',
            steps: [
                'Open Files app',
                'Navigate to Internal Storage > Android > data > com.datadash',
                'Open the logs folder'
            ]
        }
    };

    showButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.showModal();
        platformSelection.style.display = 'block';
        platformInstructions.style.display = 'none';
        
        // Reset video source when opening dialog
        const videoElement = dialog.querySelector('video');
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.querySelector('source').removeAttribute('src');
    });

    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.dataset.platform;
            const data = platformData[platform];
            
            // Update content
            dialog.querySelector('.platform-name').textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
            
            // Update video source properly
            const videoElement = dialog.querySelector('video');
            const videoSource = videoElement.querySelector('source');
            videoSource.src = data.video;
            videoElement.load(); // Important: reload the video after changing source
            
            const stepsList = dialog.querySelector('.instruction-steps');
            stepsList.innerHTML = data.steps.map(step => `<li>${step}</li>`).join('');
            
            // Switch views
            platformSelection.style.display = 'none';
            platformInstructions.style.display = 'block';
        });
    });

    backButton.addEventListener('click', () => {
        // Reset video when going back
        const videoElement = dialog.querySelector('video');
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.querySelector('source').removeAttribute('src');
        
        platformSelection.style.display = 'block';
        platformInstructions.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
});

document.querySelectorAll('.feedback-type-card').forEach(card => {
    card.addEventListener('click', () => {
        const feedbackType = card.dataset.type;
        document.getElementById('feedback-type').value = feedbackType;
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    // Initialize EmailJS
    emailjs.init('q9tVbleQ2wLKetQGl'); // Replace with your actual Public Key
    // Feedback Form Submission Logic
    const feedbackForm = document.getElementById('feedback-form');

    feedbackForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Collect form data
        const feedbackType = document.getElementById('feedback-type').value;
        const fileInput = document.getElementById('fileInput').files;
        const name = document.getElementById('user-name').value; // Fetches the value of the name field
        console.log("Name value:", name);

        const userEmail = document.getElementById('email').value;
        let message = document.getElementById('details').value;
        var fileUrls = ""
        var largerFiles = ""
      
        if (fileInput.length > 0) {
            for (const file of fileInput) {
                try {
                    console.log(file)
                    if (file.size > 10 * 1024 * 1024) { 
                        largerFiles += `File "${file.name}" is larger than 10 MB and will not be uploaded.\n`;
                        continue;
                    }
                    const fileUrl = await uploadFile(file);
                    fileUrls += (fileUrl + "\n")
                } catch (err) {
                    console.log("Error in uploading {file.name}: " + err.message)
                }
            }
            
        } 

        if (largerFiles) {
            alert(largerFiles);
        }

        if (fileUrls) {
          message += "\n\nFile Url(s): \n"  + fileUrls
        }

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

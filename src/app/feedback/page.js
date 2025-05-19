'use client'

import { useState, useRef } from 'react';
import { uploadFile } from '../../lib/uploadFile';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);
  
  const platformData = {
    windows: {
      video: '/videos/logs/windows.mov',
      steps: [
        'Open the Windows search or press Windows + R, then type "Run" and open it.',
        'Type %temp% and press Enter.',
        'Look for and open the "DataDash" folder.',
        'Inside is "datadashlog.txt", the log file.'
      ]
    },
    linux: {
      video: '/videos/logs/linux.mov',
      steps: [
        'Open your file manager and go to the home directory.',
        'Press Ctrl+H to show hidden files if needed.',
        'Locate and open the ".cache" folder and then "DataDash".',
        'You will find "datadashlog.txt".'
      ]
    },
    macos: {
      video: '/videos/logs/macos.mov',
      steps: [
        'Open Finder and go to your home directory.',
        'Press Cmd+Shift+. to show hidden files if needed.',
        'Open "Library" then "Caches" and look for "DataDash".',
        'Inside, you should see "datadashlog.txt".'
      ]
    },
    android: {
      video: '/videos/logs/android.mp4',
      steps: [
        'Open the Files app and choose Internal Storage.',
        'Look for and open "Android" > "Media".',
        'Inside "com.an.crossplatform", locate "Logs".',
        'The log file is named "log.txt".'
      ]
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Getting form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('userEmail');
    const message = formData.get('message');
    const files = fileInputRef.current.files;
    
    let fileUrls = "";
    let largerFiles = "";
    
    // Upload files if any
    if (files.length > 0) {
      for (const file of files) {
        try {
          if (file.size > 10 * 1024 * 1024) {
            largerFiles += `File "${file.name}" is larger than 10 MB and will not be uploaded.\n`;
            continue;
          }
          const fileUrl = await uploadFile(file);
          fileUrls += (fileUrl + "\n");
        } catch (err) {
          console.log(`Error in uploading ${file.name}: ${err.message}`);
        }
      }
    }
    
    if (largerFiles) {
      alert(largerFiles);
    }
    
    let finalMessage = message;
    if (fileUrls) {
      finalMessage += "\n\nFile Url(s): \n" + fileUrls;
    }
    
    // Initialize EmailJS
    window.emailjs.init('q9tVbleQ2wLKetQGl');
    
    // Send email
    window.emailjs.send('service_pkzzkvw', 'template_dczsrp9', {
      feedbackType,
      name,
      userEmail: email,
      message: finalMessage
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setFeedbackMessage('Thank you for your feedback!');
        e.target.reset();
        setFeedbackType('');
      },
      function (error) {
        console.log('FAILED...', error);
        setFeedbackMessage('An error occurred while submitting your feedback. Please try again later.');
      }
    );
  };
  
  const handleFeedbackTypeSelection = (type) => {
    setFeedbackType(type);
    
    // Scroll to the form section with smooth behavior
    formSectionRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  return (
    <main className="min-h-screen dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text transition-colors">
      <div className="bg-linear-to-r from-primary/10 to-secondary/10 py-10 px-5 text-center mb-20">
        <h1 className="text-5xl md:text-6xl bg-gradient-primary bg-clip-text text-transparent font-medium mb-6">Your Feedback Matters</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-center dark:text-white text-black font-light">
          Help us improve DataDash by sharing your thoughts, reporting issues, or suggesting new features.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 min-h-[50vh] items-center">
          <FeedbackTypeCard
            icon="fa-lightbulb"
            title="Feature Request"
            description="Suggest new features or improvements"
            onClick={() => handleFeedbackTypeSelection('Feature Request')}
          />
          <FeedbackTypeCard
            icon="fa-bug"
            title="Bug Report"
            description="Report issues or unexpected behavior"
            onClick={() => handleFeedbackTypeSelection('Bug Report')}
          />
          <FeedbackTypeCard
            icon="fa-comment"
            title="Testimony"
            description="Share your experience with DataDash"
            onClick={() => handleFeedbackTypeSelection('Testimony')}
          />
        </div>

        <section 
          id="feedback-form-section" 
          ref={formSectionRef}
          className="bg-white/5 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-3xl mx-auto mb-10 scroll-mt-8"
        >
          <form id="feedback-form" onSubmit={handleSubmit}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl bg-gradient-primary bg-clip-text text-transparent mb-2">Submit Your Feedback</h2>
              <p className="text-sm dark:text-gray-300 text-gray-600">Help us improve DataDash with your valuable input</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="feedback-type" className="block text-sm font-medium mb-2">Type of Feedback</label>
              <select
                id="feedback-type"
                name="feedbackType"
                required
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full px-4 py-4 rounded-xl text-base dark:bg-dark-card bg-light-card border border-gray-200/20 dark:text-white text-black"
              >
                <option value="" disabled>Choose feedback type</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Testimony">Testimony</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="user-name" className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="user-name"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-4 rounded-xl text-base dark:bg-dark-card bg-light-card border border-gray-200/20 dark:text-white text-black"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="userEmail"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-4 rounded-xl text-base dark:bg-dark-card bg-light-card border border-gray-200/20 dark:text-white text-black"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="details" className="block text-sm font-medium mb-2">Your Message</label>
              <textarea
                id="details"
                name="message"
                rows="5"
                placeholder="Share your thoughts with us"
                required
                className="w-full px-4 py-4 rounded-xl text-base dark:bg-dark-card bg-light-card border border-gray-200/20 dark:text-white text-black"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="fileInput" className="block text-sm font-medium mb-2">
                Attach File (optional) 
                <button 
                  type="button" 
                  onClick={() => setShowDialog(true)}
                  className="ml-2 text-primary hover:underline"
                >
                  (For instructions on how to get logs, click here)
                </button>
              </label>
              <input
                type="file"
                id="fileInput"
                name="file"
                multiple
                ref={fileInputRef}
                className="w-full px-4 py-3 rounded-xl text-sm dark:bg-dark-card bg-light-card border border-gray-200/20 dark:text-white text-black cursor-pointer"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-primary rounded-xl text-white text-lg font-semibold hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              Submit Feedback
            </button>
          </form>
          
          {feedbackMessage && (
            <div className="mt-6 p-4 rounded-xl text-center bg-linear-to-r from-primary/10 to-secondary/10">
              {feedbackMessage}
            </div>
          )}
        </section>
      </div>
      
      {/* Dialog for logs help */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="dark:bg-gray-900 bg-white border dark:border-gray-700 border-gray-200 p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            {currentPlatform ? (
              <div>
                <button 
                  onClick={() => setCurrentPlatform(null)}
                  className="mb-4 text-primary hover:-translate-x-1 transition-transform flex items-center"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-medium mb-4 dark:text-white text-black">
                  How to get DataDash Logs - <span className="capitalize">{currentPlatform}</span>
                </h2>
                <video className="w-full rounded-lg mb-6" controls>
                  <source src={platformData[currentPlatform].video} type="video/mp4" />
                </video>
                <div className="mt-4">
                  <h3 className="text-xl mb-3 dark:text-white text-black">Instructions:</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    {platformData[currentPlatform].steps.map((step, index) => (
                      <li key={index} className="text-base dark:text-gray-200 text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-medium mb-6 text-center dark:text-white text-black">How to get DataDash Logs</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(platformData).map((platform) => (
                    <button
                      key={platform}
                      className="flex flex-col items-center justify-center p-6 dark:border-gray-700 border-gray-300 border rounded-lg hover:-translate-y-1 transition-transform dark:bg-gray-800/30 bg-gray-100/30 hover:border-primary"
                      onClick={() => setCurrentPlatform(platform)}
                    >
                      {platform === 'macos' ? (
                        <i className="fab fa-apple text-3xl mb-2 dark:text-gray-200 text-gray-700"></i>
                      ) : (
                        <i className={`fab fa-${platform} text-3xl mb-2 dark:text-gray-200 text-gray-700`}></i>
                      )}
                      <span className="capitalize dark:text-gray-200 text-gray-700">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              className="mt-6 bg-gradient-primary px-4 py-2 rounded-lg text-white hover:opacity-90 w-full"
              onClick={() => setShowDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function FeedbackTypeCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="dark:bg-dark-card bg-light-card rounded-2xl p-8 text-center flex flex-col items-center gap-4 border border-gray-200/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary/50"
    >
      <i className={`fas ${icon} text-4xl bg-gradient-primary bg-clip-text text-transparent`}></i>
      <h3 className="text-2xl font-medium dark:text-white text-black">{title}</h3>
      <p className="text-sm dark:text-gray-300 text-gray-600">{description}</p>
    </button>
  );
}

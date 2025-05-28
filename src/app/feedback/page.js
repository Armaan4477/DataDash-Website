'use client'

import { useState, useRef, useEffect } from 'react';
import { uploadFile } from '../../lib/uploadFile';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import RevealContainer from '../../components/animations/RevealContainer';
import { REVEAL_ANIMATIONS } from '../../components/animations/RevealContainer';
import FadeInOnScroll from '../../components/animations/FadeInOnScroll';
import StaggeredFadeIn from '../../components/animations/StaggeredFadeIn';
import AnimatedSection from '../../components/animations/AnimatedSection';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);
  const formRef = useRef(null);
  
  useEffect(() => {
    // Initialize EmailJS when the component mounts
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);
  
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
    setLoading(true);
    
    // Getting form data
    const formData = new FormData(e.target);
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
    
    // Append file URLs to the "message" field
    if (fileUrls) {
      const messageField = e.target.elements['message'];
      if (messageField) {
        messageField.value += `\n\nUploaded files:\n${fileUrls}`;
      }
    }

    // Remove file inputs before sending form
    [...e.target.elements].forEach(el => {
      if (el.type === 'file') {
        el.parentNode.removeChild(el);
      }
    });

    try {
      // Send email using emailjs library directly
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_KEY
      );
      
      console.log('SUCCESS!');
      setFeedbackMessage('Thank you for your feedback!');
      e.target.reset();
      setFeedbackType('');
    } catch (error) {
      console.log('FAILED...', error);
      setFeedbackMessage('An error occurred while submitting your feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
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
      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.2}
        className="bg-linear-to-r from-primary/10 to-secondary/10 py-10 px-5 text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl bg-gradient-primary bg-clip-text text-transparent font-medium mb-6">Your Feedback Matters</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-center dark:text-white text-black font-light">
          Help us improve DataDash by sharing your thoughts, reporting issues, or suggesting new features.
        </p>
      </RevealContainer>

      <div className="max-w-7xl mx-auto px-5">
        <AnimatedSection 
          animation="fadeIn" 
          duration={1.0} 
          className="mb-20"
        >
          <StaggeredFadeIn 
            className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[50vh] items-center justify-items-center md:justify-items-stretch"
            childClassName=""
            staggerDelay={0.15}
            duration={0.8}
            direction="up"
            distance={30}
          >
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
          </StaggeredFadeIn>
        </AnimatedSection>

        <FadeInOnScroll 
          direction="up" 
          duration={0.8}
          distance={50}
          threshold={0.2}
          className="mb-10"
        >
          <section 
            id="feedback-form-section" 
            ref={formSectionRef}
            className="bg-white/5 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-3xl mx-auto scroll-mt-8"
          >
            <RevealContainer 
              animationType={REVEAL_ANIMATIONS.FADE} 
              duration={0.8} 
              delay={0.2}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl bg-gradient-primary bg-clip-text text-transparent mb-2">Submit Your Feedback</h2>
              <p className="text-sm dark:text-gray-300 text-gray-600">Help us improve DataDash with your valuable input</p>
            </RevealContainer>
            
            <form id="feedback-form" ref={formRef} onSubmit={handleSubmit}>
              <StaggeredFadeIn 
                className="space-y-6"
                childClassName=""
                staggerDelay={0.1}
                duration={0.6}
                direction="up"
                distance={20}
              >
                <div>
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

                <div>
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

                <div>
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

                <div>
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

                <div>
                  <label htmlFor="fileInput" className="block text-sm font-medium mb-2">
                    Attach File (optional) 
                    <motion.button 
                      type="button" 
                      onClick={() => setShowDialog(true)}
                      className="ml-2 text-primary hover:underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      (For instructions on how to get logs, click here)
                    </motion.button>
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

                <motion.button 
                  type="submit" 
                  className="btn w-full"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.03 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full mr-2"
                      />
                      Submitting...
                    </span>
                  ) : 'Submit Feedback'}
                </motion.button>
              </StaggeredFadeIn>
            </form>
            
            <AnimatePresence>
              {feedbackMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-6 p-4 rounded-xl text-center bg-linear-to-r ${feedbackMessage.includes('error') ? 'from-red-500/10 to-red-600/10' : 'from-primary/10 to-secondary/10'}`}
                >
                  {feedbackMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </FadeInOnScroll>
      </div>
      
      {/* Dialog for logs help */}
      <AnimatePresence>
        {showDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="dark:bg-gray-900 bg-white border dark:border-gray-700 border-gray-200 p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {currentPlatform ? (
                  <motion.div
                    key="platform-details"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button 
                      onClick={() => setCurrentPlatform(null)}
                      className="mb-4 text-primary hover:-translate-x-1 transition-transform flex items-center"
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Back
                    </motion.button>
                    <h2 className="text-2xl font-medium mb-4 dark:text-white text-black">
                      How to get DataDash Logs - <span className="capitalize">{currentPlatform}</span>
                    </h2>
                    <motion.video 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-full rounded-lg mb-6" 
                      controls
                    >
                      <source src={platformData[currentPlatform].video} type="video/mp4" />
                    </motion.video>
                    <div className="mt-4">
                      <h3 className="text-xl mb-3 dark:text-white text-black">Instructions:</h3>
                      <motion.ol className="list-decimal pl-6 space-y-2">
                        {platformData[currentPlatform].steps.map((step, index) => (
                          <motion.li 
                            key={index} 
                            className="text-base dark:text-gray-200 text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {step}
                          </motion.li>
                        ))}
                      </motion.ol>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="platform-selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-medium mb-6 text-center dark:text-white text-black">How to get DataDash Logs</h2>
                    <StaggeredFadeIn 
                      className="grid grid-cols-2 gap-4"
                      childClassName=""
                      staggerDelay={0.1}
                      duration={0.6}
                      direction="up"
                      distance={20}
                    >
                      {Object.keys(platformData).map((platform) => (
                        <motion.button
                          key={platform}
                          className="flex flex-col items-center justify-center p-6 dark:border-gray-700 border-gray-300 border rounded-lg hover:-translate-y-1 transition-transform dark:bg-gray-800/30 bg-gray-100/30 hover:border-primary"
                          onClick={() => setCurrentPlatform(platform)}
                          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(10, 100, 80, 0.2)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {platform === 'macos' ? (
                            <i className="fab fa-apple text-3xl mb-2 dark:text-gray-200 text-gray-700"></i>
                          ) : (
                            <i className={`fab fa-${platform} text-3xl mb-2 dark:text-gray-200 text-gray-700`}></i>
                          )}
                          <span className="capitalize dark:text-gray-200 text-gray-700">{platform}</span>
                        </motion.button>
                      ))}
                    </StaggeredFadeIn>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                className="btn w-full mt-6"
                onClick={() => setShowDialog(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function FeedbackTypeCard({ icon, title, description, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="dark:bg-dark-card bg-light-card rounded-2xl p-8 text-center flex flex-col items-center gap-4 border border-gray-200/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary/50"
      whileHover={{ 
        y: -8,
        boxShadow: "0 15px 30px rgba(19, 156, 111, 0.2), 0 10px 20px rgba(236, 72, 154, 0.2)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.i 
        className={`fas ${icon} text-4xl bg-gradient-primary bg-clip-text text-transparent`}
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      ></motion.i>
      <h3 className="text-2xl font-medium dark:text-white text-black">{title}</h3>
      <p className="text-sm dark:text-gray-300 text-gray-600">{description}</p>
    </motion.button>
  );
}

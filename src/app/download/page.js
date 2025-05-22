'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealContainer from '../../components/animations/RevealContainer';
import { REVEAL_ANIMATIONS } from '../../components/animations/RevealContainer';
import FadeInOnScroll from '../../components/animations/FadeInOnScroll';
import StaggeredFadeIn from '../../components/animations/StaggeredFadeIn';
import AnimatedSection from '../../components/animations/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function DownloadPage() {
  const [versions, setVersions] = useState({
    windows: 'Loading...',
    macos: 'Loading...',
    linux: 'Loading...',
    android: 'Loading...'
  });
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchVersionNumbers() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Project-Bois/DataDash-files/refs/heads/main/version.json');
        const data = await response.json();
        
        const platformValues = data.platformValues;
        
        setVersions({
          windows: platformValues.python_windows || 'Unknown',
          macos: platformValues.python_macos || 'Unknown',
          linux: platformValues.python_linux || 'Unknown',
          android: platformValues.android || 'Unknown'
        });
      } catch (error) {
        console.error('Error fetching version numbers:', error);
      }
    }
    
    fetchVersionNumbers();
  }, []);

  const handleCopyToClipboard = async (text) => {
    try {
      // Try to use the modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      
      // Fallback for browsers without clipboard API (especially on mobile)
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Focus and select the text
      textArea.focus();
      textArea.select();
      
      // Execute the copy command
      const successful = document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Failed to copy text');
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <main className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text font-poppins min-h-screen">
      <div className="pt-10">
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
          duration={0.8} 
          delay={0.2}
          className="px-10 py-10 text-center max-w-full"
        >
          <h1 className="font-poppins font-bold text-5xl bg-gradient-primary bg-clip-text text-transparent mb-5">
            Download Our Application
          </h1>
          <FadeInOnScroll direction="up" duration={0.6} delay={0.3}>
            <p className="font-poppins font-light text-xl">Select your platform below to download the appropriate version.</p>
            <div className="flex justify-center mt-5">
              <motion.button 
                onClick={() => setShowModal(true)}
                className="btn py-3 px-6 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Need Help Choosing Arm or x64?
              </motion.button>
            </div>
          </FadeInOnScroll>
        </RevealContainer>
      </div>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      {/* Windows Section */}
      <AnimatedSection animation="fadeIn" duration={1.0} delay={0.6} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Windows</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.windows}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: Windows 10 <br /> Recommended Requirement: Windows 11
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
          threshold={0}
          delay={0.6}
          once={false}
        >
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(windows%20x64).exe" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Windows (x64)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(windows%20arm).exe" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Windows (ARM)
          </motion.a>
        </StaggeredFadeIn>
        
        <StaggeredFadeIn 
          className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
          threshold={0}
          delay={0.9}
          once={false}
        >
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Running the App:</h3>
          <p className="text-base leading-relaxed mb-5">
            1. Download the EXE file
            <span className="font-bold text-secondary italic"> (Note: It may block the download from happening, so you will need to disable Microsoft Defender for the time being - for help see the video below)</span>.
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/defender.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-base leading-relaxed">
            2. Open the installer
            <span className="font-bold text-secondary italic"> (Note: Due to no signing certificate, Windows will warn that the app is unsafe, click <strong>"More Info"</strong> and then <strong>"Run Anyway"</strong> to install the app)</span>.<br />
            3. Follow the steps to install the app on your device.<br />
            4. Set the Network type to Private in the Windows settings
            <span className="font-bold text-secondary italic"> (for help see the video below)</span>.
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/network.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-base leading-relaxed">5. Launch the application from the Start menu.</p>
        </StaggeredFadeIn>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* MacOS Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">MacOS</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.macos}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: macOS Ventura <br /> Recommended Requirement: macOS Sequoia
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
        >
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(macos%20arm).dmg" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MacOS (ARM)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(macos%20x64).dmg" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MacOS (x64)
          </motion.a>
        </StaggeredFadeIn>
        
        <FadeInOnScroll direction="up" duration={0.8} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Installation Instructions:</h3>
          <p className="text-base leading-relaxed mb-3">
            1. Download the .dmg file.<br />
            2. Open the file and drag the application to your Applications folder.<br />
            3. Launch the application from the Applications folder.<br />
            4. If you see a warning message, go to <strong>System Settings</strong> &gt; <strong>Privacy & Security</strong>.<br />
            5. Scroll down to the "Security" section and find a message about the app.<br />
            6. Click <strong>"Allow Anyway"</strong> to grant permission to open the app <br />(Note: There is no app signing certificate, so this warning is expected;
            <span className="font-bold text-secondary italic"> (for help see the video below)</span>).
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/security.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="font-bold text-secondary mb-2">
            Note: After launching the application, it may take up to 20 seconds to open. This is a known issue, and we are actively working on a fix.
          </p>
        </FadeInOnScroll>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Linux Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Linux</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.linux}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: 20.04 <br /> Recommended Requirement: 24.04
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
        >
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(linux%20x64)" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Linux (x64)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(linux%20arm)" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Linux (ARM)
          </motion.a>
        </StaggeredFadeIn>
        
        <FadeInOnScroll direction="up" duration={0.8} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Building and Running the App:</h3>
          <p className="text-base leading-relaxed mb-3">
            1. Download the binary file.<br />
            2. Rename the file to remove the brackets.<br />
            3. Give the binary file execute permissions:<br />
            <code className="bg-white/10 px-2 py-1 rounded">chmod +x filename</code><br />
            4. Run the app using: 
            <code className="bg-white/10 px-2 py-1 rounded">./filename</code><br />
            <strong>or </strong><br />
            double click the file in the downloaded location to open it.<br />
            5. No further build steps are necessary.
            <span className="font-bold text-secondary italic"> (for help see the video below)</span>.
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/linux_install.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </FadeInOnScroll>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Android Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Android</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.android}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: Android 11 <br /> Recommended Requirement: Android 14
        </p>
        <FadeInOnScroll direction="up" duration={0.6}>
          <motion.a 
            href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(android).apk" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Android App
          </motion.a>
        </FadeInOnScroll>
        
        <FadeInOnScroll direction="up" duration={0.8} delay={0.2} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Installation Instructions:</h3>
          <p className="text-base leading-relaxed mb-3">
            1. Download the APK file.<br />
            2. Open the file on your Android device.<br />
            3. Allow installations from unknown sources if prompted.<br />
            4. Follow the instructions to install the application.
          </p>
          <p className="font-bold text-secondary mb-2">
            Note: While installing the app, Android will warn that the app is unsafe, this is due to there being no signing certificate present, it can be ignored.
          </p>
        </FadeInOnScroll>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* iOS/iPadOS Section */}
      <AnimatedSection animation="fadeIn" duration={1.0} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">iOS/iPadOS</h2>
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.FADE} 
          duration={0.8} 
          delay={0.2}
          className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md"
        >
          <p className="font-bold text-secondary mb-2">
            Note: The Application is still under development and will be available in the coming months.
          </p>
        </RevealContainer>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Beta Versions Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Beta Versions</h2>
        <p className="text-base mb-4">To try out the beta versions of our app.</p>
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.ZOOM_IN} 
          duration={0.7} 
          delay={0.3}
          className="mb-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/beta" className="btn">Access Beta Versions</Link>
          </motion.div>
        </RevealContainer>
      </AnimatedSection>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Source Files Section */}
      <AnimatedSection animation="fadeIn" duration={1.0} className="text-center px-5 mb-10">
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.SLIDE_UP}
          duration={0.8}
          delay={0.2}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Source Code
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-5 rounded-full"></div>
          <p className="text-lg max-w-2xl mx-auto">
            Access the complete source code for our Python desktop app (built with PyQt6 and Cryptography) 
            and the Android mobile application.
          </p>
        </RevealContainer>
        
        {/* GitHub Repository Card */}
        <FadeInOnScroll direction="up" duration={0.8} className="mb-12">
          <motion.div 
            className="max-w-3xl mx-auto p-6 rounded-xl bg-white/5 border border-primary/20 shadow-lg backdrop-blur-sm hover:shadow-primary/10 transition-all"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.2)" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                  className="dark:fill-white fill-black" />
                </svg>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">DataDash Repository</h3>
                <p className="mb-4 opacity-80">
                  The complete codebase is open-source and available on GitHub. 
                  Clone or fork the repository to contribute or customize for your needs.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <motion.a 
                    href="https://github.com/Armaan4477/DataDash" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </motion.a>
                  <motion.a 
                    href="https://github.com/Armaan4477/DataDash/archive/refs/heads/main.zip" 
                    className="btn-secondary flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download ZIP
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeInOnScroll>

        {/* Tech Stack */}
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.FADE} 
          duration={0.8} 
          delay={0.4}
          className="mt-12 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-medium mb-6">Built With</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {['Python', 'PyQt6', 'Cryptography', 'Android', 'Java'].map((tech, index) => (
              <motion.div 
                key={tech}
                className="px-4 py-2 bg-white/5 rounded-full border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(var(--primary-rgb), 0.5)' }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </RevealContainer>
        
        {/* Repository Clone Instructions */}
        <FadeInOnScroll direction="up" duration={0.8} delay={0.2} className="max-w-3xl mx-auto my-8 p-6 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
              <path d="M9.71,6.29a1,1,0,0,0-1.42,0l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,10l2.3-2.29A1,1,0,0,0,9.71,6.29ZM14.29,12.29l2.3,2.3a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l3-3a1,1,0,0,0,0-1.41l-3-3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41L18.88,12l-2.3,2.29A1,1,0,0,0,14.29,12.29Z"/>
            </svg>
            Cloning the Repository
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <div className="bg-white/10 rounded-lg p-3 w-full overflow-hidden">
              <pre className="text-left font-mono text-sm whitespace-normal sm:whitespace-pre break-all sm:break-normal overflow-x-auto">
                <code>git clone https://github.com/Armaan4477/DataDash.git</code>
              </pre>
            </div>
            <motion.button 
              className="mt-2 sm:mt-0 sm:ml-2 p-3 bg-primary/20 hover:bg-primary/40 rounded-md transition-colors min-w-[50px] min-h-[50px] touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopyToClipboard("git clone https://github.com/Armaan4477/DataDash.git")}
              title="Copy to clipboard"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </motion.button>
          </div>
          {copied && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-primary-light mb-2"
            >
              Copied to clipboard!
            </motion.div>
          )}
        </FadeInOnScroll>
        
        {/* Applications Setup Instructions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          {/* Desktop App */}
          <RevealContainer 
            animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
            duration={0.8} 
            delay={0.3}
            className="flex flex-col h-full"
          >
            <motion.div 
              className="flex-1 p-6 rounded-xl bg-white/5 border border-primary/20 shadow-md backdrop-blur-sm hover:border-primary/30 transition-all h-full"
              whileHover={{ y: -5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39.32.75.71.75H17v1.5h-4.29c-1.09 0-2.21-.91-2.21-2.25H4.86A2.86 2.86 0 0 1 2 14.14v-3.78A2.86 2.86 0 0 1 4.86 7.5h14.28M4.86 9a.86.86 0 0 0-.86.86v3.78c0 .47.39.86.86.86h14.28c.47 0 .86-.39.86-.86v-3.78c0-.47-.39-.86-.86-.86H4.86Z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Desktop Application</h3>
              <p className="text-base mb-6 opacity-80">
                The PyQt6-based desktop application with end-to-end encryption
              </p>
              
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Navigate to Desktop App Folder</p>
                    <div className="bg-white/10 p-3 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">cd DataDash/Desktop-app</code>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Install Dependencies</p>
                    <div className="bg-white/10 p-3 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">pip install -r requirements.txt</code>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Run the Application</p>
                    <div className="bg-white/10 p-3 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">python main.py</code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealContainer>
          
          {/* Android App */}
          <RevealContainer 
            animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
            duration={0.8} 
            delay={0.5}
            className="flex flex-col h-full"
          >
            <motion.div 
              className="flex-1 p-6 rounded-xl bg-white/5 border border-primary/20 shadow-md backdrop-blur-sm hover:border-primary/30 transition-all h-full"
              whileHover={{ y: -5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M7.2 16.8h9.6v-9.6H7.2m9.6-1.2c.66 0 1.2.54 1.2 1.2v9.6c0 .66-.54 1.2-1.2 1.2H7.2c-.66 0-1.2-.54-1.2-1.2V7.2c0-.66.54-1.2 1.2-1.2h9.6M12 9a1.5 1.5 0 000 3 1.5 1.5 0 000-3m-4.5 0v6h9V9h-9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Android Application</h3>
              <p className="text-base mb-6 opacity-80">
                The Android mobile application with the same encryption capabilities
              </p>
              
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Open Android Studio</p>
                    <p className="text-sm opacity-80">Launch Android Studio on your development machine</p>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Open Project</p>
                    <div className="bg-white/10 p-3 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">DataDash/Android-app/CrossPlatform</code>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Build and Run</p>
                    <p className="text-sm opacity-80">Compile and run on a physical Android device</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-primary/10 rounded-md border border-primary/20">
                <p className="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary mr-2">
                    <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"/>
                  </svg>
                  The app won't work in Android Studio emulators due to port access restrictions
                </p>
              </div>
            </motion.div>
          </RevealContainer>
        </div>
        
      </AnimatedSection>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="dark:bg-dark-bg bg-light-bg p-6 rounded-lg max-w-[90%] w-[600px] shadow-xl border border-primary/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent">Help Choosing Your Version</h2>
                <motion.button 
                  onClick={() => setShowModal(false)}
                  className="text-secondary hover:text-primary text-2xl font-bold"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>
              </div>
              <div className="text-base">
                <p className="mb-4">
                  <strong className="text-primary">ARM vs x64:</strong><br />
                </p>
                <motion.ul 
                  className="mb-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.li 
                    className="mb-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <strong>Windows/Linux:</strong> <br />
                    - Devices using Intel and AMD processors, choose the x64 version.<br />
                    - If your device has a Qualcomm chip (e.g., Snapdragon X Elite), choose the ARM version.<br />
                    - If you are running a VM on a mac with Apple M1 chip or higher, choose the ARM version.
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <strong>macOS:</strong><br />
                    - Devices with Apple M1 chip and above are ARM versions.<br />
                    - All Intel-based Macs should select the x64 version.
                  </motion.li>
                </motion.ul>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  If you're unsure which version to select, you can check your device's specifications or consult the manufacturer's website for more information.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

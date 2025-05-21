'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealContainer from '../../components/animations/RevealContainer';
import { REVEAL_ANIMATIONS } from '../../components/animations/RevealContainer';
import FadeInOnScroll from '../../components/animations/FadeInOnScroll';
import StaggeredFadeIn from '../../components/animations/StaggeredFadeIn';
import AnimatedSection from '../../components/animations/AnimatedSection';

export default function BetaPage() {
  const [versions, setVersions] = useState({
    desktop: 'Loading...',
    android: 'Loading...'
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchVersionNumbers() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Project-Bois/data-dash-test-files/refs/heads/main/version.json');
        const data = await response.json();
        
        const platformValues = data.platformValues;
        
        setVersions({
          desktop: platformValues.python || 'Unknown',
          android: platformValues.android || 'Unknown'
        });
      } catch (error) {
        console.error('Error fetching version numbers:', error);
      }
    }
    
    fetchVersionNumbers();
  }, []);

  return (
    <main className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text font-poppins pt-5">
      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.2}
        className="px-10 py-10 text-center"
      >
        <h1 className="text-5xl font-bold font-poppins bg-gradient-primary bg-clip-text text-transparent mb-5">
          Download The Beta Versions Of Our Application
        </h1>
        
        <FadeInOnScroll direction="up" duration={0.6} delay={0.3}>
          <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
            <ul className="list-none p-0 m-0 text-left">
              <li className="dark:text-white text-black text-lg py-1 pl-6 relative font-light before:content-['!'] before:absolute before:left-0 before:font-bold before:text-secondary">
                The Apps may randomly crash or not work from the beginning
              </li>
              <li className="dark:text-white text-black text-lg py-1 pl-6 relative font-light before:content-['!'] before:absolute before:left-0 before:font-bold before:text-secondary">
                For best compatibility, please ensure you update both desktop and Android apps simultaneously
              </li>
            </ul>
          </div>
        </FadeInOnScroll>
        
        <p className="text-xl font-light mt-5">Select your platform below to download the appropriate version.</p>
        <p className="text-[15px] text-secondary mb-2 mt-4">Desktop Version: {versions.desktop}</p>
        <p className="text-[15px] text-secondary mb-5">Android Version: {versions.android}</p>
        
        <motion.button 
          onClick={() => setShowModal(true)}
          className="btn py-3 px-6 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Need Help Choosing Arm or x64?
        </motion.button>
      </RevealContainer>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      {/* Windows Section */}
      <AnimatedSection animation="fadeIn" duration={1.0} className="text-center px-5 mb-10">
        <h2 className="text-3xl font-medium mb-3">Windows</h2>
        <p className="text-[15px] text-[#c90065] font-normal mb-5">
          Minimum Requirement: Windows 10 <br/> Recommended Requirement: Windows 11
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
        >
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(windows%20x64).exe" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Windows (x64)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(windows%20arm).exe" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Windows (ARM)
          </motion.a>
        </StaggeredFadeIn>
        
        <FadeInOnScroll direction="up" duration={0.8} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
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
            2. Set the Network type to Private in the Windows settings
            <span className="font-bold text-secondary italic"> (for help see the video below)</span>.
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/network.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-base leading-relaxed">
            3. Double click the downloaded .exe file
            <span className="font-bold text-secondary italic"> (Note: Due to no signing certificate, On the first launch Windows will warn that the app is unsafe, click <strong>"More Info"</strong> and then <strong>"Run Anyway"</strong> to install the app)</span>.
          </p>
        </FadeInOnScroll>
      </AnimatedSection>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      {/* macOS Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5 mb-10">
        <h2 className="text-3xl font-medium mb-3">MacOS</h2>
        <p className="text-[15px] text-[#c90065] font-normal mb-5">
          Minimum Requirement: macOS Ventura <br/> Recommended Requirement: macOS Sequoia
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
        >
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(macos%20arm).dmg" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MacOS (ARM)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(macos%20x64).dmg" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MacOS (x64)
          </motion.a>
        </StaggeredFadeIn>
        
        <FadeInOnScroll direction="up" duration={0.8} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Installation Instructions:</h3>
          <p className="text-base leading-relaxed">
            1. Download the .dmg file.<br/>
            2. Open the file and drag the application to your Applications folder.<br/>
            3. Launch the application from the Applications folder.<br/>
            4. If you see a warning message, go to <strong>System Settings</strong> &gt; <strong>Privacy & Security</strong>.<br/>
            5. Scroll down to the "Security" section and find a message about the app.<br/>
            6. Click <strong>"Allow Anyway"</strong> to grant permission to open the app <br/>(Note: There is no app signing certificate, so this warning is expected;
            <span className="font-bold text-secondary italic"> (for help see the video below)</span>).
          </p>
          <video width="600" controls className="max-w-full h-auto block mx-auto my-5">
            <source src="/videos/security.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </FadeInOnScroll>
      </AnimatedSection>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      {/* Linux Section */}
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5 mb-10">
        <h2 className="text-3xl font-medium mb-3">Linux</h2>
        <p className="text-[15px] text-[#c90065] font-normal mb-5">
          Minimum Requirement: 20.04 <br/> Recommended Requirement: 24.04
        </p>
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 justify-center"
          childClassName=""
          staggerDelay={0.15}
          duration={0.5}
        >
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(linux%20x64)" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Linux (x64)
          </motion.a>
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(linux%20arm)" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Linux (ARM)
          </motion.a>
        </StaggeredFadeIn>
        
        <FadeInOnScroll direction="up" duration={0.8} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Building and Running the App:</h3>
          <p className="text-base leading-relaxed">
            1. Download the binary file.<br/>
            2. Rename the file to remove the brackets.<br/>
            3. Give the binary file execute permissions:<br/>
            <code className="bg-white/10 px-2 py-1 rounded">chmod +x filename</code><br/>
            4. Run the app using: 
            <code className="bg-white/10 px-2 py-1 rounded">./filename</code><br/>
            <strong>or </strong><br/>
            double click the file in the downloaded location to open it.<br/>
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
      <AnimatedSection animation="slideUp" duration={1.0} className="text-center px-5 mb-10">
        <h2 className="text-3xl font-medium mb-3">Android</h2>
        <p className="text-[15px] text-[#c90065] font-normal mb-5">
          Minimum Requirement: Android 11 <br/> Recommended Requirement: Android 14
        </p>
        <FadeInOnScroll direction="up" duration={0.6}>
          <motion.a 
            href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(android).apk" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Android App
          </motion.a>
        </FadeInOnScroll>
        
        <FadeInOnScroll direction="up" duration={0.8} delay={0.2} className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Installation Instructions:</h3>
          <p className="text-base leading-relaxed">
            1. Download the APK file.<br/>
            2. Open the file on your Android device.<br/>
            3. Allow installations from unknown sources if prompted.<br/>
            4. Follow the instructions to install the application.
          </p>
          <p className="font-bold text-secondary italic">
            Note: While installing the app, Android will warn that the app is unsafe, this is due to there being no signing certificate present, it can be ignored.
          </p>
        </FadeInOnScroll>
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

'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DownloadPage() {
  const [versions, setVersions] = useState({
    windows: 'Loading...',
    macos: 'Loading...',
    linux: 'Loading...',
    android: 'Loading...'
  });
  const [showModal, setShowModal] = useState(false);

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

  return (
    <main className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text font-poppins min-h-screen">
      <div className="pt-10">
        <div className="px-10 py-10 text-center max-w-full">
          <h1 className="font-poppins font-bold text-5xl bg-gradient-primary bg-clip-text text-transparent mb-5">
            Download Our Application
          </h1>
          <p className="font-poppins font-light text-xl">Select your platform below to download the appropriate version.</p>
          <div className="flex justify-center mt-5">
            <button 
              onClick={() => setShowModal(true)}
              className="btn py-3 px-6 text-base"
            >
              Need Help Choosing Arm or x64?
            </button>
          </div>
        </div>
      </div>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Windows</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.windows}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: Windows 10 <br /> Recommended Requirement: Windows 11
        </p>
        <div className="space-x-4 mb-6">
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(windows%20arm).exe" className="btn">Windows (ARM)</a>
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(windows%20x64).exe" className="btn">Windows (x64)</a>
        </div>
        
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
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
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* MacOS Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">MacOS</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.macos}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: macOS Ventura <br /> Recommended Requirement: macOS Sequoia
        </p>
        <div className="space-x-4 mb-6">
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(macos%20arm).dmg" className="btn">MacOS (ARM)</a>
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(macos%20x64).dmg" className="btn">MacOS (x64)</a>
        </div>
        
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
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
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Linux Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Linux</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.linux}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: 20.04 <br /> Recommended Requirement: 24.04
        </p>
        <div className="space-x-4 mb-6">
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(linux%20arm)" className="btn">Linux (ARM)</a>
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(linux%20x64)" className="btn">Linux (x64)</a>
        </div>
        
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
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
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Android Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Android</h2>
        <p className="text-sm text-secondary mb-2">Version: {versions.android}</p>
        <p className="text-sm text-secondary-dark font-normal mb-4">
          Minimum Requirement: Android 11 <br /> Recommended Requirement: Android 14
        </p>
        <div className="space-x-4 mb-6">
          <a href="https://github.com/Project-Bois/DataDash-files/raw/refs/heads/main/DataDash(android).apk" className="btn">Android App</a>
        </div>
        
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
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
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* iOS/iPadOS Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">iOS/iPadOS</h2>
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <p className="font-bold text-secondary mb-2">
            Note: The Application is still under development and will be available in the coming months.
          </p>
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Beta Versions Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Beta Versions</h2>
        <p className="text-base mb-4">To try out the beta versions of our app.</p>
        <div className="mb-6">
          <Link href="/beta" className="btn">Access Beta Versions</Link>
        </div>
      </div>
      
      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />
      
      {/* Source Files Section */}
      <div className="text-center px-5">
        <h2 className="text-3xl font-medium mb-5">Source Files</h2>
        <p className="text-base mb-4">Below are the source files for our application, including the Python desktop app (built with PyQt6 and Cryptography) and the Android app.</p>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-3">Download Source Code</h3>
          <a href="https://github.com/Armaan4477/DataDash" target="_blank" rel="noopener noreferrer" className="btn">Download Full Source Code on GitHub</a>
        </div>
        
        <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
          <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Cloning the Repository:</h3>
          <p className="text-base leading-relaxed mb-3">
            1. Open a terminal and clone the repository with the following command:<br />
            <code className="bg-white/10 px-2 py-1 rounded">git clone https://github.com/Armaan4477/DataDash.git</code>
          </p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-5">Python (Desktop Application)</h3>
          
          <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
            <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Python App Setup Instructions:</h3>
            <p className="text-base leading-relaxed">
              1. After cloning, navigate to the <code className="bg-white/10 px-2 py-1 rounded">Desktop-app</code> folder:<br />
              <code className="bg-white/10 px-2 py-1 rounded">cd DataDash/Desktop-app</code><br />
              2. Install the required dependencies:<br />
              <code className="bg-white/10 px-2 py-1 rounded">pip install -r requirements.txt</code><br />
              3. Run the application with the main Python script.
            </p>
          </div>
        </div>
        
        <div className="mt-8 mb-10">
          <h3 className="text-2xl font-medium mb-5">Android (Mobile Application)</h3>
          
          <div className="max-w-[700px] mx-auto my-5 p-5 bg-white/5 rounded-xl border border-primary/20 shadow-md">
            <h3 className="text-xl font-semibold mb-2.5 bg-gradient-primary bg-clip-text text-transparent">Android App Setup Instructions:</h3>
            <p className="text-base leading-relaxed mb-3">
              1. After cloning, open Android Studio.<br />
              2. In Android Studio, navigate to and open the project folder located at:<br />
              <code className="bg-white/10 px-2 py-1 rounded">DataDash/Android-app/CrossPlatform</code><br />
              3. Set up the required dependencies and SDK versions.<br />
              4. Compile and run the app on an Android device.
            </p>
            <p className="font-bold text-secondary mb-2">
              Note: The app won't work in the Android emulator present in Android Studio as there are restrictions to the access to ports.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="dark:bg-dark-bg bg-light-bg p-6 rounded-lg max-w-[90%] w-[600px] shadow-xl border border-primary/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent">Help Choosing Your Version</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-secondary hover:text-primary text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="text-base">
              <p className="mb-4">
                <strong className="text-primary">ARM vs x64:</strong><br />
              </p>
              <ul className="mb-4">
                <li className="mb-4">
                  <strong>Windows/Linux:</strong> <br />
                  - Devices using Intel and AMD processors, choose the x64 version.<br />
                  - If your device has a Qualcomm chip (e.g., Snapdragon X Elite), choose the ARM version.<br />
                  - If you are running a VM on a mac with Apple M1 chip or higher, choose the ARM version.
                </li>
                <li>
                  <strong>macOS:</strong><br />
                  - Devices with Apple M1 chip and above are ARM versions.<br />
                  - All Intel-based Macs should select the x64 version.
                </li>
              </ul>
              <p>
                If you're unsure which version to select, you can check your device's specifications or consult the manufacturer's website for more information.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <footer className="text-center py-6 mt-8 border-t border-primary/10">
        <p className="text-secondary-dark">&copy; 2024 DataDash. All rights reserved.</p>
      </footer>
    </main>
  );
}

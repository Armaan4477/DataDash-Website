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
      
      {/* Add more sections for other platforms here */}
    </main>
  );
}

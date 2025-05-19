'use client'

import { useState, useEffect } from 'react';

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
      <div className="px-10 py-10 text-center">
        <h1 className="text-5xl font-bold font-poppins bg-gradient-primary bg-clip-text text-transparent mb-5">
          Download The Beta Versions Of Our Application
        </h1>
        
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
        
        <p className="text-xl font-light mt-5">Select your platform below to download the appropriate version.</p>
        <p className="text-[15px] text-secondary mb-2 mt-4">Desktop Version: {versions.desktop}</p>
        <p className="text-[15px] text-secondary mb-5">Android Version: {versions.android}</p>
        
        <button 
          onClick={() => setShowModal(true)}
          className="btn py-3 px-6 text-base"
        >
          Need Help Choosing Arm or x64?
        </button>
      </div>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light via-secondary to-transparent opacity-30" />

      {/* Windows Section */}
      <div className="text-center px-5 mb-10">
        <h2 className="text-3xl font-medium mb-3">Windows</h2>
        <p className="text-[15px] text-[#c90065] font-normal mb-5">
          Minimum Requirement: Windows 10 <br/> Recommended Requirement: Windows 11
        </p>
        <div className="space-x-4 mb-6">
          <a href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(windows%20arm).exe" className="btn">Windows (ARM)</a>
          <a href="https://github.com/Project-Bois/data-dash-test-files/raw/refs/heads/main/DataDash(windows%20x64).exe" className="btn">Windows (x64)</a>
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
      
      {/* Add more platform sections here similar to Windows section */}
    </main>
  );
}

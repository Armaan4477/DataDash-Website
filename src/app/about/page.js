'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  useEffect(() => {
    // Set images when component mounts
    // This is only necessary for initial load in development
    // In production, these would be pre-rendered
  }, []);

  return (
    <div className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text max-w-full py-10 px-5">
      <h1 className="text-5xl md:text-7xl text-center font-poppins font-bold bg-gradient-primary bg-clip-text text-transparent mt-5 mb-10">
        DataDash: Cross Platform Data Sharing App
      </h1>

      <h2 className="text-4xl text-center text-[rgb(64,206,171)] mt-12 mb-8 font-poppins font-medium">
        Meet the Team
      </h2>
      
      <div className="flex justify-center flex-wrap gap-7 px-5 mt-8">
        <TeamMemberCard
          photo="/photos/arm.jpeg"
          name="Armaan Nakhuda"
          github="https://github.com/Armaan4477"
          linkedin="https://www.linkedin.com/in/armaan-nakhuda-756492235"
        />
        
        <TeamMemberCard
          photo="/photos/samay.jpg"
          name="Samay Pandey"
          github="https://github.com/ChampionSamay1644"
          linkedin="https://www.linkedin.com/in/samaypandey1644"
        />
        
        <TeamMemberCard
          photo="/photos/yash.jpeg"
          name="Yash Patil"
          github="https://github.com/FrosT2k5"
          linkedin="https://www.linkedin.com/in/yash-patil-385171257"
        />
      </div>

      <h2 className="text-4xl text-center text-[rgb(64,206,171)] mt-16 mb-8 font-poppins font-medium">
        Special Thanks To
      </h2>
      
      <div className="flex justify-center flex-wrap gap-6 px-5 mt-8">
        <SpecialThanksCard
          photo="/photos/aarya.jpg"
          name="Aarya Walve"
          github="https://github.com/aaryaa28"
          linkedin="https://www.linkedin.com/in/aarya-walve-10259325b/"
        />
        
        <SpecialThanksCard
          photo="/photos/adwait.jpg"
          name="Adwait Patil"
          github="https://github.com/Adwait0901"
          linkedin="https://www.linkedin.com/in/adwaitpatil0901/"
        />
        
        <SpecialThanksCard
          photo="/photos/nishal.jpg"
          name="Nishal Poojary"
          github="https://github.com/Ailover123"
          linkedin="https://www.linkedin.com/in/nishal-poojary-159530290"
        />
        
        <SpecialThanksCard
          photo="/photos/urmi.jpg"
          name="Urmi Joshi"
          github="https://github.com/ura-dev04"
          linkedin="https://www.linkedin.com/in/urmi-joshi-6697a7320/"
        />
      </div>
    </div>
  );
}

function TeamMemberCard({ photo, name, github, linkedin }) {
  return (
    <div className="py-5 px-5 rounded-[20px] w-[280px] my-4 mx-auto shadow-feature backdrop-blur-md transition-all duration-300 relative overflow-hidden text-white text-center hover:-translate-y-4 hover:shadow-feature-hover">
      <div className="relative w-[150px] h-[150px] rounded-full mx-auto mb-4 border-3 border-white shadow-[0_0_10px_#fd49b8f1]">
        <Image 
          src={photo} 
          alt={name} 
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-2xl mb-2.5 font-bold dark:text-white text-black drop-shadow-[0_0_5px_#fd49b8f1]">
        {name}
      </h3>
      <Link 
        href={github} 
        target="_blank"
        className="block mt-2.5 text-xl dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
      >
        GitHub Profile
      </Link>
      <Link 
        href={linkedin} 
        target="_blank"
        className="block mt-2.5 text-xl dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
      >
        LinkedIn Profile
      </Link>
    </div>
  );
}

function SpecialThanksCard({ photo, name, github, linkedin }) {
  return (
    <div className="py-10 px-10 rounded-[10px] my-5 mx-5 shadow-md text-center w-[200px] h-[320px] transition-all duration-300 hover:-translate-y-4 hover:shadow-feature-hover dark:bg-[#2b2b2b] bg-white">
      <div className="relative w-[150px] h-[150px] rounded-full mx-auto mb-5 border-3 border-[#fefdfd] shadow-[0_0_15px_#fd49b8f1]">
        <Image 
          src={photo} 
          alt={name} 
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-xl mb-2.5 font-bold dark:text-white text-black drop-shadow-[0_0_5px_#fd49b8f1]">
        {name}
      </h3>
      <Link 
        href={github} 
        target="_blank"
        className="block mt-2.5 text-base dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
      >
        GitHub Profile
      </Link>
      <Link 
        href={linkedin} 
        target="_blank"
        className="block mt-2.5 text-base dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
      >
        LinkedIn Profile
      </Link>
    </div>
  );
}

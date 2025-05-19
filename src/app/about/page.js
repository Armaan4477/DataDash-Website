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
    <div className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text max-w-full py-12 px-7">
      <h1 className="text-5xl md:text-7xl text-center font-poppins font-bold bg-gradient-primary bg-clip-text text-transparent mt-6 mb-10 leading-relaxed md:leading-relaxed py-2">
        DataDash: Cross Platform Data Sharing App
      </h1>

      <h2 className="text-4xl text-center text-[rgb(64,206,171)] mt-12 mb-10 font-poppins font-medium">
        Meet the Team (Alphabetically)
      </h2>
      
      <div className="relative flex justify-center flex-nowrap overflow-x-auto gap-8 max-w-[1600px] mx-auto px-8 py-8 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(64,206,171,0.05)] before:to-transparent before:rounded-3xl">
        <TeamMemberCard
          photo="/photos/aarya.jpg"
          name="Aarya Walve"
          github="https://github.com/aaryaa28"
          linkedin="https://www.linkedin.com/in/aarya-walve-10259325b/"
        />

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

      <h2 className="text-4xl text-center text-[rgb(64,206,171)] mt-20 mb-10 font-poppins font-medium">
        Special Thanks To (Alphabetically)
      </h2>
      
      <div className="flex justify-center flex-nowrap overflow-x-auto lg:flex-wrap gap-5 max-w-7xl mx-auto px-4">
        
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
    <div className="py-7 px-7 rounded-[20px] w-[300px] my-4 shadow-[0_10px_25px_rgba(19,156,111,0.284),0_15px_35px_rgba(236,72,154,0.403)] backdrop-blur-[10px] transition-all duration-300 relative overflow-hidden text-white text-center hover:-translate-y-[15px] hover:shadow-[0_15px_35px_rgba(19,156,111,0.384),0_20px_45px_rgba(236,72,154,0.503)]">
      <div className="relative w-[160px] h-[160px] mx-auto mb-4">
        <Image 
          src={photo} 
          alt={name} 
          fill
          className="rounded-full object-cover border-[3px] border-white shadow-[0_0_10px_#fd49b8f1]"
        />
      </div>
      <h3 className="text-[1.5rem] mb-2.5 font-bold dark:text-white text-black drop-shadow-[0_0_5px_#fd49b8f1]">
        {name}
      </h3>
      <div className="mt-2.5">
        <Link 
          href={github} 
          target="_blank"
          className="block mt-2.5 text-[18px] dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
        >
          GitHub Profile
        </Link>
        <Link 
          href={linkedin} 
          target="_blank"
          className="block mt-2.5 text-[18px] dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
        >
          LinkedIn Profile
        </Link>
      </div>
    </div>
  );
}

function SpecialThanksCard({ photo, name, github, linkedin }) {
  return (
    <div className="py-5 px-5 rounded-[10px] my-5 mx-[10px] shadow-md text-center w-[220px] h-[320px] flex-shrink-0 dark:bg-[#2b2b2b] bg-white transition-all duration-300 hover:-translate-y-[15px] hover:shadow-[0_15px_35px_rgba(19,156,111,0.384),0_20px_45px_rgba(236,72,154,0.503)]">
      <div className="relative w-[130px] h-[130px] mx-auto mb-5">
        <Image 
          src={photo} 
          alt={name} 
          fill
          className="rounded-full object-cover border-[3px] border-[#fefdfd] shadow-[0_0_15px_#fd49b8f1]"
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

'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealContainer from '../../components/animations/RevealContainer';
import { REVEAL_ANIMATIONS } from '../../components/animations/RevealContainer';
import FadeInOnScroll from '../../components/animations/FadeInOnScroll';
import StaggeredFadeIn from '../../components/animations/StaggeredFadeIn';
import AnimatedSection from '../../components/animations/AnimatedSection';
import { motion } from 'framer-motion';

export default function AboutPage() {
  useEffect(() => {
    // Set images when component mounts
    // This is only necessary for initial load in development
    // In production, these would be pre-rendered
  }, []);

  return (
    <div className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text max-w-full py-12 px-7">
      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.2}
      >
        <h1 className="text-5xl md:text-7xl text-center font-poppins font-bold bg-gradient-primary bg-clip-text text-transparent mt-6 mb-10 leading-relaxed md:leading-relaxed py-2">
          DataDash: Cross Platform Data Sharing App
        </h1>
      </RevealContainer>

      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.3}
      >
        <h2 className="text-4xl text-center text-[rgb(64,206,171)] mt-20 mb-10 font-poppins font-medium">
          Meet the Team
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 font-poppins">
          The core developers who built DataDash
        </p>
      </RevealContainer>
      
      <FadeInOnScroll direction="up" duration={1.2} className="relative flex justify-center flex-nowrap overflow-x-auto gap-8 max-w-[1600px] mx-auto px-8 py-8 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(64,206,171,0.05)] before:to-transparent before:rounded-3xl">
        <StaggeredFadeIn 
          className="flex flex-col md:flex-row gap-8"
          childClassName=""
          staggerDelay={0.20}
          duration={0.9}
          direction="up"
          distance={40}
        >

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

          <TeamMemberCard
            photo="/photos/aarya.jpg"
            name="Aarya Walve"
            github="https://github.com/aaryaa28"
            linkedin="https://www.linkedin.com/in/aarya-walve-10259325b/"
          />
          
        </StaggeredFadeIn>
      </FadeInOnScroll>

      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.3}
        threshold={0.3}
      >
        <h2 className="text-3xl text-center text-[rgb(64,206,171)] mt-20 mb-4 font-poppins font-medium">
          Special Thanks To
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-10 font-poppins">
          Contributors who helped with development
        </p>
      </RevealContainer>
      
      <StaggeredFadeIn 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto px-4 justify-items-center"
        childClassName=""
        staggerDelay={0.15}
        duration={0.8}
        direction="up"
        distance={30}
        threshold={0.1}
      >
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
      </StaggeredFadeIn>

      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8} 
        delay={0.3}
        threshold={0.3}
      >
        <h2 className="text-3xl text-center text-[rgb(64,206,171)] mt-20 mb-4 font-poppins font-medium">
          Beta Testers
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-10 font-poppins">
          Friends who helped us test the app
        </p>
      </RevealContainer>
      
      <StaggeredFadeIn 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto px-4 justify-items-center"
        childClassName=""
        staggerDelay={0.15}
        duration={0.8}
        direction="up"
        distance={30}
        threshold={0.1}
      >
        <BetaTesterCard 
            name="Aishwarya Mishra" 
            photo="/photos/aishwarya.jpg" 
            github="https://github.com/aishwaryamishraa"
        />
        <BetaTesterCard 
            name="Mandaar Pawar" 
            photo="/photos/mandaar.jpg" 
            github="https://github.com/Mandaar1009"
        />
        <BetaTesterCard 
            name="Prathamesh Rane" 
            photo="/photos/prathamesh.jpeg" 
            github="https://github.com/ORION-pax07"
        />
        <BetaTesterCard 
            name="Sairaj Pai" 
            photo="/photos/sairaj.png" 
            github="https://github.com/gegendepressed"
        />
        <BetaTesterCard 
            name="Vrishab Shenvi" 
            photo="/photos/vrishab.jpeg" 
            github="https://github.com/vrishab0105"
        />
        <BetaTesterCard 
            name="Zane Fernandes" 
            photo="/photos/zane.jpeg" 
            github="https://github.com/ZaneFerns360"
        />
      </StaggeredFadeIn>
    </div>
  );
}

function TeamMemberCard({ photo, name, github, linkedin }) {
  return (
    <motion.div 
      className="py-7 px-7 rounded-[20px] w-[300px] my-4 mx-auto md:mx-0 shadow-[0_10px_25px_rgba(19,156,111,0.284),0_15px_35px_rgba(236,72,154,0.403)] backdrop-blur-[10px] transition-all duration-300 relative overflow-hidden text-white text-center"
      whileHover={{
        y: -15,
        boxShadow: "0 15px 35px rgba(19,156,111,0.384), 0 20px 45px rgba(236,72,154,0.503)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
    </motion.div>
  );
}

function SpecialThanksCard({ photo, name, github, linkedin }) {
  return (
    <motion.div 
      className="py-5 px-5 rounded-[10px] my-5 mx-[10px] shadow-md text-center w-[220px] h-[320px] flex-shrink-0 dark:bg-[#2b2b2b] bg-white transition-all duration-300"
      whileHover={{
        y: -15,
        boxShadow: "0 15px 35px rgba(19,156,111,0.384), 0 20px 45px rgba(236,72,154,0.503)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
    </motion.div>
  );
}

function BetaTesterCard({ name, photo, github = "#" }) {
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <motion.div 
      className="py-5 px-5 rounded-[10px] my-5 mx-[10px] shadow-md text-center w-[220px] h-[280px] flex-shrink-0 dark:bg-[#2b2b2b] bg-white transition-all duration-300 flex flex-col"
      whileHover={{
        y: -15,
        boxShadow: "0 15px 35px rgba(19,156,111,0.384), 0 20px 45px rgba(236,72,154,0.503)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-[130px] h-[130px] mx-auto mb-5">
        <Image 
          src={photo} 
          alt={name} 
          fill
          className="rounded-full object-cover border-[3px] border-[#fefdfd] shadow-[0_0_15px_#fd49b8f1]"
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="text-center">
          <div className="text-xl font-bold dark:text-white text-black drop-shadow-[0_0_5px_#fd49b8f1] leading-tight">
            {firstName}
          </div>
          <div className="text-xl font-bold dark:text-white text-black drop-shadow-[0_0_5px_#fd49b8f1] leading-tight">
            {lastName}
          </div>
          {github && github !== "#" && (
            <Link 
              href={github} 
              target="_blank"
              className="block mt-2.5 text-base dark:text-[#07b8ed] text-[#1b88a9] no-underline dark:drop-shadow-[0_0_3px_#dcf7ff] drop-shadow-[0_0_3px_#56d5fc] hover:underline hover:text-[#9ccaca]"
            >
              GitHub Profile
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

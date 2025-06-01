"use client"

import Image from 'next/image'
import Link from 'next/link'
import RevealContainer from '../components/animations/RevealContainer'
import { REVEAL_ANIMATIONS } from '../components/animations/RevealContainer'
import FadeInOnScroll from '../components/animations/FadeInOnScroll'
import AnimatedSection from '../components/animations/AnimatedSection'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { motion } from 'framer-motion'
import { Zap, Shield, Smartphone, Cloud } from 'lucide-react'

// Create a simple AnimatedElement component since it's missing
const AnimatedElement = ({ children, animation, className, delay = 0 }) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration: 0.6 }
        };
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay, duration: 0.5 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration: 0.5 }
        };
    }
  };

  return (
    <motion.div 
      className={className}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

// Keep original features with their original background colors
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Transfer files at blazing speeds with our optimized protocols and global CDN network.",
    darkBgColor: "dark:bg-[#0c1510]",
    lightBgColor: "bg-green-50/80",
    iconBgColor: "dark:bg-[#0f1f17] bg-green-100",
    iconColor: "text-green-500",
    borderColor: "dark:border-green-900/30 border-green-300/50",
    titleColor: "dark:text-white text-gray-800",
    descriptionColor: "dark:text-gray-300/80 text-gray-600"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption ensures your files are protected throughout the entire transfer process.",
    darkBgColor: "dark:bg-[#130f17]",
    lightBgColor: "bg-purple-50/80",
    iconBgColor: "dark:bg-[#1a121e] bg-purple-100",
    iconColor: "text-purple-500",
    borderColor: "dark:border-purple-900/30 border-purple-300/50",
    titleColor: "dark:text-white text-gray-800",
    descriptionColor: "dark:text-gray-300/80 text-gray-600"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Works seamlessly across Windows, macOS, Linux, iOS, and Android devices.",
    darkBgColor: "dark:bg-[#0c1a17]",
    lightBgColor: "bg-teal-50/80",
    iconBgColor: "dark:bg-[#0f1f1c] bg-teal-100",
    iconColor: "text-teal-500",
    borderColor: "dark:border-teal-900/30 border-teal-300/50",
    titleColor: "dark:text-white text-gray-800",
    descriptionColor: "dark:text-gray-300/80 text-gray-600"
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Direct integration with popular cloud storage services like Google Drive, Dropbox, and OneDrive.",
    darkBgColor: "dark:bg-[#0c151a]",
    lightBgColor: "bg-blue-50/80",
    iconBgColor: "dark:bg-[#0f1a20] bg-blue-100",
    iconColor: "text-blue-500",
    borderColor: "dark:border-blue-900/30 border-blue-300/50",
    titleColor: "dark:text-white text-gray-800",
    descriptionColor: "dark:text-gray-300/80 text-gray-600"
  }
];

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen transition-colors">
        <div className="flex flex-col items-center justify-center">
          {/* Keep the existing intro section */}
          <div id="intro" className="px-10 py-10 text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-10 p-10 bg-gradient-to-r from-[#ec4899] via-[#10b981] to-[#ec4899] bg-clip-text text-transparent font-extrabold"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5, 
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                DataDash
              </motion.span>
            </motion.h1>
            
            <motion.h2 
              className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Share Files{" "}
              <motion.span
                className="bg-gradient-to-r from-[#ec4899] via-[#10b981] to-[#ec4899] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Instantly
              </motion.span>{" "}
              Across Any Platform
            </motion.h2>
            
            <motion.div
              className="mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.p
                id="desc"
                className="text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                The next-generation file sharing platform that revolutionizes how you transfer files. Lightning-fast,
                secure, and works without internet. Experience the future of file sharing today.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <hr className="h-px my-12 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

        <AnimatedSection 
          animation="slideUp" 
          className="features px-5 text-center mx-auto max-w-6xl"
        >
          <motion.h2 
            className="text-4xl text-[rgb(64,206,171)] mb-5 font-poppins font-light text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Features
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            DataDash combines cutting-edge technology with intuitive design to deliver the ultimate file sharing
            experience.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`h-full overflow-hidden rounded-xl border backdrop-blur-sm ${feature.borderColor} ${feature.darkBgColor} ${feature.lightBgColor} transition-all duration-300 shadow-sm hover:shadow-lg`}>
                  {/* Icon + Title section */}
                  <div className="flex flex-col items-start p-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-md ${feature.iconBgColor} mb-4`}>
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className={`text-xl font-semibold ${feature.titleColor} mb-2`}>{feature.title}</h3>
                  </div>
                  
                  {/* Description */}
                  <div className="px-6 pb-6">
                    <p className={`${feature.descriptionColor} leading-relaxed text-sm`}>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Keep remaining sections as they are */}
        <hr className="h-px my-12 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

        <FadeInOnScroll 
          direction="up" 
          className="download py-10 px-5 text-center mx-auto max-w-4xl"
          distance={50}
          threshold={0.2}
        >
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedElement animation="slideUp" className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Get{" "}
                <span className="bg-gradient-to-r from-[#10b981] via-[#10b981] to-[#ec4899] bg-clip-text text-transparent font-bold">DataDash</span>{" "}
                Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download DataDash for your preferred platform and start sharing files like never before.
              </p>
            </AnimatedElement>
           
            <RevealContainer 
              animationType={REVEAL_ANIMATIONS.ZOOM_IN} 
              duration={0.7} 
              delay={0.3}
              className="download-center flex justify-center"
              threshold={0.5}
            >
              <Link href="/download" className="btn">Visit Downloads Page</Link>
            </RevealContainer>
          </div>
        </FadeInOnScroll>

        <hr className="h-px my-12 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

        <AnimatedSection 
          animation="fadeIn" 
          className="testimonials py-10 px-5 text-center mx-auto max-w-6xl"
          duration={1.2}
        >
          <motion.h2 
            className="text-4xl text-[rgb(64,206,171)] mb-5 font-poppins font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Are Raving About
          </motion.h2>
          <TestimonialCarousel />
        </AnimatedSection>
      </main>
    </>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card dark:bg-dark-card bg-light-card p-5 rounded-[20px] w-[280px] h-[300px] m-[15px] shadow-feature backdrop-blur-md border border-white/10 transition-all duration-300 relative overflow-hidden text-white hover:translate-y-[-15px] hover:shadow-feature-hover">
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-primary opacity-10 -rotate-45 z-[-1]"></div>
      <h3 className="text-2xl mb-2.5 bg-gradient-primary bg-clip-text text-transparent font-bold">{title}</h3>
      <p className="font-poppins dark:text-white/80 text-black/80 leading-6 text-xl">{description}</p>
    </div>
  )
}
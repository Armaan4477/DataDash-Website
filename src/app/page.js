import Image from 'next/image'
import Link from 'next/link'
import RevealContainer from '../components/animations/RevealContainer'
import { REVEAL_ANIMATIONS } from '../components/animations/RevealContainer'
import FadeInOnScroll from '../components/animations/FadeInOnScroll'
import StaggeredFadeIn from '../components/animations/StaggeredFadeIn'
import AnimatedSection from '../components/animations/AnimatedSection'
import TestimonialCarousel from '../components/TestimonialCarousel'

export default function HomePage() {
  return (
    <main className="min-h-screen dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text transition-colors">
      <div>
        <div id="intro" className="px-10 py-10 text-center max-w-full">
          <RevealContainer 
            animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
            duration={0.8} 
            delay={0.2}
          >
            <h1 className="font-poppins text-[clamp(3rem,calc(2rem+4vw),4.5rem)] leading-tight bg-gradient-primary bg-clip-text text-transparent text-left my-[clamp(1rem,5vw,3rem)] p-0 break-words ml-0">
              DataDash
            </h1>
          </RevealContainer>
          
          <RevealContainer 
            animationType={REVEAL_ANIMATIONS.FADE} 
            duration={0.8} 
            delay={0.5}
          >
            <p id="tag" className="text-left font-poppins font-normal text-3xl dark:text-dark-text text-light-text mb-4">
              Effortless File Sharing Anywhere!
            </p>
          </RevealContainer>
          
          <FadeInOnScroll 
            direction="left" 
            duration={0.8} 
            delay={0.7}
          >
            <p id="desc" className="text-left font-poppins font-extralight text-3xl dark:text-dark-secondary-text text-light-secondary-text">
              DataDash lets you share media seamlessly across <br />Android, Windows, macOS and Linux —fast, secure,<br /> and internet-free over local networks!
            </p>
          </FadeInOnScroll>
          
          <RevealContainer 
            animationType={REVEAL_ANIMATIONS.ZOOM_IN} 
            duration={0.7} 
            delay={1.0}
            className="button-container flex justify-start items-center mt-5"
          >
            <Link href="/download" className="btn md:hidden">
              Visit Downloads
            </Link>
          </RevealContainer>
        </div>
      </div>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

      <AnimatedSection 
        animation="slideUp" 
        className="features px-5 text-center"
      >
        <h2 className="text-4xl text-[rgb(64,206,171)] mb-5 font-poppins font-light">Features</h2>
        <StaggeredFadeIn 
          className="features-list flex flex-wrap justify-center gap-7 p-5"
          childClassName="feature-card-wrapper"
          staggerDelay={0.15}
          duration={0.8}
          direction="up"
          distance={30}
        >
          <FeatureCard 
            title="Cross-Platform Support" 
            description="DataDash works seamlessly on multiple platforms, including Android, Windows, macOS and Linux."
          />
          <FeatureCard 
            title="Internet-Free & High-Speed Sharing" 
            description="Share files seamlessly over your local network—no internet required. Experience lightning-fast transfers using TCP."
          />
          <FeatureCard 
            title="Secure Transfers" 
            description="Keep your files safe and private with optional AES-256 encryption, ensuring every transfer is secure and protected."
          />
          <FeatureCard 
            title="Open Source" 
            description="Dive into our publicly available codebase, collaborate with other developers, and shape the future of DataDash on GitHub."
          />
        </StaggeredFadeIn>
      </AnimatedSection>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

      <FadeInOnScroll 
        direction="up" 
        className="download py-10 px-5"
        distance={50}
        threshold={0.2}
      >
        <h2 className="text-4xl text-[rgb(64,206,171)] mb-5 font-poppins font-light">Download DataDash</h2>
        <p className="text-xl dark:text-dark-text text-light-text mb-7 font-poppins font-light">
          Get the latest version of DataDash for your preferred operating system below.
        </p>
        <RevealContainer 
          animationType={REVEAL_ANIMATIONS.ZOOM_IN} 
          duration={0.7} 
          delay={0.3}
          className="download-center flex justify-center"
          threshold={0.5}
        >
          <Link href="/download" className="btn">Visit Downloads Page</Link>
        </RevealContainer>
      </FadeInOnScroll>

      <hr className="h-px my-8 bg-linear-to-r from-transparent via-primary-light/20 via-secondary/20 to-transparent border-0" />

      <AnimatedSection 
        animation="fadeIn" 
        className="testimonials py-10 px-5"
        duration={1.2}
      >
        <h2 className="text-4xl text-[rgb(64,206,171)] mb-5 font-poppins font-light">What Our Users Are Raving About</h2>
        <TestimonialCarousel />
      </AnimatedSection>
    </main>
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
'use client';

import { useEffect, useState, useRef } from 'react';
import RevealContainer from './animations/RevealContainer';
import { REVEAL_ANIMATIONS } from './animations/RevealContainer';

function TestimonialItem({ text, author }) {
  return (
    <div className="testimonial-item flex-none w-full p-8 mx-auto">
      <div className="dark:bg-dark-card bg-light-card rounded-[20px] p-8 shadow-xl relative border border-white/10 dark:border-white/5 backdrop-blur-sm transition-all duration-300">
        <div className="absolute top-6 left-6 text-6xl opacity-20 text-[#40ceab]">
          <i className="fas fa-quote-left"></i>
        </div>
        
        <p className="leading-relaxed text-center text-xl md:text-2xl dark:text-dark-text text-light-text mb-6 font-poppins font-light relative z-10">{text}</p>
        
        <div className="flex items-center justify-center">
          <div className="w-12 h-1 bg-gradient-primary rounded-full mb-2"></div>
        </div>
        
        <h4 className="text-2xl bg-gradient-primary bg-clip-text text-transparent mt-2 text-center font-medium">{author}</h4>
      </div>
    </div>
  )
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialList = useRef(null);
  const totalItems = 8;

  useEffect(() => {
    if (totalItems > 1) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalItems;
        setCurrentIndex(nextIndex);
        
        if (testimonialList.current) {
          testimonialList.current.style.transform = `translateX(-${nextIndex * 100}%)`;
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  const testimonials = [
    {
      text: "DataDash is a lifesaver! I can now transfer files between my Mac and Android phone without a hitch!",
      author: "Mandaar P."
    },
    {
      text: "DataDash is exactly what I needed for sharing files across different platforms.",
      author: "Zane F."
    },
    {
      text: "The best part is that it doesn't require internet! I can transfer files even when there is no internet connection.",
      author: "Amaan S."
    },
    {
      text: "I've worked on the app and it's been a great experience!",
      author: "Yash P."
    },
    {
      text: "The app is incredibly quick and responsive. File sharing works perfectly!",
      author: "Sushant P."
    },
    {
      text: "What an app! It's f***ing perfect!",
      author: "Ninad W."
    },
    {
      text: "Using this app made me realize how much time I was wasting uploading files to Google Drive just for cross-device sharing. This app is a lifesaver!",
      author: "Sairaj P."
    },
    {
      text: "Transferring the remaining data from my old phone to my new one was incredibly easy thanks to this app.",
      author: "Aishwarya M."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <RevealContainer 
        animationType={REVEAL_ANIMATIONS.SLIDE_UP} 
        duration={0.8}
        threshold={0.2}
        className="testimonial-carousel overflow-hidden relative w-full rounded-xl"
      >
        <div 
          ref={testimonialList}
          id="testimonial-list" 
          className="testimonial-list flex transition-transform duration-500 ease-in-out"
        >
          {testimonials.map((item, i) => (
            <TestimonialItem 
              key={i}
              text={item.text}
              author={item.author}
            />
          ))}
        </div>
        
        <div className="carousel-indicators flex justify-center mt-4 gap-2 pb-3">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`indicator-dot h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-gradient-to-r from-[#40ceab] to-[#019f92]' : ''
              }`}
              id={`testimonial-dot-${i}`}
            />
          ))}
        </div>
      </RevealContainer>
    </div>
  );
}

'use client'

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const toggleVisibility = () => {
      const footer = document.querySelector('footer');
      const footerHeight = footer ? footer.offsetHeight : 0;
      
      const adjustedDocHeight = document.documentElement.scrollHeight - footerHeight;
      const visibleHeight = window.innerHeight;
      const totalScrollableHeight = adjustedDocHeight - visibleHeight;

      const currentProgress = Math.min(window.scrollY / totalScrollableHeight, 1);
      setScrollProgress(currentProgress);
      
      setIsAtTop(window.scrollY <= 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', handleResize);
    
    toggleVisibility();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContent = () => {
    const scrollTarget = Math.min(
      document.documentElement.scrollHeight * 0.2,
      800
    );
    
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };

  if (pathname === '/contact' && !isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 60,
          damping: 12
        }}
      >
        <motion.button
          onClick={isAtTop ? scrollToContent : scrollToTop}
          aria-label={isAtTop ? "Scroll down" : "Scroll to top"}
          className={`relative p-3 rounded-full ${isAtTop ? 'bg-secondary' : 'bg-primary'} text-white shadow-lg hover:bg-blue-700 focus:outline-hidden`}
          whileHover={{ 
            scale: 1.15, 
            y: isAtTop ? 8 : -8,
            transition: { duration: 0.4 }
          }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Progress circle - only visible when not at top */}
          {!isAtTop && (
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-20"
                cx="50" 
                cy="50" 
                r="45" 
                fill="none"
                stroke="currentColor" 
                strokeWidth="10"
              />
              <motion.circle
                cx="50" 
                cy="50" 
                r="45" 
                fill="none"
                stroke="currentColor" 
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 * (1 - scrollProgress)}
                strokeLinecap="round"
              />
            </svg>
          )}
          
          {/* Show bounce animation when at top */}
          {isAtTop ? (
            <motion.div
              animate={{ 
                y: [0, 5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 1.5,
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <FaArrowDown size={20} />
            </motion.div>
          ) : (
            <FaArrowUp size={20} className="relative z-10" />
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

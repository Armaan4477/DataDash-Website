'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [previousActive, setPreviousActive] = useState(null);
  const [isHoveringAnyLink, setIsHoveringAnyLink] = useState(false);
  const hoverTimerRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isHovering) {
      hoverTimerRef.current = setInterval(() => {
        setHoverDuration(prev => {
          const newDuration = prev + 0.1;
          
          if (newDuration >= 5 && !isSpinning) {
            setIsSpinning(true);
          }

          if (newDuration >= 5) {
            const newSpeed = (newDuration - 5) * 0.5;
            setSpinSpeed(newSpeed);
          }
          
          return newDuration;
        });
      }, 100);
    } else {
      clearInterval(hoverTimerRef.current);
      setHoverDuration(0);
      setIsSpinning(false);
      setSpinSpeed(0);
    }
    
    return () => {
      clearInterval(hoverTimerRef.current);
    };
  }, [isHovering]);

  useEffect(() => {
    navLinks.forEach(link => {
      if (isActive(link.path)) {
        setPreviousActive(link.path);
      }
    });
  }, [pathname]);

  const getSpinStyle = () => {
    if (!isSpinning) return {};
    const spinDuration = Math.max(0.2, 5 / (1 + spinSpeed));
    
    return {
      animation: `spin ${spinDuration}s linear infinite`,
    };
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Feedback', path: '/feedback' }
  ];
  
  const isActive = (path) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    
    if (path === '/projects') {
      return pathname === '/projects' || pathname.startsWith('/demos');
    }
    
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleNavSectionMouseEnter = () => {
    setIsHoveringAnyLink(true);
  };
  
  const handleNavSectionMouseLeave = () => {
    setIsHoveringAnyLink(false);
    setHoveredLink(null);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .gradient-text {
          background: linear-gradient(47deg, #10b981, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        
        .nav-link {
          font-size: 25px;
          font-weight: 600;
          padding: 7px 9px;
          margin: 1px 47px;
          transition: background-color 0.3s ease;
          font-family: "Poppins", serif;
        }
        
        .nav-link.active {
          font-weight: 800;
          text-shadow: 0 0 1px rgba(236, 72, 153, 0.3);
        }
        
        .nav-link:hover {
          background-color: #cbc9c9;
        }
        
        .hamburger-line {
          display: block;
          width: 25px;
          height: 3px;
          background: linear-gradient(47deg, #10b981, #ec4899);
          transition: all 0.3s ease;
        }
        
        @media screen and (max-width: 768px) {
          .mobile-menu.active {
            right: 0;
          }
          
          .hamburger.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          
          .hamburger.active .hamburger-line:nth-child(2) {
            opacity: 0;
          }
          
          .hamburger.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
          }
        }
      `}</style>
      
      <nav className="fixed top-0 left-0 w-full h-[60px] dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text shadow-xs z-[1000] transition-colors">
        <div className="container mx-auto px-5 h-full">
          <div className="flex justify-between items-center h-full">
            <Link 
              href="/" 
              className="flex items-center group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <Image
                  src="/photos/logo.png"
                  alt="Personal Icon"
                  width={30}
                  height={30}
                  className={`mr-2 rounded-full transition-transform duration-300 ${!isSpinning ? 'group-hover:scale-105' : ''}`}
                  style={getSpinStyle()}
                />
                <span 
                  className="text-[18px] font-bold text-[#0ca699] hover:scale-105 transition-transform duration-300 font-[Poppins]"
                  style={{ lineHeight: '60px' }}
                >
                  DataDash
                  {isSpinning && <span className="text-xs ml-1">🌀</span>}
                </span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <div 
              className="hidden md:flex items-center space-x-4 justify-end flex-1 mx-5"
              onMouseEnter={handleNavSectionMouseEnter}
              onMouseLeave={handleNavSectionMouseLeave}
            >
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path} 
                  className="relative"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                  onHoverStart={() => setHoveredLink(link.path)}
                >
                  <Link 
                    href={link.path}
                    className={`gradient-text nav-link ${
                      isActive(link.path) ? 'active' : ''
                    }`}
                  >
                    {link.name}
                    
                    {/* Shared hover indicator across all nav links */}
                    {isHoveringAnyLink && hoveredLink === link.path && !isActive(link.path) && (
                      <motion.div 
                        layoutId="hoverIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-pink-500 rounded-full"
                        initial={false}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    {/* Active indicator */}
                    <AnimatePresence mode="wait">
                      {isActive(link.path) && (
                        <motion.div 
                          key={`active-${link.path}`}
                          className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-pink-500 rounded-full"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: '100%', opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                      
                      {/* Previously active indicator with exit animation */}
                      {previousActive === link.path && !isActive(link.path) && (
                        <motion.div 
                          key={`previous-${link.path}`}
                          className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-pink-500 rounded-full"
                          initial={{ width: '100%', opacity: 1 }}
                          animate={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          onAnimationComplete={() => {
                            if (previousActive === link.path && !isActive(link.path)) {
                              setPreviousActive(null);
                            }
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>
            
            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex flex-col ml-4 gap-[6px] cursor-pointer z-[1001] hamburger ${isMenuOpen ? 'active' : ''}`}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden fixed top-0 right-0 h-screen w-[70%] dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text py-20 px-8 z-[1000] shadow-lg mobile-menu active"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-6 pt-6">
                {navLinks.map((link) => (
                  <div key={link.path} className="relative">
                    <Link 
                      href={link.path}
                      className={`gradient-text text-[1.5rem] py-4 block ${
                        isActive(link.path) ? 'font-bold' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.name}
                      </motion.span>
                      
                      {/* Active indicator for mobile menu */}
                      {isActive(link.path) && (
                        <motion.div 
                          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-pink-500"
                          initial={{ width: 0 }}
                          animate={{ width: '30%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Add spacing to prevent content from being hidden behind fixed navbar */}
      <div className="h-[60px]"></div>
    </>
  );
}

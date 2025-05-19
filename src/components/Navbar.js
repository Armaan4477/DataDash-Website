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
  const hoverTimerRef = useRef(null);
  
  useEffect(() => {
    // Add small delay before showing navbar items to ensure they animate
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

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <nav className="bg-white dark:bg-gray-800 shadow-xs sticky top-0 z-10 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
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
              >
                <Image
                  src="/photos/logo.png"
                  alt="Personal Icon"
                  width={32}
                  height={32}
                  className={`mr-2 transition-transform duration-300 ${!isSpinning ? 'group-hover:rotate-6 group-hover:scale-110' : ''}`}
                  style={getSpinStyle()}
                />
              </motion.div>
              <motion.span 
                className={`text-xl font-bold text-primary dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                DataDash
                {isSpinning && <span className="text-xs ml-1">🌀</span>}
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path} 
                  className="relative group"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    href={link.path}
                    className={`${
                      isActive(link.path) 
                        ? 'text-primary dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400'
                    } transition-colors py-2`}
                  >
                    {link.name}
                  </Link>
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-300 ease-out
                      ${isActive(link.path) ? 'bg-primary dark:bg-blue-400 scale-x-100' : 'bg-primary dark:bg-blue-400 group-hover:scale-x-100'}`}
                  ></div>
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
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 ml-4 focus:outline-hidden"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.path} className="relative group">
                    <Link 
                      href={link.path}
                      className={`${
                        isActive(link.path) 
                          ? 'text-primary dark:text-blue-400 font-medium' 
                          : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400'
                      } transition-colors block px-2 py-1`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <div 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ease-out
                        ${isActive(link.path) ? 'bg-primary dark:bg-blue-400 scale-x-100' : 'bg-primary dark:bg-blue-400 scale-x-0 group-hover:scale-x-100'}`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

'use client'

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !theme) {
    return <div className="p-2 h-10 w-10"></div>;
  }

  const iconVariants = {
    initial: { y: -20, opacity: 0, rotate: -90 },
    animate: { y: 0, opacity: 1, rotate: 0 },
    exit: { y: 20, opacity: 0, rotate: 90 },
    hover: {
      y: [0, -3, 0, -3, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        y: { repeat: Infinity, duration: 1.5, repeatType: "loop" },
        rotate: { repeat: Infinity, duration: 1.5, repeatType: "loop" }
      }
    }
  };
  
  return (
    <motion.button 
      onClick={toggleTheme}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial="initial"
          animate={isHovering ? ["animate", "hover"] : "animate"}
          exit="exit"
          variants={iconVariants}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            <FaMoon className="text-gray-700 text-lg" />
          ) : (
            <FaSun className="text-yellow-400 text-lg" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

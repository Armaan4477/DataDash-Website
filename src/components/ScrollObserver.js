'use client'

import { createContext, useState, useEffect, useContext } from 'react';

export const ScrollContext = createContext({
  scrollY: 0,
  scrollYProgress: 0,
  scrollDirection: 'down',
});

export const ScrollObserver = ({ children }) => {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollYProgress: 0,
    scrollDirection: 'down',
  });
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = lastScrollY < currentScrollY ? 'down' : 'up';
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(currentScrollY / totalHeight, 0), 1);

      setScrollData({
        scrollY: currentScrollY,
        scrollYProgress: progress,
        scrollDirection: direction,
      });
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

export default ScrollObserver;

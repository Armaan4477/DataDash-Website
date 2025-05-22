'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -75 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 75 },
    visible: { opacity: 1, x: 0 }
  }
};

export default function AnimatedSection({ 
  children, 
  className = '',
  animation = 'fadeIn',
  duration = 0.9,
  delay = 0,
  margin = "0px 0px -15% 0px",
  amount = 0.1,
  once = true,
  ...props 
}) {
  const { ref, isInView } = useScrollAnimation({
    once,
    margin,
    amount
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{ 
        duration, 
        delay,
        type: "spring",
        stiffness: 35,
        damping: 15
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

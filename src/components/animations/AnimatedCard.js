'use client'

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function AnimatedCard({ 
  children, 
  className = '',
  index = 0, 
  staggerDelay = 0.05,
  duration = 0.12,
  distance = 30,
  margin = "0px 0px 0px 0px",
  amount = 0.05,
  once = true,
  ...props 
}) {
  const { ref, isInView } = useScrollAnimation({
    once,
    margin,
    amount,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView 
        ? { opacity: 1, y: 0 } 
        : { opacity: 0, y: distance }
      }
      transition={{ 
        duration, 
        delay: index * staggerDelay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

'use client'

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FadeInOnScroll({ 
  children, 
  className = '', 
  duration = 0.8,
  delay = 0, 
  direction = null, 
  distance = 70,
  threshold = 0.1,
  margin = '0px 0px -150px 0px',
  once = true,
  ...props 
}) {
  const { ref, isInView } = useScrollAnimation({
    once,
    margin,
    amount: threshold
  });
  
  // Set initial animation values based on direction
  let initial = { opacity: 0 };
  if (direction === 'up') initial.y = distance;
  else if (direction === 'down') initial.y = -distance;
  else if (direction === 'left') initial.x = distance;
  else if (direction === 'right') initial.x = -distance;
  
  // Reset position when in view
  let animate = { opacity: 1 };
  if (direction === 'up' || direction === 'down') animate.y = 0;
  else if (direction === 'left' || direction === 'right') animate.x = 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 40,
        damping: 15
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

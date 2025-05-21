'use client'

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function StaggeredFadeIn({
  children,
  className = '',
  childClassName = '',
  staggerDelay = 0.15,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  threshold = 0.1,
  margin = '0px 0px -150px 0px',
  once = true
}) {
  const { ref, isInView } = useScrollAnimation({
    once,
    margin,
    amount: threshold
  });
  
  const childrenArray = Array.isArray(children) ? children : [children];
  
  let initialY = 0, initialX = 0;
  if (direction === 'up') initialY = distance;
  else if (direction === 'down') initialY = -distance;
  else if (direction === 'left') initialX = distance;
  else if (direction === 'right') initialX = -distance;
  
  const childVariants = {
    hidden: { 
      opacity: 0,
      y: initialY,
      x: initialX
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: i * staggerDelay,
        duration: duration,
        type: "spring",
        stiffness: 40,
        damping: 15
      }
    })
  };

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, i) => (
        <motion.div
          key={i}
          className={childClassName}
          custom={i}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={childVariants}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

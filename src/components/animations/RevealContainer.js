'use client'

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const REVEAL_ANIMATIONS = {
  FADE: 'fade',
  SLIDE_UP: 'slideUp',
  SLIDE_DOWN: 'slideDown',
  SLIDE_LEFT: 'slideLeft',
  SLIDE_RIGHT: 'slideRight',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  ROTATE: 'rotate',
};

const variants = {
  [REVEAL_ANIMATIONS.FADE]: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  [REVEAL_ANIMATIONS.SLIDE_UP]: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  },
  [REVEAL_ANIMATIONS.SLIDE_DOWN]: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
  },
  [REVEAL_ANIMATIONS.SLIDE_LEFT]: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  },
  [REVEAL_ANIMATIONS.SLIDE_RIGHT]: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  },
  [REVEAL_ANIMATIONS.ZOOM_IN]: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 }
  },
  [REVEAL_ANIMATIONS.ZOOM_OUT]: {
    hidden: { opacity: 0, scale: 1.3 },
    visible: { opacity: 1, scale: 1 }
  },
  [REVEAL_ANIMATIONS.ROTATE]: {
    hidden: { opacity: 0, rotate: -20 },
    visible: { opacity: 1, rotate: 0 }
  },
};

export default function RevealContainer({
  children,
  className = '',
  animationType = REVEAL_ANIMATIONS.FADE,
  duration = 1.0,
  delay = 0,
  margin = '0px 0px -150px 0px',
  threshold = 0.1,
  once = true,
  ...props
}) {
  const { ref, isInView } = useScrollAnimation({
    once,
    margin,
    amount: threshold
  });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[animationType]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 35,
        damping: 12
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { REVEAL_ANIMATIONS };

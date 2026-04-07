import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  activeKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, activeKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        initial={{
          opacity: 0,
          y: 12,
          filter: 'blur(4px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          filter: 'blur(4px)',
          transition: {
            duration: 0.25,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

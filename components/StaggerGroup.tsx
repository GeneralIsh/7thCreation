'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child in seconds */
  stagger?: number;
  /** Initial delay before the group starts */
  delay?: number;
  threshold?: number;
}

const container = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  threshold = 0.1,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={container(stagger, delay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

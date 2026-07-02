'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Direction the element enters from */
  from?: 'bottom' | 'left' | 'right' | 'none';
  /** Custom className */
  className?: string;
  /** Amount of element visible before triggering (0–1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
}

const VARIANTS: Record<string, Variants> = {
  bottom: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function FadeIn({
  children,
  delay = 0,
  from = 'bottom',
  className,
  threshold = 0.15,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[from]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.55, ease: 'easeOut' as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

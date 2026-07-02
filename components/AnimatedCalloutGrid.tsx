'use client';

import { motion } from 'framer-motion';
import StaggerGroup, { staggerItem } from '@/components/StaggerGroup';

const CALLOUTS = [
  {
    label: 'Rush Production',
    body: "Tight deadlines are our normal. We're set up for same-day and next-day turnarounds on select print types.",
  },
  {
    label: 'High-Volume Runs',
    body: 'From 10 pieces to 10,000 — consistent color, clean finishing, and production-ready output at scale.',
  },
  {
    label: 'Complex Installs',
    body: 'Multi-day, high-access, multi-location. We coordinate the install like a production, not an afterthought.',
  },
];

export default function AnimatedCalloutGrid() {
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-line-dark bg-gray/20">
      {CALLOUTS.map(({ label, body }) => (
        <motion.div key={label} variants={staggerItem} className="bg-charcoal p-6 lg:p-10">
          <h3 className="font-heading font-extrabold text-cream text-lg tracking-tight mb-3">{label}</h3>
          <p className="text-coolgray text-sm leading-relaxed">{body}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

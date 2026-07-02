'use client';

import { motion } from 'framer-motion';
import StaggerGroup, { staggerItem } from '@/components/StaggerGroup';

const PROCESS = [
  {
    step: '01',
    title: 'Brief & Scope',
    body: 'You send us the project details — size, quantity, substrate, location, deadline. We ask the right questions upfront so nothing gets missed.',
  },
  {
    step: '02',
    title: 'Quote & Approval',
    body: 'We turn around a detailed quote with line items, material specs, and timeline. No vague estimates. You approve, we move.',
  },
  {
    step: '03',
    title: 'Production',
    body: 'Files go into production. We handle prepress, color matching, substrate prep, printing, lamination, cutting, and finishing in-house.',
  },
  {
    step: '04',
    title: "Install & Complete",
    body: "We show up on-site, execute the install, and don't leave until it's done right. Site checks, high-access work, and removal included when needed.",
  },
];

export default function AnimatedProcessGrid() {
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-line-dark bg-charcoal">
      {PROCESS.map(({ step, title, body }) => (
        <motion.div key={step} variants={staggerItem} className="bg-dark p-6 lg:p-8">
          <p className="font-heading font-extrabold text-blue text-4xl tracking-tighter mb-4 leading-none">
            {step}
          </p>
          <h3 className="font-heading font-extrabold text-cream text-lg tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-coolgray text-sm leading-relaxed">{body}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

'use client';

import { motion } from 'framer-motion';
import StaggerGroup, { staggerItem } from '@/components/StaggerGroup';
import FadeIn from '@/components/FadeIn';
import type { SERVICES } from '@/data/projects';

type Service = (typeof SERVICES)[number];

interface Props {
  primary: Service[];
  secondary: Service[];
}

export default function AnimatedServiceGrid({ primary, secondary }: Props) {
  return (
    <>
      {/* Desktop: staggered grid */}
      <StaggerGroup className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal mb-1.5">
        {primary.map((service) => (
          <motion.div key={service.title} variants={staggerItem} className="bg-cream p-5 lg:p-10 flex flex-col">
            <h2 className="font-heading font-extrabold text-dark text-xl lg:text-2xl tracking-tight mb-4">
              {service.title}
            </h2>
            <p className="text-gray text-sm leading-relaxed flex-1">
              {service.description}
            </p>
          </motion.div>
        ))}
      </StaggerGroup>

      {/* Installation — full width */}
      {secondary.map((service) => (
        <FadeIn key={service.title} from="bottom">
          <div className="hidden sm:block bg-navy p-5 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              <div className="lg:w-1/3 mb-4 lg:mb-0">
                <span className="inline-block text-xs font-bold text-lightblue uppercase tracking-widest mb-2">
                  Add-On Service
                </span>
                <h2 className="font-heading font-extrabold text-cream text-xl lg:text-2xl tracking-tight">
                  {service.title}
                </h2>
              </div>
              <p className="text-coolgray text-sm leading-relaxed lg:w-2/3">
                {service.description}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}
    </>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import StaggerGroup, { staggerItem } from '@/components/StaggerGroup';
import FadeIn from '@/components/FadeIn';
import { CLIENTS } from '@/data/projects';

const CAPABILITIES = [
  {
    label: 'Large-Format Print',
    detail: 'Banners, decals, rigid panels, fabric, and specialty substrates — production-ready output at any scale.',
  },
  {
    label: 'Vehicle Graphics',
    detail: 'Full wraps, partial wraps, fleet decals, and transit layouts. Precision panel alignment and on-vehicle application.',
  },
  {
    label: 'Environmental Graphics',
    detail: 'Wall graphics, window vinyl, frosted film, floor decals, and full interior/exterior branded environments.',
  },
  {
    label: 'Exhibition Displays',
    detail: 'Trade show graphics, event displays, sponsor walls, branded arches, backdrops, and activation graphics.',
  },
  {
    label: 'DTF & Apparel',
    detail: 'Direct-to-film transfers, apparel decoration, branded kits, and short-run merch production.',
  },
  {
    label: 'Site Installation',
    detail: 'High-access installs, event installs, site checks, measurements, removal, and rush production support.',
  },
];

const STATS = [
  { value: 'Oakland, CA', label: 'Based at 95 Linden St' },
  { value: 'Bay Area +', label: 'Regional & travel installs' },
  { value: 'Turnkey', label: 'Files to finished install' },
  { value: 'Rush-Ready', label: 'Same-day & next-day capable' },
];

const CLIENTS_WORKED = [
  'Chase Center',
  'Marriott Oakland City Center',
  'Gap Inc.',
  'Eventbrite',
  'PrizePicks',
];

const ECOSYSTEM = [
  { name: 'Namdah Studios', desc: 'Culture-led experiential media & creative production' },
  { name: 'UnionIsh', desc: 'Union labor operations and crew workflow systems' },
  { name: 'Interior Bond', desc: 'Parent creative ecosystem — design, media, and systems' },
];

export function StatsBar() {
  return (
    <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-line-dark bg-gray/30">
      {STATS.map(({ value, label }) => (
        <motion.div key={label} variants={staggerItem} className="bg-charcoal px-6 py-8 lg:px-10">
          <p className="font-heading font-extrabold text-lightblue text-2xl lg:text-3xl tracking-tight mb-1">
            {value}
          </p>
          <p className="text-coolgray text-xs uppercase tracking-widest font-semibold">{label}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

export function CapabilitiesGrid() {
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal">
      {CAPABILITIES.map(({ label, detail }) => (
        <motion.div key={label} variants={staggerItem} className="bg-cream p-6 lg:p-10">
          <h3 className="font-heading font-extrabold text-dark text-xl tracking-tight mb-3">{label}</h3>
          <p className="text-gray text-sm leading-relaxed">{detail}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

export function ClientsWorkedList() {
  return (
    <ul className="flex flex-wrap gap-2">
      {CLIENTS_WORKED.map((c) => (
        <li key={c} className="px-3 py-1.5 border border-charcoal text-coolgray text-xs font-semibold uppercase tracking-wide">
          {c}
        </li>
      ))}
    </ul>
  );
}

export function ClientLogoStrip() {
  return (
    <StaggerGroup className="flex flex-wrap items-center justify-center gap-8 lg:gap-12" stagger={0.06}>
      {CLIENTS.map(({ name, logo, h }) => (
        <motion.div key={name} variants={staggerItem} className="opacity-60 hover:opacity-100 transition-opacity">
          <Image
            src={logo}
            alt={name}
            width={120}
            height={h}
            className="object-contain"
            style={{ height: `${h}px`, width: 'auto' }}
          />
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

export function EcosystemLinks() {
  return (
    <StaggerGroup className="flex flex-col gap-3" delay={0.1}>
      {ECOSYSTEM.map(({ name, desc }) => (
        <motion.div key={name} variants={staggerItem} className="border border-blue/40 p-4 lg:p-5">
          <p className="font-heading font-extrabold text-cream text-sm tracking-tight mb-1">{name}</p>
          <p className="text-coolgray text-xs leading-relaxed">{desc}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}

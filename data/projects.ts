export interface Project {
  slug: string;
  category: string;
  tag: 'exhibition' | 'environmental' | 'retail' | 'vehicle' | 'print' | 'apparel';
  title: string;
  scope: string;
  production: string;
  note?: string;
  /** Paths relative to /public, e.g. /images/work/airport-launch.jpg */
  images: string[];
}

export const projects: Project[] = [
  {
    slug: 'airport-launch-graphics',
    category: 'Exhibition & Event Graphics',
    tag: 'exhibition',
    title: 'Airport Route Launch — SFO',
    scope: 'Branded gate arch, retractable banner display, and event-ready installation for an international airline route launch at San Francisco International Airport.',
    production: 'Large-format print on rigid substrate, full wraparound arch panels with branded gradient, retractable banner system, and on-site event installation at SFO.',
    images: [],
  },
  {
    slug: 'creator-space-graphics-system',
    category: 'Environmental Graphics + Window Vinyl + Exterior Panels',
    tag: 'environmental',
    title: 'Creator Space Graphics System',
    scope: 'Exterior graphic panels, translucent window vinyl, opaque interior glass decals, floor graphics, cornhole decals, and ping-pong logo decals.',
    production: 'Large-format print, panel production, die-cut vinyl, transfer masking, and on-site installation.',
    note: 'Die-cut vinyl, not dye cut.',
    images: [],
  },
  {
    slug: 'hotel-lobby-welcome-graphics',
    category: 'Hospitality Graphics',
    tag: 'exhibition',
    title: 'Hotel Lobby Welcome Graphics',
    scope: 'Large-format balcony graphics produced and installed for a hospitality event environment.',
    production: 'Large-format print, panel mounting, and on-site install at venue.',
    images: [],
  },
  {
    slug: 'retail-window-takeover',
    category: 'Retail Storefront Graphics',
    tag: 'retail',
    title: 'Retail Window Takeover',
    scope: 'High-visibility storefront graphics and window branding for street-level retail.',
    production: 'Cut vinyl, window film application, and on-site install.',
    images: [],
  },
  {
    slug: 'vehicle-transit-graphics',
    category: 'Vehicle & Fleet Graphics',
    tag: 'vehicle',
    title: 'Vehicle & Fleet Wraps',
    scope: 'Full and partial vehicle wraps for commercial fleets, food businesses, and brand activations — Sprinter vans, box trucks, and cargo vehicles.',
    production: 'Large-format vinyl wrap production, panel layout, contour cutting, lamination, and on-vehicle application.',
    images: [
      '/images/work/vehicle-wraps/ms-joy-real.jpg',
      '/images/work/vehicle-wraps/dickeys-bbq-truck.jpg',
      '/images/work/vehicle-wraps/strava-van.jpg',
      '/images/work/vehicle-wraps/ms-joy-mockup.jpg',
    ],
  },
  {
    slug: 'label-production',
    category: 'Product Labels & Print Production',
    tag: 'print',
    title: 'Label Production',
    scope: 'High-volume printed labels with consistent color and production-ready finishing.',
    production: 'Large-format print, color-matched output, and finishing for product application.',
    images: [],
  },
  {
    slug: 'branded-kits-apparel',
    category: 'Branded Kits & Apparel',
    tag: 'apparel',
    title: 'Branded Kits & Apparel',
    scope: 'Custom packaging, apparel, labels, decals, and promotional print pieces.',
    production: 'DTF transfer, apparel decoration, and short-run packaging production.',
    images: [],
  },
];

export const FILTER_TAGS = [
  { value: 'all',         label: 'All work' },
  { value: 'exhibition',  label: 'Exhibition' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'retail',      label: 'Retail' },
  { value: 'vehicle',     label: 'Vehicle' },
  { value: 'print',       label: 'Print' },
  { value: 'apparel',     label: 'Apparel' },
] as const;

export const CLIENTS: { name: string; logo: string; h: number; darkBg?: boolean }[] = [
  { name: 'Gap Inc.',                     logo: '/images/clients/gap.svg',           h: 20 },
  { name: 'Eventbrite',                   logo: '/images/clients/eventbrite.webp',   h: 26 },
  { name: 'PrizePicks',                   logo: '/images/clients/prizepicks.png',    h: 26, darkBg: true },
  { name: 'Dropworks',                    logo: '/images/clients/dropworks.webp',    h: 14 },
  { name: 'Sparks',                       logo: '/images/clients/sparks.webp',       h: 50 },
  { name: 'Marriott Oakland City Center', logo: '/images/clients/marriott.png',      h: 30 },
  { name: 'ImageTech',                    logo: '/images/clients/imagetech.webp',    h: 30 },
  { name: 'The City Eats',               logo: '/images/clients/city-eats.webp',    h: 76 },
  { name: 'Chase Center',                 logo: '/images/clients/chase-center.webp', h: 16 },
];

export const SERVICES = [
  {
    title: 'Exhibition & Experiential Display Graphics',
    description: 'Trade show graphics, event displays, sponsor walls, branded arches, backdrops, banners, activation graphics, and display-ready print production.',
  },
  {
    title: 'Environmental Graphics',
    description: 'Wall graphics, window vinyl, frosted graphics, floor decals, office branding, venue graphics, and branded interior/exterior applications.',
  },
  {
    title: 'Large-Format Print Production',
    description: 'Banners, posters, rigid signs, mounted graphics, decals, labels, gatorboard, foamcore, PVC, acrylic, fabric, and specialty substrates.',
  },
  {
    title: 'Retail & Storefront Graphics',
    description: 'Window takeovers, promotional graphics, launch signage, barricade graphics, decals, and street-facing brand visibility.',
  },
  {
    title: 'Vehicle, Fleet & Transit Graphics',
    description: 'Vehicle wraps, partial wraps, fleet decals, transit graphics, and production-ready vehicle layouts.',
  },
  {
    title: 'Apparel, DTF & Custom Print',
    description: 'DTF transfers, apparel graphics, custom merch, branded kits, labels, stickers, and short-run production.',
  },
  {
    title: 'Installation & Site Services',
    description: 'Site checks, measurements, graphic installs, high-access install support, event installs, removal, and rush production support.',
    secondary: true,
  },
];

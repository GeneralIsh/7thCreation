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
    title: 'Airport Launch Graphics',
    scope: 'Branded arch, launch signage, banner display, and event-ready installation.',
    production: 'Large-format print, frame-mounted graphics, and on-site event installation.',
    images: [
      '/images/work/airport-launch.jpg',
      '/images/work/airport-launch-1.jpg',
      '/images/work/airport-launch-2.jpg',
    ],
  },
  {
    slug: 'creator-space-graphics-system',
    category: 'Environmental Graphics + Window Vinyl + Exterior Panels',
    tag: 'environmental',
    title: 'Creator Space Graphics System',
    scope: 'Exterior graphic panels, translucent window vinyl, opaque interior glass decals, floor graphics, cornhole decals, and ping-pong logo decals.',
    production: 'Large-format print, panel production, die-cut vinyl, transfer masking, and on-site installation.',
    note: 'Die-cut vinyl, not dye cut.',
    images: [
      '/images/work/creator-space.jpg',
      '/images/work/creator-space-1.jpg',
      '/images/work/creator-space-2.jpg',
    ],
  },
  {
    slug: 'hotel-lobby-welcome-graphics',
    category: 'Hospitality Graphics',
    tag: 'exhibition',
    title: 'Hotel Lobby Welcome Graphics',
    scope: 'Large-format balcony graphics produced and installed for a hospitality event environment.',
    production: 'Large-format print, panel mounting, and on-site install at venue.',
    images: [
      '/images/work/hotel-lobby.jpg',
      '/images/work/hotel-lobby-1.jpg',
      '/images/work/hotel-lobby-2.jpg',
    ],
  },
  {
    slug: 'retail-window-takeover',
    category: 'Retail Storefront Graphics',
    tag: 'retail',
    title: 'Retail Window Takeover',
    scope: 'High-visibility storefront graphics and window branding for street-level retail.',
    production: 'Cut vinyl, window film application, and on-site install.',
    images: [
      '/images/work/retail-window.jpg',
      '/images/work/retail-window-1.jpg',
      '/images/work/retail-window-2.jpg',
    ],
  },
  {
    slug: 'vehicle-transit-graphics',
    category: 'Vehicle & Transit Graphics',
    tag: 'vehicle',
    title: 'Vehicle & Transit Graphics',
    scope: 'Vehicle wraps, transit graphics, and mobile brand visibility.',
    production: 'Vinyl wrap production, panel layout, and vehicle install.',
    images: [
      '/images/work/vehicle-transit.jpg',
      '/images/work/vehicle-transit-1.jpg',
      '/images/work/vehicle-transit-2.jpg',
    ],
  },
  {
    slug: 'label-production',
    category: 'Product Labels & Print Production',
    tag: 'print',
    title: 'Label Production',
    scope: 'High-volume printed labels with consistent color and production-ready finishing.',
    production: 'Large-format print, color-matched output, and finishing for product application.',
    images: [
      '/images/work/label-production.jpg',
      '/images/work/label-production-1.jpg',
      '/images/work/label-production-2.jpg',
    ],
  },
  {
    slug: 'branded-kits-apparel',
    category: 'Branded Kits & Apparel',
    tag: 'apparel',
    title: 'Branded Kits & Apparel',
    scope: 'Custom packaging, apparel, labels, decals, and promotional print pieces.',
    production: 'DTF transfer, apparel decoration, and short-run packaging production.',
    images: [
      '/images/work/branded-kits.jpg',
      '/images/work/branded-kits-1.jpg',
      '/images/work/branded-kits-2.jpg',
    ],
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
  { name: 'Sparks',                       logo: '/images/clients/sparks.webp',       h: 40 },
  { name: 'Marriott Oakland City Center', logo: '/images/clients/marriott.png',      h: 30 },
  { name: 'ImageTech',                    logo: '/images/clients/imagetech.webp',    h: 30 },
  { name: 'The City Eats',               logo: '/images/clients/city-eats.webp',    h: 64 },
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

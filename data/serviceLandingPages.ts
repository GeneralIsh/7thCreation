export interface ServiceLandingPage {
  slug: string;
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bestFor: string[];
  capabilities: string[];
  process: string[];
  faq: { question: string; answer: string }[];
}

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: 'large-format-printing-oakland',
    title: 'Large-Format Printing Oakland',
    eyebrow: 'Oakland Large-Format Print Production',
    metaTitle: 'Large-Format Printing Oakland, CA',
    metaDescription:
      'Large-format printing in Oakland for banners, posters, rigid signs, decals, mounted graphics, event displays, and installation-ready production.',
    h1: 'Large-format printing in Oakland, built for real spaces.',
    intro:
      '7th Creation Studio produces large-format graphics for brands, venues, agencies, event teams, and local businesses that need clean output, dependable finishing, and fast handoff to install.',
    bestFor: [
      'Banners, posters, mounted graphics, decals, and labels',
      'Rigid signs, foamcore, PVC, acrylic, gatorboard, and specialty substrates',
      'Rush production and high-volume print runs',
      'Graphics that need to be finished, packed, and install-ready',
    ],
    capabilities: [
      'File setup and production checks before print',
      'Color-conscious wide-format output',
      'Mounting, trimming, contour cutting, and finishing',
      'Local Oakland and Bay Area production support',
    ],
    process: [
      'Send artwork, sizes, material notes, and deadline.',
      'We confirm specs, substrate, finishing, and install needs.',
      'Production is scheduled, finished, packed, and handed off cleanly.',
    ],
    faq: [
      {
        question: 'Can you handle rush large-format print jobs?',
        answer:
          'Yes. Same-day and next-day turnaround may be available depending on material, quantity, finishing, and current production load.',
      },
      {
        question: 'Do you only print, or can you help install?',
        answer:
          'We can produce and install many projects, including event graphics, wall graphics, window graphics, displays, and venue signage.',
      },
    ],
  },
  {
    slug: 'event-graphics-bay-area',
    title: 'Event Graphics Bay Area',
    eyebrow: 'Event & Experiential Graphics',
    metaTitle: 'Event Graphics Bay Area | Exhibition Displays & Installs',
    metaDescription:
      'Bay Area event graphics production for trade shows, sponsor walls, branded arches, banners, displays, hotel activations, and on-site installs.',
    h1: 'Event graphics for launches, venues, and branded activations.',
    intro:
      'We build graphics for events that need to look sharp on opening day: route launches, hotel activations, sponsor moments, display systems, step-and-repeats, and environmental takeovers.',
    bestFor: [
      'Trade show displays and exhibition graphics',
      'Sponsor walls, backdrops, branded arches, and banners',
      'Hotel, venue, airport, and arena activations',
      'Production teams that need fast, accurate execution',
    ],
    capabilities: [
      'Large-format print and mounted display production',
      'Event-ready finishing, packing, and staging',
      'High-access and multi-day install coordination',
      'Rush graphics support for tight event timelines',
    ],
    process: [
      'Share event date, venue, graphics list, and install window.',
      'We review dimensions, access, substrates, and production timing.',
      'Graphics are produced, finished, and installed for the event schedule.',
    ],
    faq: [
      {
        question: 'Do you work with agencies and production companies?',
        answer:
          'Yes. We often support agencies, production teams, and brand teams that need dependable local graphics production and installation.',
      },
      {
        question: 'Can you install at hotels, airports, and venues?',
        answer:
          'Yes, depending on site access and approval. We coordinate install details around venue requirements and the production schedule.',
      },
    ],
  },
  {
    slug: 'environmental-graphics-oakland',
    title: 'Environmental Graphics Oakland',
    eyebrow: 'Environmental & Space Graphics',
    metaTitle: 'Environmental Graphics Oakland | Wall & Window Graphics',
    metaDescription:
      'Environmental graphics in Oakland for wall graphics, window vinyl, frosted film, floor decals, office branding, venue graphics, and installation.',
    h1: 'Environmental graphics that make spaces feel finished.',
    intro:
      'We produce and install graphics for offices, venues, retail spaces, lobbies, and branded interiors where the details have to align with the physical environment.',
    bestFor: [
      'Wall graphics, murals, window vinyl, and frosted film',
      'Office branding, lobby graphics, and venue wayfinding',
      'Floor decals, interior glass decals, and exterior panels',
      'Brand systems that need clean installation in real spaces',
    ],
    capabilities: [
      'Site-aware production planning',
      'Vinyl, film, rigid panel, and mounted graphic output',
      'Install-ready masking, finishing, and labeling',
      'On-site installation and removal support',
    ],
    process: [
      'We confirm wall, glass, or surface conditions and final sizes.',
      'Files are checked, produced, finished, and prepared for install.',
      'Install is coordinated around site access and operational needs.',
    ],
    faq: [
      {
        question: 'Can you help choose the right vinyl or material?',
        answer:
          'Yes. Material choice depends on surface, durability, finish, removal needs, and whether the graphic is interior or exterior.',
      },
      {
        question: 'Do you do measurements and site checks?',
        answer:
          'Yes. For installs that need precision, a site check helps confirm sizing, access, surface condition, and installation method.',
      },
    ],
  },
  {
    slug: 'vehicle-wraps-oakland',
    title: 'Vehicle Wraps Oakland',
    eyebrow: 'Vehicle, Fleet & Transit Graphics',
    metaTitle: 'Vehicle Wraps Oakland | Fleet Graphics & Decals',
    metaDescription:
      'Vehicle wraps and fleet graphics in Oakland for commercial vans, trucks, partial wraps, transit graphics, decals, and production-ready vehicle layouts.',
    h1: 'Vehicle wraps and fleet graphics for brands on the move.',
    intro:
      '7th Creation Studio produces commercial vehicle graphics for vans, trucks, fleets, transit campaigns, and mobile brand visibility across Oakland and the Bay Area.',
    bestFor: [
      'Full wraps, partial wraps, decals, and fleet graphics',
      'Food trucks, service vehicles, delivery vans, and box trucks',
      'Transit graphics and campaign-ready layouts',
      'Commercial graphics that need clean production and install',
    ],
    capabilities: [
      'Vehicle layout and panel planning',
      'Print, lamination, contour cutting, and finishing',
      'Color-conscious production for multi-vehicle consistency',
      'Install support for commercial wraps and decals',
    ],
    process: [
      'Send vehicle model, photos, design files, and timing.',
      'We confirm layout, panels, material, finish, and install approach.',
      'Graphics are produced and installed for clean, professional visibility.',
    ],
    faq: [
      {
        question: 'Can you wrap a whole fleet?',
        answer:
          'Yes. Fleet work can be scheduled in phases so vehicles are not all out of service at the same time.',
      },
      {
        question: 'Do you handle partial wraps and decals?',
        answer:
          'Yes. Partial wraps, spot graphics, cut vinyl, and fleet decals are often the right fit for budget, timeline, or brand needs.',
      },
    ],
  },
  {
    slug: 'window-graphics-oakland',
    title: 'Window Graphics Oakland',
    eyebrow: 'Window Vinyl & Storefront Graphics',
    metaTitle: 'Window Graphics Oakland | Storefront Vinyl & Frosted Film',
    metaDescription:
      'Window graphics in Oakland for storefront vinyl, frosted film, perforated graphics, promotional windows, launch signage, decals, and installation.',
    h1: 'Window graphics that turn glass into brand space.',
    intro:
      'We create storefront and interior glass graphics for retail, offices, venues, and activations, from promotional window takeovers to frosted privacy film and clean brand decals.',
    bestFor: [
      'Storefront vinyl, window takeovers, and launch graphics',
      'Frosted film, privacy graphics, and interior glass decals',
      'Perforated window graphics and promotional signage',
      'Retail and office graphics that need professional install',
    ],
    capabilities: [
      'Material recommendation for glass and light conditions',
      'Print, cut vinyl, masking, and installation prep',
      'Exterior-facing and interior-facing graphic planning',
      'Removal and replacement support for campaigns',
    ],
    process: [
      'We confirm glass size, location, visibility, and installation surface.',
      'Graphics are produced with the right film, finish, and installation method.',
      'Install is scheduled around access, hours, and storefront traffic.',
    ],
    faq: [
      {
        question: 'Can window graphics be temporary?',
        answer:
          'Yes. We can recommend removable films for campaigns, launches, seasonal promotions, and temporary privacy needs.',
      },
      {
        question: 'Do you install frosted graphics?',
        answer:
          'Yes. Frosted film and cut frosted graphics are common for offices, conference rooms, lobbies, and interior glass.',
      },
    ],
  },
  {
    slug: 'custom-stickers-labels-oakland',
    title: 'Custom Stickers & Labels Oakland',
    eyebrow: 'Stickers, Labels & Contour-Cut Graphics',
    metaTitle: 'Custom Stickers & Labels Oakland | Contour-Cut Decals',
    metaDescription:
      'Custom stickers, labels, decals, and contour-cut graphics in Oakland for branded products, packaging, retail, events, equipment, and short-run production.',
    h1: 'Custom stickers, labels, and contour-cut graphics in Oakland.',
    intro:
      '7th Creation Studio produces custom sticker, label, decal, and contour-cut graphic runs for brands, retailers, event teams, product makers, and production partners that need clean files, durable materials, and dependable finishing.',
    bestFor: [
      'Custom stickers, die-cut decals, kiss-cut sheets, and branded labels',
      'Product packaging, promotional handouts, branded kits, and event collateral',
      'Equipment, retail, window, or rigid-substrate graphics that need a clean cut path',
      'Short-run and repeat production with consistent size, finish, and handoff',
    ],
    capabilities: [
      'Artwork preflight, cut-path review, sizing, and production setup',
      'Print, contour cutting, trimming, and finishing for vinyl, paper, and compatible substrates',
      'Material and finish guidance for indoor, outdoor, removable, or durable applications',
      'Pack-out and delivery-ready organization for product, retail, or event use',
    ],
    process: [
      'Send artwork, quantity, finished size, material preference, and needed-by date.',
      'We confirm cut path, substrate, finish, durability, and production timing.',
      'The run is printed, contour-cut, finished, and packed for its intended use.',
    ],
    faq: [
      {
        question: 'Can you contour cut custom shapes?',
        answer:
          'Yes. We can contour cut stickers, decals, and compatible substrate graphics to a supplied vector cut path, or help confirm the right cut approach before production.',
      },
      {
        question: 'Can you help choose sticker or label material?',
        answer:
          'Yes. We will recommend material and finish based on the surface, durability, exposure, removal needs, quantity, and how the finished piece will be used.',
      },
    ],
  },
  {
    slug: 'dtf-transfers-apparel-oakland',
    title: 'DTF Transfers & Apparel Oakland',
    eyebrow: 'DTF Transfers & Custom Apparel',
    metaTitle: 'DTF Transfers & Custom Apparel Oakland, CA',
    metaDescription:
      'DTF transfers and custom apparel production in Oakland for branded shirts, crew wear, event merchandise, short-run garments, and production-ready transfer runs.',
    h1: 'DTF transfers and custom apparel production in Oakland.',
    intro:
      '7th Creation Studio produces DTF transfers and custom apparel for teams, brands, events, and operators who need clean artwork, dependable placement, and short-run or repeat production without treating the job like commodity merch.',
    bestFor: [
      'Branded tees, hoodies, crew wear, uniforms, and event merchandise',
      'DTF transfer runs for approved artwork and compatible garments',
      'Short-run launches, branded kits, staff apparel, and promotional pieces',
      'Production partners who need artwork-aware, deadline-driven apparel support',
    ],
    capabilities: [
      'Artwork preflight, transfer sizing, placement planning, and production checks',
      'DTF transfer production for cotton, blends, and many compatible garments',
      'Custom apparel decoration, short-run merch, and repeat-order support',
      'Clear handoff requirements for client-supplied garments, files, quantities, and deadlines',
    ],
    process: [
      'Send artwork, garment or transfer sizes, quantities, colors, and deadline.',
      'We confirm file readiness, transfer sizing, garment compatibility, and production plan.',
      'Transfers or finished apparel are produced, checked, and packed for delivery or pickup.',
    ],
    faq: [
      {
        question: 'Can you produce DTF transfers only?',
        answer:
          'Yes, where that is the right fit. Tell us whether you need ready-to-press transfers or finished garments, along with artwork, sizes, quantities, and deadline.',
      },
      {
        question: 'What do you need to quote a DTF or apparel job?',
        answer:
          'We need the artwork, print or garment sizes, quantities, garment details if applicable, number of print locations, color information, and the needed-by date.',
      },
    ],
  },
];

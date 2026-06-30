import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* 7th Creation Studio brand palette */
        dark:      '#090f14',
        charcoal:  '#282828',
        gray:      '#4a494a',
        navy:      '#12284d',
        blue:      '#224f71',
        lightblue: '#d6eff8',
        cream:     '#e8e8e3',
        silver:    '#d1d3d4',
        coolgray:  '#bcbec0',
      },
      fontFamily: {
        sans:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter:  '-0.02em',
        tight:    '-0.01em',
      },
      transitionDuration: {
        '350': '350ms',
      },
    },
  },
  plugins: [],
};

export default config;

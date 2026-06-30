import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized local images during development
    unoptimized: false,
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datocms-assets.com',
      },
      new URL('https://www.datocms-assets.com/**'),
    ],
  },
};

export default nextConfig;

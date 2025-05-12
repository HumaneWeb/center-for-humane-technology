import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datocms-assets.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/example',
        destination: '/to',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

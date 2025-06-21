import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datocms-assets.com',
      },
      new URL('https://www.datocms-assets.com/**'),
      new URL('https://substackcdn.com/**'),
      new URL('https://substack-post-media.s3.amazonaws.com/**'),
    ],
  },
};

export default nextConfig;

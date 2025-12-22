import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
      },
      {
        protocol: 'https',
        hostname: 'vignette.wikia.nocookie.net',
      },
    ],
  },
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
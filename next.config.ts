import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/**',
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
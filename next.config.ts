
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {

    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['https://*.cloudworkstations.dev'],
};

export default nextConfig;

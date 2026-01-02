import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/proxy/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          }
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/proxy/data/:path*',
        destination: 'https://upload.jishicv.com/data/:path*',
      },
      {
        source: '/proxy/roms/:path*',
        destination: 'https://upload.jishicv.com/roms/:path*',
      },
    ];
  },
};

export default nextConfig;
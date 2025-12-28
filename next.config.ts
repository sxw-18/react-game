import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/roms/:path*',
        destination: 'https://upload.jishicv.com/roms/:path*',
      },
    ];
  },
};

export default nextConfig;

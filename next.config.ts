import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow all local public images (logo, uploads, etc.)
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

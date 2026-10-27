import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run alongside `next dev` without sharing .next/.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

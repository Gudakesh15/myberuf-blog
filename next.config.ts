import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint checks during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;


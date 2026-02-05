import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Include content folder in serverless function bundles
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },
};

export default nextConfig;

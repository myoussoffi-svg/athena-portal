import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Include content folder in serverless function bundles for all routes
  outputFileTracingIncludes: {
    '/track/[trackSlug]': ['./content/**/*'],
    '/track/[trackSlug]/[moduleSlug]': ['./content/**/*'],
    '/track/[trackSlug]/[moduleSlug]/[lessonSlug]': ['./content/**/*'],
    '/api/(.*)': ['./content/**/*'],
  },
};

export default nextConfig;

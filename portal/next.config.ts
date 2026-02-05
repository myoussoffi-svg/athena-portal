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
  // Handle jsdom ESM compatibility issues
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
};

export default nextConfig;

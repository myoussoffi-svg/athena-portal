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
  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(self), microphone=(self), geolocation=()',
        },
      ],
    },
  ],
};

export default nextConfig;

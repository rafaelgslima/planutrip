import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,

  // Image optimization for Core Web Vitals
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
  },

  // Security & Performance Headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],

  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      vitest: false,
      "@testing-library/react": false,
      "@testing-library/jest-dom": false,
    };
    return config;
  },
};

export default nextConfig;

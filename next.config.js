/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Output configuration for Vercel deployment
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  // Headers configuration for CSP - more permissive for calculator functionality
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app https://*.vercel.com https://*.google.com https://*.gstatic.com https://docs.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://*.google.com https://*.gstatic.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://*.gstatic.com; img-src 'self' data: blob: https://* https://*.google.com https://*.gstatic.com; connect-src 'self' https://* wss://* ws://*; frame-src 'self' https://vercel.live https://docs.google.com https://*.google.com; object-src 'none'; base-uri 'self';"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;

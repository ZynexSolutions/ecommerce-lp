const withFlowbiteReact = require("flowbite-react/plugin/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other configurations might be here (like reactStrictMode)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Usually empty for default https port 443
        pathname: '/**', // Allows any path under this hostname
      },
      // Add any other hostnames you might use here later
      // For example:
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-cdn.com',
      //   pathname: '/images/**',
      // },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = withFlowbiteReact(nextConfig);

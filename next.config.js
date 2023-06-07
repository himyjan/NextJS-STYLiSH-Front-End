/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.appworks-school.tw', 'graph.facebook.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;

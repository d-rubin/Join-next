/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: { serverActions: true },
};

module.exports = nextConfig;

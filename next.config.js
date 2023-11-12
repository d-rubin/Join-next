/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: { ppr: true },
};

module.exports = nextConfig;

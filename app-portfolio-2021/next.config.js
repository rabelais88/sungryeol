/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

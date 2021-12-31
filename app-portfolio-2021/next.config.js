const { config } = require('process');

const withNextTranspiler = require('next-transpile-modules')([
  '@sungryeol/lib',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: false,
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sungryeol/lib': require.resolve('@sungryeol/lib'),
    };
  },
};

module.exports = withNextTranspiler(nextConfig);

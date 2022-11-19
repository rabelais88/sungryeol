/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      // {
      //   source: '/posts',
      //   destination: '/posts/0',
      // },
    ];
  },
};

module.exports = nextConfig;

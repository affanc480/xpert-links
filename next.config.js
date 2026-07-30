/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE this entire block - it's deprecated:
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
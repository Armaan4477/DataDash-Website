/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.29.3'],
}

module.exports = nextConfig

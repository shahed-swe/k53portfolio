/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    domains: ['images.unsplash.com','localhost'],
  },
}

module.exports = nextConfig

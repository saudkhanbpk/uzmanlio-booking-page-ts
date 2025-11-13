/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Removed TypeScript config since we're using plain JS
  images: {
    unoptimized: true,
  },
}


module.exports = nextConfig

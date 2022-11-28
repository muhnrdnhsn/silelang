/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://63839d4f6e6c83b7a997fa93.mockapi.io'
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

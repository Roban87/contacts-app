/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    NEXT_PUBLIC_AWS_ACCESS_KEY: process.env.NEXT_PUBLIC_ACCESS_KEY,
    NEXT_PUBLIC__SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    NEXT_PUBLIC__BUCKET_NAME: process.env.NEXT_PUBLIC_BUCKET_NAME,
    NEXT_PUBLIC__BUCKET_REGION: process.env.NEXT_PUBLIC_BUCKET_REGION,
  }
}

module.exports = nextConfig

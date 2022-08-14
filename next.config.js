/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "cloudflare-ipfs.com",
      "picsum.photos",
    ],
  },
};

module.exports = nextConfig;

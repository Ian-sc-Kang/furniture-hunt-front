/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.costco-static.com",
      },
      {
        protocol: "https",
        hostname: "www.ikea.com",
      },
      {
        protocol: "https",
        hostname: "ashleyfurniture.**.com",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/tool.html" }],
    };
  },
};

module.exports = nextConfig;

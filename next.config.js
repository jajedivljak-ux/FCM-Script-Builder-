/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/tool.html" }],
    };
  },
  async headers() {
    // Never cache the tool page, so every update is live on the next load.
    const noCache = [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" }];
    return [
      { source: "/", headers: noCache },
      { source: "/tool.html", headers: noCache },
    ];
  },
};

module.exports = nextConfig;

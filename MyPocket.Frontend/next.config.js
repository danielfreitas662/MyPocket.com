/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'token',
            value: 'true',
          },
        ],
        headers: [
          {
            key: 'Authorization',
            value: 'Beares :token',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

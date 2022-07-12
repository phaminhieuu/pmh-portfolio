/** @type {import('next').NextConfig} */
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: [/\.glsl$/, /\.vs$/, /\.fs$/, /\.vert$/, /\.frag$/],
      use: [
        {
          loader: "raw-loader",
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;

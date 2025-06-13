// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Handle .md files
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    // Prevent 'fs' and 'path' from being bundled on client side
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;

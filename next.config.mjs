// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Enable static optimization when possible and reduce chunksize
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // Compress output
  compress: true,
  // Minimize serverless function size
  experimental: {
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/darwin-x64",
        "node_modules/@esbuild/linux-x64",
        "node_modules/esbuild-darwin-64",
        "node_modules/esbuild-linux-64",
        ".git/**",
        "**/*.md",
        "**/*.d.ts",
        ".next/cache/**",
      ],
    },
  },
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

    // Optimize webpack output
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };

    return config;
  },
};

export default nextConfig;

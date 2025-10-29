/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for faster builds
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  // Image optimization
  images: {
    domains: ['localhost', 'khalid-alkhader.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Webpack configuration for shaders
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Transpile packages
  transpilePackages: ['three'],
};

module.exports = nextConfig;

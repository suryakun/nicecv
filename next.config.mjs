import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    // Add Handlebars loader
    config.module.rules.push({
      test: /\.hbs$/,
      loader: 'handlebars-loader',
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: path.resolve('./node_modules/handlebars/dist/handlebars.js'),
    };

    // Provide fallbacks for Node.js built-in modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Add this line to provide a fallback for the 'fs' module
    };
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true // optional, with some bundlers/frameworks it doesn't work without
    };
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  env: {
    network: 1,
    api_url : 'https://cardano-mainnet.blockfrost.io/api/v0',
    api_key : 'mainnetUBczSDzNJzRd32RPD859p7XteHQJ2VOK',
    api_net : "Mainnet",
  }
}

module.exports = nextConfig
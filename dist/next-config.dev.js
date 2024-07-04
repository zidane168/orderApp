"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  // reactStrictMode: true,
  i18n: i18n,
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: function webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: {
        not: [/url/]
      },
      use: ["@svgr/webpack", "url-loader"]
    });
    return config;
  }
};
module.exports = nextConfig;
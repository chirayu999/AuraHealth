const { override } = require("customize-cra");

module.exports = override(
  // Add your webpack configuration here
  (config) => {
    // Disable the polyfill for 'path' module
    config.resolve.fallback = { path: false, os: false, crypto: false };
    return config;
  }
);

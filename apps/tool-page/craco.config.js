const cracoAlias = require("craco-alias");
const webpack = require("webpack");

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: "options",
        baseUrl: "./src",
        aliases: {
          "@": "./"
        }
      }
    }
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "events": require.resolve("events/"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "util": require.resolve("util/"),
        "path": require.resolve("path-browserify"),
        "tty": require.resolve("tty-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "fs": false,
        "url": require.resolve("url/")
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"]
        })
      );
      return webpackConfig;
    }
  }
};
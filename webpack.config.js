const path = require("path");
const paths = {
  DIST: path.resolve(__dirname, "dist"),
  SRC: path.resolve(__dirname, "src"),
  JS: path.resolve(__dirname, "src/js"),
};

// https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
const nodeExternals = require("webpack-node-externals");

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, "app.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["babel-preset-env"]
        }
      }
    }
  ]
  },
  node: {
    fs: "empty",
    child_process: "empty",
    net: "empty"
  },
  mode: "development",
  devServer: {
    contentBase: paths.SRC,
    disableHostCheck: true,
    port: 8081
  },
  target: "node",
  externals: [nodeExternals()],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

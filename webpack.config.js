const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  watchOptions: {
    poll: 1000,
  },

  entry: {
    'bandle': ['./src/bandle.js', './src/bandle.css'],
  },

  output: {
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext]`;
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      },
    }),

    // Извлекает стили из css файлов в документ в <style>
    // Например, полезно для верстки email писем.
    new HTMLInlineCSSWebpackPlugin(),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
}
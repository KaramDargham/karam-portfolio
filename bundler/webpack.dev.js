const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfiguration, {
  mode: 'production', // Set to production mode
  output: {
    path: path.resolve(__dirname, '../dist'), // Output to a 'dist' folder
    filename: 'bundle.[contenthash].js', // Add content hash for cache busting
    publicPath: '/', // Ensure correct path for assets
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before building
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', // Extract CSS into separate files
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' }, // Copy static assets from 'public' to 'dist'
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS for production
          'css-loader',
        ],
      },
      // Add other loaders for images, fonts, etc.
    ],
  },
  optimization: {
    minimize: true, // Minify JavaScript and CSS
    // Add other optimizations like splitChunks if needed
  },
});
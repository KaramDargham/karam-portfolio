const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = merge(commonConfiguration, {
  mode: 'production', // Production mode for optimizations
  output: {
    path: path.resolve(__dirname, '../dist'), // Output to 'dist' folder
    filename: 'bundle.[contenthash].js', // Add content hash for cache busting
    publicPath: '/', // Ensure correct path for assets
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before building
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', // Extract CSS into separate files
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
    minimize: true, // Enable minimization
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: 'all', // Split common dependencies into separate chunks
    },
  },
});
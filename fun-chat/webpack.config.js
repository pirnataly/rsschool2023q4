
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');


module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      favicon: path.join(__dirname, 'src', 'favicon.ico'),

    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new EslintPlugin({ extensions: ['ts'] }),
  ],
  resolve: {
    alias: {
      img: path.join(__dirname, 'src', 'components', 'view', 'img'),
    },
    extensions: ['.ts', '.js'],
  },

  devServer: {
    open: true,
    host: 'localhost',
  },
};

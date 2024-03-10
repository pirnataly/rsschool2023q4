const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const baseConfig = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        "rules":[{
            "test": /\.ts$/,
            "use": 'ts-loader',
            "include": [path.resolve(__dirname,'src')]
        },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: 'file-loader',
            },
        ]
    },
    resolve: {
        extensions:['.ts','.js']
    },
    output: {
        filename:'index.js',
        path: path.resolve(__dirname,'dist')
    },
        plugins: [
            new DotenvWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        ]}

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    return merge(baseConfig, envConfig);
};

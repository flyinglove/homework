const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseWebpack = require('./webpack.common.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')



module.exports = merge(baseWebpack,  {
    mode: 'none',
    devtool: 'nosources-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    optimization: {
        splitChunks:{
            chunks:  'all'
        },
        usedExports: true,
        minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [ MiniCssExtractPlugin.loader,  'css-loader',  'less-loader']
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.png$/,
            use: {
                loader: 'url-loader',
                options: {
                    esModule:  false
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'My Page',
            inject: 'body',
            chunks: 'app'
        })
    ]
})
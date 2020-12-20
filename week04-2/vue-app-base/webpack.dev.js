const {merge} = require('webpack-merge')
const baseWebpack = require('./webpack.common.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = merge(baseWebpack, {
    mode: 'none',
    devServer: {
        contentBase: ['./public',  './dist'],
        open: true,
        hot: true
    },
    target: 'web',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader',  'less-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'My Page',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development')
        })
    ]
})
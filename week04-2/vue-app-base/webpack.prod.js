const {merge} = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseWebpack = require('./webpack.common')
module.exports = merge(baseWebpack, {
    mode: 'none',
    plugins: [
        new CleanWebpackPlugin()
    ]
})

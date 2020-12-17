const path = require('path')
const {merge} = require('webpack-merge')
const baseWebpack = require('./webpack.common')

module.exports = merge(baseWebpack, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    }
})

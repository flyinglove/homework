const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin =  require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.png$/,
            use: {
                loader: 'url-loader',
                options:  {
                    limit: 10 * 1024
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: ''
        })
    ]
}
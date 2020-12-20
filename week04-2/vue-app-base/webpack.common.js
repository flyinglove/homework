const path = require('path')

module.exports = {
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    entry: {
        app:  './src/main.js'
    },
    module:  {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
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
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}
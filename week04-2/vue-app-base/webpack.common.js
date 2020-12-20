const path = require('path')

module.exports = {
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    entry: {
        app:  './src/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}
const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HTMLWebPackPlugin({
    template: './templates/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    plugins: [HtmlWebpackPluginConfig]
}
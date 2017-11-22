const path                                      = require('path');
const HtmlWebpackPlugin                         = require('html-webpack-plugin');

const APP_DIR  = path.resolve(__dirname, './app');
const DIST_DIR = path.resolve(__dirname, './dist'); 


module.exports = {
    entry: `${APP_DIR}/bootstrap.js`,
    output: {
        path: DIST_DIR,
        filename: 'bundle.app.js'
    },
    devServer: {
        port: 3002,
        open: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
          })
    ],
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules', 'app']
    }
};
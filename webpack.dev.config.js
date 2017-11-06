const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseName = "md-pull-refresh-spinner";

const extractSass = new ExtractTextPlugin({
    filename: baseName + ".css",
    allChunks: true
});

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: baseName+'.js',
        publicPath: '/dist/'
    },
    devServer: {
        inline: true,
        port: 1111
    },
    plugins: [
        extractSass
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
              test: /\.(html)$/,
              use: {
                loader: 'html-loader'
              }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader'
                }
              ]
            },
            {
              test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/i,
              use: "file-loader?name=assets/[name].[ext]"
            }
        ]
    }
};
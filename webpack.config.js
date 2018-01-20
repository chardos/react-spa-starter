require('dotenv').config()
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "./");

const config = {
    devServer: {
        historyApiFallback: {
            index: '/'
        },
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        }),

        // Injects the bundle file into the index.html
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    entry: [`${APP_DIR}/src/Index.jsx`],
    devtool: "cheap-eval-source-map",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            "node_modules",
        ],
        extensions: [".js", ".jsx", ".json"]
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]-[hash:base64:6]'
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    }
};

module.exports = config;

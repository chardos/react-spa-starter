const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, "dist");
const APP_DIR = path.resolve(__dirname, "./");

const config = {
    plugins: [
        // Empty the dist folder before rebuilding the files
        new CleanWebpackPlugin(['dist']),

        // Splits modules from node_modules into a vendor bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.[chunkhash].js",
            minChunks(module) {
                return (
                    module.context &&
                    module.context.indexOf("node_modules") >= 0
                );
            }
        }),

        // Hoists all module into a single closure, instead of each module being
        // wrapped in its own closure
        new webpack.optimize.ModuleConcatenationPlugin(),

        // Minification
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),

        new webpack.HashedModuleIdsPlugin(),

        // Creates .gz files, for browsers that support gzip
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.jsx$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        // Creates new index.html with the chunk-hashed urls added
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    entry: [`${APP_DIR}/src/Index.jsx`],
    devtool: "cheap-eval-source-map",
    output: {
        path: BUILD_DIR,
        filename: "bundle.[chunkhash].js"
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

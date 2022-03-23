const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,

                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: [
                            "jsx-control-statements",
                            "@babel/transform-runtime",
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'imgs/[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            inject:true,
            template: "public/index.html",
            filename: "index.html"
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: './',
        hot: true
    },
};
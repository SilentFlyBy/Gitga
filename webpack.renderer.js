const fs = require('fs')

module.exports = {
    entry: "./src/browser/index.tsx",
    output: {
        filename: "bundle_renderer.js",
        publicPath: "http://localhost:8081/"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loader: "ts-loader" },
            {
                test: /\.less$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                  { loader: "less-loader" }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.(svg|png)$/,
                loader: "file-loader",
                options: {
                    name: "img/[name].[ext]"
                }
            },
            {
                test: /translations/,
                loader: "@alienfast/i18next-loader",
            }
        ]
    },
    target: "electron-renderer",
    performance: { hints: false },
    devtool: "source-map",
    externals: {
        nodegit: "commonjs nodegit"
    },
};
module.exports = {
    entry: "./src/electron/main.ts",
    output: {
        filename: "bundle_main.js"
    },
    target: "electron-main",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loader: "ts-loader" },
        ]
    }
};
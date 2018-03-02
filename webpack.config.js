module.exports = {
    devtool: 'source-map',
        output: {
            filename: "bundle_renderer.js"
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                { test: /\.ts(x?)$/, loader: 'ts-loader'}
            ]
        },
        devtool: 'inline-source-map'
};
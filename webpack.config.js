module.exports = {
    entry: './src/browser/index.tsx',
    output: {
        filename: "bundle_renderer.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
            {
                test: /\.less$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  { loader: 'less-loader' }
                ]
              }
        ]
    },
    target: 'node',
    performance: { hints: false },
};
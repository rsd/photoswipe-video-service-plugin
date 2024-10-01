const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'PhotoSwipeYoutubePlugin',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    externals: {
        // Exclude dependencies that the library user will provide
        photoswipe: 'photoswipe',
        'photoswipe/lightbox': 'photoswipe/lightbox',
    },
};

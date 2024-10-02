const path = require('path');

module.exports = {
    entry: {
        PhotoSwipeYoutubePlugin: './src/main-youtube.js',
        PhotoSwipeVimeoPlugin: './src/main-vimeo.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
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

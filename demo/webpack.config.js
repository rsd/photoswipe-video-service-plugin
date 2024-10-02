const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        clean: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Replaces contentBase
        },
        port: 9000,
        open: false,
        compress: true,
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, '../src'), // Include parent src directory
            'node_modules',
        ],
        alias: {
            'photo-swipe-youtube-plugin': path.resolve(__dirname, '../dist/PhotoSwipeYoutubePlugin.js'),
            'photo-swipe-vimeo-plugin': path.resolve(__dirname, '../dist/PhotoSwipeVimeoPlugin.js'),
        },
    },
};

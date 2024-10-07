const path = require('path');

const pascalToKebab = (str) => {
    str = str.replace(/PhotoSwipe/g, 'Photoswipe');
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = {
    entry: {
        PhotoSwipeVideoServicePlugin: './src/main-video-service.js',
        PhotoSwipeYoutubePlugin: './src/main-youtube.js',
        PhotoSwipeVimeoPlugin: './src/main-vimeo.js',
    },
    mode: 'production',
    output: {
        filename: (pathData) => {
            const name = pathData.chunk.name;
            const kebabCaseName = pascalToKebab(name);
            return `${kebabCaseName}.esm.js`;
        },
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
    },
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
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
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
const path = require('path');

const pascalToKebab = (str) =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const commonConfig = {
    entry: {
        PhotoSwipeVideoServicePlugin: './src/main-video-service.js',
        PhotoSwipeYoutubePlugin: './src/main-youtube.js',
        PhotoSwipeVimeoPlugin: './src/main-vimeo.js',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Ensure Babel preserves ES modules for ESM build
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false, // Important for ESM
                                },
                            ],
                        ],
                    },
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

const umdConfig = {
    ...commonConfig,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
};

const esmConfig = {
    ...commonConfig,
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
    // Ensure Babel does not transform ES modules
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false, // Preserve ES modules
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = [umdConfig, esmConfig];
// webpack.config.js
const path = require('path');

module.exports = {
    entry: {
        game: './src/game.js',
        party: './src/party.js',
        matchmaking: './src/matchmaking.js',
        welcome: './src/welcome.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3001,
        static:
            {
                directory: path.resolve(__dirname, 'dist'),
                watch: true,
            },
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
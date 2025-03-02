const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
    mode: 'development',
    devServer: {
        static: {
            directory: './dist',
        },
        host: 'localhost',
        port: 8080,
        hot: true,
        open: true,
        client: {
            overlay: true,
            logging: 'info',
        },
    },
});

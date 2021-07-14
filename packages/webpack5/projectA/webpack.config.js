const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;


module.exports = {
    entry: {
        projectA:  './app.js',
        Common: './components/public-module.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'Common',
            library: { type: 'var', name: 'Common' },
            filename: 'remoteCommon.js',
            exposes: {
                "./C": './components/public-module.js'
            },
            shared: []
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    mode: 'development'
};
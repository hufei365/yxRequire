const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = {
    entry: {
        projectB: './app.js',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'projectB',
            filename: 'projectB.js',
            remotes: {
                'Common': 'Common@http://127.0.0.1:8080/projectA/dist/remoteCommon.js',
            }
        }),
        new HtmlWebpackPlugin({
            template: './template.html'
        })
    ],
    mode: 'development'
};
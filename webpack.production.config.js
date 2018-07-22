const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        popup: path.join(__dirname, 'src/popup/index.ts'),
        options: path.join(__dirname, 'src/options/index.ts'),
        background: path.join(__dirname, 'src/background/index.ts'),
       // content_script: path.join(__dirname, 'src/content_script/index.ts'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]/index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'popup/index.html',
            template: 'src/popup/index.html',
            inject: false,
            minify: { removeComments: true, minifyCSS: true },
        }),
        new HtmlWebpackPlugin({
            filename: 'options/index.html',
            template: 'src/options/index.html',
            inject: false,
            minify: { removeComments: true, minifyCSS: true },
        }),
        // @ts-ignore
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' },
            {
                from: 'src/manifest.json',
                to: 'manifest.json',
            },
        ]),
    ],
}

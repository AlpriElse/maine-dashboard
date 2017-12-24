var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: "bundle.js",
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css|.scss$/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};

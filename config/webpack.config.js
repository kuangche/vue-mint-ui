/**
 * Created by jige on 2016/11/14.
 */
const webpack = require('webpack');
const config = require('./index');
const isEnv = process.argv[2] == 'watch';

const plugins = []
if (!isEnv) { //非生产环境
     plugins.push(new webpack.optimize.UglifyJsPlugin({ //压缩代码
         compress: {
            warnings: false
         }
     }))
}
module.exports = {
    watch: true,
    entry: isEnv ? './src/main.dev.js' : './src/main.js',
    output: {
        publicPath: isEnv ? '/':config.publicPath,
        filename: '[name].js'
    },
    devtool:isEnv ? 'source-map': '',
    externals: {
        "BMap": "BMap"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    plugins,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}
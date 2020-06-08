
const path = require('path')
const distDir = path.resolve(__dirname, '..', 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')


module.exports = {
  entry: {
    index: './entry.js'
  },
  output: {
    filename: '[name].js',
    path: distDir,
  },
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['index'],
    }),
    new webpack.ProvidePlugin({ 
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],

  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(hbs)$/,
      use: {
        loader: 'raw-loader',
        options: {
          esModule: false,
        },
      }
    }, 
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000', }
    ]
  }
};
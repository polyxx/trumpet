const path = require('path');
const webpack = require('webpack');

const src = path.resolve('./src');
const dist = path.resolve('./dist');

module.exports = {
  entry: {
    'app': [
      path.join(src, '/js/app.js')
    ]
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  resolve: {
    modules: [
      path.join(src, '/js'),
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  target: 'electron',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};

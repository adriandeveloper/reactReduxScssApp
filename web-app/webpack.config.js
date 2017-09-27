const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'redux', 'react-redux', 'react-dom', 'redux-thunk', 'classnames', 'redux-saga', 'react-router'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx|es6)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: 'style-loader',
      },
      {
        test: /\.scss$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]_[local]_[hash:base64:5]',
          sourceMap: true,
          url: false,
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: 'sass-loader',
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  devServer: {
    host: '0.0.0.0'
  }
};

const path = require('path')
const webpack = require('webpack')

const VENDOR_LIBS = [
  'react', 'redux', 'react-redux', 'react-dom', 'redux-thunk', 'classnames', 'redux-saga', 'react-router'
];

module.exports = {
  devtool: 'source-map',

  entry: {
   bundle: './src/index.js',
   vendor: VENDOR_LIBS, 
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunckhash].js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    rules: [
      { test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style-loader' },
      { test: /\.scss?$/,
        loader: 'css-loader' },
      { test: /\.scss?$/,
        loader: 'sass-loader' },
      { test: /\.png$/,
        loader: 'file-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'}
    ]
  }
}

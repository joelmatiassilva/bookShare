var webpack = require('webpack');

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  output: {
    path: __dirname + '/client/build',
    publicPath: '/client',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/build',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
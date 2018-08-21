var path = require('path')
require('babel-polyfill')

var SRC_DIR = path.join(__dirname, '/client/src')
var DIST_DIR = path.join(__dirname, '/client/dist')

module.exports = {
  entry: ['babel-polyfill', `${SRC_DIR}/index.jsx`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

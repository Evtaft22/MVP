const path = require('path');

const CLI_DIR = path.join(__dirname, '/client');
const HTML_DIR = path.join(__dirname, '/index.html');
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: `${CLI_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: HTML_DIR,
  },
  devtool: IS_PROD ? 'cheap-source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};

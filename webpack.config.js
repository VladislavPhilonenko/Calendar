const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let root = path.resolve(__dirname, '');
const reactComponents = '/src/webapp/react-components';
const pages = '/src/webapp/pages';
const router = '/src/webapp/router';
const helpers = '/src/webapp/helpers';
const assets = '/src/assets';
const actions = '/src/webapp/actions/actions';
const constants = '/src/webapp/constants/constants';

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/webapp/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react-components': path.join(root, reactComponents),
      'pages': path.join(root, pages),
      'router': path.join(root, router),
      'helpers': path.join(root, helpers),
      'assets': path.join(root, assets),
      'actions': path.join(root, actions),
      'constants': path.join(root, constants)
    },
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    port: 4000,
    hot: true
  }
};

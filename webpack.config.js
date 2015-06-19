/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  // If you pass an array: All modules are loaded upon startup. The last one is exported.
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './js/index'
  ],
  // a developer tool to enhance debugging.
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    // 作为引用的路径
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // Options affecting the resolving of modules.
  resolve: {
    // An array of extensions that should be used to resolve modules. For example, in order to discover CoffeeScript files, your array should contain the string ".coffee".
    extensions: [ '', '.js', '.jsx', '.coffee' ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // loader的执行顺序从右到左
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'],
        include: path.join(__dirname, 'js') },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'},
      {
        test: /\.css$/,
        loader: 'style!css'},
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=10000000' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff" },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader" }
    ]
  }
};

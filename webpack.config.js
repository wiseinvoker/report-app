var webpack = require( 'webpack' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var DEV = process.env.NODE_ENV === 'development';

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  devtool: DEV ? 'source-map' : undefined,
  output: {
    path: __dirname + '/build',
    filename: 'report.min.js',
  },
  node: {
    fs: false,
  },
  plugins: DEV ? [
    new ExtractTextPlugin( 'report.min.css' ),
  ] : [
    new ExtractTextPlugin( 'report.min.css' ),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false }),
  ],
  module: {
    postLoaders: [
      {
        loader: 'transform/cacheable?brfs',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [ 'babel?stage=0', 'ng-annotate' ],
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader' )
      },
      {
        test: /\.html/,
        loaders: [ 'raw' ],
      },
      {
        test: /\.json/,
        loaders: [ 'json' ],
      },
    ],
  },
  externals: {
    'angular': 'angular',
    'stripe': 'Stripe',
  },
};

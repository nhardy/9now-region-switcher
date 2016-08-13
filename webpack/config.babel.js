import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  DefinePlugin,
  optimize,
  ProvidePlugin,
} from 'webpack';

const { DedupePlugin } = optimize;


const PROD = process.env.NODE_ENV === 'production';

const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, 'src');
const DIST = path.resolve(ROOT, 'dist');

export default {
  entry: {
    background: path.resolve(SRC, 'background.js'),
    popup: path.resolve(SRC, 'popup.js'),
  },

  output: {
    filename: '[name].js',
    path: DIST,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.svg$/,
        loaders: ['babel', 'svg-react'],
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          'css?importLoaders=2&modules&localIdentName=[path][name]---[local]---[hash:base64:5]!stylus'
        ),
      },
      {
        test: /\.woff2$/,
        loader: 'file?name=fonts/[name]-[hash:base64:5].[ext]',
      },
    ],
  },

  resolve: {
    alias: {
      src: SRC,
    },
    extensions: ['', '.json', '.js', '.styl'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  target: 'web',

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('popup.css', {
      allChunks: true,
    }),
    new ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new DedupePlugin(),
  ],

  devtool: PROD ? undefined : 'inline-source-map',
};

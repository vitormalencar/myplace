import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import OfflinePlugin from 'offline-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import V8LazyParseWebpackPlugin from 'v8-lazy-parse-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import DashboardPlugin from 'webpack-dashboard/plugin';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: [
      '', '.jsx', '.js', '.json', '.less'
    ],
    modulesDirectories: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"), // used for tests
      style: path.resolve(__dirname, "src/style"),
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-addons-css-transition-group': 'preact-css-transition-group'
    }
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: path.resolve(__dirname, 'src'),
      loader: 'source-map'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      // Transform our own .(less|css) files with PostCSS and CSS-modules
      test: /\.(less|css)$/,
      include: [path.resolve(__dirname, 'src/components')],
      loader: ExtractTextPlugin.extract('style?singleton', [`css-loader?modules&importLoaders=1&sourceMap=${CSS_MAPS}`, 'postcss-loader', `less-loader?sourceMap=${CSS_MAPS}`].join('!'))
    }, {
      test: /\.(less|css)$/,
      exclude: [path.resolve(__dirname, 'src/components')],
      loader: ExtractTextPlugin.extract('style?singleton', [`css?sourceMap=${CSS_MAPS}`, `postcss`, `less?sourceMap=${CSS_MAPS}`].join('!'))
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(xml|html|txt|md)$/,
      loader: 'raw'
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      loader: ENV === 'production' ? 'file?name=[path][name]_[hash:base64:5].[ext]' : 'url'
    }]
  },

  postcss: () => [autoprefixer({ browsers: 'last 2 versions' })],

  plugins: ([
    new DashboardPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
      disable: ENV !== 'production'
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({ defaultAttribute: "async" }),
    new CopyWebpackPlugin([{
      from: './manifest.json',
      to: './'
    }, {
      from: './favicon.ico',
      to: './'
    }])
  ]).concat(ENV === 'production' ? [
    new V8LazyParseWebpackPlugin(),

    // strip out babel-helper invariant checks
    new ReplacePlugin([{
      // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
      partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
      replacement: () => 'return;('
    }]),
    new OfflinePlugin({
      relativePaths: false,
      AppCache: false,
      caches: 'all',
      responseStrategy: 'cache-first',
      updateStrategy: 'changed',
      ServiceWorker: {
        events: true
      },
      publicPath: '/'
    })
  ] : []),

  stats: {
    colors: true
  },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
};

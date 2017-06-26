var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoPrefixer = require('autoprefixer');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = ROOT_PATH + '/release/bundle';
var APP_PATH = ROOT_PATH + '/client';

var dev = process.env.NODE_ENV !== 'production';

var plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  // new webpack.ProvidePlugin({
  //   $ : 'jQuery'
  // }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks : 1
  }),
  new ExtractTextPlugin({
    filename : 'bundle.css'
  })
];


if (!dev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        warnings : false,
        drop_console : true,
        drop_debugger : true
      }
    })
  );
}

var config = {
  entry : APP_PATH + '/index.js',
  output : {
   path : BUILD_PATH,
   filename : 'bundle.js'
  },
  resolve : {
    modules : [
      APP_PATH,
      'node_modules'
    ],
    alias : {
      // 'jQuery' : 'js/lib/jquery'
    }
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /(node_modules)/
      },
      {
        test : /\.jsx?/,
        include : APP_PATH,
        use : [{
          loader : 'babel-loader',
          options : { presets  : ['es2015'] }
        }]
      },
      {
        test : /\.html$/,
        use : ['file-loader?name=../[name].[ext]']
      },
      {
        test: /\.hbs$/,
        use : [{
          loader : 'handlebars-loader',
          options : {
            helperDirs : [
              path.join(APP_PATH, '/js/controllers/hbs')
            ],
            partialDirs : [
              path.join(APP_PATH, '/js/views/partials')
            ]
          }
        }]
      },
      {
        test : /\.css/,
        use : [{
          loader : 'css-loader'
        }]
      },
      {
        test : /\.styl$/,
        use : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use : [
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
        })
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/i,
        use : [{
          loader : 'file-loader?name=images/[name].[ext]'
        }]
      }
    ]
  },
  plugins : plugins
};

module.exports = config;

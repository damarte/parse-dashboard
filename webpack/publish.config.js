/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
var configuration = require('./base.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

configuration.entry = {
  dashboard: './dashboard/index.js',
  login: './login/index.js'
};
configuration.output.path = path.resolve('./Parse-Dashboard/public/bundles');
configuration.output.filename = "[name].[chunkhash].js";

var webpack = require('webpack');

// Enable minification
configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: '../Parse-Dashboard/index.template.html',
    filename: path.resolve('./Parse-Dashboard/public/index.html')
  }),
  function() {
    this.plugin('done', function(stats) {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        console.log(stats.compilation.errors);
        process.exit(1);
      }
    });
  }
);

module.exports = configuration;

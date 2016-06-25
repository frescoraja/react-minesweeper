"use strict";

module.exports = {
  context: __dirname,
  entry: "./react-minesweeper.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map'
};

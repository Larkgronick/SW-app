const path = require('path');

module.exports = {
    mode: "production",
    entry: ['babel-polyfill', './src/index.js'],
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    }
};
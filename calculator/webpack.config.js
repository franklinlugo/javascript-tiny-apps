const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    publicPath: '/public/',
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              url: false,
              sourceMaps: true,
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
};

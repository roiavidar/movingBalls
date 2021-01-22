const path = require('path');
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
  entry: {
    entry: './src/index.ts',
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Moving Balls',
      template: path.resolve(__dirname, './src/index.html'), // template file
      filename: 'index.html', // output file
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ],
  },
  module: {
    rules: [
         // TypeScript
         {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
       // Fonts and SVGs
       {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
       // CSS, PostCSS, and Sass
       {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ],
}
}
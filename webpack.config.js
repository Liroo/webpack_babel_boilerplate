const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({ autoprefixer: { grid: true }}),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    port: 8080,
    open: true,
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), //cleans the dist folder
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: "Webpack Babel Boilerplate",
      favicon: 'img/favicon.png',
      template: 'index.ejs'
    }),
  ],
};
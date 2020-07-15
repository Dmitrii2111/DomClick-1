const path = require('path'),
  HTMLplugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test:/\.jsx?$/,
        exclude: /node_modules\/?!(swiper|dom7)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/img',
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        exclude: /[^\.]svg/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'svg',
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
    ]
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
  resolve: {
        extensions: ['.js', '.jsx'],
        alias:{
            components: path.resolve(__dirname, 'src', 'components'),
            containers: path.resolve(__dirname, 'src', 'containers'),
            actions: path.resolve(__dirname, 'src', 'actions'),
            reducers: path.resolve(__dirname, 'src', 'reducers'),
            efi: path.resolve(__dirname, 'src', 'efi'),
            layouts: path.resolve(__dirname, 'src', 'layouts'),
            pug: path.resolve(__dirname, 'pug'),
            src: path.resolve(__dirname, 'src'),
        }
    },
  plugins: [
    new HTMLplugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
};
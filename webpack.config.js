let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
      rules:
      [
      	{
          test: /\.(sass|scss)$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          },
          {
              loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-cssnext')(),
              ]
            }
          },
          {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader:"file-loader",
          query:{
            name:'[name].[ext]',
            outputPath:'img/'
          }
        }
      ]
    },
  plugins: [
    new BrowserSyncPlugin({
    // browse to http://localhost:8000/ during development, 
    // ./public directory is being served 
      host: 'localhost',
      port: 8000,
      server: './',
      files: [
          "./src/*.js",
          "./*.html",
          "./src/templates/*.html",
          "./src/scss/**/*.scss"
        ]
    }),
    // Copy the images folder and optimize all the images
    new CopyWebpackPlugin([
      {
        from: './src/img/',
        to: './img'
      }
    ]),
    // new ImageminPlugin({
    //   disable: process.env.NODE_ENV !== 'production', // Disable during development
    //   pngquant: {
    //     quality: '60-70'
    //   }
    // })
    new ImageminPlugin(
    	{
    		disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpe?g|png|gif|svg)$/i
    	}
    ),
    new ExtractTextPlugin({
      filename: './style.css',
      allChunks: true
    }),
  ]
};



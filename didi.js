import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
const isDevelop = process.env.env === 'development';
const assetsImgPublicPath = isDevelop ? 'http://0.0.0.0:8080/assets/images/' : '//its.didistatic.com/official-website/assets/images/';
const assetsOutputPublicPath = isDevelop ? '/' : '//its.didistatic.com/official-website/';
export default {
  //配置 入口文件 If a string or array of strings is passed, the chunk is named main. If an object is passed, each key is the name of a chunk, and the value describes the entrypoint for the chunk.
  entry: {
    // flexibility: path.resolve(__dirname, 'src/js/lib/flexibility.js'),
    vendor: [path.resolve(__dirname, 'src/js/lib/jquery.js')],
    index: path.resolve(__dirname, 'src/js/index.js'),
    contact: path.resolve(__dirname, 'src/js/contact.js'),
    success: path.resolve(__dirname, 'src/js/success.js'),
    resolve: path.resolve(__dirname, 'src/js/resolve.js'),
    report: path.resolve(__dirname, 'src/js/report.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: assetsOutputPublicPath, // 网站运行时的访问路径。
    filename: "js/[name]-[hash].js",
  },
  module: {
    noParse: /es6Polyfill|jquery/,
    // rules for modules (configure loaders, parser options, etc.)
    rules: [

      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        exclude: /node_modules/,

        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: [require('babel-plugin-transform-class-properties')],
          cacheDirectory: true,
        }
      },

      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [

            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelop ? true : false,
                // minimize: isDevelop ? false : true,
              }
            },

            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelop ? 'inline' : '',
                plugins: function() {
                  return [
                    require('postcss-flexibility'),
                    require('autoprefixer')({
                      browsers: [
                        "Android 2.3",
                        "Android >= 4",
                        "Chrome >= 20",
                        "Firefox >= 24",
                        "Explorer >= 8",
                        "iOS >= 6",
                        "Opera >= 12",
                        "Safari >= 6"
                      ]
                    }),
                  ];
                }
              }
            },

            {
              loader: 'sass-loader', // 要安装node-sass
              options: {
                sourceMap: isDevelop ? true : false,
              }
            }
            // 'css-loader?modules',
            // 'postcss-loader?'
            // 'sass-loader?sourceMap' // 要安装node-sass

          ],
        })
      },


      // todo
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name]-[hash:6].[ext]',
            outputPath: 'assets/images/',
            publicPath: assetsImgPublicPath,
            // name: '../images/[name]-[hash].[ext]',
          }
        },
      },

      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: 'img:src img:data-src'
          },
        }
      },
      // {
      //   test: /\.scss$/,
      //   use: [

      //     {
      //       loader: 'style-loader'
      //     },

      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       }
      //     },

      //   ],
      // },

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  resolve: {
    // Create aliases to import or require certain modules more easily.
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    },

    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],

    // 自动扩展文件的后缀名，比如我们在import模块的时候，可以不用写后缀名的
    extensions: ['.js', '.json', '.css', '.scss'],

  },

  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  // devtool: "source-map",

  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/css/[name]-[hash].css', //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: isDevelop ? true : false,
      beautify: false,
      compress: {
        warnings: false,
        drop_console: false,
      },
      comments: false,
    }),

    // 第三方库文件模块的生成
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', //  将公共模块提取，生成名为`vendor`的chunk
      filename: 'js/vendor/vendor.js', // 生成的公共模块的存放路径
      minChunks: Infinity,
    }),

    // 生成入口文件的公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common/common-[hash].js',
      chunks: ['index', 'resolve', 'success', 'contact'],
    }),

    new HtmlWebpackPlugin({
      // template: 'html-withimg-loader!'+path.join(__dirname, 'src/html/index.html'), 
      template: path.join(__dirname, 'src/html/index.html'), // 源文件html模板路径
      filename: 'index.html',
      chunks: ['vendor', 'common', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
      inject: true, //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值，是以问号的形式添加
      cache: true,
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/contact.html'),
      filename: process.env.env === 'development' ? 'views/contact.html' : 'contact.html',
      chunks: ['vendor', 'common', 'contact'], // 需要引入的chunk，不配置就会引入所有页面的资源
      inject: true,
      // hash: true,
      cache: true,
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/success.html'),
      filename: process.env.env === 'development' ? 'views/success.html' : 'success.html',
      chunks: ['vendor', 'common', 'success'], // 需要引入的chunk，不配置就会引入所有页面的资源
      inject: true,
      // hash: true,
      cache: true,
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/resolve.html'),
      filename: process.env.env === 'development' ? 'views/resolve.html' : 'resolve.html',
      chunks: ['vendor', 'common', 'resolve'], // 需要引入的chunk，不配置就会引入所有页面的资源
      inject: true,
      // hash: true,
      cache: true,
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/report.html'),
      filename: process.env.env === 'development' ? 'views/report.html' : 'report.html',
      chunks: ['vendor', 'common', 'report'], // 需要引入的chunk，不配置就会引入所有页面的资源
      inject: true,
      // hash: true,
      cache: true,
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    // 定义全局变量，可以在开发代码中使用
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),


    new webpack.HotModuleReplacementPlugin(), //热加载

    new CopyWebpackPlugin([
      { from: 'src/js/lib/flexibility.js', to: 'js/lib/flexibility.js' },
    ])
  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 8080, //默认8080
    inline: true, //可以监控js变化
    hot: true, //热启动
  }
}

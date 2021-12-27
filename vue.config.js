const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const IS_PRO = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署应用包时的基本URL
  publicPath: './',

  // 打包输出目录
  outputDir: 'dist',

  // 存放静态资源（css,js,img)目录
  assetsDir: 'static',

  // 开发环境保存时做lint检查
  lintOnSave: process.env.NODE_ENV === 'development',

  productionSourceMap: false,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  devServer: {
    port: 9001, // 端口号
    open: true, // 自动打开浏览器
    overlay: {
      // 浏览器同时显示错误和警告
      warnings: false,
      errors: true
    },
    proxy: {
      // 代理
      '/api/': {
        target: 'http://localhost:7300/mock/60f9196edbd67e1250897d71/', // 目标代理接口地址
        secure: false,
        // changeOrigin: true,
        pathRewrite: {
          // 接口前缀过滤
          '^/api/': ''
        }
      }
    }
  },
  // 全局引入less
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [path.resolve(__dirname, 'src/styles/index.less')] // 引入全局样式变量
  //   }
  // },

  configureWebpack: (config) => {
    config.resolve.extensions = ['.js', '.vue', '.ts']
    const plugins = []
    if (IS_PRO) {
      // 为生产环境修改配置...

      config.optimization = {
        // 压缩js,需要nodev10以上，webpack4对应TerserPlugin下载v4版本
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true, // 多线程
            terserOptions: {
              comments: false,
              compress: {
                // 删除⽆⽤的代码
                unused: true,
                // 删掉 debugger
                drop_debugger: true, // eslint-disable-line
                // 移除 console
                drop_console: true, // eslint-disable-line
                // 移除⽆⽤的代码
                dead_code: true // eslint-disable-line
              }
            }
          })
        ],
        // 代码分割
        runtimeChunk: true, // 减少 entry chunk 体积
        splitChunks: {
          cacheGroups: {
            common: {
              minChunks: 2,
              // name: 'common',
              priority: 5,
              reuseExistingChunk: true, // 重用已存在代码块
              test: resolve('src')
            },
            vendor: {
              chunks: 'initial', // 代码分割类型
              name: 'vendor', // 代码块名称
              priority: 10, // 优先级
              test: /node_modules/ // 校验文件正则表达式
            }
          }, // 缓存组
          chunks: 'all' // 代码分割类型：all全部模块，async异步模块，initial入口模块
        } // 代码块分割
      }
    } else {
      // 为开发环境修改配置...
    }
    config.plugins = [...config.plugins, ...plugins]
  },

  chainWebpack(config) {
    // set alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@css', resolve('src/styles'))
      .set('@utils', resolve('src/utils'))
      .set('@img', resolve('src/assets/images'))

    // 缩减范围,开启babel-loader缓存
    config.module
      .rule('js')
      .exclude.add(resolve('node_modules'))
      .end()
      .use('babel-loader')
      .options({
        cacheDirectory: true
      })

    config.module.rule('less').include.add(resolve('src'))
    config.module.rule('vue').include.add(resolve('src'))
    config.module.rule('images').include.add(resolve('src/assets'))

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    if (IS_PRO) {
      // 压缩图片
      // config.module
      //   .rule('images')
      //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({
      //     mozjpeg: { progressive: true, quality: 65 },
      //     optipng: { enabled: false },
      //     pngquant: { quality: [0.65, 0.90], speed: 4 },
      //     gifsicle: { interlaced: false }
      //   })

      // 可视化结构
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        // {
        //   analyzerMode: 'static'
        // }
      ])

      // 压缩html
      config.plugin('html').tap((args) => {
        args[0].minify = {
          // 压缩HTML⽂件
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true, // 删除空⽩符与换⾏符
          minifyCSS: true // 压缩内联css
        }
        return args
      })

      // 压缩css  默认cssnano引擎
      config.plugin('css').use(OptimizeCSSAssetsPlugin, [
        {
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
          }
        }
      ])
    }
  }
}

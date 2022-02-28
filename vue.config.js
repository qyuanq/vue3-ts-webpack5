const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const IS_PRO = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署应用包时的基本URL
  publicPath: '/',

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
    port: 9001 // 端口号
    // overlay: {
    //   // 浏览器同时显示错误和警告
    //   warnings: false,
    //   errors: true
    // },
    // proxy: {
    //   // 代理
    //   '/api': {
    //     target: 'http://localhost:7300/mock/60f9196edbd67e1250897d71/', // 目标代理接口地址
    //     // secure: false,
    //     // changeOrigin: true,
    //     pathRewrite: {
    //       // 接口前缀过滤
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // 全局引入less
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/style/index.less')] // 引入全局样式变量
    }
  },

  configureWebpack: (config) => {
    config.resolve.extensions = ['.ts', '.vue', '.tsx', '.js', '.jsx', '.json']
    const plugins = []
    if (IS_PRO) {
      // 为生产环境修改配置...
      // 可视化结构
      // plugins.push(new BundleAnalyzerPlugin({
      //   analyzerPort: 9090
      // }))
      config.optimization = {
        minimize: true,
        minimizer: [
          // 压缩js webpack5内置TerserPlugin
          new TerserPlugin({
            parallel: true, // 默认启用多线程
            extractComments: false
          }),
          //压缩 css
          new CssMinimizerPlugin()
        ],
        // 代码分割
        runtimeChunk: true, // 减少 entry chunk 体积
        splitChunks: {
          cacheGroups: {
            // 配置提取模块的方案
            default: false,
            styles: {
              name: 'styles',
              test: /\.(s?css|less|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 10
            },
            common: {
              name: 'chunk-common',
              chunks: 'all',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              enforce: true,
              reuseExistingChunk: true
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 2,
              enforce: true,
              reuseExistingChunk: true
            }
          }
        }
      }
    } else {
      // 为开发环境修改配置...
      config.cache = {
        type: 'filesystem', // 启用持久化缓存
        cacheDirectory: resolve('.temp_cache'), // 缓存文件存放的位置
        buildDependencies: {
          // 缓存失效的配置
          config: [__filename]
        }
      }
    }
    config.plugins = [...config.plugins, ...plugins]
  },

  chainWebpack(config) {
    // set alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@css', resolve('src/style'))
      .set('@utils', resolve('src/utils'))
      .set('@img', resolve('src/assets/images'))

    // 缩减范围,开启babel-loader缓存
    // config.module
    //   .rule('js')
    //   .exclude.add(resolve('node_modules'))
    //   .end()
    //   .use('babel-loader')
    //   .options({
    //     cacheDirectory: true
    //   })

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
    }
  }
})

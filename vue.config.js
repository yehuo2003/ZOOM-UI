// Vue-CLI项目的核心配置文件
// module.exports = {
//   // Webpack开发服务器的设置
//   devServer: {
//     host: '127.0.0.1',
//     port: 8091
//   }
// }

const path = require('path'); //  路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //  webpack打包工具 需要安装 npm install uglifyjs-webpack-plugin

// 生产环境
const isProduction = process.env.NODE_ENV === 'production';

// 引入文件的方法
function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  pwa: {
    iconPaths: {
      favicon32: './favicon.ico',
      favicon16: './favicon.ico',
      appleTouchIcon: './favicon.ico',
      maskIcon: './favicon.ico',
      msTileImage: './favicon.ico'
    }
  },
  // 基本路径
  publicPath: './', //  原先2.x是baseurl  现在publicPath代替
  outputDir: 'dist',
  // 放置生产的静态资源 (js css img fonts) 的 (相对于 outputDir 的) 目录.
  assetsDir: "./",
  // 指定生成的 index.html  的输出路径 ( 相对于 outputDir ) 也可以是一个绝对路径
  indexPath: './',
  // eslint-loader, //  是否在保存的时候检查
  lintOnSave: true,
  devServer: {
    compress: false,  //  开启压缩
    open: true, //  自动开启浏览器
    // proxy: {
    //   '/apply' : {
    //     target: 'http://www.xxxxxx.com',  //  需要代理的服务器地址
    //     ws: true, //websocket 与后台形成一个通道  持续的
    //     changeOrigin: true, //  是否允许跨域
    //     pathRewrite: {  //  重写
    //       '/apply': '/'
    //     }
    //   }
    // }
  },
  // css 相关配置
  css: {
    // 是否使用css分离插件  ExtractTextPlugin
    extract: true,
    // sourceMaps (主要是方便开发人员的错误定位) 如果为true 打包时间将会大幅度加长
    sourceMap: false,
    // css 预设器配置项
    // loaderOptions: {
    //   // pass options to sass-loader
    //   sass: {
    //     // 引入全局变量样式
    //     data: `
    //       @import "@/assets/common/index.scss";
    //     `
    //   }
    // },
    // 启用CSS modules  for all css / pre-processor files.
    modules: false
  },

  // webpack  配置
  chainWebpack: config => {
    // 配置别名 不配置会报错
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/img"))
      .set("@scss", resolve("src/assets/common"));
      // 生产环境配置
      if (isProduction) {
        // 删除预加载
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        // 压缩代码
        config.plugins.minimize(true);
        // 分割代码
        config.plugins.splitChunks({
          chunks: 'all'
        })
        // 生产环境注入cdn
      }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入

      // 为生产环境修改配置...
      config.plugins.push(
        // 生产环境自动删除console debugger
        new UglifyJsPlugin({
          UglifyOptions: {
            compress: {
              // warnings : false,
              drop_debugger: true,
              drop_console: true
            }
          },
          // 是否生成sourceMap
          sourceMap: false,
          // 使用多进程并运行来提高构建速度
          parallel: true
        })
      )
    } else {
      // 为其他环境配置 比如测试环境
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // 启用并行化, 默认并发运行数: os.cpus().length - 1, 并行化可以显著加速构建
  parallel: require('os').cpus().length > 1
}

// 生产环境
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // publicPath: 'http://yehuo2003.gitee.io/zoom-ui-direction/',
  publicPath: isProduction ? 'zoom-ui-direction/' : '/',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
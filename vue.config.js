/*
 * @Description:配置文件
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2021-03-28 10:02:14
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-08 21:07:28
 */
// 生产环境
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // publicPath: 'http://yehuo2003.gitee.io/zoom-ui-direction/',
  // publicPath: isProduction ? 'zoom-ui-direction/' : '/',
  publicPath: isProduction ? './' : '/',
  // outputDir: 'dist',
  outputDir: 'docs',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    }
  },
}
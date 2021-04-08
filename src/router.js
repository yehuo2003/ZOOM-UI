/*
 * @Description:路由文件
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-21 22:51:24
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-08 20:39:57
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 动态引入路由
const routerList = [];
function importAll(r) {
  r.keys().forEach(
    (key) => routerList.push(r(key).default)
  );
}

importAll(require.context('./router', true, /\.routes\.js/))
// 整个项目的路由词典：访问路径 <=> 视图组件
export default new Router({
  mode: 'history',
  routes: [
    ...routerList,
    { path: '/', redirect: 'home' }
  ]
})

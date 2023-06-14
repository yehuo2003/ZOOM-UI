/*
 * @Description:  环境搭建路由
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-14 23:26:24
 */
export default {
  path: '/develop',
  component: () => import('../views/Layout.vue'),
  children: [
    {
      path: '/',
      component: () => import('../views/Develop.vue'),
      children: [
        { path: '/', redirect: '/develop/setting' },
        { path: '/develop/setting', component: () => import('../views/develop/develop-setting.vue') },  //  环境准备
        { path: '/develop/install-develop', component: () => import('../views/develop/install-develop.vue') },  //  安装
        { path: '/develop/use-develop', component: () => import('../views/develop/use-develop.vue') },  //  上手
        { path: '/develop/upgrade', component: () => import('../views/develop/upgrade.vue') },  //  升级
      ]
    }
  ]
}
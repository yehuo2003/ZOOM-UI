/*
 * @Description:SDK路由设置
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-24 17:29:31
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-03 12:06:01
 */
export default {
  path: '/SDK',
  component: () => import('../views/SDK.vue'),
  children: [
    { path: '/', redirect: '/SDK/explanation' },
    { path: '/SDK/explanation', component: () => import('../views/sdk/explanation.vue') },  //  说明
    { path: '/SDK/zoom-directive', component: () => import('../views/sdk/zoom-directive.vue') },  //  内置指令
    { path: '/SDK/internationalisation', component: () => import('../views/sdk/internationalisation.vue') },  //  国际化
    { path: '/SDK/dom-operation', component: () => import('../views/sdk/dom-operation.vue') },  //  DOM操作命令
    { path: '/SDK/date-format', component: () => import('../views/sdk/date-format.vue') },  //  日期格式化
    { path: '/SDK/cookie-operation', component: () => import('../views/sdk/cookie-operation.vue') },  //  cookie操作
    { path: '/SDK/deep-clone', component: () => import('../views/sdk/deep-clone.vue') },  //  深拷贝
    { path: '/SDK/random', component: () => import('../views/sdk/random.vue') },  //  随机数
    { path: '/SDK/copy', component: () => import('../views/sdk/copy.vue') },  //  复制
  ]
}
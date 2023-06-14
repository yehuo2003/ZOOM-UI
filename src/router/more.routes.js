/*
 * @Description:  更多页面
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-14 23:27:28
 */
export default {
  path: '/more',
  component: () => import('../views/Layout.vue'),
  children: [
    {
      path: '/',
      component: () => import('../views/More.vue')
    }
  ]
}
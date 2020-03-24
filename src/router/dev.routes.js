export default {
  path: '/develop',
  name: 'develop',
  component: () => import('../views/develop.vue'),
  children: [
    { path: '/', redirect: '/develop/setting' },
    { path: '/develop/setting', component: () => import('../views/develop-setting.vue') },  //  环境准备
    { path: '/develop/install-develop', component: () => import('../views/install-develop.vue') },  //  安装
    { path: '/develop/use-develop', component: () => import('../views/use-develop.vue') },  //  上手
    { path: '/develop/upgrade', component: () => import('../views/upgrade.vue') },  //  升级
  ]
}
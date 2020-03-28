export default {
  path: '/SDK',
  component: () => import('../views/SDK.vue'),
  children: [
    { path: '/', redirect: '/SDK/software-kit' },
    { path: '/SDK/software-kit', component: () => import('../views/sdk/software-kit.vue') },  //  安装
  ]
}
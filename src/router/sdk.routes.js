export default {
  path: '/SDK',
  name: 'SDK',
  component: () => import('../views/SDK.vue'),
  children: [
    { path: '/', redirect: '/SDK/software-kit' },
    { path: '/SDK/software-kit', component: () => import('../views/software-kit.vue') },  //  安装
  ]
}
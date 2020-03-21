export default {
  path: '/main',
  name: 'main',
  component: () => import('../views/Main.vue'),
  children: [
    { path: '/', redirect: '/component/index' },
    { path: '/component/index', component: () => import('../views/index.vue') },
    { path: '/security', component: () => import('../views/Security.vue') },
  ]
}
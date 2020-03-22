export default {
  path: '/main',
  name: 'main',
  component: () => import('../views/Main.vue'),
  children: [
    { path: '/', redirect: '/component/install-develop' },
    { path: '/component/install-develop', component: () => import('../views/install-develop.vue') },  //  安装
    { path: '/component/custom-icon', component: () => import('../views/custom-icon.vue') },  //  icon
    { path: '/component/zoom-button', component: () => import('../views/zoom-button.vue') },  //  button
    { path: '/component/zoom-input', component: () => import('../views/zoom-input.vue') },  //  input
    { path: '/component/zoom-dropdown', component: () => import('../views/zoom-dropdown.vue') },  //  dropdown
    { path: '/component/zoom-search', component: () => import('../views/zoom-search.vue') },  //  search
    { path: '/test', component: () => import('../views/test.vue') },
  ]
}
export default {
  path: '/component',
  name: 'component',
  component: () => import('../views/Component.vue'),
  children: [
    { path: '/', redirect: '/component/zoom-button' },
    { path: '/component/custom-icon', component: () => import('../views/custom-icon.vue') },  //  icon
    { path: '/component/zoom-button', component: () => import('../views/zoom-button.vue') },  //  button
    { path: '/component/zoom-input', component: () => import('../views/zoom-input.vue') },  //  input
    { path: '/component/zoom-dropdown', component: () => import('../views/zoom-dropdown.vue') },  //  dropdown
    { path: '/component/zoom-search', component: () => import('../views/zoom-search.vue') },  //  search
    { path: '/component/zoom-numeric', component: () => import('../views/zoom-numeric.vue') },  //  numeric
    { path: '/component/zoom-textarea', component: () => import('../views/zoom-textarea.vue') },  //  textarea
    { path: '/component/zoom-testing', component: () => import('../views/zoom-testing.vue') },  //  testing
    { path: '/component/zoom-captcha', component: () => import('../views/zoom-captcha.vue') },  //  captcha
    { path: '/component/zoom-slider', component: () => import('../views/zoom-slider.vue') },  //  slider
    { path: '/component/zoom-text-popup', component: () => import('../views/zoom-text-popup.vue') },  //  text-popup
    { path: '/component/zoom-date', component: () => import('../views/zoom-date.vue') },  //  date
    { path: '/component/zoom-switch', component: () => import('../views/zoom-switch.vue') },  //  switch
    { path: '/test', component: () => import('../views/test.vue') },
  ]
}
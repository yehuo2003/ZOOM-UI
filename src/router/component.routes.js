export default {
  path: '/component',
  name: 'component',
  component: () => import('../views/Component.vue'),
  children: [
    { path: '/', redirect: '/component/zoom-button' },
    { path: '/component/custom-color', component: () => import('../views/component/custom-color.vue') },  //  色彩
    { path: '/component/custom-icon', component: () => import('../views/component/custom-icon.vue') },  //  icon
    { path: '/component/custom-layout', component: () => import('../views/component/custom-layout.vue') },  //  layout
    { path: '/component/zoom-row-col', component: () => import('../views/component/zoom-row-col.vue') },  //  row-col
    { path: '/component/zoom-button', component: () => import('../views/component/zoom-button.vue') },  //  button
    { path: '/component/zoom-input', component: () => import('../views/component/zoom-input.vue') },  //  input
    { path: '/component/zoom-dropdown', component: () => import('../views/component/zoom-dropdown.vue') },  //  dropdown
    { path: '/component/zoom-search', component: () => import('../views/component/zoom-search.vue') },  //  search
    { path: '/component/zoom-numeric', component: () => import('../views/component/zoom-numeric.vue') },  //  numeric
    { path: '/component/zoom-textarea', component: () => import('../views/component/zoom-textarea.vue') },  //  textarea
    { path: '/component/zoom-testing', component: () => import('../views/component/zoom-testing.vue') },  //  testing
    { path: '/component/zoom-captcha', component: () => import('../views/component/zoom-captcha.vue') },  //  captcha
    { path: '/component/zoom-slider', component: () => import('../views/component/zoom-slider.vue') },  //  slider
    { path: '/component/zoom-text-popup', component: () => import('../views/component/zoom-text-popup.vue') },  //  text-popup
    { path: '/component/zoom-date', component: () => import('../views/component/zoom-date.vue') },  //  date
    { path: '/component/zoom-switch', component: () => import('../views/component/zoom-switch.vue') },  //  switch
    { path: '/component/zoom-radio', component: () => import('../views/component/zoom-radio.vue') },  //  radio
    { path: '/component/zoom-checkbox', component: () => import('../views/component/zoom-checkbox.vue') },  //  checkbox
    { path: '/component/zoom-form', component: () => import('../views/component/zoom-form.vue') },  //  form
    { path: '/component/zoom-file-upload', component: () => import('../views/component/zoom-file-upload.vue') },  //  file-upload
    { path: '/test', component: () => import('../views/test.vue') },
  ]
}
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import plugin from './plugins/index.js'
// import plugin from './plugins/index.js'
// import plugin from require('./plugins/index.js');
// declare global {
//   interface Window { require: any; }
// }
// const plugin = window.require('./plugins/index.js')

Vue.use(plugin)
// Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

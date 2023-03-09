/*
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-04-02 19:04:06
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-09-11 12:34:09
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import zoomUI from './plugins/index.js'

Vue.use(zoomUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

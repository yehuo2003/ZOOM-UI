/*
 * @Description:入口配置文件
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-21 22:51:24
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-14 22:51:30
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import zoomUI from 'zoom-design'
import 'zoom-design/lib/zoom-design.css'
import Hljs from 'highlight.js'
import customCode from "./components/customCode";
import tabTemplate from "./components/tabTemplate";
import attribute from "./components/attribute";
import VueClipboard from 'vue-clipboard2'
import 'highlight.js/styles/atom-one-dark.css'	//	yes
//import 'highlight.js/styles/github.css'
//import 'highlight.js/styles/darkula.css'		//	橙色标签
//import 'highlight.js/styles/atelier-seaside-dark.css'	//	清晰

// 引入zoom-ui
Vue.use(zoomUI);

// 注册复制组件
Vue.use(VueClipboard)

// 全局注册Highlight v-highlight
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
Vue.use(Highlight);
// 自定义代码片段组件
Vue.component('tab-template', tabTemplate);
Vue.component('custom-code', customCode);
Vue.component('attribute', attribute);


new Vue({
  router,
  store,
  Highlight,
  render: h => h(App)
}).$mount('#app')
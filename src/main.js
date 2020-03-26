import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import zoomUI from 'zoom-ui-1.0'
import 'zoom-ui-1.0/lib/zoom-ui-1.0.css'
import Hljs from 'highlight.js'
import customCode from "./components/customCode";
import attribute from "./components/attribute";
import 'highlight.js/styles/atom-one-dark.css'	//	yes
//import 'highlight.js/styles/github.css'
//import 'highlight.js/styles/darkula.css'		//	橙色标签
//import 'highlight.js/styles/atelier-seaside-dark.css'	//	清晰

// 路由守卫 每次跳转完了后默认回到顶部
router.afterEach((to,from,next)=>{
  window.scrollTo(0, 0);
})

Vue.use(zoomUI);

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
Vue.component('custom-code', customCode);
Vue.component('attribute', attribute);


new Vue({
  router,
  store,
  Highlight,
  render: h => h(App)
}).$mount('#app')

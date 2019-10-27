import '../assets/fontIcon/iconfont.css'
// import msg from './msg/msg.vue'
// import btn from './button/button.vue'
// let plugins = {};

// plugins.install = function(Vue) {
//     // 全局的属性或方法
//     Vue.prototype.$zoom = 'this is zoom';
//     Vue.prototype.$myMethod = function() {
//         console.log('我是$myMethod方法');
//     }
//     Vue.directive('focus', {
//         inserted: function(el) {
//             el.focus();
//         }
//     })
//     Vue.component(msg.name, msg);
//     Vue.component(btn.name, btn);
// }

// export default plugins

// 路径 是否查找子目录 .vue
const requireComponent = require.context('./', true, /\.vue$/);
const install = Vue => {
    Vue.directive('focus', {
        inserted: function(el) {
            el.focus();
        }
    })
    Vue.prototype.$id = function(id) {
        return document.getElementById(id);
    }
    Vue.prototype.$rn = function(min,max){
        var n = Math.random()*(max-min)+min;
        return Math.floor(n)
    }
    Vue.prototype.$rc = function(min,max){
        var r = this.$rn(min,max);
        var g = this.$rn(min,max);
        var b = this.$rn(min,max);
        return `rgb(${r},${g},${b})`
    }
    if (install.installed) return;
    install.installed;
    requireComponent.keys().map(component => {
        // 拿到组件
        const config = requireComponent(component);
        // 拿到组件名
        const componentName = config.default.name;

        Vue.component(componentName, config.default || config);
    })
}

export default {
    install
}
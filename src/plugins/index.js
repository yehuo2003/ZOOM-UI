import '../assets/fontIcon/iconfont.css'
import './dom.js'

// 路径 是否查找子目录 .vue
const requireComponent = require.context('./', true, /\.vue$/);
const install = Vue => {
    Vue.directive('focus', {
        inserted: function(el) {
            el.focus();
        }
    })
    // 深拷贝方法
    Vue.prototype.clone = function(obj) {
        let clonedObj;
        // 判断直接数据类型
        if (['number', 'string', 'boolean', 'undefined', 'symbol',].includes(typeof obj)
            || obj === null) {
            clonedObj = obj;
            return clonedObj;
        }
        const constructor = obj.constructor || Object;
        clonedObj = new constructor();
        Object.entries(obj).forEach(([key, value]) => {
            clonedObj[key] = Vue.prototype.clone(value);
        })
        return clonedObj;
    }
    Vue.prototype.$id = function(id) {
        return document.getElementById(id);
    }
    // 随机数
    Vue.prototype.$rn = function(min,max){
        var n = Math.random()*(max-min)+min;
        return Math.floor(n)
    }
    // 随机颜色
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
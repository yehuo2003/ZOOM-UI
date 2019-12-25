// import Vue from 'vue'
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
    Vue.prototype.dateFormat= function(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
        //  用法
        //         let date = new Date()
        // dateFormat("YYYY-mm-dd HH:MM", date)
        return fmt;
    }
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
        // 全局注册弹出框组件
        if (componentName === 'zoom-popup') {
            const Popup = config.default;
            const PopupBox = Vue.extend(Popup);
            Popup.install = function (data) {
                let instance = new PopupBox({
                    data
                }).$mount()

                document.body.appendChild(instance.$el)

                Vue.nextTick(() => {
                    instance.show = true
                    // show 和弹窗组件里的show对应，用于控制显隐
                })
            }
            Vue.prototype.$popup = Popup.install;
        }

        Vue.component(componentName, config.default || config);
    })
}

export default {
    install
    // ,
    // Popup
}
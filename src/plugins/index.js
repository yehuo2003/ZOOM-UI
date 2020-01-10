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
    Vue.directive('drag', {
        inserted: function(el) {
            el.onmousedown = function(e) {
                var disx = e.pageX - el.offsetLeft;
                var disy = e.pageY - el.offsetTop;

                document.onmousemove = function(e) {
                    el.style.left = e.pageX - disx + 'px';
                    el.style.top = e.pageY - disy + 'px';
                }

                document.onmouseup = function() {
                    document.onmousemove = document.onmouseup = null;
                }
            }
        }
    })
    // 自定义方法
    Vue.prototype.$zoom = {};
    Vue.prototype.$zoom.dateFormat = function(fmt, date) {
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
    /**
     *  cookie 增删改查方法
     *  set 设置一条cookie  eg : this.$zoom.cookie.set("info", { name : "zoom", age : 23});
     *  setChild    设置子cookie    eg : this.$zoom.cookie.setChild("info", "sex", "boy");
     *  get 获取一条 / 所有 cookie  eg : this.$zoom.cookie.get("info");
     *  getChild    获取一条cookie下的某个子属性    eg : this.$zoom.cookie.getChild("info", "name");
     *  del 删除某条cookie      eg : this.$zoom.cookie.del("info");
     *  delChild    删除某条cookie下的某个属性      eg : this.$zoom.cookie.delChild("info", "name");
     */
    Vue.prototype.$zoom.cookie = {
        /** 设置一条完整的cookie
        *   param name : 表示cookie的名称，必填
        *   param subCookies : 表示cookie的值，为一个对象，必填
        *   param expires : 表示cookie的过期时间，可以不填
        *   param domain : 表示cookie的域名，可以不填
        *   param path : 表示cookie的路径，可以不填
        *   param secure : 表示cookie的安全标志，可以不填
        *   eg : this.$zoom.cookie.set("info", { name : "zoom", age : 23});
        **/
        set : function (name, subCookies, expires, domain, path, secure) {
            if (!name) {
                throw Error('zoom-ui SyntaxError: cookie名称和值为必填属性! ')
            }
            var cookieText = "", subName, cookieParts = [];
            cookieText += encodeURIComponent(name) + "=";
            for(subName in subCookies) {
                cookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
            }
            if (cookieParts.length > 0) {
                cookieText += cookieParts.join("&");
                if (expires instanceof Date) {
                    cookieText += "; expires=" + expires.toGMTString();
                }
                if (path) {
                    cookieText += "; path=" + path;
                }
                if (domain) {
                    cookieText += "; domain=" + domain;
                }
                if (secure) {
                    cookieText += "; secure";
                }
            } else {
                cookieText += "; expires=" + new Date(0).toGMTString();
            }
            document.cookie = cookieText;
        },
        /** 设置一条子cookie
        *   param name : 表示cookie的名称，必填
        *   param subName : 表示子cookie的名称，必填
        *   param value : 表示子cookie的值，必填
        *   param expires : 表示cookie的过期时间，可以不填
        *   param domain : 表示cookie的域名，可以不填
        *   param path : 表示cookie的路径，可以不填
        *   param secure : 表示cookie的安全标志，可以不填
        *   eg : this.$zoom.cookie.setChild("info", "sex", "boy");
        **/
       setChild : function (name, subName, value, expires, domain, path, secure) {
            if (!name || !subName || !value) {
                throw Error('zoom-ui SyntaxError: cookie名称和cookie子属性名称以及cookie子属性的值为必填属性! ')
            }
            var cookies = this.get(name) || {};
            cookies[subName] = value;
            this.set(name, cookies, expires, domain, path, secure);
        },
        /** 读取一条完整cookie
         *  如果没传参数则默认读取所有cookie
        *   param name : 表示cookie的名称，不填默认获取所有cookie
        *   return : 一个cookie对象
        *   eg : this.$zoom.cookie.get("info");
        **/
        get : function (name) {
            if (!name) {
                return document.cookie;
            }
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = "", i, len, subCookies, parts, result = {};
            if (cookieStart > -1) {
                var cookieEnd = document.cookie.indexOf (";", cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                if (cookieValue.length > 0) {
                    subCookies = cookieValue.split("&");
                    for (i = 0, len = subCookies.length; i < len; i++) {
                        parts = subCookies[i].split("=");
                        result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    }
                    return result;
                }
            }
            return null;
        },
        /** 获取一条子cookie的值
        *   param name : 表示cookie的名称，必填
        *   param subName : 表示子cookie的名称
        *   return : 一个子cookie的值
        *   eg : this.$zoom.cookie.getChild("info", "name");
        **/
        getChild : function (name, subName) {
            if (!name || !subName) {
                throw Error('zoom-ui SyntaxError: cookie名称和cookie子属性名称为必填属性! ')
            }
            var cookies = this.get(name);
            if (cookies) {
                return cookies[subName];
            } else {
                return null;
            }
        },
        /** 删除一条完整cookie
        *   param name : 表示cookie的名称，必填
        *   param domain : 表示cookie的域名，可以不填
        *   param path : 表示cookie的路径，可以不填
        *   param secure : 表示cookie的安全标志，可以不填
        *   eg : this.$zoom.cookie.del("info");
        **/
        del : function (name, domain, path, secure) {
            if (!name) {
                throw Error('zoom-ui SyntaxError: cookie名称为必填属性! ')
            }
            this.set(name, "", new Date(0).toGMTString(), domain, path, secure);
        },
        /** 删除一条子cookie
        *   param name : 表示cookie的名称，必填
        *   param subName : 表示子cookie的名称，必填
        *   param domain : 表示cookie的域名，可以不填
        *   param path : 表示cookie的路径，可以不填
        *   param secure : 表示cookie的安全标志，可以不填
        *   eg : this.$zoom.cookie.delChild("info", "name");
        **/
        delChild : function (name, subName, domain, path, secure) {
            if (!name || !subName) {
                throw Error('zoom-ui SyntaxError: cookie名称和cookie子属性名称为必填属性! ')
            }
            var cookies = this.get(name);
            if (cookies) {
                delete cookies[subName];
                this.set(name, cookies, null, domain, path, secure);
            }
        }
    };
    // 清除当前所有cookie
    Vue.prototype.$zoom.clearCookie = function() {
        var keys = document.cookie.match(/[^ =;]+(?==)/g)
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.zoom.cn
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.zoom.cn
                document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .zoom.cn
            }
        }
    }
    // 深拷贝方法
    Vue.prototype.$zoom.clone = function(obj) {
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
            clonedObj[key] = this.clone(value);
        })
        return clonedObj;
    }
    Vue.prototype.$zoom.$id = function(id) {
        return document.getElementById(id);
    }
    // 随机数
    Vue.prototype.$zoom.$rn = function(min,max){
        var n = Math.random()*(max-min)+min;
        return Math.floor(n)
    }
    // 随机颜色
    Vue.prototype.$zoom.$rc = function(min,max){
        var r = this.$zoom.$rn(min,max);
        var g = this.$zoom.$rn(min,max);
        var b = this.$zoom.$rn(min,max);
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
            Vue.prototype.$zoom.popup = Popup.install;
        }
        if (componentName === 'zoom-alert') {
            const Alert = config.default;
            const AlertBox = Vue.extend(Alert);
            Alert.install = function (data) {
                let instance = new AlertBox({
                    data
                }).$mount()

                document.body.appendChild(instance.$el)

                Vue.nextTick(() => {
                    instance.show = true
                    // show 和弹窗组件里的show对应，用于控制显隐
                })
            }
            Vue.prototype.$zoom.alert = Alert.install;
        }
        Vue.component(componentName, config.default || config);
    })
}

export default {
    install
    // ,
    // Popup
}
// import Vue from 'vue'
import '../assets/fontIcon/iconfont.css'
import './common/dom.js'

// tip组件 全局注册 v-tip可引用
import Vtip from './tips/index'
// 懒加载图片
import lazyload from './common/lazyLoad.js';

import lang from './common/lang/index';

// 路径 是否查找子目录 .vue
const requireComponent = require.context('./', true, /\.vue$/);
const install = Vue => {
    // 注册指令使用
    Vue.use(Vtip.directive);
	// 参数均为可选
    Vue.use(lazyload, {
        scrollDistance: 15, // 距离可视区还有15px时开发加载资源
    })

    Vue.directive('focus', {
        inserted: function(el) {
            el.focus();
        },
        update: function(el, value) {
            if (value) {
                el.focus();
            }
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
    Vue.prototype.$zoom = {
        /**
         * @function 获取当前语言
         * @deprecated 先根据url判断, 如果没有就取 localStorage.language, 如果没有设置则默认显示中文
         */
        getLanguage() {
            let lang = localStorage.getItem('language') || 'zh';
            let url = window.location.href.toLowerCase();
            if (url.indexOf('zh') > -1) {
                lang = 'zh';
            } else if (url.indexOf('en') > -1) {
                lang = 'en';
            }
            return {locale: lang, detail: this.LanguageInfo};
        },
        /**
         * @function 设置国际化语言传入对象
         * @param {lang.locale} lang // 'zh' 'en'
         * @param {lang.detail} Object // {zh: {'xx': 'xx'}, en: {'xx': 'xx'}}
         * @type String
         */
        setLanguage(lang) {
            let langArr = ['zh', 'en'];
            if (lang.locale && langArr.includes(lang.locale.toLowerCase())) {
                localStorage.setItem('language', lang.locale);
                // 判断是否为对象 如果是就遍历对象,将对应key值的数据存入this.LanguageInfo中
                if (lang.detail && Object.prototype.toString.call(lang.detail) === '[object Object]') {
                    for(var key in lang.detail) {
                        this.LanguageInfo[key] = Object.assign({}, lang.detail[key] ,this.LanguageInfo[key])
                    }
                }
            }
            console.log(this.getLanguage(), '===this.getLanguage()==');
            return this.getLanguage();
        },
        // 国际化对象 不推荐用户直接调用
        LanguageInfo: lang,
        /**
         * @function展示当前国际化
         * @param {val:String} val $zoom.$t('xxx')
         * @param {parameter: String} val $zoom.$t('xxx', {count1: 'xx', count2: 'xx'})
         */
        $t(val, parameter) {
            if (val && val.length && val.length > 0) {
                const language = this.getLanguage().locale;
                if (!val && !language) {
                    return;
                }
                if (this.LanguageInfo[language] && this.LanguageInfo[language][val]) {
                    let value = this.LanguageInfo[language][val];
                    // 判断用户是否配置了parameter, 如果有就用parameter对应key值替换国际化里的数据再返回给用户
                    if (parameter && Object.prototype.toString.call(parameter) === '[object Object]') {
                        for (let key in parameter) {
                            value = value.replace(`{${key}}`, parameter[key]);
                        }
                    }
                    return value;
                }
            }
        },
        /**
         *
         * @param {"YYYY-mm-dd HH:MM"} fmt
         * @param {new Date()} date
         * @author linzhuming
         * @time 2020年1月11日23:01:58
         * 日期格式化
         * eg let date = new Date()
         * dateFormat("YYYY-mm-dd HH:MM", date)
         */
        dateFormat(fmt, date) {
            date = new Date(date);
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
            return fmt;
        },
        /**
         * @param {object, Array} obj
         * @author linzhuming
         * @time 2019年11月11日21:18:38
         * 深拷贝方法, 递归方式对数组和对象进行深拷贝
         */
        clone(obj) {
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
        },
        /**
         * @param {string} id
         * @author linzhuming
         * @time 2018年
         * 根据id获取dom元素 并返回当前对象
         */
        $id(id) {
            return document.getElementById(id);
        },
        /**
         *
         * @param {number} min
         * @param {number} max
         * @author linzhuming
         * @time 2018年
         * 随机数
         * 输入最小数和最大数, 获取其中的随机数
         */
        $rn(min, max) {
            var n = Math.random()*(max-min)+min;
            return Math.floor(n)
        },
        /**
         *
         * @param {number} min
         * @param {number} max
         * @author linzhuming
         * @time 2018年
         * 随机颜色
         * 输入最小数和最大数, 获取其中的颜色值, 不输入默认min为0, max为255
         */
        $rc(min, max) {
            if (!min || min < 0) {
                min = 0;
            }
            if (!max || max > 255) {
                max = 255;
            }
            var r = this.$zoom.$rn(min,max);
            var g = this.$zoom.$rn(min,max);
            var b = this.$zoom.$rn(min,max);
            return `rgb(${r},${g},${b})`
        },
        /**
         *  cookie 增删改查方法
         *  set 设置一条cookie  eg : this.$zoom.cookie.set("info", { name : "zoom", age : 23});
         *  setChild    设置子cookie    eg : this.$zoom.cookie.setChild("info", "sex", "boy");
         *  get 获取一条 / 所有 cookie  eg : this.$zoom.cookie.get("info");
         *  getChild    获取一条cookie下的某个子属性    eg : this.$zoom.cookie.getChild("info", "name");
         *  del 删除某条cookie      eg : this.$zoom.cookie.del("info");
         *  delChild    删除某条cookie下的某个属性      eg : this.$zoom.cookie.delChild("info", "name");
         */
        cookie: {
            /** 设置一条完整的cookie
            *  @param name : 表示cookie的名称，必填
            *  @param subCookies : 表示cookie的值，为一个对象，必填
            *  @param expires : 表示cookie的过期时间，可以不填
            *  @param domain : 表示cookie的域名，可以不填
            *  @param path : 表示cookie的路径，可以不填
            *  @param secure : 表示cookie的安全标志，可以不填
            *   eg : this.$zoom.cookie.set("info", { name : "zoom", age : 23});
            **/
            set(name, subCookies, expires, domain, path, secure) {
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
            *  @param name : 表示cookie的名称，必填
            *  @param subName : 表示子cookie的名称，必填
            *  @param value : 表示子cookie的值，必填
            *  @param expires : 表示cookie的过期时间，可以不填
            *  @param domain : 表示cookie的域名，可以不填
            *  @param path : 表示cookie的路径，可以不填
            *  @param secure : 表示cookie的安全标志，可以不填
            *   eg : this.$zoom.cookie.setChild("info", "sex", "boy");
            **/
            setChild(name, subName, value, expires, domain, path, secure) {
                if (!name || !subName || !value) {
                    throw Error('zoom-ui SyntaxError: cookie名称和cookie子属性名称以及cookie子属性的值为必填属性! ')
                }
                var cookies = this.get(name) || {};
                cookies[subName] = value;
                this.set(name, cookies, expires, domain, path, secure);
            },
            /** 读取一条完整cookie
             *  如果没传参数则默认读取所有cookie
            *  @param name : 表示cookie的名称，不填默认获取所有cookie
            *   return : 一个cookie对象
            *   eg : this.$zoom.cookie.get("info");
            **/
            get(name) {
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
            *  @param name : 表示cookie的名称，必填
            *  @param subName : 表示子cookie的名称
            *   return : 一个子cookie的值
            *   eg : this.$zoom.cookie.getChild("info", "name");
            **/
            getChild(name, subName) {
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
            *  @param name : 表示cookie的名称，必填
            *  @param domain : 表示cookie的域名，可以不填
            *  @param path : 表示cookie的路径，可以不填
            *  @param secure : 表示cookie的安全标志，可以不填
            *   eg : this.$zoom.cookie.del("info");
            **/
            del(name, domain, path, secure) {
                if (!name) {
                    throw Error('zoom-ui SyntaxError: cookie名称为必填属性! ')
                }
                this.set(name, "", new Date(0).toGMTString(), domain, path, secure);
            },
            /** 删除一条子cookie
            *  @param name : 表示cookie的名称，必填
            *  @param subName : 表示子cookie的名称，必填
            *  @param domain : 表示cookie的域名，可以不填
            *  @param path : 表示cookie的路径，可以不填
            *  @param secure : 表示cookie的安全标志，可以不填
            *   eg : this.$zoom.cookie.delChild("info", "name");
            **/
            delChild(name, subName, domain, path, secure) {
                if (!name || !subName) {
                    throw Error('zoom-ui SyntaxError: cookie名称和cookie子属性名称为必填属性! ')
                }
                var cookies = this.get(name);
                if (cookies) {
                    delete cookies[subName];
                    this.set(name, cookies, null, domain, path, secure);
                }
            },
            /**
             * 清除当前所有cookie
             */
            clear() {
                var keys = document.cookie.match(/[^ =;]+(?==)/g)
                if (keys) {
                    for (var i = keys.length; i--;) {
                        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.zoom.cn
                        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.zoom.cn
                        document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .zoom.cn
                    }
                }
            }
        },
        // tip工具函数调用
        tip: Vtip.tip
    };
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
}
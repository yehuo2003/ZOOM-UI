// import Vue from 'vue'
import '../assets/fontIcon/iconfont.css'
import './common/dom.js'

// tip组件 全局注册 v-tip可引用
import Vtip from './tips/index'
// 国际化
import lang from './common/lang/index';

// 路径 是否查找子目录 .vue
const requireComponent = require.context('./', true, /\.vue$/);
const install = Vue => {
    // 懒加载 指令 v-lazyload
    let lazyload = {
        install(vue, payload) {
            // 数组扩展移除元素
            if (!Array.prototype.remove) {
                Array.prototype.remove = function (item) {
                    if (!this.length) return
                    let index = this.indexOf(item);
                    if (index > -1) {
                        this.splice(index, 1);
                        return this
                    }
                }
            }

            // 默认值图片
            let defaultImage = 'data:image/gif;base64,R0lGODlhMQHcAPQAAAAAAJiYmJmZmZ2dnaCgoKWlpampqaurq7S0tL29vcXFxdHR0dvb2+Pj4+jo6Onp6erq6u7u7vHx8fX19fb29vf39/n5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAACH5BAQGAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAMQHcAAAF/iAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3og0T+FL6/j4LDAxAAIEfFAYIEfZgMFCAAAUWDDpJyOBBRB0MEjhseFHiEn8JH2Bs+JCBx4kI/h/o0yFQQIABEE82oagyh4KGAQyslPkRpEIbDF0OGLCgI08lPnfSaLnR4tGZNGsEFer0KROKKWkgcPhSwT6rUCnOuCmUqFGwSbAqfcG0JNqFJl0kjaGRZNUVC4q+xbsggd4WDULGaPtXRQMEAQIoiLv3BAK/kO+iCJz1RYO2BQ0jYBpgQWMUj/tGlnC2ROC1LAK3RF2CrMOmpT/nTQCZ9gLWGBOkCIw4QNmBpD+fQFjbdoIHEpDkxWnA98PYwkfMNk47QWYidV+XXfA1egoGCoobRx6ErO+XQ3UG957agHi/0HHUPT90gM7u7FssCF/8eg/OvsWU3wyhVecfDwr8/obbgICBR9uCOCiwGn4MagFhhRhmqOGGHHboRQMaPSbiiCSuV0SIJKb4GGNgAfibARulR2EQCZDU3IsC4HQgTwHhOECM9uU4wI5AuOgjV4UdNdWRXNXXgBG9NZlejtq9JNlRPTLnm5YCXPjfjy45x6VZeyUVEmUVPancmTShyaKHcMYp55x01jnWg0IYsKKdJ7gmQAIm8lDjVorFB+dhMKI3gJo+RMmVlxlmlKNzXc2oQ4I4/gSneVIuGgSincJ4JYZZMidAkkCUquCGkg7g3EZeIeHoazBZGh2nTXpF5AiMyhAYaAkYKWB+QMI4gKYnhLirCgEBuhsDhNbX3JvC/i3p0m22imCes2wJFet3EoKZGLXCMYXqcGA6NCoKD3Dm2QoNlLrsXgvsqYJIHPjJ7QgSKGuao8OqkBFBfIqgKgNnuaZba8ydWzAHvZLAAIAzYvbvq+rZGTFexv5IrsUXe5ttnBuXsJ92BgwnIWwmMLDqwyWPAB6MLJug0WvQmRroyBuW7Oep0IFsGgcYkztnzBwkQJ8CyaGgtEOLpUCzkw+LsLG1+Dr9WsYqT+2wnFcDnO3MGxmKKdVVQyxdxwIYPYLQwxFW8MYW6Nu01OnOy8HEzgWsscRg7ov3a3dL7VKXhae9dwIEswC31I2nkDWddHe9Ec8aVo7dj1amrXmj/ok5hPmhJhhaQ43XIs3h50MIVjXrfMIee+mKq12C6UfTXrvtJOBOue678z6C73XKXrvxxwMfPK/KL291884LLwLxr0MfvfQcUO+59ddjr73iyHfvvfi7cU/++OdPZn764aePvvvq3w6/YevP3/787+Mff+/6w1t///frX/4EuL/hETA1/ztgAA84QAYWcHoOBEwCI7jACDbQgg/MHgblMsENVnCDFwRhBr/nwQ6KMIQnHGEKYfDBFaLQhSdoIQxlOEMTwvB58rthDGioQx720IY6ZF4Og+grIBIRh/w74gx8qEQmNtGIShRiEqNIAydS0YpXhCIVSYDFLXbRi1rcC+LQhijGG3yxCCEAACH5BAUGAAAALKEATQAMABAAhPz8/JiYmJmZmZ2dnaCgoKWlpampqaurq7S0tL29vcXFxdHR0dvb2+Pj4+jo6Onp6erq6u7u7vHx8fX19fb29vf39/n5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAUnICCOIseR6Gmio6my6gm7cgq4M57SdUuzN91O6CP6grlJr7gCGkchACH5BAUGAAAALKkAWgAQAAsAhPb29piYmJmZmZ2dnaCgoKWlpampqaurq7S0tL29vcXFxdHR0dvb2+Pj4+jo6Onp6erq6u7u7vHx8fX19fb29vf39/n5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAUoICCO5MhxZQqcrCqysAu3KTqj5Wlxz85NuRvAUov5ijPXK6ZcnZqiEAAh+QQFBgAAACysAFoAEgAWAISampqYmJiZmZmdnZ2goKClpaWpqamrq6u0tLS9vb3FxcXR0dHb29vj4+Po6Ojp6enq6uru7u7x8fH19fX29vb39/f5+fn6+vr7+/v8/Pz9/f3+/v7///8AAAAAAAAAAAAFLiAgjqRBnmiqrmzrvnAsz3Rt33iuj5bMARwLZ0gsAoeWB1FYbP6CSqTTuGwejSEAIfkEBQYAAAAsqQB3ABAACwCE+vr6mJiYmZmZnZ2doKCgpaWlqampq6urtLS0vb29xcXF0dHR29vb4+Pj6Ojo6enp6urq7u7u8fHx9fX19vb29/f3+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAABSEgwIkjYJ4oya1lerJw68awa9KsfdOWvtM+Vc0HDAqNqRAAIfkEBQYAAAAsoQB/AAsAEACE+/v7mJiYmZmZnZ2doKCgpaWlqampq6urtLS0vb29xcXF0dHR29vb4+Pj6Ojo6enp6urq7u7u8fHx9fX19vb29/f3+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAABS0gJ3JAaQLjRJ7luLLkyLbpjMozZ3FqfvewneRlcgFhOCSPSFNBbC6oaGJDlUIAIfkEBQYAAAAslgB4AB8AGwCE+Pj4mJiYmZmZnZ2doKCgpaWlqampq6urtLS0vb29xcXF0dHR29vb4+Pj6Ojo6enp6urq7u7u8fHx9fX19vb29/f3+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAABT4gII5kaZ5oqq5s675wW8R0bd/ijKvcbnJA3whoCQqBSKEI2VMynU9oUzr1Ra3XHbOK2zqLxmOSqgRktWFfCAAh+QQFBgAAACyEAH4ALgAQAISYmJiYmJiZmZmdnZ2goKClpaWpqamrq6u0tLS9vb3FxcXR0dHb29vj4+Po6Ojp6enq6uru7u7x8fH19fX29vb39/f5+fn6+vr7+/v8/Pz9/f3+/v7///8AAAAAAAAAAAAFPyAgjiNHnmiqrifnsnC8urRs27R5j8Te5r7gDyjsBXM6oRKpXBKbhx2zKXxSAVHZ9Cqtcbver8gAs4pj4XMsBAA7'
            let errorImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAG2AmIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMCAf/EACkQAQEAAAUEAwADAQADAQAAAAABAhESQVExgZHwIWFxIjKhsUJSwdH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5cVvTo5neb5cdkzoGd5vkzvN8qaYaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5vlTTPaaYCed5vkzvJZlXAU1wTAG8G/ZhTBv2BsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGMeyamPZMAABTBv2TUwb9gbAAAAAAAAAAAA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'

            // 默认离可视区10px时加载图片
            let distanece = 10;
            // 收集未加载的图片元素和资源
            let listenList = [];
            // 收集已加载的图片元素和资源
            let imageCacheList = [];

            // 是否已经加载完成的图片
            const isAlredyLoad = (imageSrc) => {
                if (imageCacheList.indexOf(imageSrc) > -1) {
                    return true;
                } else {
                    return false;
                }
            }

            //检测图片是否可以加载，如果可以则进行加载
            const isCanShow = (item) => {
                let ele = item.ele;
                let src = item.src;
                //图片距离页面顶部的距离
                let top = ele.getBoundingClientRect().top;
                //页面可视区域的高度
                // let windowHeight = window.innerHight;
                // top - distance 距离可视区域还有distance像素
                if (top - distanece < window.innerHeight) {
                    let image = new Image();
                    image.src = src;
                    image.onload = function () {
                        ele.src = src;
                        imageCacheList.push(src);
                        listenList.remove(item);
                    }
                    image.onerror = function () {
                        ele.src = errorImage;
                        imageCacheList.push(src);
                        listenList.remove(item);
                    }
                    return true;
                } else {
                    return false;
                }
            };

            const onListenScroll = () => {
                window.addEventListener('scroll', function () {
                    let length = listenList.length;
                    for (let i = 0; i < length; i++) {
                        isCanShow(listenList[i]);
                    }
                })
            }

            //Vue 指令最终的方法
            const addListener = (ele, binding) => {
                //绑定的图片地址
                let imageSrc = binding.value;

                // 防止重复加载。如果已经加载过，则无需重新加载，直接将src赋值
                if (isAlredyLoad(imageSrc)) {
                    ele.src = imageSrc;
                    return false;
                }

                let item = {
                    ele: ele,
                    src: imageSrc
                }

                //图片显示默认的图片
                ele.src = defaultImage;

                //再看看是否可以显示此图片
                if (isCanShow(item)) {
                    return
                }

                //否则将图片地址和元素均放入监听的lisenList里
                listenList.push(item);

                //然后开始监听页面scroll事件
                onListenScroll();
            }

            Vue.directive('lazyload', {
                inserted: addListener,
                updated: addListener
            })
        }
    }
    // 注册指令使用
    Vue.use(Vtip.directive);
    // 参数均为可选
    Vue.use(lazyload);

    Vue.directive('focus', {
        inserted(el) {
            if (el.className.indexOf('zoom-input') > -1) {
                let elem = el.children;
                if (el.className.indexOf('zoom-search') > -1) {
                    elem = el.children[0].children;
                }
                for (var i = 0; i < elem.length; i ++) {
                    const nodeName = elem[i];
                    console.log(nodeName.tagName, 'nodeName.tagName===');
                    if (nodeName.tagName === 'INPUT') {
                        nodeName.focus();
                        break;
                    }
                }
            } else {
                el.focus();
            }
        },
        update(el, value) {
            if (value) {
                el.focus();
            }
        }
    })
    Vue.directive('color', {
        bind(el, binding) {
            el.style.color = binding.value
        }
    })
    Vue.directive('drag', {
        inserted: function (el) {
            el.onmousedown = function (e) {
                let disx = e.pageX - el.offsetLeft;
                let disy = e.pageY - el.offsetTop;

                document.onmousemove = function (e) {
                    el.style.left = e.pageX - disx + 'px';
                    el.style.top = e.pageY - disy + 'px';
                }

                document.onmouseup = function () {
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
            return { locale: lang, i18n: this.LanguageInfo };
        },
        /**
         * @function 设置国际化语言传入对象
         * @param {lang.locale} lang // 'zh' 'en'
         * @param {lang.i18n} Object // {zh: {'xx': 'xx'}, en: {'xx': 'xx'}}
         * @type String
         */
        setLanguage(lang) {
            if (lang.locale) {
                localStorage.setItem('language', lang.locale);
                // 判断是否为对象 如果是就遍历对象,将对应key值的数据存入this.LanguageInfo中
                if (lang.i18n && Object.prototype.toString.call(lang.i18n) === '[object Object]') {
                    for (let key in lang.i18n) {
                        this.LanguageInfo[key] = Object.assign({}, lang.i18n[key], this.LanguageInfo[key])
                    }
                }
            }
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
                const language = localStorage.getItem('language') || this.getLanguage().locale;
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
            let n = Math.random() * (max - min) + min;
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
            let r = this.$rn(min, max);
            let g = this.$rn(min, max);
            let b = this.$rn(min, max);
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
                let cookieText = "", subName, cookieParts = [];
                cookieText += encodeURIComponent(name) + "=";
                for (subName in subCookies) {
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
                let cookies = this.get(name) || {};
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
                let cookieName = encodeURIComponent(name) + "=",
                    cookieStart = document.cookie.indexOf(cookieName),
                    cookieValue = "", i, len, subCookies, parts, result = {};
                if (cookieStart > -1) {
                    let cookieEnd = document.cookie.indexOf(";", cookieStart);
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
                let cookies = this.get(name);
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
                let cookies = this.get(name);
                if (cookies) {
                    delete cookies[subName];
                    this.set(name, cookies, null, domain, path, secure);
                }
            },
            /**
             * 清除当前所有cookie
             */
            clear() {
                let keys = document.cookie.match(/[^ =;]+(?==)/g)
                if (keys) {
                    for (let i = keys.length; i--;) {
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
        switch (componentName) {
            case 'zoom-popup':
                // eslint-disable-next-line no-case-declarations
                const Popup = config.default;
                // eslint-disable-next-line no-case-declarations
                const PopupBox = Vue.extend(Popup);
                Popup.install = function (data) {
                    let instance = new PopupBox({
                        data
                    }).$mount()

                    document.body.appendChild(instance.$el)

                    Vue.nextTick(() => {
                        // visible 和弹窗组件里的visible对应，用于控制显隐
                        instance.visible = true
                    })
                }
                Vue.prototype.$zoom.popup = Popup.install;
                break;
            case 'zoom-alert':
                // eslint-disable-next-line no-case-declarations
                const Alert = config.default;
                // eslint-disable-next-line no-case-declarations
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
                break;
            case 'zoom-confim':
                // eslint-disable-next-line no-case-declarations
                const confim = config.default;
                // eslint-disable-next-line no-case-declarations
                const ConfirmBox = Vue.extend(confim);
                confim.install = (content, title, options) => {
                    if (typeof title === 'object') {
                        options = title;
                        title = '';
                    } else if (title === undefined) {
                        title = '';
                    }
                    if (typeof content === 'object') {
                        options = content;
                        content = '';
                    } else if (content === undefined) {
                        content = '';
                    }

                    options = Object.assign({
                        title: title,
                        content: content,
                    }, options);

                    let instance = new ConfirmBox({
                        data: options
                    }).$mount();

                    document.body.appendChild(instance.$el);

                    return instance.confirm();
                };
                Vue.prototype.$zoom.confim = confim.install;
                break;
            case 'zoom-prompt':
                // eslint-disable-next-line no-case-declarations
                const prompt = config.default;
                // eslint-disable-next-line no-case-declarations
                const PromptBox = Vue.extend(prompt);
                prompt.install = (content, title, options) => {
                    if (typeof title === 'object') {
                        options = title;
                        title = '';
                    } else if (title === undefined) {
                        title = '';
                    }
                    if (typeof content === 'object') {
                        options = content;
                        content = '';
                    } else if (content === undefined) {
                        content = '';
                    }

                    options = Object.assign({
                        title: title,
                        content: content,
                    }, options);

                    let instance = new PromptBox({
                        data: options
                    }).$mount();

                    document.body.appendChild(instance.$el);

                    return instance.confirm();
                };
                Vue.prototype.$zoom.prompt = prompt.install;
                break;
            case 'zoom-loading':
                // eslint-disable-next-line no-case-declarations
                let Loading = {}
                // 避免重复install，设立flag
                Loading.installed = false
                Loading.install = function (Vue) {
                    if (Loading.installed) return
                    Vue.prototype.$zoom.loading = {
                        show(data) {
                            // 如果页面有loading则不继续执行
                            if (document.getElementById('zoom-loading')) return
                            // 1、创建构造器，定义loading模板
                            let LoadingTip = Vue.extend(config.default)
                            // 2、创建实例，挂载到文档以后的地方 data 颜色
                            let tpl = new LoadingTip({data}).$mount().$el
                            // 3、把创建的实例添加到body中
                            document.body.appendChild(tpl)
                            Loading.installed = true
                        },
                        hide() {
                            const tpl = document.getElementById('zoom-loading')
                            document.body.removeChild(tpl)
                        }
                    }
                }
                Vue.use(Loading);
                break;
            default:
                break;
        }
        Vue.component(componentName, config.default || config);
    })
}

export default {
    install
}
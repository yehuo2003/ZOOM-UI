window.$Z = $ = Zoom = (function(window, undefined) {
    //
    function Zoom(dom, selector) {
        let i, len = dom ? dom.length : 0;
        for (i = 0; i < len; i ++) this[i] = dom[i];
        this.length = len;
        this.selector = selector || '';
        return this;
    }
    // dom查看 生成Zoom对象
    function Z(elements, selector) {
        return Zoom.call(this, elements, selector);
    }
    // 具体的dom查找
    function select(element, selector) {
        if (typeof selector === 'string') {
            let dom = {};
            if (selector[0] === '#') {
                dom = element.getElementById(selector.slice(1));
            } else if (selector[0] === '.') {
                dom = element.getElementsByClassName(selector.slice(1));
            } else {
                dom = element.querySelectorAll(selector);
            }
            return dom;
        } else {
            throw Error('zoom-ui TypeError: 请传入字符串!')
        }
    }

    Z.prototype = {
        each(callback) {
            // [].every 是es5的循环方法
            // [].every.call  --改变作用域的方式调用every方法
            [].every.call(this, function(el, index) {
                return callback.call(el, index, el) !== false;
            })
        },
        // 查找元素
        find(selector) {
            let doms = [];
            this.each(function(index, el) {
                let childs = this.querySelectorAll(selector);
                doms.push(...childs);
            })
            return new Z(doms, this.selector);
        },
        // 选择第几个元素 下标从0开始
        eq(i) {
            let doms = [];
            this.each(function(index, el) {
                if (i === index) {
                    doms.push(this);
                }
            })
            return new Z(doms, this.selector);
        },
        // 删除元素
        remove() {
            this.each(function(index, el) {
                this.remove();
            })
        },
        // 增加class
        addClass(classes) {
            let doms = [];
            let className = classes.split(' ');
            className.forEach(item => {
                this.each(function(index, obj) {
                    obj.classList.add(item);
                    doms.push(obj);
                })
            });
            return new Z(doms, this.selector);
        },
        // 设置文字
        setText(text) {
            let doms = [];
            this.each(function(index, obj) {
                obj.textContent = text;
                doms.push(obj);
            })
            return new Z(doms, this.selector);
        }
    }
    // 得到jq对象
    return function(nodeSelector) {
        let doms = select(document, nodeSelector);
        return new Z(doms, nodeSelector);
    }
})(window)
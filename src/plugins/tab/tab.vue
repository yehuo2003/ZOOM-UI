<template>
  <div class="tabs">
            <div class="tabs-bar">
                <!--标题页的标题 v-for遍历, :class 动态绑定class-->
                <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">
                    {{item.label}}
                </div>
            </div>
            <div class="tabs-content">
                <!--这里的slot就是嵌套的pane组件的内容-->
                <slot></slot>
            </div>
        </div>
</template>
<script>
export default {
    name: 'zoom-tab',
    props: {
        op: {
            type: Object,
            data: {
                type: Array,
                default: []
            }
        },
        hideTree: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            //将pane的标题保存到数组中
            navList: [],
            //保存父组件的value到currentValue变量中，以便在本地维护
            currentValue: this.value
        }
    },
    props: {
        //接收父组件的value
        value: {
            type: [String]
        }
    },
    methods: {
        //使用$children遍历子组件，得到所有的pane组件
        getTabs: function() {
            return this.$children.filter(function(item) {
                return item.$options.name === 'pane';
            })
        },
        //更新tabs
        updateNav() {
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                //如果没有设置name，默认设置为索引值
                if(!pane.name) {
                    pane.name = index;
                }
                //设置第一个pane为当前显示的tab
                if(index === 0) {
                    if(!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;
            //显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function(tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        },
        tabCls: function(item) {
            return [
                'tabs-tab',
                {
                    //为当前选中的tab加一个tabs-tab-active class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        //点击tab标题触发
        handleChange: function(index) {
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab，触发watch
            this.currentValue = name;
            //实现子组件与父组件通信
            this.$emit('input', name);
        }
    },
    watch: {
        value: function(val) {
            this.currentValue = val;
        },
        currentValue: function() {
            //tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    }
}
</script>
<style>
[v-cloak]{
    display: none;
}
.tabs{
    font-size: 14px;
    color: #657180;
}
.tabs-bar:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #d7dde4;
    margin-top:-1px;
}
.tabs-tab{
    display: inline-block;
    padding: 4px 16px;
    margin-right: 6px;
    background: #fff;
    border: 1px solid #d7dde4;
    cursor: pointer;
    position: relative;
}
.tabs-tab-active{
    color: #3399ff;
    border-top: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
}
.tabs-tab-active:before{
    content: '';
    display: block;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.tabs-content{
    padding: 8px 0;
}
</style>

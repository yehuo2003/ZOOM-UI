(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22666e"],{e904:function(t,o,n){"use strict";n.r(o);var e=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"custom-zoom-logout"},[n("h2",[t._v("使用方法")]),t._m(0),n("h2",[t._v("基础使用")]),n("zoom-tabs",{staticClass:"basic",attrs:{value:t.curTab},on:{change:t.tabChange}},[n("zoom-tab-item",{attrs:{index:0,label:"效果"}},[n("zoom-logout")],1),n("zoom-tab-item",{attrs:{index:1,label:"代码"}},[n("custom-code",{attrs:{html:t.logoutCode}})],1)],1),n("h2",[t._v("个性化设置")]),t._m(1),n("zoom-tabs",{staticClass:"data-drop",attrs:{value:t.opTab},on:{change:t.opChange}},[n("zoom-tab-item",{attrs:{index:0,label:"效果"}},[n("zoom-logout",{attrs:{op:t.logoutOp}})],1),n("zoom-tab-item",{attrs:{index:1,label:"代码"}},[n("custom-code",{attrs:{html:t.logoutCustom}})],1)],1),n("attribute",{attrs:{list:t.attributeList}})],1)},a=[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"tip"},[t._v('\n    zoom-ui提供的注销组件, 以a标签形式, 默认文字为"注销", 可自行修改'),n("br"),t._v("\n    点击注销后清空cookie缓存, 并刷新页面, 如果有指定的url则进行跳转\n  ")])},function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("p",[t._v("可对注销组件配置"),n("span",[t._v("op")]),t._v("对象进行个性化设置")])}],l={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"注销后要跳转的页面",name:"url",type:"String",text:"注销后要跳转的页面, 可不配置",text2:'用法: 配置op属性, 设置<span>url: "跳转地址"</span>'},{id:2,title:"是否提示",name:"point",type:"Boolean",text:"为了防止用户误操作, 属性默认为<span>false</span>设置为<span>true</span>则不提示",text2:"用法: 配置op属性, 设置<span>point: true</span>"},{id:3,title:"文字内容",name:"text",type:"String",text:"默认显示 <span>注销</span>可自定义修改",text2:'用法: 配置op属性, 设置<span>text: "文字"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"点击注销前的回调",name:"onClick",type:"Function",text:"点击注销前触发的回调函数",text2:"用法: 配置op属性, 设置<span>onClick: () => {}</span>"}]}],logoutOp:{url:"/",point:!0,onClick:function(){console.log("注销")},text:"注销登录"},opTab:0,curTab:0,logoutCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-logout :op=\"logoutOp\"&gt;&lt;/zoom-logout&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  logoutOp: {\n                    url: '/',  //  注销后要跳转的url\n                    point: true,  //  是否需要提示\n                    onClick: () =&gt; {\n                      console.log('注销');\n                    }, //  点击事件\n                    text: '注销登录'  //  文字内容, 默认为注销\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",logoutCode:"&lt;zoom-logout&gt;&lt;/zoom-logout&gt;"}},methods:{logout2Num:function(){console.log("滑块2当前值是"+this.num2)},logout1Num:function(){console.log("滑块1当前值是"+this.num1)},opChange:function(t){this.opTab=t},tabChange:function(t){this.curTab=t}}},s=l,i=n("2877"),u=Object(i["a"])(s,e,a,!1,null,null,null);o["default"]=u.exports}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b4ce"],{bed9:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"custom-zoom-floatbar"},[n("div",{staticClass:"tip"},[n("text-template",{attrs:{code:"float.bar.tip"}})],1),n("tab-template",{attrs:{code:t.floatbarCode}},[n("template",{slot:"header"},[n("h2",[t._v(t._s(t.$zoom.$t("基本用法")))]),n("h3",[t._v(t._s(t.$zoom.$t("请看屏幕右边")))])]),n("zoom-floatbar",{attrs:{op:t.op}})],2),n("tab-template",{attrs:{code:t.floatbarCustom}},[n("template",{slot:"header"},[n("h2",[t._v(t._s(t.$zoom.$t("自定义模式")))]),n("text-template",{attrs:{code:"如果op属性里未配置data属性, 则启用自定义模式"}})],1),n("zoom-floatbar",{attrs:{op:t.floatBarOp}},[n("text-template",{attrs:{code:"自定义内容"}}),n("text-template",{attrs:{code:"点击按钮"}}),n("text-template",{attrs:{code:"解除固定"}})],1)],2),n("attribute",{attrs:{list:t.attributeList}})],1)},o=[],l={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"浮动块导航数据",name:"data",type:"Array",text:"以数组对象形式保存",text2:"用法: 配置op对象, 设置<span>data: [{title: xx, url: xxx}]</span>"},{id:2,title:"跳转链接",name:"url",type:"String",text:"可以自定义跳转链接, 默认在当前窗口打开, 如果要新窗口打开可以添加属性<span>target: 'blank'</span>",text2:"用法: 配置op对象并设置data数据, 在条目中设置<span>url: xx</span>"},{id:3,title:"自定义标题",name:"text",type:"String",text:"可以自定义浮动块标题",text2:"用法: 配置op对象并设置data数据, 在条目中设置<span>text: xx</span>"},{id:4,title:"定位",name:"position",type:"String",text:"浮动块定位, 默认在右边, 可选参数: <span>right</span>, <span>left</span>",text2:'用法: 配置op对象, 设置 <span>position: "right"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"自定义点击事件",name:"onClick",type:"Function",text:"可绑定点击事件",text2:'用法: 配置op对象并设置data数据, 在条目中绑定<span> onClick="自定义事件"</span>'}]}],op:{position:"right",data:[{text:"购物车",icon:"icon-shopping-cart",onClick:function(t){console.log(t)}},{text:"电话",icon:"icon-phone"},{text:"首页",icon:"icon-nav",url:"/",target:"blank"}]},floatBarOp:{position:"left"},floatbarCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-floatbar :op=\"floatBarOp\"&gt;\n                &lt;a&gt;自定义内容&lt;/a&gt;\n                &lt;p&gt;点击按钮&lt;/p&gt;\n                &lt;p&gt;解除固定&lt;/p&gt;\n              &lt;/zoom-floatbar&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  floatBarOp: {\n                    position: 'left',\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",floatbarCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-floatbar :op=\"op\"&gt;&lt;/zoom-floatbar&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  op: {\n                    position: 'right',\t// 默认right 可选参数 left, right\n                    data: [\t//\t如果未设置data 则默认显示自定义内容\n                      {text: '购物车', icon: 'icon-shopping-cart', onClick: val =&gt; {console.log(val);}},\n                      {text: '电话', icon: 'icon-phone'},\n                      {text: '首页', icon: 'icon-nav', url: '/', target: 'blank'}\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}}},i=l,p=n("2877"),r=Object(p["a"])(i,e,o,!1,null,null,null);a["default"]=r.exports}}]);
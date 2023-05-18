(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53af7ebb"],{"34b6":function(t,n,e){},7712:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"custom-zoom-button"},[e("tab-template",{attrs:{code:t.btn}},[e("template",{slot:"header"},[e("div",{staticClass:"tip"},[t._v("\n        按钮群组即为按钮的集合, 组件包含按钮组件的功能"),e("br"),t._v("\n        可以绑定多个按钮为数据\n      ")]),e("h2",[t._v("基本用法")]),e("p",[t._v("基础按钮的用法")])]),e("zoom-button-group",{attrs:{op:t.btnOp}})],2),e("attribute",{attrs:{list:t.attributeList}})],1)},s=[],p={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"绑定数据",name:"data",type:"Array",text:"以数组对象方式绑定按钮群组的数据",text2:"用法: 绑定op属性, 设置<span>data: [{...}]</span>绑定数据"},{id:2,title:"按钮形状",name:"shape",type:"String",text:"可选参数: <span>plain</span> / <span>round</span> / <span>circle</span>",text2:'用法: <span>shape="可选参数"</span>, 默认: <span>plain</span>'},{id:3,title:"按钮大小",name:"size",type:"String",text:"可选参数: <span>mini</span> / <span>small</span> / <span>medium</span> / <span>large</span>",text2:'用法: <span>size="参数"</span>'},{id:4,title:"点击间隔",name:"reset-time",type:"Number",text:"默认: 1000 毫秒",text2:'用法: <span>:reset-time="时间"</span>'},{id:5,title:"按钮禁用",name:"disabled",type:"Boolean",text:"可选参数: <span>true</span> / <span>false</span>, 默认 <span>false</span>",text2:'用法: 配置op对象, 设置 <span>disabled="true"</span>'},{id:6,title:"按钮类型",name:"type",type:"String",text:"可选参数: <span>primary</span> / <span>info</span> / <span>warning</span> / <span>success</span> / <span>danger</span>",text2:'用法: 配置op对象, 设置 <span>type: "按钮状态"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"自定义点击事件",name:"onClick",type:"Function",text:"可绑定点击事件",text2:'用法: 配置op对象, 设置 <span>@click="自定义事件"</span>'},{id:2,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],btnOp:{disabled:!1,shape:"plain",data:[{text:"按钮1",value:1},{text:"按钮2",value:2},{text:"按钮3",value:3}],onClick:function(t,n){console.log(t,"val"),console.log(n,"index")}},btn:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-button-group :op=\"btnOp\"&gt;&lt;/zoom-button-group&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data () {\n                return {\n                  btnOp: {\n                    disabled: false,  //  是否禁用\n                    shape: 'plain', //  按钮形状\n                    // resetTime: 5000, //  防抖时间\n                    // type: 'primary', // 按钮类型\n                    data: [ //  按钮数据\n                      {text: '按钮1', value: 1},\n                      {text: '按钮2', value: 2},\n                      {text: '按钮3', value: 3}\n                    ],\n                    onClick: (val, index) =&gt; {  //  按钮点击事件\n                      console.log(val, 'val');\n                      console.log(index, 'index');\n                    }\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}}},i=p,l=(e("d77f"),e("2877")),o=Object(l["a"])(i,a,s,!1,null,"2cfd3a90",null);n["default"]=o.exports},d77f:function(t,n,e){"use strict";var a=e("34b6"),s=e.n(a);s.a}}]);
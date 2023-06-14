(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b631a"],{"1bb5":function(t,i,e){"use strict";e.r(i);var l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"custom-zoom-dialog-box"},[e("div",{staticClass:"tip"},[e("text-template",{attrs:{code:"卡片组件默认为块级元素, 宽度为100%可以设置边框和边框阴影"}})],1),e("tab-template",{attrs:{code:t.dialogCode}},[e("template",{slot:"header"},[e("h2",[t._v(t._s(t.$zoom.$t("基本用法")))]),e("text-template",{attrs:{code:"可以在卡片组件标签中自定义内容"}})],1),e("zoom-button",{on:{click:t.handleClick}},[t._v("显示对话框")]),e("zoom-dialog-box",{attrs:{title:"对话框标题",show:t.visibility},on:{close:function(i){t.visibility=!1}}},[t._v("\n      自定义内容,可任意html片段\n      "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("zoom-button",{on:{click:function(i){t.visibility=!1}}},[t._v("关闭")])],1)])],2),e("attribute",{attrs:{list:t.attributeList}})],1)},n=[],o={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"对话框状态",name:"show",type:"Boolean",text:"决定对话框是显示还是隐藏",text2:'用法: 在组件标签上绑定<span>show="属性"</span>'},{id:2,title:"对话框标题",name:"title",type:"String",text:"对话框的标题, 可自定义",text2:'用法: 在组件标签上绑定<span>title="属性"</span>'},{id:3,title:"宽度",name:"width",type:"String",text:"对话框组件的宽度,  默认占30%, 可自定义",text2:'用法: 在组件标签上绑定<span>width="宽度"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"关闭事件",name:"close",type:"Function",text:"监听对话框关闭事件",text2:"用法: 在组件标签上绑定<span>@close</span>事件, 用来监听弹框关闭事件"}]}],visibility:!1,dialogCode:'&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-button @click="handleClick"&gt;显示对话框&lt;/zoom-button&gt;\n              &lt;zoom-dialog-box title="对话框标题" :show="visibility" @close="visibility=false"&gt;\n                自定义内容,可任意html片段\n                &lt;div slot="footer"&gt;\n                  &lt;zoom-button @click="visibility=false"&gt;关闭&lt;/zoom-button&gt;\n                &lt;/div&gt;\n              &lt;/zoom-dialog-box&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  visibility: false,\n                }\n              },\n              methods: {\n                handleClick() {\n                  this.visibility = true;\n                }\n              }\n            }\n          &lt;/script&gt;'}},methods:{handleClick:function(){this.visibility=!0}}},s=o,a=e("2877"),c=Object(a["a"])(s,l,n,!1,null,null,null);i["default"]=c.exports}}]);
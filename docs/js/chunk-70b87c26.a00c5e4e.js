(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70b87c26"],{"83a2":function(o,t,a){"use strict";var s=a("e5b8"),c=a.n(s);c.a},c14c:function(o,t,a){"use strict";a.r(t);var s=function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("div",{staticClass:"custom-zoom-color"},[a("h2",[o._v("色彩类型")]),a("h3",[o._v("对于色彩类型一共有五种")]),o._m(0),a("zoom-tabs",{staticClass:"basic",attrs:{value:o.reseTab},on:{change:o.reseChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-row",[a("zoom-col",{staticClass:"zoom-custom-color bg-primary",attrs:{span:"2"}},[o._v("bg-primary")]),a("zoom-col",{staticClass:"zoom-custom-color bg-success",attrs:{span:"2"}},[o._v("bg-success")]),a("zoom-col",{staticClass:"zoom-custom-color bg-warning",attrs:{span:"2"}},[o._v("bg-warning")]),a("zoom-col",{staticClass:"zoom-custom-color bg-danger",attrs:{span:"2"}},[o._v("bg-danger")]),a("zoom-col",{staticClass:"zoom-custom-color bg-info",attrs:{span:"2"}},[o._v("bg-info")])],1)],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:o.color}})],1)],1),a("h2",[o._v("不同情况下的色彩")]),o._m(1),a("zoom-tabs",{staticClass:"basic",attrs:{value:o.curTab},on:{change:o.tabChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-row",[a("zoom-col",{staticClass:"zoom-custom-color bg-primary",attrs:{span:"2"}},[o._v("bg-primary")]),a("zoom-col",{staticClass:"zoom-custom-color bg-primary-hover",attrs:{span:"2"}},[o._v("bg-primary-hover")]),a("zoom-col",{staticClass:"zoom-custom-color bg-primary-active",attrs:{span:"2"}},[o._v("bg-primary-active")])],1)],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:o.color2}})],1)],1),a("h2",[o._v("添加伪类效果")]),a("p",[o._v("尝试着鼠标经过和点击")]),o._m(2),a("zoom-tabs",{staticClass:"basic",attrs:{value:o.opTab},on:{change:o.opChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-row",[a("zoom-col",{staticClass:"zoom-custom-color bg-primary hover active",attrs:{span:"2"}},[o._v("bg-primary")]),a("zoom-col",{staticClass:"zoom-custom-color bg-success hover active",attrs:{span:"2"}},[o._v("bg-success")]),a("zoom-col",{staticClass:"zoom-custom-color bg-warning hover active",attrs:{span:"2"}},[o._v("bg-warning")]),a("zoom-col",{staticClass:"zoom-custom-color bg-danger hover active",attrs:{span:"2"}},[o._v("bg-danger")]),a("zoom-col",{staticClass:"zoom-custom-color bg-info hover active",attrs:{span:"2"}},[o._v("bg-info")])],1)],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:o.color3}})],1)],1),a("h2",[o._v("暗色调")]),a("p",[o._v("常用的几种暗色调如下")]),a("zoom-tabs",{staticClass:"basic",attrs:{value:o.sizeTab},on:{change:o.sizeChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-row",[a("zoom-col",{staticClass:"zoom-custom-color bg-navigation",attrs:{span:"2"}},[o._v("bg-navigation")]),a("zoom-col",{staticClass:"zoom-custom-color bg-info-darker",attrs:{span:"2"}},[o._v("bg-info-darker")]),a("zoom-col",{staticClass:"zoom-custom-color bg-info-dark",attrs:{span:"2"}},[o._v("bg-info-dark")]),a("zoom-col",{staticClass:"zoom-custom-color bg-info",attrs:{span:"2"}},[o._v("bg-info")])],1)],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:o.color4}})],1)],1)],1)},c=[function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("p",[o._v("分别为\n    "),a("span",[o._v("primary")]),o._v("、\n    "),a("span",[o._v("success")]),o._v("、\n    "),a("span",[o._v("warning")]),o._v("、\n    "),a("span",[o._v("danger")]),o._v("、\n    "),a("span",[o._v("info")]),o._v("\n    如背景色请加class\n    "),a("span",[o._v("bg-primary")])])},function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("p",[o._v("对"),a("span",[o._v("hover")]),o._v("、"),a("span",[o._v("active")]),o._v("状态，分别有不同的颜色呈现，以"),a("span",[o._v("primary")]),o._v("色彩示例")])},function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("p",[o._v("想在背景色基础上增加伪类效果, 可在原有基础上增加"),a("span",[o._v('class="hover"')]),o._v("、"),a("span",[o._v('class="active"')])])}],l={data:function(){return{curTab:0,reseTab:0,opTab:0,sizeTab:0,color:'&lt;zoom-row&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-success"&gt;bg-success&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-warning"&gt;bg-warning&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-danger"&gt;bg-danger&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;\n          &lt;/zoom-row&gt;',color2:'&lt;zoom-row&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-primary-hover"&gt;bg-primary-hover&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-primary-active"&gt;bg-primary-active&lt;/zoom-col&gt;\n          &lt;/zoom-row&gt;',color3:'&lt;zoom-row&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-primary hover active"&gt;bg-primary&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-success hover active"&gt;bg-success&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-warning hover active"&gt;bg-warning&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-danger hover active"&gt;bg-danger&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-info hover active"&gt;bg-info&lt;/zoom-col&gt;\n          &lt;/zoom-row&gt;',color4:'&lt;zoom-row&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-navigation"&gt;bg-navigation&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-info-darker"&gt;bg-info-darker&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-info-dark"&gt;bg-info-dark&lt;/zoom-col&gt;\n            &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;\n          &lt;/zoom-row&gt;'}},methods:{tabChange:function(o){this.curTab=o},reseChange:function(o){this.reseTab=o},opChange:function(o){this.opTab=o},sizeChange:function(o){this.sizeTab=o}}},r=l,n=(a("83a2"),a("2877")),m=Object(n["a"])(r,s,c,!1,null,"1909ea7c",null);t["default"]=m.exports},e5b8:function(o,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39a9477c"],{"1da1":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"custom-zoom-card"},[e("h2",[t._v("基本用法")]),e("p",[t._v("可以在组件标签中自定义内容")]),e("zoom-tabs",{staticClass:"basic",attrs:{value:t.curTab},on:{change:t.tabChange}},[e("zoom-tab-item",{attrs:{index:0,label:"效果"}},[e("zoom-card",[e("h1",[t._v("自定义内容")])])],1),e("zoom-tab-item",{attrs:{index:1,label:"代码"}},[e("custom-code",{attrs:{html:t.cardCode}})],1)],1),e("h2",[t._v("边框阴影")]),t._m(0),e("zoom-tabs",{staticClass:"basic",attrs:{value:t.reseTab},on:{change:t.reseChange}},[e("zoom-tab-item",{attrs:{index:0,label:"效果"}},[e("zoom-card",{attrs:{border:"true","hover-shadow":"true"}},[e("h1",[t._v("自定义内容")]),e("h3",[t._v("边框阴影")])])],1),e("zoom-tab-item",{attrs:{index:1,label:"代码"}},[e("custom-code",{attrs:{html:t.cardBorder}})],1)],1),e("div",{staticClass:"tip"},[t._v("\n    卡片组件默认为块级元素, 宽度为100%\n    可以设置边框和边框阴影\n  ")]),e("attribute",{attrs:{list:t.attributeList}})],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("p",[t._v("\n    通过组件标签设置属性\n    "),e("span",[t._v('border="true"')]),t._v("开启边框,\n    "),e("span",[t._v('hover-shadow="true"')]),t._v("鼠标经过时阴影显示\n  ")])}],s={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"边框",name:"border",type:"Boolean",text:"卡片边框效果, 默认<span>false</span>, 为<span>true</span>显示",text2:'用法: 在组件标签上设置<span>border="true"</span>'},{id:2,title:"边框阴影",name:"hover-shadow",type:"Boolean",text:"卡片边框阴影, 鼠标进过显示, 默认<span>false</span>, 为<span>true</span>显示",text2:'用法: 在组件标签上设置<span>hover-shadow="true"</span>'}]}],curTab:0,reseTab:0,cardBorder:'&lt;zoom-card border="true" hover-shadow="true"&gt;\n            &lt;h1&gt;自定义内容&lt;/h1&gt;\n            &lt;h3&gt;边框阴影&lt;/h3&gt;\n          &lt;/zoom-card&gt;',cardCode:"&lt;zoom-card&gt;\n            &lt;h1&gt;自定义内容&lt;/h1&gt;\n          &lt;/zoom-card&gt;"}},methods:{tabChange:function(t){this.curTab=t},reseChange:function(t){this.reseTab=t},sizeChange:function(t){this.sizeTab=t}}},o=s,c=(e("5627"),e("2877")),i=Object(c["a"])(o,r,n,!1,null,"0c875db6",null);a["default"]=i.exports},5627:function(t,a,e){"use strict";var r=e("ef94"),n=e.n(r);n.a},ef94:function(t,a,e){}}]);
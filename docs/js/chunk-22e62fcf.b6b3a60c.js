(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22e62fcf"],{"20a4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"custom-zoom-gallery"},[t._m(0),a("tab-template",{attrs:{code:t.galleryCode}},[a("zoom-gallery",{attrs:{op:t.op}})],1),a("attribute",{attrs:{list:t.attributeList}})],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tip"},[t._v("\n    zoom-ui提供的画廊幻灯片组件, 有大小图切换功能"),a("br"),t._v("\n    可以点击大图左右两侧阴影处, 或者用键盘左右按键控制上一张或者下一张"),a("br"),t._v("\n    还可以开启放大镜功能\n  ")])}],r={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"图片数据",name:"data",type:"Array",text:"图片以数组方式保存",text2:"用法: 配置op属性, 设置<span>data: []</span>"},{id:2,title:"开启放大镜",name:"showZoom",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>开启放大镜",text2:'用法: 配置op属性, 设置<span>showZoom: "true"</span>'}]}],op:{showZoom:!0,data:[a("4cec"),a("3153"),a("d38a"),a("efa1")]},galleryCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-gallery :op=\"op\"&gt;&lt;/zoom-gallery&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  op: {\n                    showZoom: true, //  是否开启放大镜功能, 默认false\n                    data: [ //  图片以数组方式保存\n                      require('./static/1.jpg'),\n                      require('./static/2.jpg'),\n                      require('./static/3.jpg'),\n                      require('./static/4.jpg')\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}}},i=r,p=a("2877"),s=Object(p["a"])(i,n,o,!1,null,null,null);e["default"]=s.exports},3153:function(t,e,a){t.exports=a.p+"img/2.a3aebc3a.jpg"},"4cec":function(t,e,a){t.exports=a.p+"img/1.86db5de0.jpg"},d38a:function(t,e,a){t.exports=a.p+"img/3.47bb847a.jpg"},efa1:function(t,e,a){t.exports=a.p+"img/4.562e514e.jpg"}}]);
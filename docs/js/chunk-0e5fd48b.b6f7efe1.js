(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e5fd48b"],{"7f65":function(t,e,n){},"8edf":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-zoom-testing"},[n("div",{staticClass:"tip"},[n("text-template",{attrs:{code:"验证码组件默认生成4位数随机验证码,随机范围0~9a~Z, 使用canvas绘制, 可自定义随机数范围和id"}})],1),n("tab-template",{attrs:{code:t.testingCode}},[n("zoom-testing")],1),n("tab-template",{attrs:{cls:"data-drop",code:t.testingCustom}},[n("template",{slot:"header"},[n("h2",[t._v(t._s(t.$zoom.$t("设置属性")))]),n("text-template",{attrs:{code:"可自定义随机数范围, 也可以通过 *pool* 属性来定义验证码内容为汉字"}})],1),n("zoom-testing",{attrs:{op:t.testingOp}})],2),n("attribute",{attrs:{list:t.attributeList}})],1)},s=[],o={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"id",name:"id",type:"String",text:"若不自定义, 则显示随机id",text2:'用法: 直接在组件标签上绑定<span>id="参数"</span>, 或者配置op对象, 设置<span>id: "参数"</span>'},{id:2,title:"验证码数据",name:"pool",type:"String",text:"用户自定义验证码数据范围",text2:'用法: 配置op对象, 设置 <span>pool: "数据"</span>'},{id:3,title:"隐藏文字",name:"hideText",type:"Boolean",text:"隐藏提示切换的文字信息, 为<span>true</span>时,可点击图片重新随机生成",text2:'用法: 配置op对象, 设置 <span>hideText: "true"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"当前验证码值",name:"testCode",type:"Function",text:"获取当前验证码的值",text2:"用法: 通过配置ref属性, 调用方法 <span>this.$refs[属性].testCode</span>"}]}],testingOp:{id:"test666",pool:"这是一段随机文本验证码将在这段文本内进行取",hideText:!0},testingCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-testing :op=\"testingOp\"&gt;&lt;/zoom-testing&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  testingOp: {\n                    id: 'test666',\t// id\n                    pool: '这是一段随机文本验证码将在这段文本内进行取',\t// 自定义随机范围\n                    hideText: true\t// 隐藏提示切换的文字信息, 为true时,可点击图片重新随机生成\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",testingCode:"&lt;zoom-testing&gt;&lt;/zoom-testing&gt;"}}},a=o,p=(n("b0f5"),n("2877")),d=Object(p["a"])(a,i,s,!1,null,"53528eb8",null);e["default"]=d.exports},b0f5:function(t,e,n){"use strict";var i=n("7f65"),s=n.n(i);s.a}}]);
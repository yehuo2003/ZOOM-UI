(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a9c2"],{bbf2:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"custom-zoom-radio"},[a("tab-template",{attrs:{cls:"data-drop",code:t.radioCode}},[a("zoom-radio",{attrs:{op:t.op}})],1),a("tab-template",{attrs:{cls:"data-drop",code:t.radioCustom}},[a("template",{slot:"header"},[a("h2",[t._v(t._s(t.$zoom.$t("标签属性")))]),a("div",{staticClass:"tip"},[a("text-template",{attrs:{code:"当前组件需要绑定自定义*op*对象, *op*对象中定义*name*, 和*data*, 并且可以通过v-model绑定数据"}})],1),a("text-template",{attrs:{code:"禁用状态下，开启或关闭开关"}})],1),a("zoom-radio",{attrs:{op:t.radioOp},model:{value:t.age,callback:function(e){t.age=e},expression:"age"}}),a("zoom-button",{on:{click:t.radioClick}},[t._v("当前选中的值")]),a("br"),t._v("\n    禁用单选框:"),a("br"),a("zoom-radio",{attrs:{op:t.radioOp2}})],2),a("attribute",{attrs:{list:t.attributeList}})],1)},o=[],l={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"单选框名称",name:"name",type:"String",text:"一组单选框需要绑定同一个<span>name</span>属性, 系统以此来辨别",text2:'用法: 配置op对象, 设置 <span>name: "属性"</span>'},{id:2,title:"禁用",name:"disabled",type:"Boolean",text:"默认<span>false</span>, 禁用状态下, 无法选择",text2:"用法: 在组件标签上, 或者配置op对象, 设置 <span>disabled: true</span>"},{id:3,title:"是否绑定布尔值",name:"Bool",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>的情况下, 用户用<span>v-model</span>绑定后, 得到的值为布尔值",text2:'用法: 在组件标签上, 或者配置op对象, 设置 <span>close: "文本内容"</span>'},{id:4,title:"数据",name:"data",type:"Array",text:"以键值对的方式, 设置单选框的数据, 如 <span>{text: '文本内容1', value: 'value值'}</span>",text2:"用法: 配置op对象, 绑定设置 <span>data</span> 属性"}]},{id:2,title:"方法",content:[{id:1,title:"动态绑定数据",name:"load",type:"Function",text:"在组件渲染完成后, 可用此方法动态渲染数据",text2:"用法: <span>this.$refs[属性].load(arr)</span>, 可动态设置数据,<span>arr</span>数据形式和op中<span>data</span>相同"},{id:2,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],age:"secrecy",op:{name:"test",data:[{text:"选项1",value:"1"},{text:"选项2",value:"2"},{text:"选项3",value:"3"}]},radioOp2:{name:"list",disabled:!0,data:[{text:"男",value:"man"},{text:"女",value:"woman"},{text:"保密",value:"secrecy",checked:!0}]},radioOp:{name:"age",disabled:!1,Bool:!1,data:[{text:"男",value:"man"},{text:"女",value:"woman"},{text:"保密",value:"secrecy",checked:!0}]},radioCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-radio v-model=\"age\" :op=\"radioOp\"&gt;&lt;/zoom-radio&gt;\n              &lt;zoom-button @click=\"radioClick\"&gt;当前选中的值&lt;/zoom-button&gt;&lt;br&gt;\n              禁用单选框:&lt;br&gt;\n              &lt;zoom-radio :op=\"radioOp2\"&gt;&lt;/zoom-radio&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  age: 'secrecy',\n                  radioOp2: {\n                    name: 'list',\n                    disabled: true,\n                    data: [\n                      {text: '男', value: 'man'},\n                      {text: '女', value: 'woman'},\n                      {text: '保密', value: 'secrecy', checked: true}\n                    ]\n                  },\n                  radioOp: {\n                    name: 'age',\t//\t单选框的name\n                    disabled: false,\t//\t是否禁用,为true可禁用\n                    Bool: false,\t\t\t//\tv-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true\n                    data: [\t//\t单选框数据\tchecked: true\t默认选中\n                      {text: '男', value: 'man'},\n                      {text: '女', value: 'woman'},\n                      {text: '保密', value: 'secrecy', checked: true}\n                    ]\n                  }\n                }\n              },\n              methods: {\n                radioClick() {\n                  console.log('当前值是', this.age);\n                }\n              }\n            }\n          &lt;/script&gt;",radioCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-radio :op=\"op\"&gt;&lt;/zoom-radio&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  op: {\n                    name: 'test',\n                    data: [\n                      {text: '选项1', value: '1'},\n                      {text: '选项2', value: '2'},\n                      {text: '选项3', value: '3'}\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}},methods:{radioClick:function(){console.log("当前值是",this.age)}}},s=l,d=a("2877"),i=Object(d["a"])(s,n,o,!1,null,"5c018f5a",null);e["default"]=i.exports}}]);
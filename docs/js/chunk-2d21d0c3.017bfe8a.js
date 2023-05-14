(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d0c3"],{d045:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-zoom-checkbox"},[n("h2",[t._v("使用方法")]),n("zoom-tabs",{staticClass:"data-drop",attrs:{value:t.curTab},on:{change:t.tabChange}},[n("zoom-tab-item",{attrs:{index:0,label:"效果"}},[n("zoom-checkbox",{attrs:{op:t.op}})],1),n("zoom-tab-item",{attrs:{index:1,label:"代码"}},[n("custom-code",{attrs:{html:t.checkboxCode}})],1)],1),n("h3",[t._v("标签属性")]),t._m(0),n("p",[t._v("禁用状态下，开启或关闭开关")]),n("zoom-tabs",{staticClass:"data-drop",attrs:{value:t.opTab},on:{change:t.opChange}},[n("zoom-tab-item",{attrs:{index:0,label:"效果"}},[n("span",[t._v("爱好")]),n("br"),n("zoom-checkbox",{attrs:{op:t.checkboxOp},model:{value:t.fondness,callback:function(e){t.fondness=e},expression:"fondness"}}),n("zoom-button",{on:{click:t.checkboxClick}},[t._v("当前选中的值")]),n("br"),t._v("\n      禁用复选框:"),n("br"),n("zoom-checkbox",{attrs:{op:t.checkboxOp2}})],1),n("zoom-tab-item",{attrs:{index:1,label:"代码"}},[n("custom-code",{attrs:{html:t.checkboxCustom}})],1)],1),n("attribute",{attrs:{list:t.attributeList}})],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tip"},[t._v("\n    复选框组件需要绑定自定义"),n("span",[t._v("op")]),t._v("对象, "),n("span",[t._v("op")]),t._v("对象中定义"),n("span",[t._v("name")]),t._v(", 和"),n("span",[t._v("data")]),t._v(", 并且可以通过v-model绑定数据\n  ")])}],s={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"复选框名称",name:"name",type:"String",text:"一组复选框需要绑定同一个<span>name</span>属性, 系统以此来辨别",text2:'用法: 配置op对象, 设置 <span>name: "属性"</span>'},{id:2,title:"禁用",name:"disabled",type:"Boolean",text:"默认<span>false</span>, 禁用状态下, 无法选择",text2:'用法: 在组件标签上, 或者配置op对象, 设置 <span>disabled:"true"</span>'},{id:3,title:"是否绑定布尔值",name:"Bool",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>的情况下, 用户用<span>v-model</span>绑定后, 得到的值为布尔值",text2:'用法: 在组件标签上, 或者配置op对象, 设置 <span>close="文本内容"</span>'},{id:4,title:"数据",name:"data",type:"Array",text:"以键值对的方式, 设置复选框的数据, 如 <span>{text: '文本内容1', value: 'value值'}</span>",text2:"用法: 配置op对象, 绑定设置 <span>data</span> 属性"}]},{id:2,title:"方法",content:[{id:1,title:"动态绑定数据",name:"load",type:"Function",text:"在组件渲染完成后, 可用此方法动态渲染数据",text2:"用法: <span>this.$refs[属性].load(arr)</span>, 可动态设置数据,<span>arr</span>数据形式和op中<span>data</span>相同"},{id:2,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],fondness:"sports",op:{name:"test",data:[{text:"选项1",value:"1"},{text:"选项2",value:"2"},{text:"选项3",value:"3"}]},checkboxOp2:{name:"list",disabled:!0,data:[{text:"唱歌",value:"sing",checked:!0},{text:"跳舞",value:"dance"},{text:"音乐",value:"music"},{text:"运动",value:"sports",checked:!0}]},checkboxOp:{name:"age",disabled:!1,Bool:!1,data:[{text:"唱歌",value:"sing"},{text:"跳舞",value:"dance"},{text:"音乐",value:"music"},{text:"运动",value:"sports",checked:!0}]},opTab:0,curTab:0,checkboxCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;span&gt;爱好&lt;/span&gt;&lt;br&gt;\n              &lt;zoom-checkbox v-model=\"fondness\" :op=\"checkboxOp\"&gt;&lt;/zoom-checkbox&gt;\n              &lt;zoom-button @click=\"checkboxClick\"&gt;当前选中的值&lt;/zoom-button&gt;&lt;br&gt;\n              禁用复选框:&lt;br&gt;\n              &lt;zoom-checkbox :op=\"checkboxOp2\"&gt;&lt;/zoom-checkbox&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  fondness: 'sports',\n                  checkboxOp2: {\n                    name: 'list',\n                    disabled: true,\n                    data: [\n                      {text: '唱歌', value: 'sing', checked: true},\n                      {text: '跳舞', value: 'dance'},\n                      {text: '音乐', value: 'music'},\n                      {text: '运动', value: 'sports', checked: true}\n                    ]\n                  },\n                  checkboxOp: {\n                    name: 'age',\t//\t复选框的name\n                    disabled: false,\t//\t是否禁用,为true可禁用\n                    Bool: false,\t\t\t//\tv-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true\n                    data: [\t//\t复选框数据\tchecked: true\t默认选中\n                      {text: '唱歌', value: 'sing'},\n                      {text: '跳舞', value: 'dance'},\n                      {text: '音乐', value: 'music'},\n                      {text: '运动', value: 'sports', checked: true}\n                    ]\n                  }\n                }\n              },\n              methods: {\n                checkboxClick() {\n                  console.log('当前值是', this.fondness);\n                }\n              }\n            }\n          &lt;/script&gt;",checkboxCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-checkbox :op=\"op\"&gt;&lt;/zoom-checkbox&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  op: {\n                    name: 'test',\n                    data: [\n                      {text: '选项1', value: '1'},\n                      {text: '选项2', value: '2'},\n                      {text: '选项3', value: '3'}\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}},methods:{checkboxClick:function(){console.log("当前值是",this.fondness)},opChange:function(t){this.opTab=t},tabChange:function(t){this.curTab=t}}},l=s,c=n("2877"),p=Object(c["a"])(l,a,o,!1,null,"6c0b1882",null);e["default"]=p.exports}}]);
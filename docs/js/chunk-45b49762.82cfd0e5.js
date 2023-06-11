(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45b49762"],{"64d7":function(t,e,n){},9012:function(t,e,n){"use strict";var a=n("64d7"),o=n.n(a);o.a},b236:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-zoom-dropdown"},[n("tab-template",{attrs:{code:t.dropdownCode}},[n("zoom-dropdown")],1),n("tab-template",{attrs:{cls:"data-drop",code:t.dropdownCustom}},[n("template",{slot:"header"},[t._v("s\n      "),n("h3",[t._v(t._s(t.$zoom.$t("设置属性")))]),n("text-template",{attrs:{code:"zoom-ui提供的dropdown下拉框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容"}})],1),t._v("\n    下拉单选："),n("zoom-dropdown",{attrs:{op:t.dropdownOp}}),n("br"),t._v("\n    下拉多选："),n("zoom-dropdown",{attrs:{op:t.dropdownOp2}}),n("br"),t._v("\n    下拉禁用："),n("zoom-dropdown",{attrs:{op:t.dropdownOp3}})],2),n("tab-template",{attrs:{cls:"data-drop",code:t.dropdownLoad}},[n("template",{slot:"header"},[n("h3",[t._v(t._s(t.$zoom.$t("动态设置数据")))]),n("text-template",{attrs:{code:"有时候下拉框数据是通过后台请求的，这就用到了动态加载数据，可以帮助开发者方便的开发"}})],1),t._v("\n    默认无数据："),n("zoom-dropdown",{ref:"dropdown",attrs:{op:t.dropdownOp4}}),n("br"),n("zoom-button",{on:{click:t.handleClick}},[t._v("点击加载数据")])],2),n("attribute",{attrs:{list:t.attributeList}})],1)},o=[],d={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"占位符",name:"placeHolder",type:"String",text:"可自定义占位符内容",text2:'用法: 配置op对象, 设置 <span>placeHolder: "参数"</span>'},{id:2,title:"下拉框数据",name:"data",type:"Array",text:"默认为暂无数据, 可手动配置数组对象, 对象里设置<span>value</span>和<span>text</span>, <span>text</span>为前端展示文本, <span>value</span>是传给后台的值",text2:'用法: 配置op对象, 设置 <span>data: [{value: "xx", text: "xxx"}]</span>'},{id:3,title:"默认选中",name:"default",type:"String",text:"<span>default</span>为默认展示的数据, 必须要是<span>data</span>数组里有的数据, <span>default</span>请和<span>value</span>值保持一致",text2:'用法: 配置op对象, 设置 <span>default: "属性"</span>'},{id:4,title:"错误信息",name:"errMsg",type:"String",text:"需要配置<span>testing</span>方法, 并且在方法返回<span>false</span>的情况下, 才会出现",text2:'用法: 配置op对象, 设置 <span>errMsg: "要提示用户的错误信息"</span>'},{id:5,title:"禁止输入",name:"readonly",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容",text2:'用法: 配置op对象, 设置 <span>readonly: "true"</span>'},{id:6,title:"禁用",name:"disabled",type:"Boolean",text:"默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容",text2:'用法: 配置op对象, 设置 <span>disabled: "true"</span>'},{id:7,title:"隐藏清除按钮",name:"hideClose",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>则不显示清除按钮",text2:'用法: 配置op对象, 设置 <span>hideClose: "true"</span>'},{id:8,title:"是否多选",name:"isChecked",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>则启用多选功能, 样式为复选框",text2:'用法: 配置op对象, 设置 <span>isChecked: "true"</span>'},{id:9,title:"最小输入字符",name:"minLength",type:"Number",text:"默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",text2:"用法: 配置op对象, 设置 <span>minLength: 0</span>"},{id:10,title:"最大输入字符",name:"maxLength",type:"Number",text:"设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",text2:"用法: 配置op对象, 设置 <span>maxLength: 50</span>"},{id:11,title:"组件宽度",name:"width",type:"String",text:"默认<span>270px</span>, 可自定义组件的宽度",text2:'用法: 配置op对象, 设置 <span>width: "100%"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"验证方法",name:"testing",type:"String",text:"绑定自定义验证方法",text2:"用法: 配置op对象, 并设置了<span>errMsg</span>后, 设置 <span>testing:val => {};</span> val为输入框内容, 如果方法返回<span>false</span>则显示<span>errMsg</span>的内容"},{id:2,title:"动态设置数据",name:"load",type:"Function",text:"通过ref来获取当前下拉框, 再调用<span></span>load方法, 入参为数组。",text2:"用法: <span>this.$refs[属性].load(data)</span>"},{id:3,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],dropdownOp4:{placeHolder:"--等待加载数据--"},dropdownOp3:{disabled:!0},dropdownOp2:{isChecked:!0,disabled:!1,placeHolder:"--请选择--",readonly:!0,hideClose:!1,data:[{value:"1",text:"北京"},{value:"2",text:"上海"},{value:"3",text:"广州"},{value:"4",text:"深圳"}]},dropdownOp:{isChecked:!1,disabled:!1,placeHolder:"--请选择--",default:"2",readonly:!1,errMsg:"必填",testing:function(t){return!!t},hideClose:!0,data:[{value:"1",text:"北京"},{value:"2",text:"上海"},{value:"3",text:"广州"},{value:"4",text:"深圳"}]},dropdownLoad:"&lt;template&gt;\n            &lt;div&gt;\n              默认无数据：&lt;zoom-dropdown ref=\"dropdown\"&gt;&lt;/zoom-dropdown&gt;&lt;br&gt;\n              &lt;zoom-button @click=\"handleClick\"&gt;点击加载数据&lt;/zoom-button&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                }\n              },\n              methods: {\n                handleClick() {\n                  let data = [\n                    {value: '1', text: '北京'},\n                    {value: '2', text: '上海'},\n                    {value: '3', text: '广州'},\n                    {value: '4', text: '深圳'}\n                  ];\n                  this.$refs['dropdown'].load(data);\n                }\n              }\n            }\n          &lt;/script&gt;",dropdownCustom:"&lt;template&gt;\n            &lt;div&gt;\n              下拉单选：&lt;zoom-dropdown :op=\"dropdownOp\"&gt;&lt;/zoom-dropdown&gt;\n              下拉多选：&lt;zoom-dropdown :op=\"dropdownOp2\"&gt;&lt;/zoom-dropdown&gt;\n              下拉禁用：&lt;zoom-dropdown :op=\"dropdownOp3\"&gt;&lt;/zoom-dropdown&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  dropdownOp3: {\n                    disabled: true,\n                  },\n                  dropdownOp2: {\n                    isChecked: true,\n                    disabled: false,\n                    placeHolder: '--请选择--',\n                    readonly: true,\n                    hideClose: false,\n                    data: [\n                      {value: '1', text: '北京'},\n                      {value: '2', text: '上海'},\n                      {value: '3', text: '广州'},\n                      {value: '4', text: '深圳'}\n                    ],\n                  },\n                  dropdownOp: {\n                    isChecked: false,\t\t\t//\t是否开启多选 为true情况下 v-model绑定返回数组\n                    disabled: false,\t\t\t// 是否禁用\n                    placeHolder: '--请选择--',\t//占位符\n                    default: '2',\t\t\t//默认选中的值, 写value\n                    readonly: false,\t\t//是否禁止输入\n                    errMsg: '必填',\n                    testing: val => {\n                      if (!val) {\n                        return false;\n                      } else {\n                        return true;\n                      }\n                    },\n                    hideClose: true,\t\t\t//是否隐藏清除按钮 默认false\n                    data: [\t\t\t\t\t\t//下拉框数据, 键值对的方式, text是展示的文本\n                      {value: '1', text: '北京'},\n                      {value: '2', text: '上海'},\n                      {value: '3', text: '广州'},\n                      {value: '4', text: '深圳'}\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",dropdownCode:"&lt;zoom-dropdown&gt;&lt;/zoom-dropdown&gt;"}},methods:{handleClick:function(){var t=[{value:"1",text:"北京"},{value:"2",text:"上海"},{value:"3",text:"广州"},{value:"4",text:"深圳"}];this.$refs["dropdown"].load(t)}}},p=d,s=(n("9012"),n("2877")),l=Object(s["a"])(p,a,o,!1,null,"1ef147de",null);e["default"]=l.exports}}]);
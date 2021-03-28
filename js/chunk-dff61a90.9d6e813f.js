(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dff61a90"],{1472:function(t,n,e){},"4d66":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"custom-zoom-input"},[e("h2",[t._v("使用方法")]),e("zoom-tabs",{staticClass:"basic",attrs:{value:t.curTab},on:{change:t.tabChange}},[e("zoom-tab-item",{attrs:{index:0,label:"效果"}},[e("zoom-input")],1),e("zoom-tab-item",{attrs:{index:1,label:"代码"}},[e("custom-code",{attrs:{html:t.ipt}})],1)],1),e("h3",[t._v("设置属性")]),e("p",[t._v("zoom-ui提供的input输入框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容")]),e("zoom-tabs",{staticClass:"basic",attrs:{value:t.opTab},on:{change:t.opChange}},[e("zoom-tab-item",{attrs:{index:0,label:"效果"}},[t._v("\n      姓名："),e("zoom-input",{attrs:{op:t.inputOp}}),e("br"),t._v("\n      密码："),e("zoom-input",{attrs:{op:t.inputOp2}}),e("br"),t._v("\n      禁用："),e("zoom-input",{attrs:{op:t.inputOp3}}),e("br"),t._v("\n      禁止输入："),e("zoom-input",{attrs:{op:t.inputOp4},model:{value:t.value,callback:function(n){t.value=n},expression:"value"}})],1),e("zoom-tab-item",{attrs:{index:1,label:"代码"}},[e("custom-code",{attrs:{html:t.opIpt}})],1)],1),e("attribute",{attrs:{list:t.attributeList}})],1)},p=[],s={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"输入框类型",name:"type",type:"String",text:"可选参数: <span>text</span> / <span>password</span>, 默认: <span>text</span>",text2:'用法: <span>type="可选参数"</span>'},{id:2,title:"占位符",name:"placeHolder",type:"String",text:"可自定义占位符内容",text2:'用法: 配置op对象, 设置 <span>placeHolder="参数"</span>'},{id:3,title:"自定义icon",name:"IconStyle",type:"String",text:"配置了自定义icon后, 在输入框最右边显示, 可以配合<span>onClick</span>点击事件一起使用",text2:'用法: 配置op对象, 设置 <span>IconStyle="icon类名"</span>'},{id:4,title:"错误信息",name:"errMsg",type:"String",text:"需要配置testing方法, 并且在方法返回<span>false</span>的情况下, 才会出现",text2:'用法: 配置op对象, 设置 <span>errMsg="要提示用户的错误信息"</span>'},{id:5,title:"禁止输入",name:"readonly",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容",text2:'用法: 配置op对象, 设置 <span>readonly="true"</span>'},{id:6,title:"禁用",name:"disabled",type:"Boolean",text:"默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容",text2:'用法: 配置op对象, 设置 <span>disabled="true"</span>'},{id:7,title:"最小输入字符",name:"minLength",type:"Number",text:"默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",text2:"用法: 配置op对象, 设置 <span>minLength: 0</span>"},{id:8,title:"最大输入字符",name:"maxLength",type:"Number",text:"设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",text2:"用法: 配置op对象, 设置 <span>maxLength: 50</span>"},{id:9,title:"组件宽度",name:"width",type:"String",text:"默认<span>270px</span>, 可自定义组件的宽度",text2:'用法: 配置op对象, 设置 <span>width: "100%"</span>'},{id:10,title:"隐藏清除按钮",name:"hideClose",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>则不显示清除按钮",text2:'用法: 配置op对象, 设置 <span>hideClose: "true"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"验证方法",name:"testing",type:"String",text:"绑定自定义验证方法",text2:"用法: 配置op对象, 并设置了<span>errMsg</span>后, 设置 <span>testing:val => {};</span> val为输入框内容, 如果方法返回<span>false</span>则显示<span>errMsg</span>的内容"},{id:2,title:"自定义icon的点击事件",name:"onClick",type:"Function",text:"绑定自定义Icon点击事件",text2:"用法: 配置op对象, 并设置了自定义icon后, 设置 <span>onClick:val => {};</span> val为输入框内容"},{id:3,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],value:"输入框内容",inputOp4:{readonly:!0},inputOp3:{disabled:!0},inputOp2:{placeHolder:"请输入密码",type:"password",errMsg:"密码必须是大写英文",testing:function(t){var n=/^[A-Z]+$/;return console.log(n.test(t),"=reg.testing(value)"),!!n.test(t)}},inputOp:{disabled:!1,placeHolder:"请输入姓名",readonly:!0,type:"text",IconStyle:"icon-add",onClick:function(){console.log("按钮被点击")},errMsg:"姓名长度必须大于10",testing:function(t){return t.length>10}},opTab:0,curTab:0,opIpt:"&lt;template&gt;\n            &lt;div&gt;\n              姓名：&lt;zoom-input :op=\"inputOp\"&gt;&lt;/zoom-input&gt;\n              密码：&lt;zoom-input :op=\"inputOp2\"&gt;&lt;/zoom-input&gt;\n              禁用：&lt;zoom-input :op=\"inputOp3\"&gt;&lt;/zoom-input&gt;\n              禁止输入：&lt;zoom-input v-model=\"value\" :op=\"inputOp4\"&gt;&lt;/zoom-input&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  value: '输入框内容',\n                  inputOp4: {\n                    readonly: true\n                  },\n                  op3: {\n                    disabled: true,\n                  },\n                  op2: {\n                    placeHolder: '请输入密码',\n                    type: 'password',\n                    errMsg: '密码必须是大写英文',\n                    testing: value =>; {\n                      let reg = /^[A-Z]+$/;\n                      if(reg.test(value)) {\n                        return true;\n                      } else {\n                        return false;\n                      }\n                    }\n                  },\n                  op: {\n                    disabled: false,\t\t// 是否禁用\n                    placeHolder: '请输入姓名',  //  占位符\n                    readonly: false,     //  是否禁止输入\n                    type: 'text',\t\t\t\t\t// 输入框类型 可选text或password\n                    IconStyle: 'icon-add',\t// 在输入框尾部追加自定义icon\n                    onClick:()=>; {\t\t\t\t\t// 当配置了自定义icon, 可以自定义回调函数 点击自定义图标触发\n                      console.log('按钮被点击');\n                    },\n                    errMsg: '姓名长度必须大于10',\t\t// 验证错误时候的提示信息\n                    testing: value =>; {\t\t\t// 用来验证的回调函数 可用正则匹配,如果写了此函数要写验证方法否则默认返回true\n                      if (value.length > 10) {\n                        return true;\n                      } else {\n                        return false;\n                      }\n                    }\n                  },\n                }\n              }\n            }\n          &lt;/script&gt;",ipt:"&lt;zoom-input&gt;&lt;/zoom-input&gt;"}},methods:{opChange:function(t){this.opTab=t},tabChange:function(t){this.curTab=t}}},o=s,i=(e("8744"),e("2877")),l=Object(i["a"])(o,a,p,!1,null,"77f1c7db",null);n["default"]=l.exports},8744:function(t,n,e){"use strict";var a=e("1472"),p=e.n(a);p.a}}]);
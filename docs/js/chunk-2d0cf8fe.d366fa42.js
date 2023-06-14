(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf8fe"],{"63f1":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"custom-zoom-form"},[o("tab-template",{attrs:{cls:"data-drop",code:t.formCode}},[o("template",{slot:"header"},[o("div",{staticClass:"tip"},[o("text-template",{attrs:{code:"zoom-ui的form表单组件提供了强大的表单功能"}})],1),o("h2",[t._v(t._s(t.$zoom.$t("使用方法")))]),o("text-template",{attrs:{code:"如果表单中只有一个按钮, 默认可以用回车键提交。或者点击会触发默认事件, 阻止默认事件可通过zoom-form标签中加*submit.prevent='false'*阻止默认提交事件"}})],1),o("zoom-form",{attrs:{"label-width":"100px"},on:{submit:function(t){return t.preventDefault(),(!1)(t)}}},[o("zoom-form-item",{attrs:{label:"姓名"}},[o("zoom-input")],1),o("zoom-form-item",{attrs:{label:"地址"}},[o("zoom-input")],1)],1)],2),o("tab-template",{attrs:{cls:"data-drop",code:t.formCustom}},[o("template",{slot:"header"},[o("h2",[t._v(t._s(t.$zoom.$t("高级用法")))]),o("text-template",{attrs:{code:"*label-width为label*的宽度, 可以自定义"}}),o("text-template",{attrs:{code:"在*zoom-form*标签上加 *:inline='true'* 可以将条目变为行内元素"}}),o("text-template",{attrs:{code:"在*zoom-form-item*标签上加 *:require='true'* 则为必填项, 可配合valid函数做校验"}}),o("text-template",{attrs:{code:"zoom-ui提供的*reset*函数可以重置表单内所有表单组件"}})],1),o("zoom-form",{ref:"form",attrs:{"label-width":"120px"}},[o("zoom-form-item",{attrs:{inline:"true",require:!0,label:"名字"}},[o("zoom-input",{attrs:{op:t.inputOp,placeholder:"请输入名字"}})],1),o("zoom-form-item",{attrs:{require:!0,inline:"true",label:"密码"}},[o("zoom-input",{attrs:{op:t.passwordOp,placeholder:"请输入密码"}})],1),o("zoom-form-item",{attrs:{label:"下拉框"}},[o("zoom-dropdown",{attrs:{op:t.dropdownOp}})],1),o("zoom-form-item",{attrs:{label:"搜索"}},[o("zoom-search")],1),o("zoom-form-item",{attrs:{require:!0,label:"部门"}},[o("zoom-input",{attrs:{op:t.inputOp,placeholder:"请输入部门"}})],1),o("zoom-form-item",{attrs:{label:"计数器"}},[o("zoom-numeric",{attrs:{op:t.inputOp}})],1),o("zoom-form-item",{attrs:{label:"复选框"}},[o("zoom-checkbox",{attrs:{op:t.checkOp}})],1),o("zoom-form-item",{attrs:{label:"单选框"}},[o("zoom-radio",{attrs:{op:t.checkOp}})],1),o("zoom-form-item",{attrs:{require:!0,label:"长框"}},[o("zoom-textarea",{attrs:{op:t.inputOp}})],1),o("zoom-form-item",{staticStyle:{"text-align":"center"}},[o("span",{staticClass:"zoom-btn primary",on:{click:t.testingClick}},[t._v("验证表单")]),o("span",{staticClass:"zoom-btn",on:{click:t.resetClick}},[t._v("重置表单")])])],1)],2),o("attribute",{attrs:{list:t.attributeList}})],1)},r=[],l={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"标签名",name:"label",type:"String",text:"表单条目的标签名称",text2:'用法: <span>zoom-form-item</span>组件标签上, 绑定 <span>label="标签名"</span>'},{id:2,title:"标签宽度",name:"label-width",type:"String",text:"设置form表单的标签宽度",text2:'用法: <span>zoom-form</span>组件标签上, 绑定 <span>label-width="100px"</span>'},{id:3,title:"行内元素方式显示",name:"inline",type:"Boolean",text:"form表单的条目默认为块级元素, 如果需要将其变为行内元素, 可使用属性<span>inline</span>",text2:'用法: <span>zoom-form</span>或者<span>zoom-form-item</span>组件标签上, 绑定 <span>:inline="true"/span>'},{id:4,title:"必填验证",name:"require",type:"Boolean",text:"对于绑定<span>require</span>属性的条目, 在调用<span>valid</span>方法时, 优先判断是否填写, 如果有填写, 再判断是否开始<span>testing</span>方法, 如果有则调用",text2:'用法: <span>zoom-form-item</span>组件标签上, 绑定 <span>:require="true"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"验证功能",name:"valid",type:"Function",text:"用于验证form表单内所有zoom-ui的表单元素, 验证成功返回<span>true</span>否则返回<span>true</span>",text2:"在组件标签中绑定ref属性, 然后this.$refs[绑定属性].valid() 方法直接调用"},{id:2,title:"重置功能",name:"reset",type:"Function",text:"用于重置form表单内所有zoom-ui的表单元素, 将其组件重置为初始值",text2:"在组件标签中绑定ref属性, 然后this.$refs[绑定属性].reset() 方法直接调用"}]}],checkOp:{data:[{value:1,text:"唱",checked:!0},{value:2,text:"跳"},{value:3,text:"rap"},{value:4,text:"篮球"}]},inputOp:{errMsg:"验证不通过",testing:function(t){return!!t}},passwordOp:{errMsg:"密码长度必须大于6位",type:"password",testing:function(t){return!!(t&&t.length>6)}},dropdownOp:{data:[{text:"北京",value:1},{text:"上海",value:2},{text:"深圳",value:3},{text:"广州",value:4}]},formCustom:'&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-form ref="form" label-width="120px"&gt;\n                &lt;zoom-form-item inline="true" :require="true" label="名字"&gt;\n                  &lt;zoom-input :op="inputOp" placeholder="请输入名字"&gt;&lt;/zoom-input&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item :require="true" inline="true" label="密码"&gt;\n                  &lt;zoom-input :op="passwordOp" placeholder="请输入密码"&gt;&lt;/zoom-input&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item label="下拉框"&gt;\n                  &lt;zoom-dropdown :op="dropdownOp"&gt;&lt;/zoom-dropdown&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item label="搜索"&gt;\n                  &lt;zoom-search&gt;&lt;/zoom-search&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item :require="true" label="部门"&gt;\n                  &lt;zoom-input :op="inputOp" placeholder="请输入部门"&gt;&lt;/zoom-input&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item label="计数器"&gt;\n                  &lt;zoom-numeric :op="inputOp"&gt;&lt;/zoom-numeric&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item label="复选框"&gt;\n                  &lt;zoom-checkbox :op="checkOp"&gt;&lt;/zoom-checkbox&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item label="单选框"&gt;\n                  &lt;zoom-radio :op="checkOp"&gt;&lt;/zoom-radio&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item :require="true" label="长框"&gt;\n                  &lt;zoom-textarea :op="inputOp"&gt;&lt;/zoom-textarea&gt;\n                &lt;/zoom-form-item&gt;\n                &lt;zoom-form-item style="text-align: center"&gt;\n                  &lt;zoom-button @click="testingClick" type="primary"&gt;验证表单&lt;/zoom-button&gt;\n                  &lt;zoom-button @click="resetClick"&gt;重置表单&lt;/zoom-button&gt;\n                &lt;/zoom-form-item&gt;\n              &lt;/zoom-form&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  checkOp: {\n                    data: [\n                      {value: 1, text: \'唱\', checked: true},\n                      {value: 2, text: \'跳\'},\n                      {value: 3, text: \'rap\'},\n                      {value: 4, text: \'篮球\'}\n                    ]\n                  },\n                  inputOp: {\n                    errMsg: \'验证不通过\',\n                    testing: val =&gt; {\n                      if (!val) {\n                        return false\n                      } else {\n                        return true\n                      }\n                    }\n                  },\n                  passwordOp: {\n                    type: \'password\',\n                    errMsg: \'密码长度必须大于6位\',\n                    testing: val =&gt; {\n                      if (val && val.length > 6) {\n                        return true\n                      } else {\n                        return false\n                      }\n                    }\n                  },\n                  dropdownOp: {\n                    data: [\n                      {text: \'北京\', value: 1},\n                      {text: \'上海\', value: 2},\n                      {text: \'深圳\', value: 3},\n                      {text: \'广州\', value: 4}\n                    ]\n                  }\n                }\n              },\n              methods: {\n                testingClick() {\n                  this.$refs[\'form\'].valid()\n                },\n                resetClick() {\n                  this.$refs[\'form\'].reset()\n                }\n              }\n            }\n          &lt;/script&gt;',formCode:'&lt;zoom-form @submit.prevent="false" label-width="100px"&gt;\n            &lt;zoom-form-item label="姓名"&gt;\n              &lt;zoom-input&gt;&lt;/zoom-input&gt;\n            &lt;/zoom-form-item&gt;\n            &lt;zoom-form-item label="地址"&gt;\n              &lt;zoom-input&gt;&lt;/zoom-input&gt;\n            &lt;/zoom-form-item&gt;\n          &lt;/zoom-form&gt;'}},methods:{testingClick:function(){this.$refs["form"].valid()},resetClick:function(){this.$refs["form"].reset()}}},m=l,a=o("2877"),i=Object(a["a"])(m,n,r,!1,null,"7ec137c9",null);e["default"]=i.exports}}]);
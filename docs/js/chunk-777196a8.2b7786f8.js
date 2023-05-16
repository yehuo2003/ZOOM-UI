(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-777196a8"],{"54c2":function(t,e,a){"use strict";var n=a("7271"),o=a.n(n);o.a},7271:function(t,e,a){},f6e9:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"custom-zoom-date"},[a("h2",[t._v("使用方法")]),a("zoom-tabs",{staticClass:"data-drop",attrs:{value:t.curTab},on:{change:t.tabChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-date")],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:t.dateCode}})],1)],1),a("h3",[t._v("设置属性")]),a("p",[t._v("zoom-ui提供的日期选择组件，组件可以用v-model绑定,默认显示当前时间, 点击输入框,弹出日期选择框,\n    点击年份, 可选择前后六年时间,点击月份 可在1~12月份之间选择,也可以点击左右箭头切换。可以绑定op对象，并设置常用属性")]),a("p",[t._v("禁用状态下，无法拖动文本域")]),a("zoom-tabs",{staticClass:"data-drop",attrs:{value:t.opTab},on:{change:t.opChange}},[a("zoom-tab-item",{attrs:{index:0,label:"效果"}},[a("zoom-date",{attrs:{op:t.dateOp}}),a("br"),t._v("\n      禁用日期选择："),a("br"),a("zoom-date",{attrs:{op:t.dateOp2}})],1),a("zoom-tab-item",{attrs:{index:1,label:"代码"}},[a("custom-code",{attrs:{html:t.dateCustom}})],1)],1),a("attribute",{attrs:{list:t.attributeList}})],1)},o=[],s={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"禁用",name:"disabled",type:"Boolean",text:"默认<span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 选择日期",text2:'用法: 配置op对象, 设置 <span>disabled="true"</span>'},{id:2,title:"初始化时间",name:"dateTime",type:"Date",text:"默认当前日期, 可传入时间戳, 或者其它时间格式类型的数据",text2:'用法: 配置op对象, 设置 <span>dateTime="时间类型"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"组件编译完成时执行的事件",name:"onComplete",type:"Function",text:"",text2:"用法: 配置op对象后设置回调函数, 会返回两个参数 <span>arr</span>和<span>time</span>, <span>arr</span>是日期数组(年月日周几 + 时分秒), <span>time</span>是时间"},{id:2,title:"组件渲染完成时执行的事件",name:"onRender",type:"Function",text:"",text2:"用法: 配置op对象后设置回调函数, 会返回两个参数 <span>arr</span>和<span>time</span>, <span>arr</span>是日期数组(年月日周几 + 时分秒), <span>time</span>是时间"},{id:3,title:"选择日期框日期后执行的事件",name:"onShow",type:"Function",text:"",text2:"用法: 配置op对象后设置回调函数, 返回一个参数<span>day</span>, <span>day</span>里面有个参数<span>flag</span> 用来表示是否当前月 <span>false</span>则表示不在当前月"},{id:4,title:"动态设置当前时间",name:"load",type:"Function",text:"可以动态设置当前时间, 需要传入时间类型数据",text2:"用法: 在标签中设置自定义<span>ref</span>属性, 通过<span>this.$refs[自定义属性].load(日期对象)</span> 来动态设置当前日期"},{id:5,title:"设置禁用状态",name:"setDisabled",type:"Function",text:"参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",text2:"用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>"}]}],dateOp2:{disabled:!0,dateTime:"2020-02-02"},dateOp:{disabled:!1,dateTime:1396945578506,onComplete:function(t,e){console.log("组件编译完成onComplete",t,e)},onRender:function(t,e){console.log("组件渲染完成onRender",t,e)},onShow:function(t){console.log("选择日期框日期后执行的事件",t)}},opTab:0,curTab:0,dateCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-date :op=\"dateOp\"&gt;&lt;/zoom-date&gt;&lt;br&gt;\n              禁用日期选择：&lt;br&gt;\n              &lt;zoom-date :op=\"dateOp2\"&gt;&lt;/zoom-date&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  dateOp2: {\n                    disabled: true,\n                    dateTime: '2020-02-02'\n                  },\n                  dateOp: {\n                    disabled: false,  //  是否禁用\n                    dateTime: 1396945578506,\t//\t或者字符串 '2019-01-01'  '2019-01-01 12:30:50'\t也可以\n                    onComplete: (arr, time) =&gt; {\t//\tarr是日期数组(年月日周几 + 时分秒)\n                      console.log('组件编译完成onComplete', arr, time);\n                    },\n                    onRender: (arr, time) =&gt; {  //  组件渲染完成时执行的事件\n                      console.log('组件渲染完成onRender', arr, time);\n                    },\n                    onShow: day =&gt; {\t// 选择日期框日期后执行的事件 日期对象 flag 是否当前月 false则表示不在当前月\n                      console.log('选择日期框日期后执行的事件', day);\n                    }\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",dateCode:"&lt;zoom-date&gt;&lt;/zoom-date&gt;"}},methods:{opChange:function(t){this.opTab=t},tabChange:function(t){this.curTab=t}}},p=s,i=(a("54c2"),a("2877")),d=Object(i["a"])(p,n,o,!1,null,"048f2edc",null);e["default"]=d.exports}}]);
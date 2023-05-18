(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79ca2aeb"],{"281c":function(s,t,r){"use strict";r.r(t);var e=function(){var s=this,t=s.$createElement,r=s._self._c||t;return r("div",{staticClass:"custom-zoom-progress"},[s._m(0),r("tab-template",{attrs:{code:s.progressCode}},[r("template",{slot:"header"},[r("h2",[s._v("基础使用")]),r("p",[s._v("通过参数"),r("span",[s._v("progress")]),s._v("可以动态绑定进度条的状态")])]),r("zoom-progress",{attrs:{progress:s.progressNumber}}),r("zoom-progress",{attrs:{op:s.progressOp}})],2),r("tab-template",{attrs:{code:s.iptStatus}},[r("template",{slot:"header"},[r("h2",[s._v("自定义状态")]),r("p",[s._v("通过参数"),r("span",[s._v("status")]),s._v("可以动态绑定进度条的状态")])]),r("zoom-progress",{attrs:{progress:s.progressNumber}}),r("br"),r("zoom-progress",{attrs:{progress:s.progressNumber,status:"danger"}}),r("br"),r("zoom-progress",{attrs:{progress:s.progressNumber,status:"warning"}}),r("br"),r("zoom-progress",{attrs:{progress:s.progressNumber,status:"info"}}),r("br"),r("zoom-progress",{attrs:{progress:s.progressNumber,status:"success"}})],2),r("tab-template",{attrs:{cls:"data-drop",code:s.progressCustom}},[r("template",{slot:"header"},[r("h2",[s._v("个性化设置")]),r("p",[s._v("进度条的值和状态均为动态绑定")]),r("p",[s._v("点击下面按钮查看效果")])]),r("zoom-progress",{attrs:{progress:s.progressVal,status:s.status}}),r("zoom-button",{attrs:{"reset-time":"5200"},on:{click:s.addProgress}},[s._v("点我试试")])],2),r("attribute",{attrs:{list:s.attributeList}})],1)},o=[function(){var s=this,t=s.$createElement,r=s._self._c||t;return r("div",{staticClass:"tip"},[s._v("\n    zoom-ui提供的进度条组件, 取值范围 0% ~ 100%, 初始值为 0, 可自定义"),r("br"),s._v("\n    进度条提供了五种状态, 可供用户自定义 "),r("br"),s._v("\n    还可以自定义数值放在内部或外部\n  ")])}],n={data:function(){return{progressVal:0,status:"danger",progressNumber:50,attributeList:[{id:1,title:"属性",content:[{id:1,title:"进度条状态",name:"progress",type:"Number",text:"绑定当前进度条状态, 范围1~100之间",text2:'用法: 配置op属性, 设置<span>progress: 数值</span>, 或者直接在组件标签绑定属性<span>progress="数值"</span>'},{id:2,title:"进度条状态",name:"status",type:"String",text:"默认<span>primary</span>, 可选参数<span>danger</span>, <span>warning</span>, <span>success</span>, <spaninfo</span>, <span>primary</span>",text2:'用法: 配置op属性, 设置<span>status: "状态"</span>, 或者直接在组件标签绑定属性<span>status="状态"</span>'},{id:3,title:"进度条文字内容",name:"text",type:"String",text:"进度条默认展示的文字内容, 如果不设置默认展示百分比, 该值可以设置随进度条百分比动态改变",text2:'用法: 配置op属性, 设置<span>text: "内容"</span>, 或者直接在组件标签绑定属性<span>text="内容"</span>'},{id:4,title:"是否进度条内部展示数值",name:"inside",type:"Boolean",text:"默认为<span>false</span>, 当设置为<span>true</span>, 则内容展示在内部",text2:"用法: 配置op属性, 设置<span>inside: true</span>"}]}],progressOp:{status:"danger",progress:30,inside:!0},progressCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-progress :progress=\"progressVal\" :status=\"status\"&gt;&lt;/zoom-progress&gt;\n              &lt;zoom-button reset-time=\"5000\" @click=\"addProgress\"&gt;点我试试&lt;/zoom-button&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  progressVal: 0,\n                  status: 'danger',\n                }\n              },\n              methods: {\n                addProgress() {\n                  this.progressVal = 0;\n                  let progressTime = setInterval(() =&gt; {\n                    this.progressVal += 1;\n                    if (this.progressVal &gt; 30) {\n                      this.status = 'info'\n                    }\n                    if (this.progressVal &gt; 60) {\n                      this.status = 'warning'\n                    }\n                    if (this.progressVal &gt; 99) {\n                      this.status = 'success'\n                    }\n                    if (this.progressVal === 100) {\n                      clearInterval(progressTime);\n                    }\n                  }, 50);\n                }\n              }\n            }\n          &lt;/script&gt;",iptStatus:'&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-progress :progress="progressNumber"&gt;&lt;/zoom-progress&gt;&lt;br&gt;\n              &lt;zoom-progress :progress="progressNumber" status="danger"&gt;&lt;/zoom-progress&gt;&lt;br&gt;\n              &lt;zoom-progress :progress="progressNumber" status="warning"&gt;&lt;/zoom-progress&gt;&lt;br&gt;\n              &lt;zoom-progress :progress="progressNumber" status="info"&gt;&lt;/zoom-progress&gt;&lt;br&gt;\n              &lt;zoom-progress :progress="progressNumber" status="success"&gt;&lt;/zoom-progress&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  progressNumber: 50\n                }\n              }\n            }\n          &lt;/script&gt;',progressCode:'&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-progress :progress="progressNumber"&gt;&lt;/zoom-progress&gt;\n              &lt;zoom-progress :op="progressOp"&gt;&lt;/zoom-progress&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  progressNumber: 50,\n                  progressOp: {\n                    status: \'danger\', // 进度条状态\n                    progress: 30,   //  进度条的值\n                    inside: true  //  是否显示外部, 设置false显示在内部\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;'}},methods:{addProgress:function(){var s=this;this.progressVal=0;var t=setInterval((function(){s.progressVal+=1,s.progressVal>30&&(s.status="info"),s.progressVal>60&&(s.status="warning"),s.progressVal>99&&(s.status="success"),100===s.progressVal&&clearInterval(t)}),50)}}},a=n,p=(r("e094"),r("2877")),g=Object(p["a"])(a,e,o,!1,null,"0ebdca08",null);t["default"]=g.exports},8228:function(s,t,r){},e094:function(s,t,r){"use strict";var e=r("8228"),o=r.n(e);o.a}}]);
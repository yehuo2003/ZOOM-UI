(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cbfb79be"],{7779:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"custom-zoom-pager"},[a("h2",[t._v(t._s(t.$zoom.$t("使用方法")))]),a("div",{staticClass:"tip"},[a("text-template",{attrs:{code:"zoom-ui提供了强大的分页组件, 可以配合表格组件或者其它组件一起使用"}}),a("text-template",{attrs:{code:"需要对分页组件配置op对象, 并配置相应信息"}}),a("text-template",{attrs:{code:"分页组件还提供了多个点击事件, 来方便开发者使用"}})],1),a("tab-template",{attrs:{code:t.pagerCode}},[a("template",{slot:"header"},[a("h2",[t._v(t._s(t.$zoom.$t("基础使用")))])]),a("zoom-pager",{attrs:{op:t.pagerOp}})],2),a("tab-template",{attrs:{cls:"data-drop",code:t.pagerCustom}},[a("template",{slot:"header"},[a("h2",[t._v(t._s(t.$zoom.$t("迷你版")))]),a("p",[t._v(t._s(t.$zoom.$t("显示迷你版分页组件")))])]),a("zoom-pager",{attrs:{op:t.miniOp}})],2),a("attribute",{attrs:{list:t.attributeList}})],1)},p=[],o={data:function(){var t=this;return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"选择每页展示数量",name:"pageSizes",type:"Array",text:"配置可供用户选择的每页展示数量, 以下拉框形式呈现",text2:"用法: 配置op属性, 设置<span>pageSizes: [每页数量]</span>"},{id:2,title:"分页模式",name:"mode",type:"String",text:"默认<span>Number</span>, 可选参数<span>mini</span>, <span>Number</span>",text2:'用法: 配置op属性, 设置<span>mode: "mini"</span>'},{id:3,title:"分页数据",name:"pageVal",type:"Object",text:"以对象形式设置分页数据<span>pageVal</span>, 对象内有三个参数可设置: 总条数<span>total</span>, 当前页<span>curPage</span>, 每页展示数据<span>pageSize</span>",text2:'用法: 配置op属性, 设置<span>pageVal: "对象"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"监听下拉数据变化的回调",name:"pageSizeSkip",type:"Function",text:"监听每页大小的下拉框数据发生改变事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",text2:"用法: 配置op属性, 设置<span>pageSizeSkip: (val, pageVal) => {}</span>"},{id:2,title:"监听跳转前的回调",name:"beforeSkip",type:"Function",text:"监听分页组件跳转事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",text2:"用法: 配置op属性, 设置<span>beforeSkip: (val, pageVal) => {}</span>"},{id:3,title:"监听跳转后的回调",name:"skip",type:"Function",text:"监听分页组件跳转后事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",text2:"用法: 配置op属性, 设置<span>skip: (val, pageVal) => {}</span>"},{id:4,title:"动态设置分页数据",name:"load",type:"Function",text:"动态设置分页数据, 需要绑定<span>ref</span>来动态设置数据",text2:'用法: 标签中绑定ref, <span>this.$refs["page"].load(pageVal)</span>'}]}],pagerOp:{pageSizes:[5,10,20],mode:"Number",pageVal:{total:100,curPage:3,pageSize:20},pageSizeSkip:function(e,a){t.pageSize=e},beforeSkip:function(t,e){console.log("要跳转到",t)},skip:function(t,e){console.log("当前页是",t),console.log("分页数据是",e)}},miniOp:{mode:"mini",pageVal:{total:100,curPage:1,pageSize:20}},pagerCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-pager :op=\"miniOp\"&gt;&lt;/zoom-pager&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  miniOp: {\n                  mode: 'mini',\n                    pageVal: {\n                      total: 100,\t// 总条数\n                      curPage: 1,\t// 展示的当前页\n                      pageSize: 20\t// 每页要展示多少条数据\n                    }\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",pagerCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-pager :op=\"pagerOp\"&gt;&lt;/zoom-pager&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  pagerOp: {\n                    pageSizes: [5, 10, 20],\t// 可选择每页展示数量\n                    mode: 'Number',\t// 展示模式 mini为简单版, Number为完全版 默认Number\n                    pageVal: {\n                      total: 100,\t// 总条数\n                      curPage: 3,\t// 展示的当前页\n                      pageSize: 20\t// 每页要展示多少条数据\n                    },\n                    pageSizeSkip: (val, pageVal) =&gt; {\n                      this.pageSize = val;\t// 每页大小的下拉框数据发生改变事件\n                    },\n                    beforeSkip: (val, pageVal) =&gt; {\n                      console.log('要跳转到',val);\t//跳转前事件\n                    },\n                    skip: (val, pageVal) =&gt; {\n                      console.log('当前页是',val);\t//点击跳转触发获取当前页\n                      console.log('分页数据是', pageVal); //  分页的数据\n                    }\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}},methods:{pager2Num:function(){console.log("滑块2当前值是"+this.num2)},pager1Num:function(){console.log("滑块1当前值是"+this.num1)}}},i=o,s=(a("e327"),a("2877")),l=Object(s["a"])(i,n,p,!1,null,"3f861243",null);e["default"]=l.exports},"8d23":function(t,e,a){},e327:function(t,e,a){"use strict";var n=a("8d23"),p=a.n(n);p.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fc0010f"],{1415:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"custom-zoom-grid"},[n("h2",[e._v(e._s(e.$zoom.$t("使用方法")))]),n("div",{staticClass:"tip"},[n("text-template",{attrs:{code:"zoom-ui提供的表格组件, 可自由设置表格数据"}}),n("text-template",{attrs:{code:"配置数据可在组件标签中绑定op对象, 在op对象里绑定数据"}}),n("text-template",{attrs:{code:"组件默认索引值在第一列, 也可以自己设定隐藏索引值"}}),n("text-template",{attrs:{code:"如果有按钮的话, 则加载在索引值的后面,  即第二列"}})],1),n("tab-template",{attrs:{code:e.gridCode}},[n("template",{slot:"header"},[n("h2",[e._v(e._s(e.$zoom.$t("基础使用")))])]),n("zoom-grid",{attrs:{op:e.gridOp}})],2),n("tab-template",{attrs:{cls:"data-drop",code:e.gridLoad}},[n("template",{slot:"header"},[n("h2",[e._v(e._s(e.$zoom.$t("手动加载数据")))]),n("text-template",{attrs:{code:"请点击*手动加载数据*按钮试试"}})],1),n("zoom-button",{on:{click:e.loadData}},[e._v("手动加载数据")]),n("zoom-grid",{ref:"grid",attrs:{op:e.gridOp2}})],2),e.showGrid?n("tab-template",{attrs:{cls:"data-drop",code:e.gridCheck}},[n("template",{slot:"header"},[n("h3",[e._v(e._s(e.$zoom.$t("带复选功能的表格")))]),n("text-template",{attrs:{code:"当开启复选框时候, 调用*getData()*方法获取的是已选中数据"}})],1),n("zoom-grid",{attrs:{op:e.gridOp3}})],2):e._e(),e.showGrid?n("tab-template",{attrs:{cls:"data-drop",code:e.gridEdit}},[n("template",{slot:"header"},[n("h3",[e._v(e._s(e.$zoom.$t("表格的编辑功能")))]),n("text-template",{attrs:{code:"grid.description.1"}}),n("p")],1),n("zoom-grid",{attrs:{op:e.gridOp4},on:{editChange:e.handlerEdit}})],2):e._e(),n("div",{staticClass:"tip"},[n("text-template",{attrs:{code:"grid.description.2"}})],1),n("attribute",{attrs:{list:e.attributeList}})],1)},i=[],d={data:function(){return{showGrid:!1,attributeList:[{id:1,title:"属性",content:[{id:1,title:"表格高度",name:"height",type:"String",text:"当设置了高度, 则对表格内容限制了高度 如果内容溢出将出现滚动条",text2:"用法: 配置op属性, 设置<span>height: 高度</span>"},{id:2,title:"表格列宽",name:"width",type:"String",text:"在列对象内设置, 宽度为百分比, 只针对列宽",text2:"用法: 配置op属性, 在配置了表头数据后, 在列对象中设置<span>width: 宽度</span>"},{id:3,title:"隐藏索引",name:"hideIndex",type:"Boolean",text:"索引值默认在表格最前边显示, 可以手动设置为<span>true</span>关闭",text2:"用法: 配置op属性, 设置<span>hideIndex: true</span>"},{id:4,title:"开启复选框功能",name:"isChecked",type:"Boolean",text:"默认<span>false</span> , 设置为<span>true</span>开启, 开启后点击表头可以全选或取消, 开启后绑定 @fullClick 函数,可以监听全选/取消的状态值变化",text2:"用法: 配置op属性, 设置<span>isChecked: true</span>"},{id:5,title:"配置表头数据",name:"title",type:"Array",text:"表头数据为数组对象形式, 配置的表头数据里对象key值需要和表主体的值对应才能成功渲染",text2:"用法: 配置op属性, 设置<span>title: []</span>"},{id:6,title:"按钮组",name:"btns",type:"Array",text:"如果需要配置按钮组, 需要在配置表头数据后, 在表头数据内配置, 一般放在最前面, 否则可能会产生BUG",text2:"用法: 配置op属性, 在表头配置内设置<span>btns: []</span>"},{id:7,title:"列排序功能",name:"sort",type:"Boolean",text:"排序功能针对列属性, 需要配置表头数据后在表头对象里配置, 默认<span>false</span> , 设置为<span>true</span>开启,</br>开启后在表头列上会显示上下箭头排序按钮,点击可根据索引值升序或者降序",text2:"用法: 配置op属性, 在表头配置内设置<span>btns: []</span>"},{id:8,title:"tip提示",name:"tip",type:"Boolean",text:"tip功能默认<span>false</span> , 设置为<span>true</span>开启, 然后在要显示的列中配置",text2:"用法: 配置op属性, 设置属性<span>tip: true</span>, 然后再到要展示tip的列对象中内设置<span>tip: true</span>"},{id:9,title:"表格数据",name:"data",type:"Array",text:"表格内容数据 键名需要和表头配置的对应, 需要在页面渲染前配置, 如果页面渲染完成后再配置则无效",text2:"用法: 配置op属性, 设置<span>data: []</span>"}]},{id:2,title:"方法",content:[{id:1,title:"表格行点击事件",name:"onClick",type:"Function",text:"方法有三个参数: <span>dom</span>为当前行dom元素 <span>td</span>当前点击单元格 <span>col</span>当前行",text2:"用法: 配置op属性, 设置<span>onClick: (dom, td, col) => => {}</span>"},{id:2,title:"表格按钮点击事件",name:"onClick",type:"Function",text:"方法有两个参数: <span>value</span>为当前行数据 <span>index</span>为当前索引",text2:"用法: 配置op属性, 在表头内的<span>btns</span>对象中设置<span>onClick: (value, index) => {}</span>"},{id:3,title:"组件加载时的回调",name:"beforeLoad",type:"Function",text:"组件加载时调用, 可以这时挂载数据",text2:"用法: 配置op属性, 设置<span>beforeLoad: () => {}</span>"},{id:4,title:"监听复选框状态的回调",name:"fullClick",type:"Function",text:"可以监听复选框状态的变化, 当选择或者取消选择时会触发该函数",text2:"用法: 标签中绑定函数<span>@fullClick</span>可监听变化"},{id:5,title:"获取当前表格数据",name:"getData",type:"Function",text:"可以获取当前表格内全部数据, 如果是复选框状态, 则获取的是选中的数据",text2:'用法: 标签中绑定ref, <span> this.$refs["grid"].getData()</span>可调用'},{id:6,title:"设置/加载表格数据",name:"load",type:"Function",text:"可以动态设置/加载表格数据",text2:'用法: 标签中绑定ref, <span> this.$refs["grid"].load(数据)</span>可动态渲染'},{id:7,title:"loading效果",name:"showLoad",type:"Function",text:"可以开启/关闭表格内置的loading效果, 默认关闭状态, 可手动开启",text2:'用法: 标签中绑定ref, <span> this.$refs["grid"].showLoad(true/false)</span>可开启或关闭'}]}],gridOp:{height:"150px",hideIndex:!1,tip:!0,isChecked:!1,onClick:function(e,t,n){console.log(e,t,n)},title:[{fieId:"btns",header:"操作",width:10,sort:!1,btns:[{title:"移除",css:{icon:"icon-close"},onClick:function(e,t){console.log("点击的当前行是:",e),console.log("点击的当前行下标是:",t)}},{title:"编辑",css:{icon:"icon-edit"},onClick:function(e,t){console.log("点击的当前行是:",e),console.log("点击的当前行下标是:",t)}}]},{fieId:"name",header:"姓名"},{fieId:"age",header:"年龄"},{fieId:"gender",header:"性别"},{fieId:"city",tip:!0,header:"地址"},{fieId:"phone",tip:!0,header:"联系方式"}],data:[{name:"张三",age:27,gender:"男",city:"北京",phone:123456789},{name:"李四",age:130,gender:"男",city:"上海",phone:123456789},{name:"赵六",age:28,gender:"女",city:"广州",phone:123456789},{name:"王五",age:30,gender:"男",city:"深圳",phone:123456789}]},gridOp4:{hideIndex:!1,editMode:!0,title:[{fieId:"name",header:"姓名",editable:!0},{fieId:"age",header:"年龄"},{fieId:"gender",header:"性别"},{fieId:"city",header:"地址",editable:!0},{fieId:"phone",header:"联系方式",editable:!0}],data:[{name:"张三",age:27,gender:"男",city:"北京",phone:123456789},{name:"李四",age:130,gender:"男",city:"上海",phone:123456789},{name:"赵六",age:28,gender:"女",city:"广州",phone:123456789},{name:"王五",age:30,gender:"男",city:"深圳",phone:123456789}]},gridOp3:{hideIndex:!0,isChecked:!0,title:[{fieId:"name",header:"姓名"},{fieId:"age",header:"年龄"},{fieId:"gender",header:"性别"},{fieId:"city",header:"地址"},{fieId:"phone",header:"联系方式"}],data:[{name:"张三",age:27,gender:"男",city:"北京",phone:123456789},{name:"李四",age:130,gender:"男",city:"上海",phone:123456789},{name:"赵六",age:28,gender:"女",city:"广州",phone:123456789},{name:"王五",age:30,gender:"男",city:"深圳",phone:123456789}]},gridOp2:{title:[{fieId:"age",tip:!1,header:"年龄"},{fieId:"name",tip:!1,header:"姓名"},{fieId:"gender",header:"性别"},{fieId:"city",tip:!0,header:"地址"},{fieId:"phone",tip:!0,header:"联系方式"}],data:[]},list:[{name:"张三",age:27,gender:"男",city:"北京",phone:123456789},{name:"李四",age:130,gender:"男",city:"上海",phone:123456789},{name:"赵六",age:28,gender:"女",city:"广州",phone:123456789},{name:"王五",age:30,gender:"男",city:"深圳",phone:123456789}],gridEdit:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-grid :op=\"gridOp\" @editChange=\"handlerEdit\"&gt;&lt;/zoom-grid&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  gridOp: {\n                    hideIndex: true,\n                    editMode: true,\n                    title: [\n                      {fieId: 'name', header: '姓名', editable: true},\n                      {fieId: 'age', header: '年龄'},\n                      {fieId: 'gender', header: '性别'},\n                      {fieId: 'city', header: '地址', editable: true},\n                      {fieId: 'phone', header: '联系方式', editable: true}\n                    ],\n                    data: [ // 表格内容数据 键名需要和表头配置的对应\n                      {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},\n                      {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},\n                      {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},\n                      {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}\n                    ]\n                  }\n                }\n              },\n              methods: {\n                handlerEdit(oldVal, newVal) {\n                  console.log('表格旧值: ' + oldVal, '表格新值: ' + newVal);\n                },\n              }\n            }\n          &lt;/script&gt;",gridCheck:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-grid :op=\"gridOp\"&gt;&lt;/zoom-grid&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  gridOp: {\n                    hideIndex: true,\n                    isChecked: true,\n                    title: [\n                      {fieId: 'name', header: '姓名'},\n                      {fieId: 'age', header: '年龄'},\n                      {fieId: 'gender', header: '性别'},\n                      {fieId: 'city', header: '地址'},\n                      {fieId: 'phone', header: '联系方式'}\n                    ],\n                    data: [ // 表格内容数据 键名需要和表头配置的对应\n                      {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},\n                      {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},\n                      {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},\n                      {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}\n                    ]\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;",gridLoad:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-button @click=\"loadData\"&gt;手动加载数据&lt;/zoom-button&gt;\n              &lt;zoom-grid ref=\"grid\" :op=\"gridOp\"&gt;&lt;/zoom-grid&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  list: [ // 表格内容数据 键名需要和表头配置的对应\n                    {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},\n                    {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},\n                    {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},\n                    {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}\n                  ],\n                  gridOp: {\n                    title: [\n                      {fieId: 'age', header: '年龄'},\n                      {fieId: 'name', header: '姓名'},\n                      {fieId: 'gender', header: '性别'},\n                      {fieId: 'city', header: '地址'},\n                      {fieId: 'phone', header: '联系方式'}\n                    ],\n                    data: []\n                  }\n                }\n              },\n              methods: {\n                loadData() {\n                  this.$zoom.loading.show();\n                  setTimeout(() =&gt; {\n                    this.$refs['grid'].load(this.list);\n                    this.$zoom.loading.hide();\n                  }, 2000);\n                }\n              }\n            }\n          &lt;/script&gt;",gridCode:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-grid :op=\"gridOp\"&gt;&lt;/zoom-grid&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  gridOp: {\n                    height: '150px',\t//\t当设置了高度, 则对表格内容限制了高度 如果内容溢出将出现滚动条\n                    hideIndex: false, //\t默认false 为true不显示排序\n                    tip: true,  //  是否开启tip, 默认false, 开启后在对应列中还要设置tip: true才会生效\n                    isChecked: false,\t//\t是否启用复选框选项,默认否 开启后点击表头可以全选或取消, 开启后绑定 @fullClick 函数,可以监听全选/取消的状态值变化\n                    onClick: (dom, elem, col) =&gt; { // 点击行事件 dom为当前行dom元素 td当前点击单元格 col当前行\n                      console.log(dom, elem, col);\n                    },\n                    title: [\n                      {\n                        fieId: \"btns\",  // id,也是键值, 除了btns, 其它表格内容数据要与其对应\n                        header: '操作', // 表头文本名称\n                        width: 10,\t  // 列宽度\n                        sort: false,\t// 是否启用排序(为true显示上下箭头排序按钮,点击可根据索引值升序或者降序)\n                        btns: [\n                          {\n                            title: '移除',\n                            css: {\n                              icon: \"icon-close\"\n                            },\n                            onClick: (val, index) =&gt; {\n                              console.log('点击的当前行是:', val);\n                              console.log('点击的当前行下标是:', index);\n                            }\n                          },\n                          {\n                            title: '编辑',\n                            css: {\n                              icon: \"icon-edit\"\n                            },\n                            onClick: (val, index) =&gt; {\n                              console.log('点击的当前行是:', val);\n                              console.log('点击的当前行下标是:', index);\n                            }\n                          },\n                        ]\n                      },\n                      {fieId: 'name', header: '姓名'},\n                      {fieId: 'age', header: '年龄'},\n                      {fieId: 'gender', header: '性别'},\n                      {fieId: 'city',tip: true, header: '地址'},\n                      {fieId: 'phone',tip: true, header: '联系方式'}\n                    ],\n                    data: [ // 表格内容数据 键名需要和表头配置的对应\n                      {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},\n                      {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},\n                      {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},\n                      {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}\n                    ],\n                    // beforeLoad: () =&gt; { // 组件加载时调用, 可以这时挂载数据\n                    //   console.log('加载数据');\n                    //   this.load();\n                    // },\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}},mounted:function(){var e=this;setTimeout((function(){e.showGrid=!0}),1e3)},methods:{loadData:function(){var e=this;this.$zoom.loading.show(),setTimeout((function(){e.$refs["grid"].load(e.list),e.$zoom.loading.hide()}),2e3)},handlerEdit:function(e,t){console.log("表格旧值: "+e,"表格新值: "+t)}}},o=d,r=(n("16ab"),n("2877")),l=Object(r["a"])(o,a,i,!1,null,"36282f1c",null);t["default"]=l.exports},"16ab":function(e,t,n){"use strict";var a=n("f416"),i=n.n(a);i.a},f416:function(e,t,n){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a90a82e"],{"02f7":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"custom-zoom-captcha"},[n("h2",[t._v("使用方法")]),n("h3",[t._v("设置属性")]),n("p",[t._v("zoom-ui提供的滑块验证码，使用canvas绘制，默认隐藏图片，鼠标经过时候显示。可以绑定op对象，并设置常用属性")]),n("p",[t._v("禁用状态下，无法拖动文本域")]),n("zoom-tabs",{attrs:{value:t.opTab},on:{change:t.opChange}},[n("zoom-tab-item",{attrs:{index:0,label:"效果"}},[n("zoom-captcha",{attrs:{op:t.captchaOp}}),t._v("\n      禁用状态\n      "),n("zoom-captcha",{attrs:{op:t.captchaOp2}})],1),n("zoom-tab-item",{attrs:{index:1,label:"代码"}},[n("custom-code",{attrs:{html:t.captchaCustom}})],1)],1),n("attribute",{attrs:{list:t.attributeList}})],1)},o=[],p={data:function(){return{attributeList:[{id:1,title:"属性",content:[{id:1,title:"禁用验证码",name:"disabled",type:"Boolean",text:"默认<span>false</span>，当验证成功后为<span>true</span>，可手动修改，禁用后无法再刷新验证码",text2:'用法: 配置op对象, 设置 <span>disabled="true"</span>'},{id:2,title:"显示验证码",name:"show",type:"Boolean",text:"默认<span>false</span>，鼠标进过时，才会显示，当设置为<span>true</span>时候，则总是显示",text2:'用法: 配置op对象, 设置 <span>show="true"</span>'}]},{id:2,title:"方法",content:[{id:1,title:"随机图片地址",name:"RandomSrc",type:"Function",text:"在op对象中定义，该方法必须返回一个图片地址，用于显示验证码所需要的图片，每次刷新图片时候都会调用一次该方法",text2:"用法: 配置op对象, 在op对象里定义该方法 <span>RandomSrc: () => {return 图片地址}</span>，方法需返回一个有效的图片地址"},{id:2,title:"监听验证码成功的回调",name:"onSuccess",type:"Function",text:"在op对象中定义，当用户验证成功后，可以在该方法中监听到，并做下一步逻辑处理",text2:"用法: 配置op对象, 在op对象里定义该方法 <span>onSuccess: () => {}</span>"},{id:3,title:"监听验证码失败的回调",name:"onFailed",type:"Function",text:"在op对象中定义，当用户验证失败后，可以在该方法中监听到，并做下一步逻辑处理",text2:"用法: 配置op对象, 在op对象里定义该方法 <span>onFailed: () => {}</span>"}]}],captchaOp2:{disabled:!0},captchaOp:{show:!0,disabled:!1,errMsg:"必填",onSuccess:function(){console.log("验证成功")},onFailed:function(){console.log("验证失败")}},opTab:0,captchaCustom:"&lt;template&gt;\n            &lt;div&gt;\n              &lt;zoom-captcha :op=\"captchaOp\"&gt;&lt;/zoom-captcha&gt;\n              禁用状态\n              &lt;zoom-captcha :op=\"captchaOp2\"&gt;&lt;/zoom-captcha&gt;\n            &lt;/div&gt;\n          &lt;/template&gt;\n          &lt;script&gt;\n            export default {\n              data() {\n                return {\n                  captchaOp2: {\n                    disabled: true,\n                  },\n                  captchaOp: {\n                    show: true, //  总是显示  默认false, 鼠标经过时候才显示\n                    disabled: false, //  是否禁用 默认false, 验证成功后自动为true\n                    // RandomSrc: () =&gt; {  //  方法必须返回一个有效的图片链接, 如果未设置, 则展示默认地址\n                    //   return '图片地址'\n                    // },\n                    onSuccess: () =&gt; {  //  监听验证成功的回调\n                      console.log('验证成功');\n                    },\n                    onFailed: () =&gt; { //  监听验证失败后的回调\n                      console.log('验证失败');\n                    }\n                  }\n                }\n              }\n            }\n          &lt;/script&gt;"}},methods:{opChange:function(t){this.opTab=t}}},c=p,s=(n("557b"),n("2877")),l=Object(s["a"])(c,e,o,!1,null,"05ceb7bf",null);a["default"]=l.exports},2335:function(t,a,n){},"557b":function(t,a,n){"use strict";var e=n("2335"),o=n.n(e);o.a}}]);
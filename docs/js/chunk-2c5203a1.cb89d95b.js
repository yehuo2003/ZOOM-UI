(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c5203a1"],{"1f4d":function(t,i,e){},"28a5":function(t,i,e){"use strict";var n=e("aae3"),l=e("cb7c"),s=e("ebd6"),r=e("0390"),a=e("9def"),o=e("5f1b"),u=e("520a"),c=e("79e5"),h=Math.min,f=[].push,d="split",v="length",p="lastIndex",m=4294967295,g=!c((function(){RegExp(m,"y")}));e("214f")("split",2,(function(t,i,e,c){var w;return w="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[v]||2!="ab"[d](/(?:ab)*/)[v]||4!="."[d](/(.?)(.?)/)[v]||"."[d](/()()/)[v]>1||""[d](/.?/)[v]?function(t,i){var l=String(this);if(void 0===t&&0===i)return[];if(!n(t))return e.call(l,t,i);var s,r,a,o=[],c=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,d=void 0===i?m:i>>>0,g=new RegExp(t.source,c+"g");while(s=u.call(g,l)){if(r=g[p],r>h&&(o.push(l.slice(h,s.index)),s[v]>1&&s.index<l[v]&&f.apply(o,s.slice(1)),a=s[0][v],h=r,o[v]>=d))break;g[p]===s.index&&g[p]++}return h===l[v]?!a&&g.test("")||o.push(""):o.push(l.slice(h)),o[v]>d?o.slice(0,d):o}:"0"[d](void 0,0)[v]?function(t,i){return void 0===t&&0===i?[]:e.call(this,t,i)}:e,[function(e,n){var l=t(this),s=void 0==e?void 0:e[i];return void 0!==s?s.call(e,l,n):w.call(String(l),e,n)},function(t,i){var n=c(w,t,this,i,w!==e);if(n.done)return n.value;var u=l(t),f=String(this),d=s(u,RegExp),v=u.unicode,p=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),x=new d(g?u:"^(?:"+u.source+")",p),T=void 0===i?m:i>>>0;if(0===T)return[];if(0===f.length)return null===o(x,f)?[f]:[];var b=0,k=0,y=[];while(k<f.length){x.lastIndex=g?k:0;var U,C=o(x,g?f:f.slice(k));if(null===C||(U=h(a(x.lastIndex+(g?0:k)),f.length))===b)k=r(f,k,v);else{if(y.push(f.slice(b,k)),y.length===T)return y;for(var _=1;_<=C.length-1;_++)if(y.push(C[_]),y.length===T)return y;k=b=U}}return y.push(f.slice(b)),y}]}))},5441:function(t,i,e){"use strict";var n=e("1f4d"),l=e.n(n);l.a},"6d59":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("zoom-layout",{staticClass:"home-layout",attrs:{asideWidth:"220",toggleAside:"",footerHeight:"35"}},[e("zoom-tree-menu",{staticStyle:{"font-size":"14px"},attrs:{slot:"aside",op:t.navOp},slot:"aside"}),e("zoom-layout",{attrs:{slot:"main",headerHeight:"50"},slot:"main"},[e("h1",{staticClass:"component-header",attrs:{slot:"header"},slot:"header"},[t._v("\n        "+t._s(t.nowTitle)+"\n      ")]),e("router-view",{ref:"main",attrs:{slot:"main"},slot:"main"})],1),e("div",{staticClass:"component-footer",attrs:{slot:"footer"},slot:"footer"},[e("p",{directives:[{name:"show",rawName:"v-show",value:t.leftTitle,expression:"leftTitle"}],staticStyle:{float:"left"},on:{click:function(i){return t.toClick(t.leftUrl)}}},[e("span",{staticClass:"zoom-icon icon-left"}),t._v("\n      "+t._s(t.leftTitle)+"\n    ")]),e("p",{directives:[{name:"show",rawName:"v-show",value:t.rightTitle,expression:"rightTitle"}],staticStyle:{float:"right"},on:{click:function(i){return t.toClick(t.rightUrl)}}},[t._v("\n      "+t._s(t.rightTitle)+"\n      "),e("span",{staticClass:"zoom-icon icon-right"})])])],1)},l=[],s=(e("ac6a"),e("28a5"),{props:["data"],data:function(){return{leftTitle:null,rightTitle:null,leftUrl:null,rightUrl:null,nowTitle:null,list:[],navOp:{accordion:!0,data:[]}}},watch:{"$route.path":function(t){this.loadUrl("#"+t)}},created:function(){this.formatData(this.data)},methods:{formatData:function(t){var i=this;function e(t){return t.map((function(t){return t.children?e(t.children):t}))}this.navOp.data=t;var n=t.map((function(t){return t.children?e(t.children):t}));this.list=n.flat(1/0),setTimeout((function(){i.loadUrl()}))},toClick:function(t){var i=this;-1!==t.indexOf("#")&&(this.$router.push(t.split("#")[1]),setTimeout((function(){i.$nextTick((function(){i.loadUrl()}))}),200))},loadUrl:function(t){var i=this,e=null,n=null,l=null,s=null,r="#"+this.$route.path;t&&(r=t);var a=0;this.list.forEach((function(t,e){t.url===r&&(a=e,i.nowTitle=t.title)})),this.list[a-1]&&(l=this.list[a-1].url,e=this.list[a-1].title),this.list[a+1]&&(s=this.list[a+1].url,n=this.list[a+1].title),this.leftTitle=e,this.rightTitle=n,this.leftUrl=l,this.rightUrl=s}}}),r=s,a=(e("5441"),e("2877")),o=Object(a["a"])(r,n,l,!1,null,null,null);i["a"]=o.exports},a3d6:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("custom-ui",{attrs:{data:t.$store.state.devList}})},l=[],s=e("6d59"),r={components:{customUi:s["a"]}},a=r,o=e("2877"),u=Object(o["a"])(a,n,l,!1,null,null,null);i["default"]=u.exports},aae3:function(t,i,e){var n=e("d3f4"),l=e("2d95"),s=e("2b4c")("match");t.exports=function(t){var i;return n(t)&&(void 0!==(i=t[s])?!!i:"RegExp"==l(t))}}}]);
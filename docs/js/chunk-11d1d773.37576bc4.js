(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11d1d773"],{"1f4d":function(t,i,l){},5441:function(t,i,l){"use strict";var e=l("1f4d"),n=l.n(e);n.a},"6d59":function(t,i,l){"use strict";var e=function(){var t=this,i=t.$createElement,l=t._self._c||i;return l("zoom-layout",{staticClass:"home-layout",attrs:{asideWidth:"220",toggleAside:"",footerHeight:"35"}},[l("zoom-tree-menu",{staticStyle:{"font-size":"14px"},attrs:{slot:"aside",op:t.navOp},slot:"aside"}),l("zoom-layout",{attrs:{slot:"main",headerHeight:"50"},slot:"main"},[l("h1",{staticClass:"component-header",attrs:{slot:"header"},slot:"header"},[t._v("\n        "+t._s(t.nowTitle)+"\n      ")]),l("router-view",{ref:"main",attrs:{slot:"main"},slot:"main"})],1),l("div",{staticClass:"component-footer",attrs:{slot:"footer"},slot:"footer"},[l("p",{directives:[{name:"show",rawName:"v-show",value:t.leftTitle,expression:"leftTitle"}],staticStyle:{float:"left"},on:{click:function(i){return t.toClick(t.leftUrl)}}},[l("span",{staticClass:"zoom-icon icon-left"}),t._v("\n      "+t._s(t.leftTitle)+"\n    ")]),l("p",{directives:[{name:"show",rawName:"v-show",value:t.rightTitle,expression:"rightTitle"}],staticStyle:{float:"right"},on:{click:function(i){return t.toClick(t.rightUrl)}}},[t._v("\n      "+t._s(t.rightTitle)+"\n      "),l("span",{staticClass:"zoom-icon icon-right"})])])],1)},n=[],s=(l("ac6a"),l("28a5"),{props:["data"],data:function(){return{leftTitle:null,rightTitle:null,leftUrl:null,rightUrl:null,nowTitle:null,list:[],navOp:{accordion:!0,data:[]}}},watch:{"$route.path":function(t){this.loadUrl("#"+t)}},created:function(){this.formatData(this.data)},methods:{formatData:function(t){var i=this;function l(t){return t.map((function(t){return t.children?l(t.children):t}))}this.navOp.data=t;var e=t.map((function(t){return t.children?l(t.children).flat(1/0):t}));this.list=e.flat(1/0),setTimeout((function(){i.loadUrl()}))},toClick:function(t){var i=this;-1!==t.indexOf("#")&&(this.$router.push(t.split("#")[1]),setTimeout((function(){i.$nextTick((function(){i.loadUrl()}))}),200))},loadUrl:function(t){var i=this,l=null,e=null,n=null,s=null,o="#"+this.$route.path;t&&(o=t);var a=0;this.list.forEach((function(t,l){t.url===o&&(a=l,i.nowTitle=t.title)})),this.list[a-1]&&(n=this.list[a-1].url,l=this.list[a-1].title),this.list[a+1]&&(s=this.list[a+1].url,e=this.list[a+1].title),this.leftTitle=l,this.rightTitle=e,this.leftUrl=n,this.rightUrl=s}}}),o=s,a=(l("5441"),l("2877")),r=Object(a["a"])(o,e,n,!1,null,null,null);i["a"]=r.exports},fcbc:function(t,i,l){"use strict";l.r(i);var e=function(){var t=this,i=t.$createElement,l=t._self._c||i;return l("custom-ui",{attrs:{data:t.$store.state.sdkList}})},n=[],s=l("6d59"),o={components:{customUi:s["a"]}},a=o,r=l("2877"),c=Object(r["a"])(a,e,n,!1,null,null,null);i["default"]=c.exports}}]);
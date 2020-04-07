<template>
  <div :class="cls" class="zoom-row">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zoom-row",
  props: {
    flex: [String, Boolean], //  弹性布局 IE可能存在兼容性问题
    justify: String, //  排列方式
    align: String //  对齐方式
  },
  data() {
    return {
      cls: ""
    };
  },
  created() {
    if (this.flex) {
      let cls = "row-flex";
      if (this.justify) {
        // 排序方式 只提供这四种属性
        let justifyArr = ["center", "end", "space-between", "space-around"];
        cls += this.test(this.justify, justifyArr, " row-justify-");
      }
      if (this.align) {
        // 对齐方式
        let alignArr = ["top", "middle", "bottom"];
        cls += this.test(this.align, alignArr, " row-align-");
      }
      this.cls = cls;
    }
  },
  methods: {
    test(str, arr, css) {
      // 验证用户输入的排列方式是否有误
      if (arr.includes(str)) {
        if (str === "space-between" || str === "between") {
          css = " col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
        } else {
          css += str;
        }
        return css;
      } else {
        throw new Error(
          // "zoom-ui TypeError: zoom-row属性输入有误, 请根据手册检查语法"
          `${this.$zoom.$t('err.zoom_ui_grammar')}: ${this.$zoom.$t('err.attribute', {err_attribute: 'zoom-row', attribute: ''})}`
        );
      }
    }
  }
};
</script>
<style>
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
figure,
footer,
header,
menu,
nav,
section,
time,
mark,
audio,
video,
details,
summary {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "\5FAE\8F6F\96C5\9ED1", "Microsoft Yahei", "Arial";
  color: #333;
  background-color: #fff;
  font-size: 15px;
  background-image: url(about:blank);
  background-attachment: fixed;
  overflow-x: hidden;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
img {
  border: none;
  vertical-align: middle;
  max-width: 100%;
}
i,
em {
  font-style: normal;
}
li {
  list-style-type: none;
}
textarea {
  resize: vertical;
}
* {
  box-sizing: border-box;
}
[class*="zoom-"] input,
[class*="zoom-"] select,
[class*="zoom-"] textarea {
  font-family: "\5FAE\8F6F\96C5\9ED1", "Microsoft Yahei", "Arial";
  box-sizing: border-box;
}
/* 全局色彩 */
.bg-info {
  background: #999;
}
.bg-info.hover:hover {
  background: #54657e;
}
.bg-info.active:active {
  background: #666;
}

.bg-danger {
  background: #f5222d;
}
.bg-danger.hover:hover {
  background: #ff4d4f;
}
.bg-danger.active:active {
  background: #cf1322;
}

.bg-success {
  background: #52c41a;
}
.bg-success.hover:hover {
  background: #73d13d;
}
.bg-success.active:active {
  background: #389e0d;
}

.bg-warning {
  background: #faad14;
}
.bg-warning.hover:hover {
  background: #ffc53d;
}
.bg-warning.active:active {
  background: #faad14;
}

.bg-primary {
  background: #1890ff;
}
.bg-primary.hover:hover {
  background: #40a9ff;
}
.bg-primary.active:active {
  background: #096dd9;
}

.bg-btn-active {
  color: #333;
  background: #e6f7ff;
}
.bg-primary-active {
  background: #096dd9;
}
.bg-primary-hover {
  background: #40a9ff;
}

.bg-info-dark {
  background: #666;
}
.bg-info-darker {
  background: #666;
}
.bg-navigation {
  background: #2e3243;
}

img[src*="T1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3og0T+FL6/j4LDAxAA"] {
  animation: lazy-logo 2s infinite linear;
  width: 10rem;
}
img[src*="b5cdkzoGd5vkzvN8qaYaZ7QTzvN8md5vlTTPaaZ7QTzvN8md5v"] {
  width: 10rem;
}
@keyframes lazy-logo {
  0% {
    opacity: .2;
  }
  50% {
    opacity: .8;
  }
  100% {
    overflow: .2;
  }
}
.zoom-clear::after {
  content: "";
  display: block;
  clear: both;
}
.zoom-row {
  margin-bottom: 20px;
  /* margin-right: -10px;
    margin-left: -10px; */
  width: 100%;
}
.zoom-row.row-flex {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}
.zoom-row::after,
.zoom-row::before {
  content: "";
  display: table;
}
.zoom-row::after {
  clear: both;
}
.zoom-row.row-justify-start {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.zoom-row.row-justify-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.zoom-row.row-justify-end {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.zoom-row.row-around,
.zoom-row.row-space-around,
.zoom-row.row-justify-space-around {
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.zoom-row.row-align-bottom {
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
}
.zoom-row.row-align-middle {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.zoom-row.row-align-top {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
}
[class*="zoom-"],
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
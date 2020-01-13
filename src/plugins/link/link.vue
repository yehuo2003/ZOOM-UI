<template>
  <a :href="isDisabled ? null : url" :class="[ cls, isDisabled ? 'link-disabled' : line ? 'link-underline' : '' ]" class="zoom-link">
    <span class="link-inner">
      <slot></slot>
    </span>
  </a>
</template>
<script>
export default {
  name: 'zoom-link',
  props: {
    type: String, //  类型 eg: primary success info danger warning
    disabled: [Boolean, String],  //  是否禁用
    url: String,  //  要跳转的地址
    underline: {  //  是否显示下划线, 默认显示
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: '',
      cls: '',
      isDisabled: false,
      line: true
    }
  },
  watch: {
    url(val) {
      this.load();
    },
    type(val) {
      this.load();
    },
    disabled(val) {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let cls = 'link-';
      if (this.type) {
        cls += this.type;
      } else {
        cls += 'default';
      }
      this.cls = cls;
      if (this.disabled) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
      if (this.underline === false) {
        this.line = false;
      } else {
        this.line = true;
      }
    }
  }
}
</script>
<style>
.zoom-link.link-default {
  color: #606266;
  fill: #606266;
}
.zoom-link.link-default.link-disabled {
  color: #c0c4cc;
  fill: #c0c4cc;
}
.zoom-link.link-primary {
  color: #1890ff;
  fill: #1890ff;
}
.zoom-link.link-default:hover,
.zoom-link.link-primary:hover {
  color: #40a9ff;
  fill: #40a9ff;
  text-decoration: none;
}
.zoom-link.link-primary.link-disabled {
  color: #a0cfff;
  fill: #a0cfff;
}
.zoom-link.link-success {
  color: #52c41a;
  fill: #52c41a;
}
.zoom-link.link-success:hover {
  color: #73d13d;
  fill: #73d13d;
  text-decoration: none;
}
.zoom-link.link-success.link-disabled {
  color: #a6c3b9;
  fill: #a6c3b9;
}
.zoom-link.link-success.link-underline:hover:after {
  border-color: #52c41a;
}
.zoom-link.link-warning {
  color: #faad14;
  fill: #faad14;
}
.zoom-link.link-warning:hover {
  color: #ffc53d;
  fill: #ffc53d;
  text-decoration: none;
}
.zoom-link.link-warning.link-disabled {
  color: #d3c6a2;
  fill: #d3c6a2;
}
.zoom-link.link-warning.link-underline:hover:after {
  border-color: #faad14;
}
.zoom-link.link-danger {
  color: #f5222d;
  fill: #f5222d;
}
.zoom-link.link-danger:hover {
  color: #ff4d4f;
  fill: #ff4d4f;
  text-decoration: none;
}
.zoom-link.link-danger.link-disabled {
  color: #d8bab5;
  fill: #d8bab5;
}
.zoom-link.link-danger.link-underline:hover:after {
  border-color: #f5222d;
}
.zoom-link.link-info {
  color: #333;
  fill: #333;
}
.zoom-link.link-info:hover {
  color: #54657e;
  fill: #54657e;
  text-decoration: none;
}
.zoom-link.link-info.link-disabled {
  color: #bfbfbf;
  fill: #bfbfbf;
}
.zoom-link.link-info.link-underline:hover:after {
  border-color: #333;
}
.zoom-link.link-primary.link-underline:hover:after,
.zoom-link.link-default.link-underline:hover,
.zoom-link.link-default.link-underline:hover:after {
  border-color: #1890ff;
}
.zoom-link.link-underline:hover::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  bottom: 0;
  border-bottom: 1px solid #409eff;
}
.zoom-link.link-disabled {
  cursor: no-drop;
}
.zoom-link span {
  line-height: 26px;
}
.zoom-link {
  display: -webkit-inline-box;
  display: -ms-flexbox;
  display: inline-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
}
</style>
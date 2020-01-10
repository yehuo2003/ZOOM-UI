<template>
    <button
     @click="handleChild('click')"
     @mousedown="handleChild('mousedownChild')"
     @mouseenter="handleChild('mouseenterChild')"
     @mouseleave="handleChild('mouseleaveChild')"
     @mousemove="handleChild('mousemoveChild')"
     @mouseout="handleChild('mouseoutChild')"
     @mouseover="handleChild('mouseoverChild')"
     @keydown="handleChild('keydownChild')"
     @keyup="handleChild('keyupChild')"
     class="zoom-btn" :class="css" :disabled="isdisabled">
      <slot></slot>
      <i v-if="showIcon" class="zoom-icon" :class="IconStyle"></i>
    </button>
</template>
<script>
export default {
  name: "zoom-button",
  props: {
    op: Object,
    disabled: Boolean,
    onClick: Function,
    type: String,
    resetTime: {  //  点击按钮后 禁用的时间, 默认1秒
      type: [String, Number],
      default: 800
    },
    shape: {  //  形状, plain平角 round 圆角  circle圆形
      type: String,
      default: 'plain'
    }
  },
  data() {
    return {
      css: "",
      shapeType: 'plain', //  按钮形状
      time: 1000, //  点击按钮后禁用的时间
      isdisabled: false,
      showIcon: false,
      IconStyle: ""
    };
  },
  created() {
    if (this.op || this.type) {
      let type = this.op ? this.op.type : this.type;
      if (type && typeof type !== "string") {
        throw Error("zoom-ui error: type 的类型需要传入字符串");
        return;
      }
      switch (type) {
        case "err":
          this.css = "danger";
          break;
        case "error":
          this.css = "danger";
          break;
        case "red":
          this.css = "danger";
          break;
        case "green":
          this.css = "success";
          break;
        case "yellow":
          this.css = "warning";
          break;
        case "gray":
          this.css = "info";
          break;
        case "blue":
          this.css = "primary";
          break;
        default:
          this.css = type;
          break;
      }
      if (this.op && this.op.isdisabled) {
        this.isdisabled = !!this.op.isdisabled;
      }
      if (this.op && this.op.IconStyle) {
        if (this.op.IconStyle.indexOf("icon") > -1) {
          this.showIcon = true;
          this.IconStyle = this.op.IconStyle;
        } else {
          this.IconStyle = "";
          this.showIcon = false;
          throw Error(
            `zoom-ui TypeError: IconStyle: ${this.op.IconStyle} 错误, 请传入有效的icon名`
          );
        }
      }
    }
    if (this.disabled) {
      this.isdisabled = !!this.disabled;
    }
    // 如果设置了重置按钮时间
    if (this.op && this.op.resetTime) {
      this.time = this.op.resetTime;
    } else {
      this.time = this.resetTime;
    }
    // 按钮样式
    let shape = '';
    let shapeArr = ['plain', 'round', 'circle'];
    if (this.op && this.op.shape) {
      shape = this.op.shape;
    } else {
      shape = this.shape;
    }
    if (shapeArr.includes(shape)) {
      // 添加到css样式
      if (shape !== 'plain') {
        this.css += ` zoom-${shape}`;
      }
    } else {
      throw Error(`zoom-ui TypeError: ${shape} 语法错误, 请参考zoom-ui手册并检查语法!`);
    }
  },
  methods: {
    handleChild(e) {
      if (e === 'click') {
        this.handleClick()
      }
      this.$emit(e);
    },
    handleClick() {
      this.isdisabled = true;
      setTimeout(() => {
        this.isdisabled = false;
      }, this.time);
      if (this.op && this.op.onClick && !this.isdisabled) {
        if (typeof this.op.onClick === "function") {
          this.op.onClick();
        } else {
          throw Error("zoom-ui error: onClick 需要绑定一个函数对象");
        }
      } else {
        return;
      }
    }
  }
};
</script>
<style>
.zoom-btn {
  min-width: 80px;
  max-width: 120px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: 1px solid #d9d9d9;
  color: #1890ff;
  border-radius: 2px;
  background: #ffffff;
  font-size: 12px;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-transition: border 0.3s, color 0.3s, background 0.3s;
  transition: border 0.3s, color 0.3s, background 0.3s;
  outline: 0;
}
.zoom-btn:hover,
.zoom-btn:focus {
  border: 1px solid #1890ff;
  background: #ffffff;
}
.zoom-btn:active {
  border: 1px solid #1890ff;
  background: #e6f7ff;
}
.zoom-btn.zoom-icon {
  font-size: 12px;
}
.zoom-btn.zoom-circle {
  border-radius: 50%;
  min-width: 30px;
  min-height: 30px;
}
.zoom-btn.zoom-round {
  border-radius: 30px;
}
/* primary */
.zoom-btn.primary[disabled],
.zoom-btn.primary[disabled]:hover,
.zoom-btn.primary[disabled]:focus,
.zoom-btn.primary[disabled]:active {
  background: #d9d9d9;
  border-color: #d9d9d9;
}
.zoom-btn.primary {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
.zoom-btn.primary:active,
.zoom-btn.primary:focus {
  background: #096dd9;
  border-color: #096dd9;
}
.zoom-btn.primary:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}
/* danger */
.zoom-btn.danger[disabled],
.zoom-btn.danger[disabled]:hover,
.zoom-btn.danger[disabled]:focus,
.zoom-btn.danger[disabled]:active {
  background: #d8bab5;
  border-color: #d8bab5;
  color: #eee;
}
.zoom-btn.danger {
  background: #f5222d;
  border-color: #f5222d;
  color: #eee;
}
.zoom-btn.danger:active,
.zoom-btn.danger:focus {
  background: #cf1322;
  border-color: #cf1322;
}
.zoom-btn.danger:hover {
  background: #ff4d4f;
  border-color: #ff4d4f;
}
/* success */
.zoom-btn.success[disabled],
.zoom-btn.success[disabled]:hover,
.zoom-btn.success[disabled]:focus,
.zoom-btn.success[disabled]:active {
  background: #a6c3b9;
  border-color: #a6c3b9;
}
.zoom-btn.success {
  background: #52c41a;
  border-color: #52c41a;
  color: #fff;
}
.zoom-btn.success:active,
.zoom-btn.success:focus {
  background: #389e0d;
  border-color: #389e0d;
}
.zoom-btn.success:hover {
  background: #73d13d;
  border-color: #73d13d;
}
/* info */
.zoom-btn.info[disabled],
.zoom-btn.info[disabled]:hover,
.zoom-btn.info[disabled]:focus,
.zoom-btn.info[disabled]:active {
  background: #f5f5f5;
  border-color: #d9d9d9;
  color: #d9d9d9;
}
.zoom-btn.info {
  background: #333;
  border-color: #333;
  color: #d9d9d9;
}
.zoom-btn.info:active,
.zoom-btn.info:hover,
.zoom-btn.info:focus {
  background: #54657e;
  border-color: #54657e;
}
/* warning */
.zoom-btn.warning[disabled],
.zoom-btn.warning[disabled]:hover,
.zoom-btn.warning[disabled]:focus,
.zoom-btn.warning[disabled]:active {
  background: #d3c6a2;
  border-color: #d3c6a2;
}
.zoom-btn.warning {
  background: #faad14;
  border-color: #faad14;
  color: #fff;
}
.zoom-btn.warning:active,
.zoom-btn.warning:hover,
.zoom-btn.warning:focus {
  background: #ffc53d;
  border-color: #ffc53d;
}
/* 默认样式 */
.zoom-btn[disabled],
.zoom-btn[disabled]:hover,
.zoom-btn[disabled]:focus,
.zoom-btn[disabled]:active {
  background: #d9d9d9;
  border-color: #d9d9d9;
  color: #fff;
}
</style>
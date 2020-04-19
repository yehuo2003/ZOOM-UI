<template>
  <ul class="zoom-button-group">
    <li v-for="(item, index) of list" :key="index">
      <zoom-button
      @mousedown="handleChild('mousedownChild')"
      @mouseenter="handleChild('mouseenterChild')"
      @mouseleave="handleChild('mouseleaveChild')"
      @mousemove="handleChild('mousemoveChild')"
      @mouseout="handleChild('mouseoutChild')"
      @mouseover="handleChild('mouseoverChild')"
      @keydown="handleChild('keydownChild')"
      @keyup="handleChild('keyupChild')"
      @click="handleClick(item, index)"
      :disabled="isdisabled"
      :op="btnOp"
      >
        {{item.text}}
      </zoom-button>
    </li>
  </ul>
</template>
<script>
export default {
  name: "zoom-button-group",
  props: {
    op: {
      data: Array,  // 按钮数据
      disabled: Boolean,
      onClick: Function,
    }
  },
  data() {
    return {
      list: [],
      setDisable: false,
      isdisabled: false
    };
  },
  methods: {
    handleChild(e) {
      this.$emit(e);
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.setDisable = status;
      this.isdisabled = status;
    },
    handleClick(item, index) {
      if (this.op && this.op.onClick && !this.isdisabled) {
        if (typeof this.op.onClick === "function") {
          this.op.onClick(item, index);
        } else {
          throw new Error(
            // "zoom-ui error: onClick 需要绑定一个函数对象"
            `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('button.onClick')}`
          );
        }
      } else {
        return;
      }
    },
    load(data) {
      if (this.op) {
        // 直接赋值给子组件
        this.btnOp = this.op;
        if (this.op.data) {
          this.list = this.op.data;
        }
        if (this.op.disabled) {
          this.isdisabled = this.op.disabled
        }
      }
      if (data) {
        this.list = data;
      }
    }
  },
  created() {
    this.load()
  }
};
</script>
<style>
.zoom-button-group li:not(:last-child):hover {
  z-index: 2;
}
.zoom-button-group li:not(:last-child) {
  margin-right: -1px;
}
.zoom-button-group li:last-child button {
  border-radius: 0 2px 2px 0;
}
.zoom-button-group li:first-child button {
  border-radius: 2px 0 0 2px;
}
.zoom-button-group li {
  line-height: 28px;
  display: inline-block;
  background: #fff;
  position: relative;
  z-index: 1;
}
.zoom-button-group {
  position: relative;
}
</style>
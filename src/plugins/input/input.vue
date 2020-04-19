<template>
  <div
    @click="handleChild('click')"
    @mousedown="handleChild('mousedownChild')"
    @mouseenter="handleChild('mouseenterChild')"
    @mouseleave="handleChild('mouseleaveChild')"
    @mousemove="handleChild('mousemoveChild')"
    @mouseout="handleChild('mouseoutChild')"
    @mouseover="handleChild('mouseoverChild')"
    @keydown="handleChild('keydownChild')"
    @keyup="handleChild('keyupChild')"
    :style=" 'width: ' + options.width"
    :class="options.disabled ? 'disabled' : ''"
    class="zoom-input"
  >
    <input
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @keydown="handleTab($event)"
      @blur="handleBlur"
      @input="Oninput"
      :value="currentValue"
      :type="options.type"
      :placeholder="placeholder ? placeholder : options.placeHolder"
      :readonly="options.readonly"
      :disabled="options.disabled"
      :maxlength="options.maxLength"
      :minlength="options.minLength"
      :id="zoomId"
      :class="error ? 'error' : ''"
    />
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <div class="input-btn">
      <a v-if="!options.hideClose" @click="reset" href="javascript:void(0);" class="zoom-icon icon-close icon-default"></a>
      <a
        v-if="options.IconStyle"
        :class="options.IconStyle"
        @click="serach"
        href="javascript:void(0);"
        class="zoom-icon"
      ></a>
    </div>
  </div>
</template>
<script>
import InputMixin from "../mixins/input";
export default {
  name: "zoom-input",
  mixins: [InputMixin],
  watch: {
    value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  created() {
    if (this.op) {
      this.options = this.op;
      this.options.type = this.op.type || "text";
      if (this.options.type == "text" || this.options.type == "password") {
        return;
      } else {
        this.options.type = "text";
          throw new Error(
            // `zoom-ui TypeError: type属性解析失败, 仅支持 'text', 'password' !`
            `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('input.msg', {type: this.options.type})}`
          );
      }
    }
  },
  methods: {
    serach() {
      if (this.op && this.op.onClick) {
        this.op.onClick();
      }
    }
  }
};
</script>
<style>
.zoom-input .error {
  border: 1px solid red;
}
.zoom-input .input-btn a {
  text-decoration: none;
  display: block;
  float: left;
  color: #1890ff;
  font-size: 14px;
  width: 20px;
  line-height: 35px;
}
.zoom-input:not(.disabled):hover .input-btn .icon-default.icon-close {
  display: block;
}
.zoom-input .input-btn .icon-default.icon-close {
  display: none;
  font-size: 20px;
  color: #b9b9b9;
}
.zoom-input .input-btn {
  bottom: 0;
  right: 2px;
  top: -1px;
  position: absolute;
  line-height: 30px;
  min-width: 20px;
  min-height: 30px;
  outline: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
}
.zoom-input > input[disabled] {
  cursor: not-allowed;
  border: 1px solid #d9d9d9;
  color: #bfbfbf;
  background: #f5f5f5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.zoom-input {
  position: relative;
  outline: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  text-align: left;
  width: 270px;
}
.zoom-input > input:not([disabled]):focus {
  border: 1px solid #1890ff;
  -webkit-box-shadow: 0 0 0 tansparent;
  box-shadow: 0 0 0 tansparent;
}
.zoom-input > input:not([disabled]):active {
  border: 1px solid #1890ff;
  -webkit-box-shadow: 0 0 0 tansparent;
  box-shadow: 0 0 0 tansparent;
}
.zoom-input > input:not([disabled]):hover {
  border: 1px solid #1890ff;
}
.zoom-input > input {
  outline: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #d9d9d9;
  color: #333;
  border-radius: 2px;
  background: #ffffff;
  font-size: 12px;
  padding: 0 8px;
  display: block;
  white-space: nowrap;
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  -o-user-select: auto;
  user-select: auto;
  -webkit-transition: border 0.3s;
  transition: border 0.3s;
}
</style>
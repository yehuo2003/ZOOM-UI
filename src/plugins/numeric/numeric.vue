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
    class="zoom-numeric zoom-input"
    :class="options.isdisabled ? 'numeric-disabled' : '' "
  >
    <a @click="subtraction" href="javascript:void(0);" class="num-btn num-subtraction">-</a>
    <input
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @keydown="handleTab($event)"
      @blur="handleBlur"
      @input="Oninput"
      @oninput="getValue"
      onpaste="return false"
      :value="currentValue"
      :placeholder="placeholder ? placeholder : options.placeHolder"
      :readonly="options.readonly"
      :disabled="options.isdisabled"
      type="number"
      :class="error ? 'error' : '' "
    />
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <a @click="add" href="javascript:void(0);" class="num-btn num-add">+</a>
  </div>
</template>
<script>
import { isKorean } from "../common/common.js";
export default {
  name: "zoom-numeric",
  props: {
    op: Object,
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      error: false,
      errMsg: null,
      isOnComposition: false,
      valueBeforeComposition: null,
      isdisabled: false,
      options: {
        max: 999999,
        min: 0
      }
    };
  },
  watch: {
    value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  created() {
    if (this.op) {
      this.options = this.op;
    }
  },
  methods: {
    /**
     * 当用户按tab键切换的时候 触发验证功能
     */
    handleTab(e) {
      if (e.keyCode !== 9) return;
      this.handleBlur();
    },
    setCurrentValue(value) {
      // 输入中，直接返回
      if (this.isOnComposition && value === this.valueBeforeComposition) return;
      this.currentValue = value;
      if (this.isOnComposition) return;
    },
    /**
     * 判断用户输入的是否是拼音, 如果是拼音输入完了返回
     */
    handleComposition(event) {
      // 如果中文输入已完成
      if (event.type === "compositionend") {
        //  isOnComposition设置为false
        this.isOnComposition = false;
        this.currentValue = this.valueBeforeComposition;
        this.valueBeforeComposition = null;
        //触发input事件，因为input事件是在compositionend事件之后触发，这时输入未完成，不会将值传给父组件，所以需要再调一次input方法
        this.Oninput(event);
      } else {
        //如果中文输入未完成
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || "";
        //isOnComposition用来判断是否在输入拼音的过程中
        this.isOnComposition = !isKorean(lastCharacter);
        if (this.isOnComposition && event.type === "compositionstart") {
          //  输入框中输入的值赋给valueBeforeComposition
          this.valueBeforeComposition = text;
        }
      }
    },
    handleChild(e) {
      this.$emit(e);
    },
    //   验证
    getValue() {
      this.value = this.value.replace(/[^0-9|-]/g, "");
    },
    // 验证功能
    handleBlur() {
      if (this.options.testing) {
        let test = this.options.testing(this.currentValue);
        if (!test) {
          this.error = true;
          if (this.options.errMsg) {
            this.errMsg = this.options.errMsg;
            this.$nextTick(() => {
              this.$refs["err"].click();
              setTimeout(() => {
                this.$nextTick(() => {
                  this.error = false;
                  $Z(".zoom-tip-container")[0].remove();
                });
              }, 2000);
            });
          }
          return !!test;
        } else {
          this.error = false;
          return this.testing();
        }
      } else {
        return this.testing();
      }
    },
    testing() {
      if (this.options.isdisabled) {
        return true;
      }
      let val = Number(this.currentValue);
      if (isNaN(val)) {
        throw new Error(
          // `zoom-ui TypeError: value ${this.currentValue} is NaN, 请输入有效数字! `
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('number.error', {value: this.currentValue})}`
        );
      } else {
        if (typeof this.options.max === "number" && val >= this.options.max) {
          this.currentValue = this.options.max - 1;
        }
        if (typeof this.options.min === "number" && val <= this.options.min) {
          this.currentValue = this.options.min + 1;
        }
        this.error = false;
        return true;
      }
    },
    subtraction() {
      if (this.testing()) {
        this.currentValue = Number(this.currentValue) - 1;
      }
    },
    // 重置
    reset() {
      if (!this.options.isdisabled) {
        this.currentValue = 0;
        this.$emit("input", 0);
      } else {
        throw new Error(
          // "zoom-ui error: disabled状态下无法清除内容! "
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('err.disabled_clear')}`
        );
      }
    },
    add() {
      if (this.testing()) {
        this.currentValue = Number(this.currentValue) + 1;
      }
    },
    Oninput($event) {
      if (this.testing()) {
        const value = Number($event.target.value);
        //设置当前值
        this.setCurrentValue(value);
        //如果还在输入中，将不会把值传给父组件
        if (this.isOnComposition) return;
        //输入完成时，isOnComposition为false，将值传递给父组件
        this.$emit("input", value);
      }
    }
  }
};
</script>
<style>
.zoom-numeric > ::-webkit-outer-spin-button,
.zoom-numeric > ::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.zoom-numeric input[type="number"] {
  -moz-appearance: textfield;
}
.zoom-numeric input {
  /* padding: 40px; */
  text-align: center;
}
.zoom-numeric .num-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  overflow: hidden;
  text-decoration: none;
  color: #1890ff;
}
.zoom-numeric.numeric-disabled .num-btn {
  color: #bfbfbf;
}
.zoom-numeric .num-subtraction {
  border-right: 1px solid #d9d9d9;
}
.zoom-numeric .num-add {
  border-left: 1px solid #d9d9d9;
  right: 0;
  top: 0;
}
</style>
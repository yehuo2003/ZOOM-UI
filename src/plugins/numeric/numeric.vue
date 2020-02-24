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
      :class="error ? 'error' : '' "
      onpaste="return false"
      @oninput="getValue"
      @blur="handleBlur"
      :value="currentValue"
      :placeholder="placeholder ? placeholder : options.placeHolder"
      :readonly="options.readonly"
      :disabled="options.isdisabled"
      @input="Oninput"
      type="number"
    />
    <span v-if="errMsg && error" class="err-msg">{{errMsg}}</span>
    <a @click="add" href="javascript:void(0);" class="num-btn num-add">+</a>
  </div>
</template>
<script>
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
      isdisabled: false,
      currentValue: this.value,
      error: false,
      errMsg: null,
      options: {
        max: 999999,
        min: 0
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
    }
  },
  methods: {
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
            setTimeout(() => {
              this.error = false;
            }, 2000);
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
          `zoom-ui TypeError: value ${this.currentValue} is NaN, 请输入有效数字! `
        );
        return false;
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
        throw new Error("zoom-ui error: disabled状态下无法清除内容! ");
      }
    },
    add() {
      if (this.testing()) {
        this.currentValue = Number(this.currentValue) + 1;
      }
    },
    Oninput($event) {
      if (this.testing()) {
        this.currentValue = Number($event.target.value);
        this.$emit("input", this.currentValue);
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
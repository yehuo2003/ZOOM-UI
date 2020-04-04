<template>
  <div class="zoom-textarea">
    <textarea
      :class="error ? 'error': '' "
      @blur="handleBlur"
      :value="currentValue"
      @input="Oninput"
      :placeholder="options.placeHolder"
      :disabled="options.disabled"
      :maxlength="options.maxLength"
    ></textarea>
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <div class="zoom-statistics">{{currentValue?currentValue.length:0}}/{{options.maxLength}}</div>
  </div>
</template>
<script>
export default {
  name: "zoom-textarea",
  props: {
    op: {
      placeHolder: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxLength: {
        type: Number,
        default: 50
      },
      errMsg: {
        type: String,
        default: ""
      }
    }
  },
  data() {
    return {
      disabled: false,
      currentValue: this.value,
      error: false,
      errMsg: null,
      options: {
        errMsg: "",
        maxLength: 50,
        placeHolder: null
      }
    };
  },
  created() {
    if (this.op) {
      this.options.disabled = this.op.disabled;
      this.options.maxLength = this.op.maxLength || 50;
      this.options.error = this.op.error;
      this.options.errMsg = this.op.errMsg;
      this.options.testing = this.op.testing;
    }
  },
  methods: {
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
          return true;
        }
      } else {
        return true;
      }
    },
    reset() {
      if (!this.options.disabled) {
        this.currentValue = "";
        this.$emit("input", "");
      } else {
        throw new Error(
          // "zoom-ui error: disabled状态下无法清除内容! "
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('err.disabled_clear')}`
        );
      }
    },
    // 获取字符串的字节长度
    getLength(s) {
      s = String(s);
      // eslint-disable-next-line no-control-regex
      return s.length + (s.match(/[^\x00-\xff]/g) || " ").length;
    },
    Oninput($event) {
      this.currentValue = $event.target.value;
      this.$emit("input", this.currentValue);
    }
  }
};
</script>
<style>
.zoom-textarea .error {
  border: 1px solid red;
}
.zoom-textarea > .zoom-statistics {
  font-size: 12px;
  margin-top: 5px;
  line-height: 100%;
  text-align: right;
}
.zoom-textarea > textarea[disabled] {
  resize: none;
  cursor: not-allowed;
  /* pointer-events: none; */
  border: 1px solid #d9d9d9;
  color: #bfbfbf;
  background: #f5f5f5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.zoom-textarea > textarea:not([disabled]):focus,
.zoom-textarea > textarea:not([disabled]):active {
  border: 1px solid #1890ff;
  color: #333;
  -webkit-box-shadow: 0 0 0 transparent;
  box-shadow: 0 0 0 transparent;
}
.zoom-textarea > textarea:not([disabled]):hover {
  border: 1px solid #bfbfbf;
  color: #333;
}
.zoom-textarea > textarea {
  width: 100%;
  min-height: 60px;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #ffffff;
  line-height: 140%;
  padding: 8px;
  display: inline-block;
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  -o-user-select: auto;
  user-select: auto;
  -webkit-transition: border 0.3s;
  transition: border 0.3s;
  outline: 0;
  resize: vertical;
}
.zoom-textarea {
  position: relative;
  display: inline-block;
}
</style>
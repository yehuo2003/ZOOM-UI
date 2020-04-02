<template>
  <div style="width: 150px;" class="zoom-text-popup">
    <input
      @focus="hoverInput"
      :disabled="options.disabled"
      :readonly="options.readonly"
      :placeholder="options.placeHolder"
      :value="currentValue"
      @input="Oninput"
      v-show="isShow"
      ref="zoom-text"
      class="zoom-text zoom-area"
    />
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <textarea
      :style=" options.resize ? '' : 'resize: none;' "
      @blur="blurInput"
      v-model="currentValue"
      v-focus="focusStatus"
      ref="zoom-area"
      v-show="!isShow"
      :rows="rows"
      class="zoom-area zoom-area-popup"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: "zoom-text-popup",
  props: {
    op: {
      placeHolder: [String],
      disabled: {
        type: Boolean,
        default: false
      },
      resize: {
        // 是否禁止拖动默认false
        type: Boolean,
        default: false
      },
      readonly: {
        // 是否禁止输入默认false
        type: Boolean,
        default: false
      },
      errMsg: {
        type: String,
        default: ""
      }
    },
    rows: {
      type: [String, Number],
      default: 5
    },
    value: String
  },
  data() {
    return {
      focusStatus: false,
      isShow: true, //  默认为true, 显示输入框, false显示复选框
      focus: false,
      errMsg: null,
      currentValue: this.value,
      options: {
        errMsg: "",
        placeHolder: this.$zoom.$t('search.msg'), // 请输入关键词
        resize: false,
        readonly: false,
        disabled: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
      if (!this.options.placeHolder) {
        this.options.placeHolder =  this.$zoom.$t('search.msg') // 请输入关键词
      }
    }
  },
  methods: {
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
        }
      } else {
        return this.testing();
      }
    },
    blurInput() {
      console.log('blurInput');
      this.$refs["zoom-area"].blur();
      this.isShow = true;
      this.focusStatus = false;
      // this.$refs["zoom-text"].focus();
    },
    hoverInput() {
      console.log('hoverInput');
      if (!this.options.disabled && !this.options.readonly) {
        this.$refs["zoom-text"].blur();
        this.isShow = false;
        this.focusStatus = true;
        this.$refs["zoom-area"].focus();
      }
    },
    Oninput($event) {
      this.currentValue = $event.target.value;
      this.$emit("input", $event.target.value);
    }
  }
};
</script>
<style>
.zoom-text-popup {
  display: inline-block;
}
.zoom-text-popup .zoom-text:not(:disabled):hover,
.zoom-text-popup .zoom-area-popup:not(:disabled):hover {
  border-color: #1890ff;
}
.zoom-text-popup .zoom-text {
  border: 1px solid #d9d9d9;
}
.zoom-text-popup .zoom-area {
  padding: 6px;
  width: 100%;
  border-radius: 2px;
  outline: 0;
}
.zoom-text-popup .zoom-area-popup {
  /* resize: none; */
  -webkit-box-shadow: 0 0 1px 1px rgba(175, 175, 175, 0.3);
  box-shadow: 0 0 1px 1px rgba(175, 175, 175, 0.3);
}
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
[class*="zoom-"] textarea {
  overflow: auto;
  vertical-align: top;
}
</style>
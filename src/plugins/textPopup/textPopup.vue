<template>
  <div :style="{width: op ? op.width : width}" class="zoom-text-popup">
    <input
      @focus="hoverInput"
      @input="Oninput"
      :disabled="options.disabled"
      :readonly="options.readonly"
      :placeholder="options.placeHolder"
      :value="currentValue"
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
      :maxlength="options.maxLength"
      @blur="blurInput"
      @keydown="handleTab($event)"
      v-model="currentValue"
      v-focus="focusStatus"
      ref="zoom-area"
      v-show="!isShow"
      :rows="rows"
      class="zoom-area zoom-area-popup"
    ></textarea>
    <div v-show="!isShow" class="zoom-statistics">{{currentValue?currentValue.length:0}}/{{options.maxLength}}</div>
  </div>
</template>
<script>
export default {
  name: "zoom-text-popup",
  props: {
    width: {
      type: [Number, String],
      default: '150px'
    },
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
      maxLength: {
        type: Number,
        default: 50
      },
      minLength: {  //  可输入最小字符
        type: Number,
        default: 0
      },
      errMsg: {
        type: String,
        default: ""
      },
      data: Array //  可选的查找数据
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
        maxLength: 50,
        minLength: 0,
        placeHolder: "", // 请输入关键词
        width: null,
        resize: false,
        readonly: false,
        disabled: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
      if (!this.options.maxLength) {
        this.options.maxLength = 50;
      }
    }
  },
  watch: {
    value(val, oldValue) {
      this.setCurrentValue(val);
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
      if (this.currentValue.length < this.options.minLength) {
        // 小长度为 {min} 个字符！
        this.errMsg = this.$zoom.$t('input.min', {min: this.options.minLength});
        this.error = true;
        this.$refs["err"].click();
        this.$nextTick(() => {
          this.$refs["err"].click();
          setTimeout(() => {
            this.$nextTick(() => {
              this.error = false;
              $Z(".zoom-tip-container")[0].remove();
            });
          }, 2000);
        });
      } else if (this.options.testing) {
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
      this.$refs["zoom-area"].blur();
      this.isShow = true;
      this.focusStatus = false;
      // this.$refs["zoom-text"].focus();
    },
    hoverInput() {
      if (!this.options.disabled && !this.options.readonly) {
        this.$refs["zoom-text"].blur();
        this.isShow = false;
        this.focusStatus = true;
        this.$refs["zoom-area"].focus();
      }
    },
    Oninput($event) {
      const value = $event.target.value;
      //设置当前值
      this.setCurrentValue(value);
      //如果还在输入中，将不会把值传给父组件
      if (this.isOnComposition) return;
      //输入完成时，isOnComposition为false，将值传递给父组件
      this.$emit("input", value);
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
<template>
  <div :style=" 'width: ' + options.width" class="zoom-textarea">
    <textarea
      :class="error ? 'error': '' "
      :value="currentValue"
      @blur="handleBlur"
      @input="Oninput"
      @keydown="handleTab($event)"
      :placeholder="options.placeHolder"
      :disabled="options.disabled"
      :maxlength="options.maxLength"
      :minlength="options.minLength"
      :id="zoomId"
    ></textarea>
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <div class="zoom-statistics">{{currentValue?currentValue.length:options.minLength}}/{{options.maxLength}}</div>
  </div>
</template>
<script>
import InputMixin from "../mixins/input";
export default {
  name: "zoom-textarea",
  mixins: [InputMixin],
  props: {
    op: {
      // placeHolder: {
      //   type: String,
      //   default: null
      // },
      // disabled: {
      //   type: Boolean,
      //   default: false
      // },
      maxLength: {
        type: Number,
        default: 50
      },
      // minLength: {
      //   type: Number,
      //   default: 0
      // },
      // width: String,  //  组件的宽度 默认270px
      // errMsg: {
      //   type: String,
      //   default: ""
      // }
    }
  },
  data() {
    return {
      // disabled: false,
      // currentValue:
      //   this.value === undefined || this.value === null ? "" : this.value,
      // isOnComposition: false,
      // valueBeforeComposition: null,
      // error: false,
      // errMsg: null,
      options: {
        // errMsg: "",
        maxLength: 50,
        // minLength: 0,
        // width: null,
        // placeHolder: null,
        // readonly: false,
        // disabled: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options.disabled = this.op.disabled;
      this.options.maxLength = this.op.maxLength || 50;
      this.options.minLength = this.op.minLength || 0;
      this.options.readonly = this.op.readonly;
      this.options.error = this.op.error;
      this.options.width = this.op.width;
      this.options.errMsg = this.op.errMsg;
      this.options.testing = this.op.testing;
    }
  },
  // watch: {
  //   value(val, oldValue) {
  //     this.setCurrentValue(val);
  //   }
  // },
  methods: {
    /**
     * 当用户按tab键切换的时候 触发验证功能
     */
    // handleTab(e) {
    //   if (e.keyCode !== 9) return;
    //   this.handleBlur();
    // },
    // setCurrentValue(value) {
    //   // 输入中，直接返回
    //   if (this.isOnComposition && value === this.valueBeforeComposition) return;
    //   this.currentValue = value;
    //   if (this.isOnComposition) return;
    // },
    /**
     * 判断用户输入的是否是拼音, 如果是拼音输入完了返回
     */
    // handleComposition(event) {
    //   // 如果中文输入已完成
    //   if (event.type === "compositionend") {
    //     //  isOnComposition设置为false
    //     this.isOnComposition = false;
    //     this.currentValue = this.valueBeforeComposition;
    //     this.valueBeforeComposition = null;
    //     //触发input事件，因为input事件是在compositionend事件之后触发，这时输入未完成，不会将值传给父组件，所以需要再调一次input方法
    //     this.Oninput(event);
    //   } else {
    //     //如果中文输入未完成
    //     const text = event.target.value;
    //     const lastCharacter = text[text.length - 1] || "";
    //     //isOnComposition用来判断是否在输入拼音的过程中
    //     this.isOnComposition = !isKorean(lastCharacter);
    //     if (this.isOnComposition && event.type === "compositionstart") {
    //       //  输入框中输入的值赋给valueBeforeComposition
    //       this.valueBeforeComposition = text;
    //     }
    //   }
    // },
    // 验证功能
    // handleBlur() {
    //   if (this.currentValue.length < this.options.minLength) {
    //     // 小长度为 {min} 个字符！
    //     this.errMsg = this.$zoom.$t('input.min', {min: this.options.minLength});
    //     this.error = true;
    //     this.$refs["err"].click();
    //     this.$nextTick(() => {
    //       this.$refs["err"].click();
    //       setTimeout(() => {
    //         this.$nextTick(() => {
    //           this.error = false;
    //           $Z(".zoom-tip-container")[0].remove();
    //         });
    //       }, 2000);
    //     });
    //   } else if (this.options.testing) {
    //     let test = this.options.testing(this.currentValue);
    //     if (!test) {
    //       this.error = true;
    //       if (this.options.errMsg) {
    //         this.errMsg = this.options.errMsg;
    //         this.$nextTick(() => {
    //           this.$refs["err"].click();
    //           setTimeout(() => {
    //             this.$nextTick(() => {
    //               this.error = false;
    //               $Z(".zoom-tip-container")[0].remove();
    //             });
    //           }, 2000);
    //         });
    //       }
    //       return !!test;
    //     } else {
    //       this.error = false;
    //       return true;
    //     }
    //   } else {
    //     return true;
    //   }
    // },
    // reset() {
    //   if (!this.options.disabled) {
    //     this.currentValue = "";
    //     this.$emit("input", "");
    //   } else {
    //     throw new Error(
    //       // "zoom-ui error: disabled状态下无法清除内容! "
    //       `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('err.disabled_clear')}`
    //     );
    //   }
    // },
    // Oninput($event) {
    //   const value = $event.target.value;
    //   //设置当前值
    //   this.setCurrentValue(value);
    //   //如果还在输入中，将不会把值传给父组件
    //   if (this.isOnComposition) return;
    //   //输入完成时，isOnComposition为false，将值传递给父组件
    //   this.$emit("input", value);
    // }
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
  resize: both;
}
.zoom-textarea {
  position: relative;
  display: inline-block;
}
</style>
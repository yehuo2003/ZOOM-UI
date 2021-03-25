// import { isKorean } from "../common/common.js";
export default {
  props: {
    id: String,
    op: {
      id: String,
      placeHolder: {
        type: String,
        default: null
      },
      hideClose: {  //是否隐藏清除按钮 默认false
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        // 是否禁止输入默认false
        type: Boolean,
        default: false
      },
      errMsg: { //  验证失败显示的消息
        type: String,
        default: ""
      },
      maxLength: {  //  可输入最大字符
        type: Number,
        default: null
      },
      minLength: {  //  可输入最小字符
        type: Number,
        default: 0
      },
      width: String,  //  组件的宽度 默认270px
      IconStyle: {
        type: String,
        default: false
      }
    },
    placeholder: {
      type: String,
      default: null
    },
    value: [String, Number]
  },
  data() {
    return {
      zoomId: null,
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      error: false,
      errMsg: null,
      isOnComposition: false,
      valueBeforeComposition: null,
      options: {
        type: "text",
        errMsg: "",
        placeHolder: null,
        width: null,
        maxLength: null,
        minLength: 0,
        hideClose: false,
        disabled: false,
        readonly: false,
        IconStyle: false
      }
    }
  },
  created () {
    this.zoomId = this.op && this.op.id || this.id;
  },
  methods: {
    handleChild(e) {
      this.$emit(e);
    },
    isKorean(text) {
      const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
      return reg.test(text);
    },
    /**
     * 当用户按tab键切换的时候 触发验证功能
     */
    handleTab(e) {
      if (e.keyCode !== 9) return;
      this.handleBlur();
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.options.disabled = status;
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
        this.isOnComposition = !this.isKorean(lastCharacter);
        if (this.isOnComposition && event.type === "compositionstart") {
          //  输入框中输入的值赋给valueBeforeComposition
          this.valueBeforeComposition = text;
        }
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
          return true;
        }
      } else {
        return true;
      }
    },
    // 重置功能,主要给父组件调用
    reset() {
      if (!this.options.disabled) {
        this.currentValue = '';
        this.$emit("input", '');
      } else {
        throw new Error(
          // "zoom-ui error: disabled状态下无法清除内容! "
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('err.disabled_clear')}`
        );
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
    },
  }
}
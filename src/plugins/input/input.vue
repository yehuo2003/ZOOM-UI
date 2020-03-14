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
      :disabled="options.isdisabled"
      :class="error ? 'error' : ''"
    />
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <div class="input-btn">
      <a @click="clear" href="javascript:void(0);" class="zoom-icon icon-close icon-default"></a>
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
import { isKorean } from "../common.js";
export default {
  name: "zoom-input",
  props: {
    op: {
      placeHolder: {
        type: String,
        default: null
      },
      isdisabled: {
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
      },
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
        isdisabled: false,
        IconStyle: false
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
      this.options.type = this.op.type || "text";
      if (this.options.type == "text" || this.options.type == "password") {
        return;
      } else {
        this.options.type = "text";
        throw new Error(
          `zoom-ui TypeError: type属性解析失败, 仅支持 'text', 'password' !`
        );
      }
    }
  },
  methods: {
    handleChild(e) {
      this.$emit(e);
    },
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
    // 重置功能,主要给父组件调用
    reset() {
      this.clear();
    },
    // 清除
    clear() {
      if (!this.options.isdisabled) {
        this.currentValue = "";
        this.$emit("input", "");
      } else {
        throw new Error("zoom-ui error: disabled状态下无法清除内容! ");
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
.zoom-input:hover .input-btn .icon-default.icon-close {
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
.zoom-input > input:focus {
  border: 1px solid #1890ff;
  -webkit-box-shadow: 0 0 0 tansparent;
  box-shadow: 0 0 0 tansparent;
}
.zoom-input > input:active {
  border: 1px solid #1890ff;
  -webkit-box-shadow: 0 0 0 tansparent;
  box-shadow: 0 0 0 tansparent;
}
.zoom-input > input:hover {
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
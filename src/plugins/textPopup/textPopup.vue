<template>
  <div style="width: 150px;" class="zoom-text-popup">
    <input
      @focus="hoverInput"
      :disabled="options.isdisabled"
      :readonly="options.readonly"
      :placeholder="options.placeHolder"
      :value="currentValue"
      @input="Oninput"
      v-show="isShow"
      ref="zoom-text"
      class="zoom-text zoom-area"
    />
    <span v-if="errMsg" class="err-msg">{{errMsg}}</span>
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
      placeHolder: {
        type: String,
        default: "请输入关键词"
      },
      isdisabled: {
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
        placeHolder: "请输入关键词",
        resize: false,
        readonly: false,
        isdisabled: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
    }
  },
  methods: {
    reset() {
       if (!this.options.isdisabled) {
        this.currentValue = "";
        this.$emit("input", "");
      } else {
        throw new Error("zoom-ui error: disabled状态下无法清除内容! ");
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
            setTimeout(() => {
              this.errMsg = null;
            }, 2000);
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
      this.$refs["zoom-text"].focus();
    },
    hoverInput() {
      if (!this.options.isdisabled && !this.options.readonly) {
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
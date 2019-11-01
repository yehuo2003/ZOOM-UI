<template>
  <div class="zoom-input zoom-dropdown">
    <input
      :class="error ? 'error' : ''"
      @blur="handleBlur"
      :value="currentValue"
      @input="Oninput"
      :type="options.type"
      :placeholder="options.placeHolder"
      :disabled="options.isdisabled"
    />
    <span v-if="errMsg" class="err-msg">{{errMsg}}</span>
    <div class="input-btn">
      <a @click="clear" href="javascript:void(0);" class="icon iconfont icon-close icon-default"></a>
      <a
        @click="serach"
        href="javascript:void(0);"
        class="icon iconfont icon-down"
      ></a>
    </div>
    <div class="zoom-selector">
        <div class="selector-content">
            <ul class="zoom-poplist">
                <li class="list-item select-active" val="1" title="深圳">深圳</li>
                <li class="list-item" val="2" title="长沙">长沙</li>
                <li class="list-item" val="3" title="武汉">武汉</li>
                <li class="list-item" val="4" title="北京">北京</li>
                <li class="list-item" val="5" title="上海">上海</li>
                <li class="list-item" val="6" title="广州">广州</li>
                <li class="list-item" val="7" title="南京">南京</li>
                <li class="list-item" val="8" title="贵州">贵州</li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
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
      errMsg: {
          type: String,
          default: ''
      },
      IconStyle: {
        type: String,
        default: false
      }
    },
    value: String
  },
  data() {
    return {
      currentValue: this.value,
      error: false,
      errMsg: null,
      options: {
        type: "text",
        errMsg: '',
        placeHolder: null,
        isdisabled: false,
        IconStyle: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
      this.options.type = this.op.type || "text";
      if (this.options.type == "text" || this.options.type == "password") {
        return;
      } else {
        this.options.type = "text";
        throw Error(
          `zoom-ui TypeError: type属性解析失败, 仅支持 'text', 'password' !`
        );
      }
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
            setTimeout(() => {
                this.errMsg = null;
            }, 2000);
          }
        } else {
          this.error = false;
        }
      }
    },
    clear() {
      if (!this.options.isdisabled) {
        this.currentValue = "";
      } else {
        throw Error("zoom-ui error: disabled状态下无法清除内容! ");
      }
    },
    Oninput($event) {
      this.currentValue = $event.target.value;
      this.$emit("input", $event.target.value);
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
/* 新增 */
.zoom-selector .select-active,
.zoom-selector .zoom-poplist li:hover {
    cursor: pointer;
    background: #e6f7ff;
    color: #333; 
}
.zoom-selector .zoom-poplist li {
    min-height: 30px;
    line-height: 30px;
    max-width: 30px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 8px;
}
.zoom-selector {
    position: absolute;
    z-index: 2;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, .3); 
    box-shadow: 0 0 4px rgba(0, 0, 0, .3);
    background: #ffffff;
    color: #333;
    margin-top: 2px;
}
.zoom-selector .selector-content {
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 结束 */
.zoom-input .err-msg {
    color: #fff;
    font-size: 14px;
    position: absolute;
    z-index: 11;
    right: -100px;
    top: 0;
    background: #ff4d4f;
    padding: 5px;
    border-radius: 5px;
}
.zoom-input .error {
  border: 1px solid red;
}
.zoom-input .input-btn a {
  text-decoration: none;
  display: block;
  float: left;
  color: #1890ff;
  font-size: 16px;
  width: 20px;
  line-height: 30px;
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
  right: 0;
  position: absolute;
  top: 0;
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
  pointer-events: none;
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
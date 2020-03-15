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
    class="zoom-input zoom-dropdown"
  >
    <input
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @keydown="handleTab($event)"
      @blur="handleBlur"
      @input="Oninput"
      :value="currentValue"
      :placeholder="options.placeHolder"
      :disabled="options.isdisabled"
      :readonly="options.readonly"
      :id="id"
      :class="error ? 'error' : ''"
      type="text"
      ref="downVal"
    />
    <span
      v-show="errMsg && error"
      ref="err"
      v-tip.error.right.multiple.click="errMsg"
      style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
    ></span>
    <div class="input-btn">
      <a
        v-if="!options.hideClose"
        @click="clear"
        href="javascript:void(0);"
        class="zoom-icon icon-close icon-default"
      ></a>
      <a
        @click="serach"
        href="javascript:void(0);"
        class="zoom-icon"
        :class="showDown ? 'icon-up' : 'icon-down'"
      ></a>
    </div>
    <div v-show="showDown" class="zoom-selector">
      <div class="show-warpper" @click="serach"></div>
      <div class="selector-content">
        <ul class="zoom-poplist">
          <li
            v-for="(item,index) of options.data"
            :key="index"
            :val="item.value"
            :title="item.text"
            @click="itemClick(item)"
            class="list-item"
          >
            <!-- 多选功能开启时启动复选框 -->
            <zoom-checkbox v-show="isChecked" :ref="item.value" :op="checkOp">{{item.text}}</zoom-checkbox>
            {{isChecked ? '' : item.text}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { isKorean } from "../common/common.js";
export default {
  name: "zoom-dropdown",
  props: {
    id: String,
    value: [String, Number],
    op: {
      placeHolder: {
        //  占位符
        type: String,
        default: null
      },
      isdisabled: {
        //是否禁用 默认false
        type: Boolean,
        default: false
      },
      readonly: {
        // 是否禁止输入默认false
        type: Boolean,
        default: false
      },
      isChecked: {
        // 是否启用多选功能 默认false
        type: Boolean,
        default: false
      },
      hideClose: {
        //是否隐藏清除按钮 默认false
        type: Boolean,
        default: false
      },
      errMsg: {
        //  验证失败时候显示的信息
        type: String,
        default: ""
      },
      onClick: {
        //  点击事件
        type: Function
      },
      data: {
        //下拉框数据, 键值对的方式, text是展示的文本
        type: Array,
        default: function() {
          return [];
        }
      }
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
      list: [], //  多选时候用
      defaultList: [{ value: null, text: "暂无数据" }],
      showDown: false,
      isChecked: false, //  是否启用多选功能
      checkOp: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "", value: "" }]
      },
      options: {
        data: [],
        errMsg: "",
        placeHolder: null,
        isdisabled: false
      }
    };
  },
  mounted() {
    if (this.options.default && this.options.data) {
      let data = this.options.data;
      data.forEach(item => {
        // 如果有设置默认值
        if (this.options.default == item.value) {
          this.currentValue = item.text;
          this.$refs["downVal"].value = item.value;
        }
      });
    }
  },
  created() {
    if (this.op) {
      if (this.op.isChecked) {
        this.isChecked = this.op.isChecked;
        let list = [];
        this.op.data.forEach(item => {
          // 判断是否设置了默认项
          if (!item.checked) {
            item.checked = false;
          } else {
            item.checked = true;
          }
          list.push(item);
        });
        this.op.data = this.$zoom.clone(list);
      }
      this.options = this.op;
      //
      if (!this.op.data) {
        // 如果没有配置data数据 默认显示暂无数据
        this.options.data = this.defaultList;
      }
    } else {
      this.options.data = this.defaultList;
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
    load(data) {
      if (data && data.length && data instanceof Array) {
        this.list = data;
      } else if (Object.prototype.toString.call(data) === '[object Object]' && data.value && data.text) {
        this.currentValue = data.text;
        this.$refs["downVal"].value = data.value;
      }
    },
    handleChild(e) {
      this.$emit(e);
    },
    itemClick(e) {
      if (this.options.onClick) {
        this.options.onClick(e);
      }
      if (e.value === null && e.text === "暂无数据") {
        return;
      }
      // 判断是否是多选
      if (!this.isChecked) {
        // 单选状态
        this.currentValue = e.text;
        this.$refs["downVal"].value = e.value;
        this.$emit("input", e.value);
        this.showDown = false;
      } else {
        let list = this.$zoom.clone(this.list);
        let str = ""; //  展示的数据
        let lst = []; //  返回给父组件的
        if (!e.checked) {
          // 选中
          list.push(e);
          list.forEach(item => {
            str += item.text + ";";
            lst.push(item.value);
          });
        } else {
          // 取消选中
          list.forEach((item, index) => {
            if (item.value === e.value) {
              list[index] = null;
            } else {
              str += item.text + ";";
              lst.push(item.value);
            }
          });
        }
        // 返回给父组件v-model
        this.$emit("input", lst);
        // 展示的文本
        this.currentValue = str;
        // 去除为空的数据然后保存下来
        this.list = list.filter(d => d);
        e.checked = !e.checked;
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
              this.$refs['err'].click();
              setTimeout(() => {
                this.$nextTick(() => {
                  this.error = false;
                  $Z('.zoom-tip-container')[0].remove();
                })
              }, 2000);
            })
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
    clear() {
      if (!this.options.isdisabled) {
        this.currentValue = "";
        this.list = [];
        this.$emit("input", this.currentValue);
        if (this.options.isChecked) {
          this.options.data.forEach(item => {
            if (item.checked) {
              // 清空复选框
              this.$refs[item.value][0].list[0].checked = item.checked = false;
            }
          });
        }
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
      if (this.options.isdisabled) {
        return;
      }
      this.showDown = !this.showDown;
    }
  }
};
</script>
<style>
.show-warpper {
  z-index: 6;
  position: fixed;
  background: rgba(0, 0, 0, 0);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
/* 新增 */
.zoom-selector .select-active,
.zoom-selector .zoom-poplist li:hover {
  cursor: pointer;
  background: #e6f7ff;
  color: #333;
}
.zoom-selector .zoom-poplist label {
  width: 100%;
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
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  color: #333;
  margin-top: 2px;
}
.zoom-selector .selector-content {
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 10;
}
/* 结束 */
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
  /* pointer-events: none; */
  border: 1px solid #d9d9d9;
  color: #bfbfbf;
  background: #f5f5f5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.zoom-input > input[readonly] {
  cursor: not-allowed;
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
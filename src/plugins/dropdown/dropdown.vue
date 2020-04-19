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
    :style=" 'width: ' + options.width"
    :class=" options.disabled ? 'disabled' : '' "
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
      :disabled="options.disabled"
      :readonly="options.readonly"
      :maxlength="options.maxLength"
      :minlength="options.minLength"
      :id="zoomId"
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
        @click="reset"
        href="javascript:void(0);"
        class="zoom-icon icon-close icon-default"
      ></a>
      <a
        @click="showTip(showDown)"
        href="javascript:void(0);"
        class="zoom-icon"
        :class="showDown ? 'icon-up' : 'icon-down'"
      ></a>
    </div>
    <div v-show="false" class="zoom-selector">
      <div class="show-warpper" @click="close"></div>
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
import InputMixin from "../mixins/input";
export default {
  name: "zoom-dropdown",
  mixins: [InputMixin],
  props: {
    value: [String, Number, Array, Boolean],
    op: {
      isChecked: {  // 是否启用多选功能 默认false
        type: Boolean,
        default: false
      },
      onClick: {  //  点击事件
        type: Function
      },
      data: { //下拉框数据, 键值对的方式, text是展示的文本
        type: Array,
        default: function() {
          return [];
        }
      }
    }
  },
  data() {
    return {
      list: [], //  多选时候用
      defaultList: [{ value: null, text: this.$zoom.$t('grid.no_data') }], //  暂无数据
      showDown: false,
      isChecked: false, //  是否启用多选功能
      checkOp: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "", value: "" }]
      },
      options: {
        data: []
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
    if (!this.value) {
      this.currentValue = '';
    }
    if (this.op) {
      if (this.op.isChecked && this.op.data && this.op.data.length) {
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
      if (!val) {
        return
      }
      /**
       * 如果是多选的话, 并且用户绑定了v-model, 这里进行逻辑转换
       */
      if (val && this.list) {
        let str = ''
        this.list.forEach((item, index) => {
          if (item.value === val[index]) {
            str += item.text + ';';
          }
        })
        this.setCurrentValue(str);
      } else {
        this.setCurrentValue(val);
      }
    }
  },
  beforeDestroy() {
    if (this.tipInstance) {
      this.tipInstance.destroy();
    }
  },
  methods: {
    /**
     * 显示下拉框tips
     */
    showTip(showDown) {
      if (this.op && this.op.disabled) {
        return;
      }
      const tipInstance = this.$zoom.tip({
        customComponent: "zoom-dropdown-content",
        width: this.op && this.op.width || '270px',
        customProps: { // 要传入的参数
          options: this.options,
          isChecked: this.isChecked
        },
        duration: -1,
        placements: ['bottom', 'top', 'right', 'left'],
        customClass: 'zoom-custom-content zoom-dropdown',
        customListeners: {
          input: val => {
            this.itemClick(val)
          }
        },
        target: this.$refs['downVal']	//	目标元素
      });
      if (showDown) {
        tipInstance.hiddenTip(true);
      } else {
        tipInstance.updateTip();
      }
      this.tipInstance = tipInstance;
      this.close();
    },
    /**
     * 加载数据 如果有下拉框数据就先销毁
     */
    load(data) {
      if (this.tipInstance) {
        this.tipInstance.destroy();
      }
      if (data && data.length && data instanceof Array) {
        if (this.op && this.op.isChecked) {
          this.list = data;
        } else {
          this.options.data = data;
        }
      } else if (Object.prototype.toString.call(data) === '[object Object]' && data.value && data.text) {
        this.currentValue = data.text;
        this.$refs["downVal"].value = data.value;
      }
    },
    itemClick(e) {
      if (this.options && this.options.onClick) {
        this.options.onClick(e);
      }
      if (e.value === null && e.text === this.$zoom.$t('grid.no_data')) { // 暂无数据
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
    //           this.$refs['err'].click();
    //           setTimeout(() => {
    //             this.$nextTick(() => {
    //               this.error = false;
    //               $Z('.zoom-tip-container')[0].remove();
    //             })
    //           }, 2000);
    //         })
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
    // 重置功能,主要给父组件调用
    // reset() {
    //   this.clear();
    // },
    reset() {
      if (!this.options.disabled) {
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
        throw new Error(
          // "zoom-ui error: disabled状态下无法清除内容! "
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('err.disabled_clear')}`
        );
      }
    },
    // Oninput($event) {
    //   const value = $event.target.value;
    //   //设置当前值
    //   this.setCurrentValue(value);
    //   //如果还在输入中，将不会把值传给父组件
    //   if (this.isOnComposition) return;
    //   //输入完成时，isOnComposition为false，将值传递给父组件
    //   this.$emit("input", value);
    // },
    close() {
      if (this.options && this.options.disabled) {
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
.disabled.zoom-input .input-btn a {
  color: #bfbfbf;
  cursor: no-drop;
}
.zoom-input:hover .input-btn .icon-default.icon-close {
  display: block;
}
.disabled.zoom-input:hover .input-btn .icon-default.icon-close {
  display: none;
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
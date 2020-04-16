<template>
  <div :class="options.disabled ? 'disabled' : ''" class="zoom-search zoom-input">
    <div :class="[ focus ? 'focus' : '', error ? 'error' : ''] " class="select-line">
      <div v-if="list.length > 0" class="search-place">
        <span class="search-text">{{obj.text}}</span>
        <span class="search-outer">
          <a class="zoom-icon icon-down"></a>
        </span>
        <div class="zoom-search-select">
          <div class="select-body">
            <ul class="search-popup">
              <li v-for="item of list" :key="item.value" @click="selectClick(item)">{{item.text}}</li>
            </ul>
          </div>
        </div>
      </div>
      <input
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @blur="handleBlur"
        @input="Oninput"
        @keydown="handleTab($event)"
        @focus="focus = true"
        @keyup.enter="handleSearch"
        :value="currentValue"
        :placeholder="placeholder ? placeholder : options.placeHolder"
        :readonly="options.readonly"
        :disabled="options.disabled"
        :maxlength="options.maxLength"
        :minlength="options.minLength"
        type="text"
        class="zoom-input-search"
      />
      <span
        v-show="errMsg && error"
        ref="err"
        v-tip.error.right.multiple.click="errMsg"
        style="width: 100%;height:30px;disaplay:block;position:absolute;z-index:-999;top:0;left:0;"
      ></span>
      <div @click="handleSearch" class="input-btn">
        <a class="zoom-icon icon-search"></a>
      </div>
    </div>
  </div>
</template>
<script>
import InputMixin from "../mixins/input";
export default {
  name: "zoom-search",
  mixins: [InputMixin],
  props: {
    op: {
      data: Array //  可选的查找数据
    },
    search: Function, // search(val, key)
  },
  data() {
    return {
      list: [],
      obj: {},
      focus: false,
      options: {
        placeHolder: this.$zoom.$t('search.msg'), // 请输入关键词
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
      if (!this.options.placeHolder) {
        this.options.placeHolder =  this.$zoom.$t('search.msg') // 请输入关键词
      }
      if (this.op.data && this.op.data.length > 0) {
        this.list = this.op.data;
        this.obj = this.list[0];
      }
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
    //   this.focus = false;
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
    // 点击搜索条目
    selectClick(e) {
      if (e !== this.obj) {
        this.obj = e;
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
    /**
     * 向父组件传递search事件, 可获取参数 input 框value值, 当前查找的obj
     */
    handleSearch() {
      this.$emit("search", this.currentValue, this.obj);
      if (this.op && this.op.onClick) {
        this.op.onClick();
      }
    }
  }
};
</script>
<style>
/* 弹出菜单 */
.zoom-search-select .select-body .search-popup li:hover {
  background: #e6f7ff;
  cursor: pointer;
}
.zoom-search-select .select-body .search-popup li {
  min-height: 30px;
  line-height: 30px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
}
.zoom-search-select .select-body .search-popup {
  list-style: none;
  margin: 0;
  padding: 0;
}
.zoom-search-select .select-body {
  overflow-y: auto;
  overflow-x: hidden;
}
.zoom-search .zoom-search-select {
  display: none;
  position: absolute;
  top: 32px;
  left: 0;
  border: 1px solid #d9d9d9;
  overflow: hidden;
  box-shadow: none;
  min-width: 75px;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 12px;
}
/* 搜索框 */
.zoom-search.zoom-input:not(.disabled) .select-line:hover .zoom-search-select {
  display: block;
}
.zoom-search.zoom-input .select-line.focus {
  border: 1px solid #1890ff;
}
.zoom-search.zoom-input
  .select-line
  input.zoom-input-search[disabled]
  + .input-btn
  a {
  color: #333;
}
.zoom-search.zoom-input:not(.disabled) .select-line .input-btn:hover a {
  font-weight: bold;
}
.zoom-search.zoom-input .select-line .input-btn {
  width: 30px;
  height: 30px;
  display: table-cell;
  position: relative;
  vertical-align: middle;
  right: 0;
}
.zoom-search.zoom-input .input-btn a,
.zoom-search.zoom-input .input-btn span {
  text-decoration: none;
  cursor: pointer;
  display: block;
  float: left;
  color: #1890ff;
  font-size: 14px;
  width: 30px;
  line-height: 30px;
}
.zoom-search.zoom-input .select-line input.zoom-input-search {
  color: #333;
  padding-left: 8px;
  outline: 0;
  border: 0;
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  background: 0 0;
}
.zoom-search.zoom-input .select-line .search-place .search-outer a {
  color: #c4c4c4;
  font-size: 14px;
}
.zoom-search.zoom-input .select-line .search-place .search-outer {
  height: 26px;
  display: inline-block;
  padding: 0 10px;
  line-height: 26px;
  border-right: 1px solid #d9d9d9;
}
.zoom-search.zoom-input .select-line .search-place .search-text {
  color: inherit;
  font-size: 14px;
  margin-left: 4px;
}
.zoom-search.zoom-input .select-line .search-place {
  z-index: 2;
  line-height: 30px;
  display: table-cell;
  padding: 0 8px;
  width: 1px;
  white-space: nowrap;
  position: relative;
  vertical-align: middle;
  right: 0;
}
.zoom-search.zoom-input .select-line {
  display: inline-table;
  width: 100%;
  height: 30px;
  border: 1px solid #d9d9d9;
  background: #fff;
  transition: 0.5s;
}
.zoom-search.zoom-input .select-line.error {
  border: 1px solid red;
}
.zoom-search.disabled>.select-line>.input-btn,
.zoom-search.disabled>.select-line>.search-place,
.zoom-search.disabled>.select-line>input[disabled] {
  cursor: not-allowed;
  color: #bfbfbf;
  background: #f5f5f5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
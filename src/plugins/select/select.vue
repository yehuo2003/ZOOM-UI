<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-02-25 17:11:07
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-03-10 22:15:59
-->
<template>
  <div
    ref="zoom-select"
    :class="multiple ? 'zoom-select__multiple' : ''"
    class="zoom-select"
  >
    <div
      v-if="multiple"
      v-inputresize="DomResize"
      @click="showTip(showDown)"
      class="zoom-select__tags"
    >
      <span
        v-show="(collapseTags && index === 0) || !collapseTags"
        v-for="(item, index) of currentValue"
        :key="index"
        class="zoom-tag zoom-tag--info zoom-tag--small"
      >
        <span class="zoom-select__tags-text">{{ item }}</span>
        <span
          @click.stop="removeItem(item)"
          class="zoom-icon icon-close-plus"
        ></span>
      </span>
      <span
        v-show="collapseTags && currentValue.length > 1"
        class="zoom-tag zoom-tag--info zoom-tag--small"
      >
        <span class="zoom-select__tags-text"> + {{ currentValue.length - 1 }} </span>
      </span>
    </div>
    <div @click="showTip(showDown)" class="zoom-input zoom-input-suffix">
      <input
        :value="currentValue"
        type="text"
        readonly="readonly"
        unselectable="on"
        autocomplete="off"
        class="zoom-input__inner"
        ref="downVal"
      />
      <span class="zoom-input__suffix">
        <span class="zoom-input__suffix-inner">
          <a
            :class="showDown ? 'icon-up' : 'icon-down'"
            href="javascript:void(0);"
            class="zoom-icon zoom-svg zoom-svg-size zoom-select__caret is-reverse"
          ></a>
        </span>
      </span>
    </div>
    <div
      v-show="showDown"
      @click.capture="hideDown"
      class="zoom-select-mask"
    ></div>
  </div>
</template>
<script>
export default {
  name: "zoom-select",
  props: {
    multiple: {
      // 是否启用多选功能 默认false
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    collapseTags: {
      // 是否启用缩写模式 默认false
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDown: false,
      tipInstance: null,
      currentValue: null,
      options: [],
      list: [],
    };
  },
  directives: {
    inputresize: {
      bind(el, binding) {
        let height = "";
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (height !== style.height) {
            binding.value({ height: style.height });
            height = style.height;
          }
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        console.log(el, "解绑");
        clearInterval(el.__vueSetInterval__);
      },
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    DomResize(data) {
      let inputHeight = this.$refs["downVal"].style.height;
      if (data.height === "0px") {
        inputHeight = "";
      } else if (data.height !== inputHeight) {
        inputHeight = data.height;
      } else {
        return;
      }
      this.$refs["downVal"].style.height = inputHeight;
      if (this.tipInstance) {
        this.tipInstance.updateTip();
      }
    },
    removeItem(item) {
      this.currentValue = this.currentValue.filter((i) => i !== item);
      this.options = this.options.map((i) => {
        if (i.text === item) {
          i.checked = false;
        }
        return i;
      });
      if (!this.tipInstance) {
        return;
      }
      const tipList = this.tipInstance.$children[0].$children;
      // 将选择的元素在dom中移除
      tipList.forEach((i) => {
        if (i.$el.childNodes[0].childNodes[1].textContent.trim() === item) {
          i.$el.__vue__.list[0].checked = false;
        }
      });
      // 判断是否要取消全选按钮
      let count = 0;
      for (let i = 1; i < tipList.length; i++) {
        const element = tipList[i].$el.__vue__.list[0];
        count++;
        if (element.checked) {
          break;
        }
      }
      if (count === tipList.length - 1) {
        tipList[0].$el.__vue__.list[0].checked = false;
      }
    },
    showTip(showDown) {
      const tipInstance = this.$zoom.tip({
        customComponent: "zoom-select-content",
        width: this.$refs["zoom-select"].style.width || "100%",
        transition: true,
        customProps: {
          // 要传入的参数
          options: this.options,
          isChecked: this.multiple,
        },
        duration: -1,
        hiddenArrows: true,
        placements: ["bottom", "top", "bottom", "left"],
        customClass: "zoom-custom-content zoom-dropdown",
        customListeners: {
          input: (val) => {
            this.$nextTick(() => {
              this.itemClick(val);
            })
          },
        },
        target: this.$refs["downVal"], //	目标元素
      });
      if (showDown) {
        tipInstance.hiddenTip(true);
      } else {
        tipInstance.updateTip();
      }
      this.showDown = !this.showDown;
      this.tipInstance = tipInstance;
    },
    itemClick(e) {
      if (e.value === null && e.text === this.$zoom.$t("grid.no_data")) {
        // 暂无数据
        return;
      }
      // 判断是否多选
      if (!this.multiple) {
        // 单选状态
        if (e.disabled) {
          return;
        }
        this.currentValue = e.text;
        this.$refs["downVal"].value = this.currentValue;
        this.$emit("input", e.value);
        this.$emit("change", e.value);
        this.showDown = false;
        this.hideDown();
      } else {
        let isChecked = false;
        this.tipInstance.$children[0].$children.forEach((i) => {
          if (i.$el.childNodes[0].childNodes[1].textContent.trim() === e.text) {
            isChecked = i.$el.__vue__.list[0].checked;
          }
        });
        let list = this.$zoom.clone(this.list) || [];
        let showList = []; //  展示的数据
        let lst = []; //  返回给父组件的
        if (e === "all") {
          list = this.options.filter((i) => !i.disabled);
          list.forEach((item) => {
            lst.push(item.value);
            showList.push(item.text);
          });
        } else if (e === "cancel") {
          list = [];
          showList = [];
        } else if (isChecked) {
          // 选中
          list.push(e);
          list.forEach((item) => {
            lst.push(item.value);
            showList.push(item.text);
          });
        } else {
          // 取消选中
          list.forEach((item, index) => {
            if (item.value === e.value) {
              list[index] = null;
            } else {
              lst.push(item.value);
              showList.push(item.text);
            }
          });
        }
        // 返回给父组件v-model
        this.$emit("input", lst.toString());
        this.$emit("change", lst.toString());
        // 展示的文本
        this.currentValue = showList;
        // 去除为空的数据然后保存下来
        this.list = list.filter((d) => d);
        if (typeof e !== "string") {
          e.checked = !e.checked;
        }
      }
      this.$refs["downVal"].value = this.currentValue;
    },
    hideDown() {
      this.tipInstance.hiddenTip(true);
      setTimeout(() => {
        this.showDown = this.tipInstance.visible = false;
      }, 300);
      setTimeout(() => {
        if (!this.showDown) {
          this.tipInstance.visible = false;
        }
      }, 1000);
    },
    loadData() {
      let data = [];
      this.$slots.default.forEach((item) => {
        if (
          item.componentOptions &&
          item.componentOptions.tag === "zoom-option"
        ) {
          data.push(item.componentOptions.propsData);
        }
      });
      if (this.multiple) {
        let lst = "";
        if (this.value) {
          lst = this.value.split(",");
        }
        this.currentValue = [];
        this.options = data.map((item) => {
          if (lst.includes(item.value) && !item.disabled) {
            item.checked = true;
            this.currentValue.push(item.text);
            this.list.push(item);
          }
          return item;
        });
      } else {
        let obj = data.find((i) => i.value === this.value);
        this.currentValue = obj ? obj.text : "";
        this.options = data;
      }
      this.options = data;
    },
  },
  beforeDestroy() {
    if (this.tipInstance) {
      this.tipInstance.destroy();
    }
  },
};
</script>
<style>
[class*="zoom-"],
[class*="zoom-"] ::after,
[class*="zoom-"] ::before {
  box-sizing: border-box;
}
.zoom-select {
  display: inline-block;
  position: relative;
  width: 100%;
  outline: 0;
}
.zoom-input {
  position: relative;
  font-size: 12px;
  display: inline-table;
  width: 100%;
}
.zoom-input-suffix .zoom-input__inner {
  padding-right: 30px;
  padding-left: 8px;
}
.zoom-input__inner {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  color: #333;
  background: #fff;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  outline: 0;
  display: inline-block;
  box-sizing: border-box;
  -webkit-appearance: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.zoom-input__suffix {
  right: 8px;
  transition: all 0.3s;
  pointer-events: none;
}
.zoom-input__prefix,
.zoom-input__suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s;
  text-align: center;
  color: #d9d9d9;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.zoom-input__suffix-inner {
  pointer-events: all;
  font-size: 14px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -ms-flex-align: center;
  align-items: center;
}
.zoom-select .zoom-input .zoom-select__caret.is-reverse {
  transform: rotate(0);
}
.zoom-select .zoom-input .zoom-select__caret {
  fill: #1890ff;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotate(180deg);
  cursor: pointer;
}
.zoom-select__multiple .icon-close-plus {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  overflow: hidden;
  display: inline-block;
}
.zoom-select .zoom-input.is-focus .zoom-input__inner {
  border-color: #40a9ff;
}
.zoom-input__inner:active,
.zoom-input__inner:focus,
.zoom-input__inner:hover {
  outline: 0;
  border-color: #1890ff;
}

.zoom-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
  margin-top: 2px;
  box-sizing: border-box;
}
.zoom-select-dropdown .zoom-select-dropdown__list {
  list-style: none;
  margin: 0;
  box-sizing: border-box;
  padding-bottom: 6px;
  text-align: left;
}
.zoom-select-dropdown .zoom-select-dropdown__item {
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 8px;
}
.zoom-select-dropdown__item {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.zoom-select-dropdown__item.selected {
  background-color: #f5f5f5;
}
.zoom-select-dropdown__item.hover,
.zoom-select-dropdown__item:hover {
  background-color: #e6f7ff;
}
.zoom-select-dropdown__item.is-disabled {
  color: #999;
  cursor: not-allowed;
}
.zoom-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  padding-left: 4px;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.zoom-select .zoom-select__tags > span {
  display: contents;
}
.zoom-select .zoom-tag {
  border-color: transparent;
  margin: 2px 0 2px 4px;
  background-color: #f0f2f5;
}
.zoom-select .zoom-tag,
.zoom-tag {
  white-space: nowrap;
  box-sizing: border-box;
}
.zoom-tag.zoom-tag--info {
  color: #333;
  border-color: rgba(51, 51, 51, 0.15);
  background-color: rgba(51, 51, 51, 0.06);
}
.zoom-select__tags .zoom-tag.zoom-tag--info {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -ms-flex-align: center;
  align-items: center;
}
.zoom-tag {
  height: 22px;
  line-height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 2px;
  display: inline-block;
  color: #1890ff;
  border: 1px solid rgba(24, 144, 255, 0.15);
  background-color: rgba(24, 144, 255, 0.06);
}
.zoom-tag.zoom-tag--small {
  height: 20px;
  line-height: 18px;
}
.zoom-selector .selector-content .is-disabled,
.zoom-selector .select-active,
.zoom-selector .zoom-poplist .is-disabled:hover,
.zoom-selector .selector-content .is-disabled .zoom-checkbox .checkbox-item {
  color: #999;
  cursor: not-allowed;
}
.zoom-selector .selector-content .is-disabled:hover {
  background-color: #fff;
}
.zoom-selector
  .selector-content
  .is-disabled
  .zoom-checkbox
  .checkbox-item
  i.zoom-icon:hover {
  color: #d9d9d9;
}
.zoom-select .zoom-select-mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
}
.zoom-selector .selector-content::-webkit-scrollbar {
  width: 6px;
  top: 2px;
}
.zoom-selector:hover .selector-content::-webkit-scrollbar-thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: 4px;
  background-color: hsla(220, 4%, 58%, 0.3);
  transition: background-color 0.3s;
}
.zoom-selector .selector-content::-webkit-scrollbar-thumb:hover {
  background: #ccc;
  opacity: 1;
  transition: opacity 0.34s ease-out;
}
.zoom-select__tags-text {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 180px;
}
.zoom-select__multiple .zoom-input > .zoom-input__inner {
  color: #fff;
}
</style>
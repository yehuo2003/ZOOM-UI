<template>
  <!-- submit.prevent="false" 阻止默认提交事件 -->
  <form
    :class="[inline ? 'form-inline' : '', textAlign ? 'form-align-' + textAlign : '' ]"
    class="zoom-form"
  >
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "zoom-form",
  props: {
    textAlign: {
      type: String,
      default: null
    },
    inline: {
      type: [String, Boolean],
      default: null
    },
    labelWidth: {
      type: [String, Boolean],
      default: null
    }
  },
  methods: {
    /**
     * 验证功能 循环遍历form表单,查看表单里组件是否有handleBlur验证函数 如果有就调用
     */
    valid() {
      let arr = this.$children;
      let count = 0;
      arr.forEach(item => {
        let modules = item.$slots.default;
        if (modules && modules.length) {
          modules.forEach(i => {
            let componentInstance = i.componentInstance;
            /**
             * @function 判断用户是否添加了必填项(require)
             * 如果添加了require, 并且表单项的值为空, 则弹出提示 '必填'
             * 3s 后消失
             */
            if (
              item.require &&
              componentInstance &&
              componentInstance.handleBlur
            ) {
              /**
               * 如果用户没未填写内容 则弹出提示 '必填'
               * 如果输入框有数据, 但是用户有自定义规则, 就调用自定义规则
               */
              let res = componentInstance.handleBlur();
              if (!componentInstance.currentValue || !res) {
                let msg = this.$zoom.clone(componentInstance.errMsg);
                componentInstance.error = true;
                res = false;
                if (!componentInstance.currentValue) {
                  componentInstance.errMsg = '必填';
                }
                setTimeout(() => {
                  componentInstance.error = false;
                }, 5000);
              }
              /**
               * 如果有一项验证未通过, count + 1
               * 最终结果取反 只有res为 0 才返回 true
               */
              if (!res) count += 1;
            }
          });
        }
      });
      return !count;
    },
    // 重置表单内容
    /**
     * 循环判断
     * form表单 利用zoom表单组件中的reset函数, 重置组件数据
     */
    reset() {
      let arr = this.$children;
      arr.forEach(item => {
        // 对 zoom-form-item 下所有的元素循环判断
        let modules = item.$slots.default;
        if (modules && modules.length) {
          modules.forEach(i => {
            if (i.componentInstance && i.componentInstance.reset) {
              i.componentInstance.reset();
            }
          });
        }
      });
    }
  }
};
</script>
<style>
.zoom-form {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
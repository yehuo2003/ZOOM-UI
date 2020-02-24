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
             * 判断用户是否添加了必填项(require)
             * 如果添加了require, 并且表单项的值为空, 则弹出提示 '必填'
             * 2s 后消失
             */
            if (
              item.require &&
              componentInstance &&
              componentInstance.handleBlur
            ) {
              let res = componentInstance.handleBlur();
              if (!res || !componentInstance.currentValue) {
                let msg = componentInstance.errMsg;
                componentInstance.errMsg = "必填";
                componentInstance.error = true;
                res = false;
                // TODO 2S后 警告消失
                setTimeout(() => {
                  componentInstance.errMsg = msg;
                  componentInstance.error = false;
                }, 2000);
              }
              /**
               * 如果有一项验证未通过, count + 1
               * // 最终结果取反 只有res为 0 才返回 true
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
<template>
  <!-- submit.prevent="false" 阻止默认提交事件 -->
  <form :class="inline ? 'form-inline' : '' " class="zoom-form">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "zoom-form",
  props: {
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
    // 验证功能
    valid() {
      let arr = this.$children;
      let count = 0;
      arr.forEach(item => {
        if (
          item.$slots.content[0].componentInstance &&
          item.$slots.content[0].componentInstance.handleBlur
        ) {
          let res = item.$slots.content[0].componentInstance.handleBlur();
          if (!res) count += 1;
        }
      });
      return !!count;
    },
    // 重置表单内容
    /**
     * form表单 利用zoom表单组件中的reset函数, 重置组件数据
     */
    reset() {
      let arr = this.$children;
      arr.forEach(item => {
        if (
          item.$slots.content[0].componentInstance &&
          item.$slots.content[0].componentInstance.reset
        ) {
          item.$slots.content[0].componentInstance.reset();
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
.zoom-form-item {
  margin: 0 0 12px;
}
.zoom-form-item > .form-item-label {
  color: #333;
  text-align: right;
  vertical-align: middle;
  line-height: 30px;
  float: left;
  padding: 0 8px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-break: break-all;
  font-weight: 400;
  margin: 0;
}
.zoom-form-item::after,
.zoom-form-item::before {
  content: "";
  display: table;
}
.zoom-form.form-inline .zoom-form-item,
.zoom-form .form-item-inline {
  margin-right: 10px;
  display: inline-block;
  vertical-align: top;
}
.zoom-form.form-inline .form-item-label,
.zoom-form .form-item-inline .form-item-label {
  float: none;
  display: inline-block;
}
</style>
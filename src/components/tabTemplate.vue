<!--
 * @Description: tab代码片段封装
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-05-10 22:37:55
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-16 20:41:29
-->
<template>
  <div :class=" cls ? cls : 'basic' ">
    <slot name="header">
      <h2>使用方法</h2>
    </slot>
    <zoom-tabs :value="tabIndex" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <slot></slot>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="code"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
  </div>
</template>
<script>
export default {
  name: 'tab-template',
  props: {
    code: {
      type: String,
      default: null
    },
    cls: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    opChange(index) {
      this.tabIndex = index
    }
  }
};
</script>
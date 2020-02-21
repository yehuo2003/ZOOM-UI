<template>
  <div class="zoom-tabs">
    <ul class="tab-head">
      <slot></slot>
    </ul>
    <!-- 把panels数组拆分, 循环出来渲染, 并且把带有active的元素传给子组件 -->
    <zoom-tabs-content v-for="(item, i) of panels" :key="i" :active="item[0].active" :panels="panels[i]" />
  </div>
</template>

<script>
export default {
  name: "zoom-tabs",
  data() {
    return {
      panels: [] // 子组件mounted的时候将自己push到该数组中
    };
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    tabChange(index) {
      this.$emit("tabChange", index);
    }
  }
};
</script>

<style>
.zoom-tabs .tab-head {
  border-bottom: 1px solid #d9d9d9;
  padding: 0;
  position: relative;
  margin: 0;
  width: 100%;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
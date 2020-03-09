<template>
  <div :class="position ? 'tabs-' + position : '' " class="zoom-tabs">
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
    position: { //  可传值 left 或 right, 左定位或右定位
      type: String,
      default: null
    },
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
.zoom-tabs:not(.tabs-left,.tabs-right)>.tab-head {
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
.tabs-left>.tab-head {
  float: left;
  margin-bottom: 0;
  margin-right: 10px;
  background: #f5f5f5;
}
.tabs-right>.tab-head {
  float: right;
  margin-bottom: 0;
  margin-left: 10px;
  background: #f5f5f5;
}
.tabs-left>.tab-head>li.zoom-tab-item.tab-active {
  border-right: none;
}
.tabs-right>.tab-head>li.zoom-tab-item.tab-active {
  border-left: none;
}
.tabs-left>.tab-head>li.zoom-tab-item {
  display: block;
  width: 100%;
  border-right: 1px solid #d9d9d9;
}
.tabs-right>.tab-head>li.zoom-tab-item {
  display: block;
  width: 100%;
  border-left: 1px solid #d9d9d9;
}
.tabs-right>.tab-head>li.zoom-tab-item:last-child,
.tabs-left>.tab-head>li.zoom-tab-item:last-child {
  border-bottom: 1px solid #d9d9d9;
}
</style>
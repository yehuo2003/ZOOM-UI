<template>
  <div class="zoom-tabs">
    <ul class="tab-head">
      <slot></slot>
    </ul>
    <zoom-tabs-content :panels="panels" />
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
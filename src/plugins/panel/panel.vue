<template>
  <div class="zoom-panel">
    <div @click="handleClick" class="zoom-panel-header">
      <i :class="visibility ? 'icon-down' : 'icon-up' " class="zoom-icon panel-icon"></i>
      <p class="panel-title" v-html="titleContent"></p>
    </div>
    <div v-show="visibility" class="zoom-panel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-panel",
  props: {
    op: Object,
    title: [String],	//	标题
    show: {	//	是否显示, 默认false
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleContent: `<span>${this.$zoom.$t('panel.unfolding')}</span>`,
      visibility: false
    };
  },
  created() {
    this.titleContent = this.title;
    this.visibility = this.show;
    if (this.op) {
      if (this.op.title) {
        this.titleContent = this.op.title;
      }
      this.visibility = this.op.show;
    }
  },
  methods: {
    handleClick() {
      this.visibility = !this.visibility;
    }
  }
};
</script>
<style>
.zoom-panel-content {
  transform: all 0.5s linear;
  padding: 12px 24px 24px;
  overflow-y: auto;
  font-size: 0.875em;
  color: #333;
}
.zoom-panel-header .panel-title {
  margin-bottom: 0;
  margin-left: 26px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
}
.zoom-panel-header .icon-up {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  transform: rotate(90deg);
}
.zoom-panel-header .panel-icon {
  position: absolute;
  color: #333;
  font-size: 25px;
  line-height: 45px;
}
.zoom-panel-header {
  height: 46px;
  line-height: 46px;
  cursor: pointer;
  position: relative;
  text-align: left;
}
.zoom-panel {
  border: 0;
  padding: 20px;
  height: 100%;
  border-bottom: 1px solid #d9d9d9;
}
</style>
<template>
  <div class="zoom-layout">
    <!-- 头部 -->
    <div v-if="$slots.header" :style="headerStyle" class="zoom-header">
      <slot name="header"></slot>
    </div>
    <!-- 底部 -->
    <div v-if="$slots.footer" :style="footerHeight" class="zoom-footer">
      <slot name="footer"></slot>
    </div>
    <!-- 左侧单栏 -->
    <div v-if="$slots.aside" :style="asideStyle" class="zoom-aside">
      <slot name="aside" ></slot>
    </div>
    <!-- 主程序 -->
    <div v-if="$slots.main" :style="mainStyle" class="zoom-main">
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zoom-layout',
  props: {
    patterm: String,  //  default/simple/legend/classic/fashion
    headerHeight: { //  头部高
      type: [Number, String],
      default: 60
    },
    footerHeight: { //  底部高
      type: [Number, String],
      default: 60
    },
    asideWidth: { //  左侧宽
      type: [Number, String],
      default: 200
    }
  },
  data() {
    return {
      headerStyle: '',  //  头部style 默认高60px
      footerStyle: '',  //  尾部style 默认高60px
      asideStyle: '',  //  左侧单栏style 默认宽200px
      mainStyle: 'bottom: 0;',  //  主程序style
    }
  },
  created() {
    this.headerStyle = `height: ${this.headerHeight}px;`
    this.footerStyle = `height: ${this.footerHeight}px;`
    this.asideStyle = `width: ${this.asideWidth}px;`
    if (this.$slots.header) {
      this.asideStyle += `top: ${this.headerHeight}px;`
      this.mainStyle += `top: ${this.headerHeight}px;`
    }
    if (this.$slots.aside) {
      this.mainStyle += `left:  ${this.asideWidth}px;`
    }
  },
  methods: {
  }
};
</script>
<style>
.zoom-layout>.zoom-aside,
.zoom-layout>.zoom-footer,
.zoom-layout>.zoom-header,
.zoom-layout>.zoom-main {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
}
</style>
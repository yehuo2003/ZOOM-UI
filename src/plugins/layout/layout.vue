<template>
  <div class="zoom-layout">
    <!-- 头部 -->
    <header v-if="$slots.header" :style="headerStyle" class="zoom-header">
      <slot name="header"></slot>
    </header>
    <!-- 底部 -->
    <footer v-if="$slots.footer" :style="footerStyle" class="zoom-footer">
      <slot name="footer"></slot>
    </footer>
    <!-- 左侧单栏 -->
    <aside v-if="$slots.aside" :style="asideStyle" class="zoom-aside">
      <slot name="aside"></slot>
    </aside>
    <!-- 主程序 -->
    <main v-if="$slots.main" :style="mainStyle" class="zoom-main">
      <slot name="main"></slot>
    </main>
  </div>
</template>
<script>
export default {
  name: 'zoom-layout',
  props: {
    format: String,  //  default/fashion
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
    this.load();
  },
  methods: {
    load() {
      this.headerStyle = `height: ${this.headerHeight}px;`
      this.footerStyle = `height: ${this.footerHeight}px;`
      this.asideStyle = `width: ${this.asideWidth}px;`

      if (this.$slots.footer) {
        this.mainStyle += `bottom: ${this.footerHeight}px;`
      }

      if (this.format === 'fashion') {
        if (this.$slots.header) {
          this.mainStyle += `top: ${this.headerHeight}px;`
        }
        if (this.$slots.aside) {
          this.headerStyle += `left: ${this.asideWidth}px;`
          this.mainStyle += `left: ${this.asideWidth}px;`
          this.footerStyle += `left: ${this.asideWidth}px;`
        }
      } else {
        // default
        if (this.$slots.header) {
          this.asideStyle += `top: ${this.headerHeight}px;`
          this.mainStyle += `top: ${this.headerHeight}px;`
        }
        if (this.$slots.aside) {
          this.mainStyle += `left: ${this.asideWidth}px;`
          this.footerStyle += `left: ${this.asideWidth}px;`
        }
      }
    }
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
.zoom-layout>.zoom-aside {
  overflow: auto;
}
.zoom-layout>.zoom-main {
  overflow: auto;
}
.zoom-layout>.zoom-aside::-webkit-scrollbar,
.zoom-layout>.zoom-main::-webkit-scrollbar {
  width: 10px;
  background-color: inherit;
}
.zoom-layout>.zoom-aside::-webkit-scrollbar-thumb,
.zoom-layout>.zoom-main::-webkit-scrollbar-thumb {
  position: absolute;
  background: inherit;
}
.zoom-layout>.zoom-aside:hover::-webkit-scrollbar-thumb,
.zoom-layout>.zoom-main:hover::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
  box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
  background: rgba(85,85,85, .5);
}
.zoom-layout>.zoom-aside::-webkit-scrollbar-track,
.zoom-layout>.zoom-main::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
  box-shadow: inset 0 0 1px rgba(0,0,0,0);
  border-radius: 10px;
  background: inherit;
}
.zoom-layout>.zoom-footer {
  top: auto;
  width: auto;
}
</style>
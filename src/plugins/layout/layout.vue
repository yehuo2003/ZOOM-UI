<template>
  <div class="zoom-layout">
    <!-- 头部 -->
    <header v-if="$slots.header" ref="header" :style="{height: headerHeightAttr}" class="zoom-header">
      <slot name="header"></slot>
    </header>
    <!-- 底部 -->
    <footer v-if="$slots.footer" ref="footer" :style="{left: asideWidthAttr}" class="zoom-footer">
      <slot name="footer"></slot>
    </footer>
    <!-- 左侧单栏 -->
    <aside v-if="$slots.aside" ref="aside" :style="{width: asideWidthAttr}" class="zoom-aside">
      <slot name="aside"></slot>
      <i v-if="toggleAside" @click="showAsideBtn" class="aside-icon">|||</i>
    </aside>
    <!-- 主程序 -->
    <main v-if="$slots.main" ref="main" :style="{left: asideWidthAttr, bottom: footerHeightAttr, top: headerHeightAttr}" class="zoom-main">
      <slot name="main"></slot>
    </main>
  </div>
</template>
<script>
export default {
  name: 'zoom-layout',
  props: {
    toggleAside: {  //  默认false, 是否显示 隐藏侧边栏按钮
      type: [Boolean, String],
      default: false
    },
    stopTop: {  //  默认false, 每次页面改变会返回顶部, 为true禁止
      type: Boolean,
      default: false
    },
    headerHeight: { //  头部高
      type: [Number, String],
      default: 0
    },
    footerHeight: { //  底部高
      type: [Number, String],
      default: 0
    },
    asideWidth: { //  左侧宽
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      asideWidthAttr: 0,
      headerHeightAttr: 0,
      footerHeightAttr: 0,
      showAside: true
    }
  },
  created() {
    this.load();
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      if (this.$slots && !this.stopTop && newVal) {
        this.goTop();
      }
    }
  },
  methods: {
    showAsideBtn() {
      if (this.showAside) {
        this.asideWidthAttr = '12px';
      } else {
        this.asideWidthAttr = `${this.asideWidth}px`;
      }
      this.showAside = !this.showAside;
    },
    // 让main和aside返回顶部
    goTop() {
      document.documentElement.scrollTop = 0;
      ['aside', 'main', 'header', 'footer'].forEach(item => {
        if (this.$slots[item] && this.$refs[item]) {
          this.$refs[item].scrollTop = 0;
        }
      })
    },
    load() {
      this.headerHeightAttr = `${this.headerHeight}px`;
      this.asideWidthAttr = `${this.asideWidth}px`;
      this.footerHeightAttr = `${this.footerHeight}px`;
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
.zoom-layout>.zoom-aside>.aside-icon {
  position: absolute;
  right: 1px;
  top: 50%;
  cursor: pointer;
  transition: color .3s, transform .3s;
}
.zoom-layout>.zoom-aside>.aside-icon:hover {
  color: #1890ff;
  transform: scale(1.2);
}
.zoom-layout>.zoom-aside {
  overflow: auto;
  transition: width .5s;
}
.zoom-layout>.zoom-main {
  overflow: auto;
  transition: left .5s;
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
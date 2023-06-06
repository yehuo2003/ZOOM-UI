<template>
  <div class="zoom-layout">
    <!-- 头部 -->
    <header
      v-if="$slots.header"
      ref="header"
      :style="{ height: headerHeightAttr }"
      class="zoom-header"
    >
      <slot name="header"></slot>
    </header>
    <!-- 底部 -->
    <footer
      v-if="$slots.footer"
      ref="footer"
      :style="{ left: asideWidthAttr, height: footerHeightAttr }"
      class="zoom-footer"
    >
      <slot name="footer"></slot>
    </footer>
    <!-- 左侧单栏 -->
    <aside
      v-if="$slots.aside"
      ref="aside"
      :style="{ width: asideWidthAttr, top: headerHeightAttr }"
      class="zoom-aside"
    >
      <slot name="aside"></slot>
      <!-- <i v-if="toggleAside" @click="showAsideBtn" class="aside-icon">
        <span>
          <i>●</i>
          <i>●</i>
          <i>●</i>
        </span>
      </i> -->
      <div
        v-if="toggleAside"
        @click="showAsideBtn"
        @dragend="dragEnd($event)"
        draggable
        class="move-container-slider"
      >
        <div class="trigger-bar-con">
          <div class="trigger-bar"></div>
          <div class="trigger-bar"></div>
          <div class="trigger-bar"></div>
        </div>
      </div>
    </aside>
    <!-- 主程序 -->
    <main
      v-if="$slots.main"
      ref="main"
      :style="{
        left: asideWidthAttr,
        bottom: footerHeightAttr,
        top: headerHeightAttr,
      }"
      class="zoom-main"
    >
      <slot name="main"></slot>
    </main>
  </div>
</template>
<script>
export default {
  name: "zoom-layout",
  props: {
    toggleAside: {
      //  默认false, 是否显示 隐藏侧边栏按钮
      type: [Boolean, String],
      default: false,
    },
    stopTop: {
      //  默认false, 每次页面改变会返回顶部, 为true禁止
      type: Boolean,
      default: false,
    },
    headerHeight: {
      //  头部高
      type: [Number, String],
      default: 0,
    },
    footerHeight: {
      //  底部高
      type: [Number, String],
      default: 0,
    },
    asideWidth: {
      //  左侧宽
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      asideWidthAttr: 0,
      headerHeightAttr: 0,
      footerHeightAttr: 0,
      showAside: true,
    };
  },
  created() {
    this.load();
  },
  watch: {
    "$route.path": function (newVal) {
      if (this.$slots && !this.stopTop && newVal) {
        this.goTop();
      }
    },
    headerHeight(newVal) {
      this.headerHeightAttr = `${newVal}px`;
    },
    asideWidth(newVal) {
      this.asideWidthAttr = `${newVal}px`;
    },
    footerHeight(newVal) {
      this.footerHeightAttr = `${newVal}px`;
    },
  },
  methods: {
    // 拖拽事件
    dragEnd(event) {
      // 设置最小值和最大值
      const min = 15;
      const asideWidth =
        (this.$refs["aside"] && this.$refs["aside"].clientWidth) || 0;
      const mainWidth =
        (this.$refs["main"] && this.$refs["main"].clientWidth) ||
        document.documentElement.clientWidth - asideWidth;
      const max = (asideWidth + mainWidth) * 0.9;
      let current = 15;
      if (event.clientX < min) {
        current = min;
      } else if (event.clientX > max) {
        current = max;
      } else {
        current = event.clientX;
      }
      this.asideWidthAttr = `${current}px`;
    },
    showAsideBtn() {
      if (this.showAside) {
        this.asideWidthAttr = "15px";
      } else {
        this.asideWidthAttr = `${this.asideWidth}px`;
      }
      this.showAside = !this.showAside;
    },
    // 让main和aside返回顶部
    goTop() {
      document.documentElement.scrollTop = 0;
      ["aside", "main", "header", "footer"].forEach((item) => {
        if (this.$slots[item] && this.$refs[item]) {
          this.$refs[item].scrollTop = 0;
        }
      });
    },
    load() {
      this.headerHeightAttr = `${this.headerHeight}px`;
      this.asideWidthAttr = `${this.asideWidth}px`;
      this.footerHeightAttr = `${this.footerHeight}px`;
    },
  },
};
</script>
<style>
.zoom-aside::-webkit-scrollbar {
  width: 4px;
}
.zoom-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
}
.zoom-aside::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
.move-container-slider {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: #d9d9d9;
  z-index: 2001;
}
.move-container-slider:hover {
  cursor: col-resize;
}
.move-container-slider .trigger-bar-con {
  position: absolute;
  top: calc(50% - 7.5px);
  height: 30px;
  width: 4px;
  background: #fff;
}
.move-container-slider .trigger-bar-con .trigger-bar {
  width: 4px;
  height: 4px;
  background: #666;
  float: left;
  margin-top: 4px;
  border-radius: 50%;
}
.zoom-layout > .zoom-aside,
.zoom-layout > .zoom-footer,
.zoom-layout > .zoom-header,
.zoom-layout > .zoom-main {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
}
.zoom-layout > .zoom-aside > .aside-icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0);
  border-right: 1px solid rgba(0, 0, 0, 0);
  color: #999;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
}
.zoom-layout > .zoom-aside > .aside-icon > span,
.zoom-layout > .zoom-aside > .aside-icon > span > i {
  display: block;
}
.zoom-layout > .zoom-aside > .aside-icon:hover {
  color: #1890ff;
  /* transform: scale(1.2); */
  border-color: #ccc;
}
.zoom-layout > .zoom-aside {
  overflow: auto;
  transition: width 0.5s;
}
.zoom-layout > .zoom-main {
  overflow: auto;
  transition: left 0.5s;
}
.zoom-layout > .zoom-aside::-webkit-scrollbar,
.zoom-layout > .zoom-main::-webkit-scrollbar {
  width: 5px;
  /* background-color: inherit; */
  background-color: rgba(0, 0, 0, 0);
}
.zoom-layout > .zoom-aside::-webkit-scrollbar-thumb,
.zoom-layout > .zoom-main::-webkit-scrollbar-thumb {
  position: absolute;
  background: inherit;
}
.zoom-layout > .zoom-aside:hover::-webkit-scrollbar-thumb,
.zoom-layout > .zoom-main:hover::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
  box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
  background: rgba(85, 85, 85, 0.5);
}
.zoom-layout > .zoom-aside::-webkit-scrollbar-track,
.zoom-layout > .zoom-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background: inherit;
}
.zoom-layout > .zoom-footer {
  top: auto;
  width: auto;
}
</style>
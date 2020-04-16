<template>
  <transition name="zoom-tip-fade">
    <div
      v-show="visible"
      class="zoom-tip-container"
      :style="boxStyle"
      :class="boxClass"
      @mouseenter="showTip"
      @mouseleave="hiddenTip(true)"
    >
      <div v-show="placement" class="zoom-tip-arrows" :class="placement" :style="arrowBox"></div>
      <span v-if="title" class="zoom-tip-title">{{ title }}</span>
      <p v-if="content" class="zoom-tip-content" :style="contentHeight">{{ content }}</p>
      <component
        v-if="customComponent"
        v-bind="customProps"
        v-on="customListeners"
        :is="customComponent"
        @hidden-tip="hiddenTip"
        @update-tip="updateTip"
      ></component>
    </div>
  </transition>
</template>
<script>
import {
  debounce,
  checkScrollable,
  getScrollContainer,
  computeArrowPos,
  computePlacementInfo,
  computeCoordinateBaseMid,
  computeCoordinateBaseEdge
} from "./util.js";

// passive support check
let supportsPassive = false;
document.addEventListener("passive-check", () => {}, {
  get passive() {
    supportsPassive = {
      passive: true
    };
  }
});
export default {
  name: "zoom-tip",
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },

    // 显示的内容
    content: {
      type: String,
      default: ""
    },

    // 工具函数调用时附加到自定义组件 props 上面的
    customProps: {
      type: Object,
      default() {
        return {};
      }
    },

    // 对应 <component> 组件 is 属性
    customComponent: {
      type: [String, Function, Object],
      default: ""
    },

    // 用于监听自定义组件 emit 的事件
    customListeners: Object,

    // tip 绑定的目标元素
    target: null,

    // tip 的容器，默认插入 body 中
    container: null,

    // 用于限制 tip 展示的方向，优先级按顺序
    placements: {
      type: Array,
      default() {
        return ["top", "right", "bottom", "left"];
      }
    },

    // tip 窗口多久后自动消失，为 <=0 不消失
    duration: {
      type: Number,
      default: 300
    },

    // 是否为 tip 添加 transfrom 过渡
    transition: Boolean,

    // 是否为 同时显示多个 tip
    multiple: Boolean,

    // 提示用的小箭头大小
    arrowsSize: {
      type: Number,
      default: 8
    },

    // 组件的宽度
    width: {
      type: [String, Number],
      default: "auto"
    },

    // 内容的高度
    height: {
      type: [String, Number],
      default: "auto"
    },

    // tip 的 z-index
    zIndex: {
      type: Number,
      default: 999
    },

    // 主题 info, danger, warning, success, primary 默认为 general
    theme: {
      type: String,
      default: "general"
    },

    // 自定义 class 的类名
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    this.containerNode = null;
    this.targetParentNode = null;
    this.visibleTimer = null;
    return {
      // tip 的展示方向（小箭头的方向）
      placement: "",
      visible: false,
      arrowsPos: {}
    };
  },
  computed: {
    arrowBox() {
      return Object.assign(
        {
          borderWidth: `${this.arrowsSize}px`
        },
        this.arrowsPos
      );
    },

    boxStyle() {
      const width = this.width;
      return {
        width:
          typeof width === "string"
            ? width
            : `$ {
              width
          }
          px`,
        zIndex: this.zIndex
      };
    },

    boxClass() {
      const { customClass, theme, transition } = this;
      const tsClass = transition ? "transition-transfrom" : "";
      return [customClass, theme, tsClass];
    },

    contentHeight() {
      const height = this.height;
      return {
        height:
          typeof height === "string"
            ? height
            : `$ {
            height
          }
          px`
      };
    }
  },

  methods: {
    showTip() {
      clearTimeout(this.visibleTimer);
      this.visible = true;
    },

    // 隐藏 tip
    hiddenTip(immedia) {
      if (immedia) {
        this.visible = false;
      } else {
        this.setVisible(false);
      }
    },

    // 更新 tip 位置
    updateTip() {
      this.setContainerNode();
      this.showTip();
      this.asynSetCoordinate();
    },

    // 设置 tip 的容器
    setContainerNode() {
      const {
        $el,
        target,
        container,
        targetParentNode,
        containerNode: oldNode
      } = this;
      // 目标元素的父级节点相同则不需要重新计算容器
      if (!target || target.parentNode === targetParentNode) return;
      this.targetParentNode = target.parentNode;
      const newNode = container || getScrollContainer(target);
      if (newNode === oldNode) return;
      if ($el.parentNode !== newNode) {
        newNode.appendChild($el);
      }
      const position = window.getComputedStyle(newNode, null).position;
      if (!position || position === "static") {
        newNode.style.position = "relative";
      }
      if (oldNode) {
        oldNode.removeEventListener(
          "scroll",
          this.scrollHandler,
          supportsPassive
        );
      }
      if (checkScrollable(newNode)) {
        newNode.addEventListener("scroll", this.scrollHandler, supportsPassive);
      }
      this.containerNode = newNode;
    },

    setCoordinate() {
      const { $el, target, containerNode, placements, arrowsSize } = this;
      if (!$el || !target || !containerNode) return;
      const placementInfo = computePlacementInfo(
        target,
        containerNode,
        $el,
        placements,
        arrowsSize
      );
      const coordinate =
        placementInfo.mod === "mid"
          ? computeCoordinateBaseMid(placementInfo, arrowsSize)
          : computeCoordinateBaseEdge(placementInfo, arrowsSize);
      this.setArrowsPos(coordinate);
      this.placement = coordinate.placement;
      const x = coordinate.x + containerNode.scrollLeft;
      const y = coordinate.y + containerNode.scrollTop;
      this.$el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },

    asynSetCoordinate() {
      this.$nextTick(this.setCoordinate);
    },

    // 设置小三角形的位置
    setArrowsPos({ placement, arrowsOffset }) {
      this.arrowsPos = computeArrowPos(
        placement,
        arrowsOffset,
        this.arrowsSize
      );
    },

    // 设置 tip 经过 duration ms 后的状态
    setVisible(v) {
      clearTimeout(this.visibleTimer);
      this.visibleTimer = setTimeout(() => {
        this.visible = v;
        this.visibleTimer = null;
      }, this.duration);
    },

    // 参考元素父级容器发生滚动时的处理
    scrollHandler: debounce(function() {
      this.setCoordinate();
    }, 200),

    clearScrollEvent() {
      if (this.containerNode) {
        this.containerNode.removeEventListener(
          "scroll",
          this.scrollHandler,
          supportsPassive
        );
      }
    },

    removeParentNode() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },

    destroy() {
      this.clearScrollEvent();
      this.removeParentNode();
      this.$destroy();
    }
  }
};
</script>
<style>
.zoom-tip-container.zoom-custom-content {
  background: transparent;
  padding: 0;
  border: 0;
  top: -8px;
}
.zoom-tip-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  box-sizing: border-box;
  width: 200px;
  padding: 6px 8px;
  margin: 0;
  color: #000;
  font-size: 12px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.3s;
  will-change: opacity, transform;
}
.zoom-tip-container .zoom-tip-arrows,
.zoom-tip-container .zoom-tip-arrows::after {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: inherit;
}
.zoom-tip-container .zoom-tip-content,
.zoom-tip-container .zoom-tip-title {
  padding: 0;
  margin: 0;
}
.zoom-tip-container .zoom-tip-title {
  font-size: 14px;
  font-weight: 400;
}
.zoom-tip-container .zoom-tip-content {
  overflow-y: auto;
  line-height: 2;
  text-align: left;
  word-wrap: break-word;
  background-color: inherit;
  margin: 0 !important;
  color: inherit !important;
}
.zoom-tip-container .zoom-tip-arrows {
  z-index: -1;
  padding: 0;
  margin: 0;
  border-width: 10px;
}
.zoom-tip-container .zoom-tip-arrows::after {
  content: "";
  border-width: inherit;
  transform: translate(-50%, -50%);
}
.zoom-tip-container .zoom-tip-arrows[class*=" top-"],
.zoom-tip-container .zoom-tip-arrows[class^="top-"] {
  border-top-color: inherit;
  transform: translate(-50%, 0);
}
.zoom-tip-container .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container .zoom-tip-arrows[class^="top-"]::after {
  top: -2px;
  border-top-color: #fff;
}
.zoom-tip-container .zoom-tip-arrows[class*=" bottom-"],
.zoom-tip-container .zoom-tip-arrows[class^="bottom-"] {
  border-bottom-color: inherit;
  transform: translate(-50%, -100%);
}
.zoom-tip-container .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container .zoom-tip-arrows[class^="bottom-"]::after {
  top: 2px;
  border-bottom-color: #fff;
}
.zoom-tip-container .zoom-tip-arrows[class*=" left-"],
.zoom-tip-container .zoom-tip-arrows[class^="left-"] {
  border-left-color: inherit;
  transform: translate(0, -50%);
}
.zoom-tip-container .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container .zoom-tip-arrows[class^="left-"]::after {
  left: -2px;
  border-left-color: #fff;
}
.zoom-tip-container .zoom-tip-arrows[class*=" right-"],
.zoom-tip-container .zoom-tip-arrows[class^="right-"] {
  border-right-color: inherit;
  transform: translate(-100%, -50%);
}
.zoom-tip-container .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container .zoom-tip-arrows[class^="right-"]::after {
  left: 2px;
  border-right-color: #fff;
}
.zoom-tip-container.info {
  color: #fff;
  background: #1f2d3d;
  border-color: #1f2d3d;
}
.zoom-tip-container.info .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container.info .zoom-tip-arrows[class^="top-"]::after,
.zoom-tip-container.info[class*=" top-"]::after,
.zoom-tip-container.info[class^="top-"]::after {
  border-top-color: #1f2d3d;
}
.zoom-tip-container.info .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container.info .zoom-tip-arrows[class^="bottom-"]::after,
.zoom-tip-container.info[class*=" bottom-"]::after,
.zoom-tip-container.info[class^="bottom-"]::after {
  border-bottom-color: #1f2d3d;
}
.zoom-tip-container.info .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container.info .zoom-tip-arrows[class^="left-"]::after,
.zoom-tip-container.info[class*=" left-"]::after,
.zoom-tip-container.info[class^="left-"]::after {
  border-left-color: #1f2d3d;
}
.zoom-tip-container.info .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container.info .zoom-tip-arrows[class^="right-"]::after,
.zoom-tip-container.info[class*=" right-"]::after,
.zoom-tip-container.info[class^="right-"]::after {
  border-right-color: #1f2d3d;
}
.zoom-tip-container.warning {
  color: #fff;
  background: #faad14;
  border-color: #faad14;
}
.zoom-tip-container.warning .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container.warning .zoom-tip-arrows[class^="top-"]::after,
.zoom-tip-container.warning[class*=" top-"]::after,
.zoom-tip-container.warning[class^="top-"]::after {
  border-top-color: #faad14;
}
.zoom-tip-container.warning .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container.warning .zoom-tip-arrows[class^="bottom-"]::after,
.zoom-tip-container.warning[class*=" bottom-"]::after,
.zoom-tip-container.warning[class^="bottom-"]::after {
  border-bottom-color: #faad14;
}
.zoom-tip-container.warning .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container.warning .zoom-tip-arrows[class^="left-"]::after,
.zoom-tip-container.warning[class*=" left-"]::after,
.zoom-tip-container.warning[class^="left-"]::after {
  border-left-color: #faad14;
}
.zoom-tip-container.warning .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container.warning .zoom-tip-arrows[class^="right-"]::after,
.zoom-tip-container.warning[class*=" right-"]::after,
.zoom-tip-container.warning[class^="right-"]::after {
  border-right-color: #faad14;
}
.zoom-tip-container.danger {
  color: #fff;
  background: #ff4d4f;
  border-color: #ff4d4f;
}
.zoom-tip-container.danger .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container.danger .zoom-tip-arrows[class^="top-"]::after,
.zoom-tip-container.danger[class*=" top-"]::after,
.zoom-tip-container.danger[class^="top-"]::after {
  border-top-color: #ff4d4f;
}
.zoom-tip-container.danger .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container.danger .zoom-tip-arrows[class^="bottom-"]::after,
.zoom-tip-container.danger[class*=" bottom-"]::after,
.zoom-tip-container.danger[class^="bottom-"]::after {
  border-bottom-color: #ff4d4f;
}
.zoom-tip-container.danger .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container.danger .zoom-tip-arrows[class^="left-"]::after,
.zoom-tip-container.danger[class*=" left-"]::after,
.zoom-tip-container.danger[class^="left-"]::after {
  border-left-color: #ff4d4f;
}
.zoom-tip-container.danger .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container.danger .zoom-tip-arrows[class^="right-"]::after,
.zoom-tip-container.danger[class*=" right-"]::after,
.zoom-tip-container.danger[class^="right-"]::after {
  border-right-color: #ff4d4f;
}
.zoom-tip-container.primary {
  color: #fff;
  background: #1890ff;
  border-color: #1890ff;
}
.zoom-tip-container.primary .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container.primary .zoom-tip-arrows[class^="top-"]::after,
.zoom-tip-container.primary[class*=" top-"]::after,
.zoom-tip-container.primary[class^="top-"]::after {
  border-top-color: #1890ff;
}
.zoom-tip-container.primary .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container.primary .zoom-tip-arrows[class^="bottom-"]::after,
.zoom-tip-container.primary[class*=" bottom-"]::after,
.zoom-tip-container.primary[class^="bottom-"]::after {
  border-bottom-color: #1890ff;
}
.zoom-tip-container.primary .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container.primary .zoom-tip-arrows[class^="left-"]::after,
.zoom-tip-container.primary[class*=" left-"]::after,
.zoom-tip-container.primary[class^="left-"]::after {
  border-left-color: #1890ff;
}
.zoom-tip-container.primary .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container.primary .zoom-tip-arrows[class^="right-"]::after,
.zoom-tip-container.primary[class*=" right-"]::after,
.zoom-tip-container.primary[class^="right-"]::after {
  border-right-color: #1890ff;
}
.zoom-tip-container.success {
  color: #fff;
  background: #52c41a;
  border-color: #52c41a;
}
.zoom-tip-container.success .zoom-tip-arrows[class*=" top-"]::after,
.zoom-tip-container.success .zoom-tip-arrows[class^="top-"]::after,
.zoom-tip-container.success[class*=" top-"]::after,
.zoom-tip-container.success[class^="top-"]::after {
  border-top-color: #52c41a;
}
.zoom-tip-container.success .zoom-tip-arrows[class*=" bottom-"]::after,
.zoom-tip-container.success .zoom-tip-arrows[class^="bottom-"]::after,
.zoom-tip-container.success[class*=" bottom-"]::after,
.zoom-tip-container.success[class^="bottom-"]::after {
  border-bottom-color: #52c41a;
}
.zoom-tip-container.success .zoom-tip-arrows[class*=" left-"]::after,
.zoom-tip-container.success .zoom-tip-arrows[class^="left-"]::after,
.zoom-tip-container.success[class*=" left-"]::after,
.zoom-tip-container.success[class^="left-"]::after {
  border-left-color: #52c41a;
}
.zoom-tip-container.success .zoom-tip-arrows[class*=" right-"]::after,
.zoom-tip-container.success .zoom-tip-arrows[class^="right-"]::after,
.zoom-tip-container.success[class*=" right-"]::after,
.zoom-tip-container.success[class^="right-"]::after {
  border-right-color: #52c41a;
}
.zoom-tip-container.transition-transfrom {
  transition: opacity 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.zoom-tip-container.zoom-tip-fade-enter,
.zoom-tip-container.zoom-tip-fade-leave-active {
  opacity: 0;
}
</style>
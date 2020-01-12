<template>
  <div class="pic-img">
    <div
      class="img-container"
      @mousemove="!moveEvent && mouseMove($event)"
      @mouseleave="!leaveEvent && mouseLeave($event)"
    >
      <img
        ref="img"
        @load="!op.lazyload && imgLoaded($event)"
        :src="!op.lazyload ? url : (imgLoadedFlag && url)"
        style="width:100%"
      />
      <div
        v-if="!op.hideZoom && imgLoadedFlag &&!hideSelector"
        :class="['img-selector', {'circle': type === 'circle'}]"
        :style="[imgSelectorStyle, imgSelectorSize, imgSelectorPosition, !outShow && imgBg, !outShow && imgBgSize, !outShow && imgBgPosition]"
      >
        <slot></slot>
      </div>
      <div
        v-if="outShow"
        v-show="!hideOutShow"
        :class="['img-out-show', {'base-line': op.baseline}]"
        :style="[imgOutShowSize, imgOutShowPosition, imgBg, imgBgSize, imgBgPosition]"
      >
        <div v-if="op.pointer" class="img-selector-point"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-photo",
  props: {
    op: {
      baseline: { // 外部区域的基线 (The baseline of the external area)
        type: Boolean,
        default: false
      },
      pointer: {  // 外部区域的中心点 (The center of an external area)
        type: Boolean,
        default: false
      },
      outShow: {  // 	图片展示区域会在图片外部(image will be displayed on the outside)
        type: Boolean,
        default: false
      },
      lazyload: {
        type: Boolean,
        default: false
      },
      scale: {    // 放大倍数(scale)
        type: Number,
        default: 3
      },
      selectorStyle: {    // 放大镜样式(style of magnifying glass)
        type: Object,
        default () {
          return {};
        }
      },
      hideZoom: { // 隐藏放大镜，图像加载时不会显示放大镜(hide magnifying)
        type: Boolean,
        default: false
      },
      width: {    // 放大镜宽度(width of magnifying glass)
        type: Number,
        default: 168
      },
      leaveEvent: {   // 当需要在外部监听离开事件时，请通过该字段传入事件(When you need to listen for leaving events outside the component)
        type: [Object, MouseEvent],
        default: null
      },
      moveEvent: {    // 当需要在外部监听移动事件时,请通过该字段传入事件（必须包含 pageX,pageY,clientY）(When you need to listen for moving events outside the component)
        type: [Object, MouseEvent],
        default: null
      },
      // type: { // 放大镜类型(circle,square)(magnifying glass type (circle,square))
      //   type: String,
      //   default: "square",
      //   validator: function (value) {
      //     return ["circle", "square"].indexOf(value) !== -1;
      //   }
      // },
      outShowStyle: {},   // 更清晰的图片,若不提供会采用 url(more detailed photo url)
      highUrl: String,
      url: String,    // 图片地址(photo url)
    }
  },
  data () {
    return {
      selector: {
        width: this.width,
        top: 0,
        left: 0,
        bgTop: 0,
        bgLeft: 0,
        rightBound: 0,
        bottomBound: 0,
        absoluteLeft: 0,
        absoluteTop: 0
      },
      url: '',
      highUrl: '',
      outShow: false,
      scale: 3,
      imgInfo: {},
      $img: null,
      type: 'square',
      width: 168,
      leaveEvent: null,
      moveEvent: null,
      screenWidth: document.body.clientWidth,
      outShowInitTop: 0,
      outShowTop: 0,
      outShowStyle: {},
      hideOutShow: true,
      imgLoadedFlag: false,
      highImgLoadedFlag: false,
      hideSelector: true,
      timer: null
    };
  },
  watch: {
    moveEvent (e) {
      this.mouseMove(e);
    },
    leaveEvent (e) {
      this.mouseLeave(e);
    },
    url () {
      this.handlerUrlChange();
    },
    width (n) {
      this.initSelectorProperty(n);
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = setTimeout(() => {
          this.imgLoaded();
          clearTimeout(this.timer);
          this.timer = null;
        }, 400);
      }
    }
  },
  computed: {
    addWidth () {
      return !this.outShow ? (this.width / 2) * (1 - this.scale) : 0;
    },
    imgSelectorPosition () {
      let { top, left } = this.selector;
      return {
        top: `${top}px`,
        left: `${left}px`
      };
    },
    imgSelectorSize () {
      let width = this.selector.width;
      return {
        width: `${width}px`,
        height: `${width}px`
      };
    },
    imgSelectorStyle () {
      return this.op.selectorStyle;
    },
    imgOutShowSize () {
      let {
        scale,
        selector: { width }
      } = this;
      return {
        width: `${width * scale}px`,
        height: `${width * scale}px`
      };
    },
    imgOutShowPosition () {
      return {
        top: `${this.outShowTop}px`,
        right: `${-8}px`
      };
    },
    imgBg () {
      return {
        backgroundImage: `url(${this.highUrl || this.url})`
      };
    },
    imgBgSize () {
      let {
        scale,
        imgInfo: { height, width }
      } = this;
      return {
        backgroundSize: `${width * scale}px ${height * scale}px`
      };
    },
    imgBgPosition () {
      let { bgLeft, bgTop } = this.selector;
      return {
        backgroundPosition: `${bgLeft}px ${bgTop}px`
      };
    }
  },
  created () {
    if (this.op) {
      this.type = this.op.type;
      this.width = this.op.width || 168;
      this.scale = this.op.scale || 2;
      this.url = this.op.url;
      this.highUrl = this.op.highUrl;
      this.leaveEvent = this.op.leaveEvent;
      this.moveEvent = this.op.moveEvent;
      this.outShowStyle = this.op.outShowStyle;
      this.url && this.op.lazyload && this.handlerUrlChange();
      this.outShow = this.op.outShow;
    }
  },
  mounted () {
    if (this.$refs['img']) {
      this.$img = this.$refs['img'];
      this.$nextTick(() => {
        // 如果用户没设置放大镜宽度, 放大镜宽度默认为照片的三分之一大小
        if(!this.op.width) {
          this.width = Math.floor(this.$refs['img'].width / 3);
        }
      });
    }
  },
  methods: {
    handlerUrlChange () {
      this.imgLoadedFlag = false;
      this.op.lazyload &&
        this.loadImg(this.url).then(this.imgLoaded, err => console.error(err));
    },
    loadImg (url) {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
        img.src = url;
      });
    },
    imgLoaded () {
      let imgInfo = this.$img.getBoundingClientRect();
      if (JSON.stringify(this.imgInfo) != JSON.stringify(imgInfo)) {
        this.imgInfo = imgInfo;
        this.initSelectorProperty(this.width);
        this.resetOutShowInitPosition();
      }
      if (!this.imgLoadedFlag) {
        this.imgLoadedFlag = true;
        this.$emit("created", imgInfo);
      }
    },
    mouseMove (e) {
      if (!this.op.hideZoom && this.imgLoadedFlag) {
        this.imgLoaded();
        const { pageX, pageY, clientY } = e;
        const { scale, selector, outShow, addWidth, outShowAutoScroll } = this;
        let { outShowInitTop } = this;
        const scrollTop = pageY - clientY;
        const { absoluteLeft, absoluteTop, rightBound, bottomBound } = selector;
        const x = pageX - absoluteLeft; // 选择器的x坐标 相对于图片
        const y = pageY - absoluteTop; // 选择器的y坐标
        if (outShow) {
          if (!outShowInitTop) {
            outShowInitTop = this.outShowInitTop = scrollTop + this.imgInfo.top;
          }
          this.hideOutShow && (this.hideOutShow = false);
          this.outShowTop =
            scrollTop > outShowInitTop ? scrollTop - outShowInitTop : 0;
        }
        this.hideSelector && (this.hideSelector = false);
        selector.top = y > 0 ? (y < bottomBound ? y : bottomBound) : 0;
        selector.left = x > 0 ? (x < rightBound ? x : rightBound) : 0;
        selector.bgLeft = addWidth - x * scale; // 选择器图片的坐标位置
        selector.bgTop = addWidth - y * scale;
      }
    },
    initSelectorProperty (selectorWidth) {
      const selectorHalfWidth = selectorWidth / 2;
      const selector = this.selector;
      const { width, height, left, top } = this.imgInfo;
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
      selector.width = selectorWidth;
      selector.rightBound = width - selectorWidth;
      selector.bottomBound = height - selectorWidth;
      selector.absoluteLeft = left + selectorHalfWidth + scrollLeft;
      selector.absoluteTop = top + selectorHalfWidth + scrollTop;
    },
    mouseLeave () {
      this.hideSelector = true;
      if (this.outShow) {
        this.hideOutShow = true;
      }
    },
    // 重置放大镜位置(reset zoom position)
    reset () {
      Object.assign(this.selector, {
        top: 0,
        left: 0,
        bgLeft: 0,
        bgTop: 0
      });
      this.resetOutShowInitPosition();
    },
    resetOutShowInitPosition () {
      this.outShowInitTop = 0;
    }
  }
};
</script>

<style scoped>
.img-container {
  position: relative;
}
.img-selector {
  position: absolute;
  cursor: crosshair;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
}
.img-selector.circle {
  border-radius: 50%;
}
.img-out-show {
  position: absolute;
  background-repeat: no-repeat;
  transform: translate(100%, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.img-selector-point {
  position: absolute;
  width: 4px;
  height: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
}
.img-out-show.base-line::after {
  position: absolute;
  box-sizing: border-box;
  content: '';
  width: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.36);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.img-out-show.base-line::before {
  position: absolute;
  box-sizing: border-box;
  content: '';
  height: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.36);
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

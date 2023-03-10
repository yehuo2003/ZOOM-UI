<template>
  <div
    :class="[ hide ? 'captcha-hide' : '', disabled ? 'disabled-captcha-model' : '' ]"
    class="captcha-model"
  >
    <div class="captcha-header">
      <span>{{title}}</span>
    </div>
    <!-- 验证码 -->
    <div class="captcha-content">
      <div class="sliding-pictures">
        <div ref="captcha">
          <!-- 刷新验证码 -->
          <i v-if="!disabled" class="zoom-icon icon-refresh" @click="reset" v-tip="$zoom.$t('captcha.refresh')"></i>
        </div>
      </div>
    </div>
    <!-- 遮罩层 禁用 -->
    <div v-if="disabled" class="captcha-wrap"></div>
    <!-- 滑块 -->
    <div ref="slider-container" class="sliderContainer">
      <div ref="slider-mask" class="sliderMask">
        <div ref="slider" class="slider">
          <span class="sliderIcon"></span>
        </div>
      </div>
      <!-- 向右滑动填充拼图 -->
      <span class="sliderText">{{$zoom.$t('captcha.back_fill')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-captcha",
  props: {
    op: {
      type: Object,
      show: Boolean, //  为true时, 总是显示
      disabled: Boolean, //  是否禁用 默认false, 验证成功后自动为true
      RandomSrc: Function, //  父组件生成随机图片的方法
      onSuccess: Function, //  监听验证成功的回调
      onFailed: Function //  监听验证失败后的回调
    }
  },
  data() {
    return {
      title: this.$zoom.$t('captcha.testing'),  //  请完成安全验证
      hide: true,
      disabled: false,
      setDisable: false,
      cv: {
        w: 310,
        h: 155
      },
      block: {
        l: 42, // 滑块边长
        L: 42 + 9 * 2 + 3, // 滑块实际边长
        r: 9 // 滑块半径
      },
      randomPos: {
        x: 0,
        y: 0
      },
      canvasCtx: null,
      blockCtx: null,
      blockDom: null,
      sliderDom: null,
      sliderContainerDom: null,
      sliderMaskDom: null,
      el: null,
      img: null,
      trail: null,
      errorCount: 0 // 失败次数
    };
  },
  mounted() {
    this.title = this.$zoom.$t('captcha.testing');  // 请完成安全验证
    this.disabled = true;
    this.init();
    if (this.op && this.op.show) {
      this.hide = false;
    } else {
      this.hide = true;
    }
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.op && this.op.disabled) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    this.bindEvents(true);
  },
  methods: {
    init() {
      this.canvasInit();
      this.initImg();
      this.bindEvents();
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.setDisable = status;
      this.disabled = status;
    },
    onSuccess() {
      // 接收成功信息返回给父组件
      this.op && this.op.onSuccess();
      this.disabled = true;
      this.$zoom.alert({
        type: "success",
        content: this.$zoom.$t('public.vaild_success') + "!" // 验证成功
      });
      this.title = '验证成功'
    },
    onFail() {
      // 接收失败信息返回给父组件
      this.op && this.op.onFailed();
      this.$zoom.alert({
        type: "warning",
        content: this.$zoom.$t('captcha.testing_error') // 验证失败, 请重试！
      });
    },
    bindEvents(removeListener) {
      this.el.onselectstart = () => false;
      let originX,
        originY,
        trail = [],
        isMouseDown = false;

      const addClass = function(tag, className) {
        tag.classList.add(className);
      };

      const removeClass = function(tag, className) {
        tag.classList.remove(className);
      };

      const handleDragStart = function(e) {
        originX = e.clientX || e.touches[0].clientX;
        originY = e.clientY || e.touches[0].clientY;
        isMouseDown = true;
      };

      const handleDragMove = e => {
        if (!isMouseDown) return false;
        const eventX = e.clientX || e.touches[0].clientX;
        const eventY = e.clientY || e.touches[0].clientY;
        const moveX = eventX - originX;
        const moveY = eventY - originY;
        if (moveX < 0 || moveX + 38 >= this.cv.w) return false;
        this.sliderDom.style.left = moveX + "px";
        const blockLeft = ((this.cv.w - 40 - 20) / (this.cv.w - 40)) * moveX;
        this.blockDom.style.left = blockLeft + "px";

        addClass(this.sliderContainerDom, "sliderContainer_active");
        this.sliderMaskDom.style.width = moveX + "px";
        trail.push(moveY);
      };

      const handleDragEnd = e => {
        if (!isMouseDown) return false;
        isMouseDown = false;
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX == originX) return false;
        removeClass(this.sliderContainerDom, "sliderContainer_active");
        this.trail = trail;
        const { spliced, verified } = this.verify();
        if (spliced) {
          if (verified) {
            addClass(this.sliderContainerDom, "sliderContainer_success");
            this.onSuccess();
          } else {
            addClass(this.sliderContainerDom, "sliderContainer_fail");
            this.onFail();
            setTimeout(() => {
              this.reset();
            }, 500);
          }
        } else {
          addClass(this.sliderContainerDom, "sliderContainer_fail");
          this.onFail();
          setTimeout(() => {
            this.reset();
          }, 1000);
        }
      };
      let eventList = 'addEventListener';
      if (removeListener) {
        eventList = 'removeEventListener';
      }
      ['mousedown', 'touchstart', 'mousedown', 'touchstart'].forEach(i => this.sliderDom[eventList](i, handleDragStart));
      ['mousemove', 'touchmove'].forEach(i => document[eventList](i, handleDragMove));
      ['mouseup', 'touchend'].forEach(i => document[eventList](i, handleDragEnd));
    },
    verify() {
      const sum = function(x, y) {
        return x + y;
      };
      const square = function(x) {
        return x * x;
      };

      const arr = this.trail; // 拖动时y轴的移动距离
      const average = arr.reduce(sum) / arr.length;
      const deviations = arr.map(x => x - average);
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
      const left = parseInt(this.blockDom.style.left);
      return {
        spliced: Math.abs(left - this.randomPos.x) < 10,
        verified: stddev !== 0 // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
      };
    },
    reset() {
      this.sliderContainerDom.className = "sliderContainer";
      this.sliderDom.style.left = 0;
      this.blockDom.style.left = 0;
      this.sliderMaskDom.style.width = 0;
      this.clean();
      this.img.setSrc(this.getRandomImgSrc());
    },
    clean() {
      this.canvasCtx.clearRect(0, 0, this.cv.w, this.cv.h);
      this.blockCtx.clearRect(0, 0, this.cv.w, this.cv.h);
      this.blockDom.width = this.cv.w;
    },
    draw() {
      // 随机创建滑块的位置
      this.randomPos.x = this.getRandomNumberByRange(
        this.block.L + 10,
        this.cv.w - (this.block.L + 10)
      );
      this.randomPos.y = this.getRandomNumberByRange(
        10 + this.block.r * 2,
        this.cv.h - (this.block.L + 10)
      );
      this.drawBlock(
        this.canvasCtx,
        this.randomPos.x,
        this.randomPos.y,
        "fill"
      );
      this.drawBlock(this.blockCtx, this.randomPos.x, this.randomPos.y, "clip");
    },
    drawBlock(ctx, x, y, operation) {
      let r = this.block.r,
        l = this.block.l,
        PI = Math.PI;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.stroke();
      ctx[operation]();
      ctx.globalCompositeOperation = "destination-over";
    },
    initImg() {
      const img = this.createImg(() => {
        this.draw();
        this.canvasCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h);
        this.blockCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h);
        const y = this.randomPos.y - this.block.r * 2 - 1;
        const ImageData = this.blockCtx.getImageData(
          this.randomPos.x - 3,
          y,
          this.block.L,
          this.block.L
        );
        this.blockDom.width = this.block.L;
        this.blockCtx.putImageData(ImageData, 0, y);
      });
      this.img = img;
    },
    canvasInit() {
      const canvas = this.createCanvas(this.cv.w, this.cv.h); // 画布
      const block = canvas.cloneNode(true); // 滑块

      block.className = "zoom-block";
      const el = (this.el = this.$refs["captcha"]);
      el.style.position = "relative";
      el.style.width = this.cv.w + "px";
      Object.assign(el.style, {
        position: "relative",
        width: this.cv.w + "px",
        margin: "0 auto"
      });

      this.el = el;
      el.appendChild(canvas);
      el.appendChild(block);

      this.canvasCtx = canvas.getContext("2d");
      this.blockCtx = block.getContext("2d");
      this.blockDom = block;
      this.sliderDom = this.$refs["slider"];
      this.sliderContainerDom = this.$refs["slider-container"];
      this.sliderMaskDom = this.$refs["slider-mask"];
    },
    createCanvas(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    },
    createImg(onload) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = onload;
      img.onerror = () => {
        this.errorCount += 1
        this.setDisabled(true);
        console.error('image loading error');
        // 如果连续五次加载失败,就终止运行
        if (this.errorCount === 5) {
          this.bindEvents(true);
          return
        }
        setTimeout(() => {
          img.setSrc(this.getRandomImgSrc());
          this.setDisabled(false);
        }, 1000);
      };

      img.setSrc = src => {
        if (window.navigator.userAgent.indexOf("Trident") > -1) {
          // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
          const xhr = new XMLHttpRequest();
          xhr.onloadend = e => {
            const file = new FileReader(); // FileReader仅支持IE10+
            file.readAsDataURL(e.target.response);
            file.onloadend = function(e) {
              img.src = e.target.result;
            };
          };
          xhr.open("GET", src);
          xhr.responseType = "blob";
          xhr.send();
        } else img.src = src;
      };
      img.setSrc(this.getRandomImgSrc());
      return img;
    },

    getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    },
    getRandomImgSrc() {
      let src = "";
      if (this.op && this.op.RandomSrc) {
        src = this.op.RandomSrc();
      } else {
        src =
          "https://picsum.photos/300/150/?image=11111111111" +
          this.getRandomNumberByRange(0, 1084);
      }
      return src;
    }
  }
};
</script>
<style>
.captcha-model .captcha-wrap {
  position: absolute;
  width: 100%;
  height: 102%;
  z-index: 999;
  cursor: no-drop;
  background: #d9d9d9;
  opacity: 0.5;
  top: 0;
}
.captcha-hide:not(.disabled-captcha-model):hover .captcha-header,
.captcha-hide:not(.disabled-captcha-model):hover .captcha-content {
  display: block;
}
.captcha-hide .captcha-header,
.captcha-hide .captcha-content {
  position: absolute;
  display: none;
}
.zoom-block {
  position: absolute;
  cursor: pointer;
  cursor: grab;
  left: 0;
  top: 0;
}

.zoom-block:active {
  cursor: pointer;
  cursor: grabbing;
}

.sliderContainer {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
  margin: 0 auto;
}

.sliderContainer_active .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.sliderContainer_active .sliderMask {
  height: 38px;
  border-width: 1px;
}

.sliderContainer.sliderContainer_success .slider {
  height: 38px;
  top: -1px;
  margin-left: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.sliderContainer.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.sliderContainer.sliderContainer_success .sliderIcon {
  background-position: 0 0 !important;
}

.sliderContainer.sliderContainer_fail .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.sliderContainer.sliderContainer_fail .sliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.sliderContainer.sliderContainer_fail .sliderIcon {
  top: 14px;
  background-position: 0 -82px !important;
}
.sliderContainer_active .sliderText,
.sliderContainer_success .sliderText,
.sliderContainer_fail .sliderText {
  display: none;
}

.sliderContainer .sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.sliderContainer .slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
  cursor: pointer;
  cursor: grab;
}

.sliderContainer .slider:active {
  cursor: grabbing;
}

.sliderContainer .slider:hover {
  background: #1991fa;
}

.sliderContainer .slider:hover .sliderIcon {
  background-position: 0 -13px;
}

.sliderContainer .sliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url(data:image/png;base64,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)
    0 -26px;
  background-size: 34px 471px;
}
.captcha-model .captcha-header {
  font-size: 12px;
  padding: 0 5px;
  border: 1px solid #e6e6e6;
  position: absolute;
  bottom: 199px;
  background: #fff;
  width: 100%;
  line-height: 20px;
  bottom: 199px;
}
.captcha-model .captcha-content {
  padding-top: 0.1rem;
  bottom: 40px;
}
.captcha-model .captcha-content .sliding-pictures {
  position: relative;
}
.captcha-model .captcha-content .sliding-pictures i {
  position: absolute;
  right: 7%;
  z-index: 9;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  top: 5%;
  text-shadow: 0 0 5px #cccccc, 0 0 10px #cccccc, 0 0 15px #cccccc,
    0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816,
    0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816;
}
.captcha-model {
  width: 310px;
  display: inline-block;
  position: relative;
}
.mask-layer-model {
  width: 310px;
  display: inline-block;
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
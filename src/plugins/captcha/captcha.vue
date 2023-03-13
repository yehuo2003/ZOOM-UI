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
    <!-- <div ref="slider-container" class="sliderContainer"> -->
    <div ref="slider-container" class="sliderContainer">
      <div ref="slider-mask" class="sliderMask">
        <div ref="slider" class="slider">
          <span :class="iconStatus" class="zoom-icon zoom-slider-icon"></span>
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
      time: 0,
      iconStatus: 'icon-right',
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
      let time2 = new Date().getTime();
      const spendTime = ((time2 - this.time) / 1000).toFixed(1)
      this.title = `验证成功，用了${spendTime}秒！`
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

      const addClass = (tag, className) => tag.classList.add(className);
      const removeClass = (tag, className) => tag.classList.remove(className);
      const handleDragStart = (e) => {
        this.time = new Date().getTime();
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
        this.iconStatus = 'icon-right';
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
        if (spliced && verified) {
          addClass(this.sliderContainerDom, "sliderContainer_success");
          this.iconStatus = 'icon-success';
          this.onSuccess();
        } else {
          addClass(this.sliderContainerDom, "sliderContainer_fail");
          this.iconStatus = 'icon-close-plus';
          this.onFail();
          setTimeout(() => {
            this.reset();
          }, 500);
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
      this.iconStatus = 'icon-right';
      this.sliderContainerDom.className = "sliderContainer";
      this.sliderDom.style.left = 0;
      this.blockDom.style.left = 0;
      this.sliderMaskDom.style.width = 0;
      this.$zoom.$t('captcha.testing')
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
          "https://picsum.photos/300/150/?image=" +
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
  color: #fff;
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
  background-color: #52ccba;
}

.sliderContainer.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.sliderContainer.sliderContainer_success .zoom-slider-icon {
  color: #fff;
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

.sliderContainer.sliderContainer_fail .zoom-slider-icon {
  color: #fff;
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
  color: #fff;
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

.sliderContainer .slider:hover .zoom-slider-icon {
  color: #fff;
}

.sliderContainer .zoom-slider-icon {
  position: absolute;
  color: #191919;
  left: 13px;
  width: 14px;
  height: 12px;
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
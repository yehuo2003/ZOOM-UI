<template>
  <div class="zoom-notice">
    <div v-if="vertical" class="vertical-notice">
      <div class="rolling-header">
        <div class="rolling-header-body">
          {{title}}
        </div>
      </div>
      <div class="rolling-container">
        <div :style=" 'animation: scrollChild ' + rollTime + 'ms linear infinite;' " :class="isSuspend ? 'suspend-marquee' : '' " class="rolling-container-body">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-else class="crosswise-notice">
      <div class="notice-header">
        <i class="zoom-icon" :class="icon ? icon : 'icon-trumpet' "></i>
      </div>
      <div :style=" 'animation: marquee ' + rollTime + 'ms linear infinite;' " :class="isSuspend ? 'suspend-marquee' : '' " class="notice-marquee">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-notice",
  props: {
    op: {
      type: Object,
      IconStyle: String,  //  横向滚动时候的图标
      title: String,      //  设置标题
      notSuspend: [String, Boolean],  //  滚动时候鼠标经过暂停, 设置true关闭
      vertical: Boolean,  //  是否垂直滚动, 默认false
      time: [Number, String]  //  滚动的时间
    },
    title: String,
    time: [Number, String]
  },
  data() {
    return {
      vertical: false,  //  是否垂直
      rollTime: 10000,  //  滚动时间
      icon: null,
      isSuspend: true //  鼠标经过时暂停
    }
  },
  created() {
    if (this.op) {
      // 是否垂直
      if (this.op.vertical) {
        this.vertical = true;
      } else {
        this.vertical = false;
      }
      // 滚动时间
      if (this.op.time) {
        this.rollTime = this.op.time;
      }
      if (this.op.notSuspend) {
        this.isSuspend = false;
      } else {
        this.isSuspend = true;
      }
      if (this.op.title) {
        this.title = this.op.title;
      }
      if (this.op.IconStyle) {
        this.icon = this.op.IconStyle
      }
    } else {
      this.rollTime = this.time;
    }
  }
};
</script>
<style>
/* 横向滚动 */
.crosswise-notice {
  margin: 0 auto;
  position: relative;
}
.crosswise-notice .notice-header {
  position: absolute;
}
.crosswise-notice .notice-marquee {
  line-height: 22px;
  margin: 0 20px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.vertical-notice .rolling-container .suspend-marquee:hover,
.crosswise-notice .suspend-marquee:hover {
  animation-play-state: paused !important;
}
@keyframes marquee {
  0% {
    text-indent: 27.5em;
  }
  100% {
    text-indent: -105em;
  }
}
/* 垂直滚动 */
.vertical-notice .rolling-header {
  font-size: .75rem;
  overflow: hidden;
}
.vertical-notice .rolling-header .rolling-header-body {
  padding: .5rem .25rem;
  font-size: inherit;
  min-width: 1px;
  color: #333;
}
.vertical-notice .rolling-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.vertical-notice .rolling-container .rolling-container-body {
  position: relative;
}
@keyframes scrollChild {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}
</style>
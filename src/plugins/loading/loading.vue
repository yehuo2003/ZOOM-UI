<template>
  <div
    id="zoom-loading"
    :class="full ? 'loading-full' : ''"
    class="zoom-loading"
    :style="'color:' + color + ';border: 1px solid ' + color + ';' "
  >
  <div v-if="full" class="show-warpper"></div>
    <div class="load-text">loading</div>
    <div
      v-for="item of ['one', 'two', 'three', 'four', 'five']"
      :key="item"
      :style="'background:' + color + ';' "
      :class=" 'loading-' + item"
      class="loading-item"
    ></div>
  </div>
</template>
<script>
export default {
  name: "zoom-loading",
  data() {
    return {
      color: '#1890ff',
      full: false,
    }
  }
};
</script>
<style>
.zoom-loading.loading-full {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.show-warpper {
  z-index: -1;
  width: 9999px;
  height: 9999px;
  position: fixed;
  background: rgba(0, 0, 0, .1);
  transform: translate(-50%, -50%);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
.zoom-loading {
  z-index: 9999;
  cursor: progress;
  margin: 0 auto;
  width: 180px;
  padding-left: 20px;
  height: 55px;
  font-size: 25px;
  font-weight: bold;
  border-radius: 5px;
  animation: blink 2s infinite ease-in-out;
}
.zoom-loading .load-text {
  float: left;
  line-height: 50px;
  padding-right: 5px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.zoom-loading .loading-item {
  width: 5px;
  height: 35px;
  float: left;
  margin: 1px;
  margin-top: 10px;
  animation: loading 1s infinite ease-in-out; /*animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放*/
}
.zoom-loading .loading-item.loading-two {
  animation-delay: -0.9s; /*定义开始执行的地方，负号表示直接从第900ms开始执行*/
}
.zoom-loading .loading-item.loading-three {
  animation-delay: -0.8s;
}
.zoom-loading .loading-item.loading-four {
  animation-delay: -0.7s;
}
.zoom-loading .loading-item.loading-five {
  animation-delay: -0.6s;
}
@keyframes loading {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.5);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@-webkit-keyframes loading {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.5);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@-moz-keyframes loading {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.5);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@-ms-keyframes loading {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.5);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
@-ms-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
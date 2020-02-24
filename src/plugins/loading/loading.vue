<template>
  <div
    v-show="show"
    class="zoom-loading"
    :style="'color:' + color + ';border: 1px solid ' + color + ';' "
  >
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
  props: {
    color: {
      type: String,
      default: "#00ff00"
    },
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style>
.zoom-loading {
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
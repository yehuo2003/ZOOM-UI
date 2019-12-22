<template>
  <div v-show="show" class="zoom-loading" :style="'color:' + color + ';border: 1px solid ' + color + ';' ">
    <div class="load-text">loading</div>
    <div :style="'background:' + color + ';' " class="loading-item loading-one"></div>
    <div :style="'background:' + color + ';' " class="loading-item loading-two"></div>
    <div :style="'background:' + color + ';' " class="loading-item loading-three"></div>
    <div :style="'background:' + color + ';' " class="loading-item loading-four"></div>
    <div :style="'background:' + color + ';' " class="loading-item loading-five"></div>
  </div>
</template>
<script>
export default {
  name: "zoom-loading",
  props: {
    color: {
      type: String,
      default: '#00ff00'
    },
    show: {
      type: Boolean,
      default: true,
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
    animation: loading 1s infinite ease-in-out;/*animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放*/
}
.loading-two{
    animation-delay: -0.9s;/*定义开始执行的地方，负号表示直接从第900ms开始执行*/
}
.loading-three{
    animation-delay: -0.8s;
}
.loading-four{
    animation-delay: -0.7s;
}
.loading-five{
    animation-delay: -0.6s;
}
@keyframes loading {
    0%,40%,100%{
        -webkit-transform: scaleY(0.5);
    }
    20%{
        -webkit-transform: scaleY(1);
    }
}
@-webkit-keyframes loading {
    0%,40%,100%{
        -webkit-transform: scaleY(0.5);
    }
    20%{
        -webkit-transform: scaleY(1);
    }
}
@-moz-keyframes loading {
    0%,40%,100%{
        -webkit-transform: scaleY(0.5);
    }
    20%{
        -webkit-transform: scaleY(1);
    }
}
@-ms-keyframes loading {
    0%,40%,100%{
        -webkit-transform: scaleY(0.5);
    }
    20%{
        -webkit-transform: scaleY(1);
    }
}
@keyframes blink {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
@-webkit-keyframes blink {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
@-moz-keyframes blink {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
@-ms-keyframes blink {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
</style>
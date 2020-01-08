<template>
  <div class="content">
    <!-- <div>
      <div class="rolling-header">
        <div class="rolling-header-body">
          通知
        </div>
      </div>
      <div class="rolling-container">
        <div style="animation: scrollChild 10000ms linear infinite" class="rolling-container-body">
          <p>666</p>
        </div>
      </div>
    </div> -->
    <div class="notice">
      <div class="notice-header">
        <i class="zoom-icon icon-trumpet"></i>
      </div>
      <div style="animation: marquee 30000ms linear infinite;" class="notice-marquee">
        <span>尊敬的会员您好, 如果您遇到无法充值问题, 我们强烈建议使用银联充值支付, 成功率高, 单笔充值额度大, 支付成功火速到账, 赶快尝试一下吧~~</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-notice",
};
</script>
<style>
/* 横向滚动 */
.notice {
  margin: 0 auto;
  position: relative;
}
.notice .notice-header {
  position: absolute;
}
.notice .notice-marquee {
  margin: 0 20px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.notice .notice-marquee:hover {
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
.content .rolling-header {
  font-size: .75rem;
  overflow: hidden;
}
.content .rolling-header .rolling-header-body {
  padding: .5rem .25rem;
  font-size: inherit;
  min-width: 1px;
  color: #333;
}
.content .rolling-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content .rolling-container .rolling-container-body {
  position: relative;
}
.content .rolling-container .rolling-container-body:hover {
  animation-play-state: paused;
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
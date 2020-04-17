<template>
  <div class="random">
    <h2>random</h2>
    <div class="tip">
      对于项目中经常会用到的随机数字, 还有随机颜色 <br>
      zoom-ui封装成了API, 用户调用时候只需传入最小值和最大值, 就可以获取随机数, 每次调用都会随机
    </div>
    <h3>随机数</h3>
    <p>方法: <span>this.$zoom.$rn(最小数, 最大数)</span></p>
    <custom-code :html="randomNum"></custom-code>
    <h3>随机颜色</h3>
    <p>方法: <span>this.$zoom.$rc(最小值, 最大值)</span></p>
    <custom-code :html="randomColor"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      randomNum: 'this.$zoom.$rn(1, 100); // 返回 1 ~ 100 之间随机数',
      randomColor: 'this.$zoom.$rn(0, 255); // 返回 颜色 rgba(随机数, 随机数, 随机数)'
    };
  }
};
</script>
<style lang="scss" scoped>
.random {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
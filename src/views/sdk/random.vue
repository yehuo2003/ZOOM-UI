<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-01 23:03:42
-->
<template>
  <div class="random">
    <h2>random</h2>
    <div class="tip">
      <text-template code="对于项目中经常会用到的随机数字, 还有随机颜色" />
      <text-template code="zoom-ui封装成了API, 用户调用时候只需传入最小值和最大值, 就可以获取随机数, 每次调用都会随机" />
    </div>
    <h3>{{ $zoom.$t('随机数') }}</h3>
    <text-template code="方法: *this.$zoom.$rn(最小数, 最大数)*" />
    <custom-code :html="randomNum"></custom-code>
    <h3>{{ $zoom.$t('随机颜色') }}</h3>
    <text-template code="方法: *this.$zoom.$rc(最小值, 最大值)*" />
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
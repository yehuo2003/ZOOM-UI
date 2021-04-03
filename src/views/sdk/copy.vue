<!--
 * @Description:复制方法
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2021-04-03 12:03:28
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-03 12:09:02
-->
<template>
  <div class="copy">
    <h2>copy</h2>
    <div class="tip">
      zoom-ui封装的复制方法，可以将需要的内容复制
    </div>
    <h3>copy</h3>
    <p>调用方法: <span>this.$zoom.copy(要复制的内容)</span>，如果没有传入值, 则返回空, 否则返回复制内容</p>
    <custom-code :html="clone"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clone: 'var msg = this.$zoom.copy("a copy message");  // console.log(msg) a copy message'
    };
  }
};
</script>
<style lang="scss" scoped>
.copy {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
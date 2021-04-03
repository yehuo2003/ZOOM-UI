<!--
 * @Description:深拷贝
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-31 17:30:16
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-03 13:44:06
-->
<template>
  <div class="deep-clone">
    <h2>deep-clone</h2>
    <div class="tip">
      很多用户都因为引用类型对象, 无法进行深层次拷贝, 而引发不少BUG <br>
      zoom-ui为了解决这个问题, 封装了一套API, 用户只需要调用并传入要拷贝的对象或者数组, API会返回给用户拷贝过后的对象/数组
    </div>
    <h3>clone</h3>
    <p>调用方法: <span>this.$zoom.clone("拷贝对象")</span>，深拷贝的可以是一个对象，也可以是一个数组，并返回深拷贝后的对象/数组</p>
    <custom-code :html="clone"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clone: 'this.$zoom.clone(Object);'
    };
  }
};
</script>
<style lang="scss" scoped>
.deep-clone {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="copy-clone">
    <h1>深拷贝</h1>
    <h2>copy-clone</h2>
    <div class="tip">
      很多用户都因为引用类型对象, 无法进行深层次拷贝, 而引发不少BUG <br>
      zoom-ui为了解决这个问题, 封装了一套API, 用户只需要调用并传入要拷贝的对象或者数组, API会返回给用户拷贝过后的对象/数组
    </div>
    <h3>clone</h3>
    <p>调用方法: <span>this.$zoom.clone("拷贝对象")</span></p>
    <custom-code :html="clone"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clone: 'this.$zoom.clone("拷贝对象");'
    };
  }
};
</script>
<style lang="scss" scoped>
.copy-clone {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
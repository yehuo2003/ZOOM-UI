<!--
 * @Description:深拷贝
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-31 17:30:16
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-01 22:59:48
-->
<template>
  <div class="deep-clone">
    <h2>deep-clone</h2>
    <div class="tip">
      <text-template code="deep-clone.tip.1" />
      <text-template code="deep-clone.tip.2" />
    </div>
    <h3>clone</h3>
    <text-template code="deep-clone.tip.3" />
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
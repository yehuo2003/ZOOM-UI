<template>
<!-- submit.prevent="false" 阻止默认提交事件 -->
  <form class="zoom-form">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'zoom-form',
  props: {
    labelWidth: String,
    default: null
  }
}
</script>
<style>
.zoom-form {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.zoom-form-item {
  margin: 0 0 12px;
}
.zoom-form-item>.form-item-label {
  color: #333;
  text-align: right;
  vertical-align: middle;
  line-height: 30px;
  float: left;
  padding: 0 8px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-break: break-all;
  font-weight: 400;
  margin: 0;
}
</style>
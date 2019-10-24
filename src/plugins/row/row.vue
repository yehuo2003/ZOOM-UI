<template>
  <div class="zoom-row">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-row',
    props: {
        msg: String
    },
}
</script>
<style>
.zoom-row {
    margin-bottom: 20px;
    margin-right: -10px;
    margin-left: -10px;
    width: 100%;
}
</style>
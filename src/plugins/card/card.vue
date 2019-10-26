<template>
  <div class="zoom-card">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-card',
}
</script>
<style>
.zoom-card {
    text-align: left;
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    margin: 20px;
}
.zoom-card .zoom-card-header,
.zoom-card .zoom-card-container,
.zoom-card .zoom-card-footer {
    padding: 10px;
}
</style>
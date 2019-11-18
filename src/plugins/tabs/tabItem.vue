<template>
  <div class="zoom-tab-item">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-tab-item',
    props: {
        title: String
    },
    data() {
        return {
        }
    },
    created() {
    }
}
</script>
<style>
</style>

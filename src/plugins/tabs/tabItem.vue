<template>
  <div class="zoom-tab-item" :id="id" :zoom-title="title">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-tab-item',
    props: {
        title: String,
        id: String
    },
    data() {
        return {
        }
    },
    mounted() {
        let obj = {
            id: this.id || (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5),
            title: this.title
        }
        this.$store.dispatch('setTitle', obj);
    }
}
</script>
<style>
</style>

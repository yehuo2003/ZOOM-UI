<template>
  <div class="zoom-input">
      <input :type="options.text" v-focus :placeholder="options.placeHolder">
      <i v-if="options.onIcon" :class="options.onIcon" @click="serach"></i>
  </div>
</template>
<script>
export default {
    name: 'zoom-input',
    props: {
        op: Object
    },
    data() {
        return {
            options: {
                text: 'text',
                placeHolder: null,
                onIcon: false
            }
        }
    },
    created() {
        if (this.op) {
            this.options = this.op;
        }
    },
    methods: {
        serach() {
            this.op.onClick();
        }
    }
}
</script>
<style>
.zoom-input {
    position: relative;
    width: 480px;
    min-height: 36px;
    opacity: 0.9;
    border-radius: 2px;
    padding: 10px;
}
</style>
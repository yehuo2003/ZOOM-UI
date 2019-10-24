<template>
  <div>
      <button class="btn" :class="isdisabled ? 'disabled' : '' + css" :disabled="isdisabled" @click="handleClick">
        <slot></slot>
      </button>
  </div>
</template>
<script>
export default {
    name: 'zoom-button',
    props: {
        op: Object
    },
    data() {
        return {
            css: 'info',
            isdisabled: false
        }
    },
    created() {
        if (this.op) {
            this.css = this.op.hue;
            this.isdisabled = this.op.disabled;
            console.log(this.op,'button---');
        }
    },
    methods: {
        handleClick() {
            this.op.onClick();
        }
    }
}
</script>
<style>
.btn {
    width: 150px;
    min-height: 35px;
    line-height: 35px;
    border-radius: 5px;
}
</style>
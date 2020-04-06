<template>
  <div>
    <zoom-button ref="btn" @click="handleClick">触发</zoom-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      handleClick() {
        this.$zoom.tip({
        // title: '标题',
        // content: '内容',
        customComponent: 'zoom-input',
        customProps: { // 要传入的参数
          open: '开启',
          close: '关闭',
        },
        target: this.$refs['btn']	//	目标元素
      })
      }
    }
  }
</script>
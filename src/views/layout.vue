<template>
  <div class="container">
    <zoom-layout asideWidth="300" headerHeight="100">
      <div slot="header">
        头部
      </div>
      <div slot="aside">
        左侧单栏
      </div>
      <div slot="main">
        <zoom-dialog-box :show="visibility" @close="handleClose">
          <h1 slot="header">
            自定义头部
          </h1>
          <h1>弹框测试</h1>
          <div slot="footer">
            <zoom-button>自定义button</zoom-button>
          </div>
        </zoom-dialog-box>
        <zoom-button @click="visibility = true">弹框测试</zoom-button>
      </div>
      <div slot="footer">
        尾部
      </div>
    </zoom-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibility: false,
    }
  },
  methods: {
    handleClose(val) {
      console.log(val);
      this.visibility = false;
    }
  }
};
</script>
<style>
.container .zoom-header {
  background:#1890ff;
}
.container .zoom-aside {
  background:#73d13d;
}
.container .zoom-main {
  background:#ffc53d;
}
</style>
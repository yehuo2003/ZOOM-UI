<template>
  <div class="test-layou">
    <zoom-button :disabled="true" @click="test">普通按钮</zoom-button>
    <zoom-button :disabled="true" :op="btnOp" type="primary">正常按钮</zoom-button>
    <zoom-button :disabled="true" type="warning">警告按钮</zoom-button>
    <zoom-button :disabled="true" type="success">成功按钮</zoom-button>
    <zoom-button :disabled="true" type="info">信息按钮</zoom-button>
    <zoom-button :disabled="true" type="danger">危险按钮</zoom-button>
    <zoom-row flex="true" justify="space-around" align="middle">
      <zoom-col span="3">
        <div class="item">第一个</div>
      </zoom-col>
      <zoom-col span="3">
        <div class="item">第二个</div>
      </zoom-col>
      <zoom-col span="3">
        <div class="item">第三个</div>
      </zoom-col>
    </zoom-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnOp: {
        type: 'primary',
        onClick: () => {
          this.$zoom.popup({
            title:'1111',
            content:'我是内容'
          })
        }
      }
    }
  },
  methods: {
    test() {
      console.log(666);
    }
  }
};
</script>
<style>
.test-layou button {
  margin: 10px 5px;
}
.test-layou .item {
  background: red;
  height: 80px;
}
</style>
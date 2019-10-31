<template>
  <div class="zoom-dialog-box zoom-dialog-warpper">
      <div class="dialog-box" style="width: 30%; top: 15vh; left: calc((100vw - 30%) / 2);">
        <div class="dialog-header">提示</div>
        <div class="dialog-content">内容</div>
        <div class="dialog-footer">
            <zoom-button>确定</zoom-button>
            <zoom-button>取消</zoom-button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "zoom-dialog-box",
  props: {
      op: {
          type: Object,
      }
  },
  data() {
      return {
      }
  },
  created() {
  },
  methods: {
  }
};
</script>
<style>
.zoom-dialog-box .dialog-box .dialog-footer {
    padding: 0 0 24px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.zoom-dialog-box .dialog-box .dialog-content {
    text-align: initial;
    padding: 24px;
    color: #5a5e66;
    font-size: 14px;
    overflow: auto;
    min-height: 65vh;
}
.zoom-dialog-box .dialog-box .dialog-header {
    padding: 8px 24px;
    height: 40px;
    background: #ffffff;
    border-bottom: 1px solid #d9d9d9;
}
.zoom-dialog-box .dialog-box {
    z-index: 999;
    opacity: 1;
    position: absolute;
    background: #ffffff;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2); 
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2); 
}
.zoom-dialog-warpper {
    z-index: 666;
    position: fixed;
    background: #b3b3b3;
    opacity: .7;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
</style>
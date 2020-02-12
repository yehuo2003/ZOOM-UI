<template>
  <div v-show="visibility" class="zoom-dialog-box zoom-dialog-warpper">
      <div class="dialog-box" :style=" 'width:' + width + '; top: 15vh; left: calc((100vw - 30%) / 2);' ">
        <div class="dialog-header">
            <span>{{title}}</span>
            <a @click="closeBox" href="javascript:void(0);">×</a>
        </div>
        <div class="dialog-content">
            <slot></slot>
        </div>
        <div v-if="showBtn" class="dialog-footer">
            <zoom-button type="primary" @click="handleClick">确定</zoom-button>
            <zoom-button @click="closeBox">取消</zoom-button>
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
      },
      width: {
        type: String,
        default: ''
      },
      show: {
          type: Boolean,
          default: false
      }
  },
  data() {
      return {
          showBtn: true,
          visibility: false
      }
  },
  watch: {
      op: function(n, o){
        this.visibility = this.show;
      },
      show: function(n, o){
        this.visibility = this.show;
      }
  },
  created() {
      this.load();
  },
  methods: {
      load() {
        this.visibility = this.show;
        if (this.op) {
            this.visibility = this.op.show;
            this.showBtn = this.op.showBtn;
            if (this.op.width) this.width = this.op.width;
            if (this.op.title) this.title = this.op.title;
        }
      },
      handleClick() {
        if (this.op && this.op.onClick) {
            this.op.onClick();
        }
      },
      closeBox() {
        this.visibility = false;
        this.$emit('close', this.visibility);
      }
  }
};
</script>
<style>
.zoom-dialog-box .dialog-box .dialog-footer .zoom-btn {
    padding: 0 10px;
}
.zoom-dialog-box .dialog-box .dialog-footer {
    display: flex;
    justify-content: center;
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
}
.zoom-dialog-box .dialog-box .dialog-header a {
    float: right;
    color: #666;
    font-size: 25px;
    text-decoration: none;
}
.zoom-dialog-box .dialog-box .dialog-header {
    text-align-last: left;
    padding: 8px 24px;
    height: 40px;
    line-height: 25px;
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
    background: rgba(0, 0, 0, .5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
</style>
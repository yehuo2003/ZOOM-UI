<template>
  <transition name='fade'>
    <div v-if="show" v-drag class="zoom-popup">
      <div class="popup-modal-box">
        <div class="popup-modal-header">
          <span class="modal-title">{{title}}</span>
          <i @click="show = false" class="zoom-icon icon-close"></i>
        </div>
        <div class="popup-modal-body">
          <div class="popup-status">
            <i v-if="status" :class="css ? css : 'icon-query-fill' " class="zoom-icon"></i>
          </div>
          <div v-if="container" v-html="container" class="popup-container"></div>
          <div v-else class="popup-content">
            {{content}}
          </div>
        </div>
        <div class="popup-modal-footer">
          <zoom-button @click="show = false">取消</zoom-button>
          <zoom-button @click="btnClick" hue="primary">{{btnText}}</zoom-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'zoom-popup',
  data () {
    return {
      show: false,
      title: '提示',
      content: '',
      container: null,
      status: null,
      css: 'icon-query-fill',
      btnText: '确认',
      click: Function
    }
  },
  created () {
    switch (this.status) {
      case "err":
        this.css = "icon-close-fill";
        break;
      case "error":
        this.css = "icon-close-fill";
        break;
      case "danger":
        this.css = "icon-close-fill";
        break;
      case "red":
        this.css = "icon-close-fill";
        break;
      case "success":
        this.css = "icon-success-fill";
        break;
      case "green":
        this.css = "icon-success-fill";
        break;
      case "warn":
        this.css = "icon-hint-fill";
        break;
      case "warning":
        this.css = "icon-hint-fill";
        break;
      case "yellow":
        this.css = "icon-hint-fill";
        break;
      case "gray":
        this.css = "icon-stop-fill";
        break;
      case "info":
        this.css = "icon-stop-fill";
        break;
      case "blue":
        this.css = "icon-query-fill";
        break;
      case "primary":
        this.css = "icon-query-fill";
        break;
      case "query":
        this.css = "icon-query-fill";
        break;
      default:
        this.css = this.status;
        break;
    }
    this.$nextTick(() => {
      // 监听回车和 Esc事件
      window.addEventListener('keyup', this.keyEnd, true);
    })
  },
  methods: {
    keyEnd() {
      // 27 是 Esc事件 13是回车, 点击完了就可以销毁了
      if (event.keyCode === 27) {
        this.show = false;
      } else if (event.keyCode === 13){
        this.btnClick();
      } else {
        return;
      }
      window.removeEventListener('keyup', this.keyEnd, true);
    },
    btnClick () {
      this.onClick();
      this.show = false;
    }
  }
}
</script>

<style>
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .35s;
}
.zoom-popup .popup-modal-body .popup-status .icon-success-fill {
  color: #52c41a;
}
.zoom-popup .popup-modal-body .popup-status .icon-query-fill {
  color: #1890ff;
}
.zoom-popup .popup-modal-body .popup-status .icon-hint-fill {
  color: #faad14;
}
.zoom-popup .popup-modal-body .popup-status .icon-close-fill {
  color: #f5222d;
}
.zoom-popup .popup-modal-body .popup-status .icon-stop-fill {
  color: #333;
}
/* 全局弹框 */
.zoom-popup .popup-modal-footer .btn {
  margin-left: 10px;
}
.zoom-popup .popup-modal-footer {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  text-align: right;
  padding: 6px 16px 10px 16px;
  position: relative;
}
.zoom-popup .popup-modal-body,
.zoom-popup .popup-modal-body .popup-content,
.zoom-popup .popup-modal-body .popup-container {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  white-space: normal;
  word-break: break-word;
}
.zoom-popup .popup-modal-header .icon-close,
.zoom-popup .popup-modal-body .popup-status .zoom-icon {
  width: 1em;
  height: 1em;
  line-height: 1em;
}
.zoom-popup .popup-modal-body .popup-status {
  white-space: nowrap;
  word-break: break-word;
  font-size: 16px;
  transform: scale(1.5);
  padding: 0 10px 0 2px;
}
.zoom-popup .popup-modal-body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 16px 12px 16px;
  position: relative;
  -webkit-box-direction: normal;
}
.zoom-popup .popup-modal-header .icon-close {
  font-size: 18px;
  position: absolute;
  right: 14px;
  top: 12px;
  z-index: 1;
  color: #c0c4cc;
  cursor: pointer;
}
.zoom-popup .popup-modal-header {
  cursor: move;
  position: relative;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 40px 8px 16px;
  border-bottom: 1px solid #eee;
  background-color: #f8f8f8;
  border-radius: 2px 2px 0 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.zoom-popup .popup-modal-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 30vh;
  transform: translate(-50%);
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  width: 420px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 14px;
  text-align: left;
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
}
.zoom-popup::before {
  -webkit-transition: background-color .2s ease-in-out;
  transition: background-color .2s ease-in-out;
  background-color: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: auto;
}
.zoom-popup {
  z-index: 9999;
  overflow: auto;
  display: block;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #333;
}
</style>
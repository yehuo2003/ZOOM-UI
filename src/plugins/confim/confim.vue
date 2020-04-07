<template>
  <transition name="fade">
    <div v-drag class="zoom-popup" v-if="visible">
      <div class="popup-modal-box">
        <div class="popup-modal-header">
          <span class="modal-title">{{title}}</span>
          <i @click="handleAction('close')" class="zoom-icon icon-close"></i>
        </div>
        <div class="popup-modal-body">
          <div class="popup-status">
            <i v-if="type" :class="css ? css : 'icon-query-fill' " class="zoom-icon"></i>
          </div>
          <div v-html="content" class="popup-content"></div>
        </div>
        <div class="popup-modal-footer">
          <zoom-button @click="handleAction('cancel')">{{cancelText}}</zoom-button>
          <zoom-button  @click="handleAction('yes')" type="primary">{{confirmText}}</zoom-button>
        </div>
      </div>
      <div class="backdrop" @click="handleAction('close')"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "zoom-confim",
    data() {
      return {
        visible: false,
        title: this.$zoom.$t('public.hint'),
        content: '',
        confirmText: this.$zoom.$t('public.confirm'),
        cancelText: this.$zoom.$t('public.cancel'),
        type: '',
        css: '',
        promiseStatus: null,
      }
    },
    created () {
      switch (this.type) {
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
          this.css = this.type;
          break;
      }
      this.$nextTick(() => {
        // 监听回车和 Esc事件
        window.addEventListener('keyup', this.keyEnd, true);
      })
    },
    methods: {
      confirm() {
        this.visible = true;
        return new Promise((resolve, reject) => {
          this.promiseStatus = {resolve, reject};
        });
      },
      keyEnd() {
        // 27 是 Esc事件 13是回车, 点击完了就可以销毁了
        if (event.keyCode === 27) {
          this.handleAction();
        } else if (event.keyCode === 13){
          this.handleAction('yes')
        } else {
          return;
        }
        this.handleAction();
      },
      handleAction(action){
        this.visible = false;
        window.removeEventListener('keyup', this.keyEnd, true);
        if(action=='yes'){
          this.promiseStatus && this.promiseStatus.resolve(true);
        } else {
          this.promiseStatus && this.promiseStatus.reject && this.promiseStatus.reject();
        }
      }
    }
  }
</script>
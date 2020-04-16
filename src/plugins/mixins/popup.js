export default {
  data () {
    return {
      value: '',  //prompt
      visible: false,
      title: this.$zoom.$t('public.hint'),  //  提示
      content: '',
      container: null,
      type: null,
      css: 'icon-query-fill',
      cancelText: this.$zoom.$t('public.cancel'), //  取消
      confirmText: this.$zoom.$t('public.confirm'), //  确认
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
      if(action === 'yes'){
        this.promiseStatus && this.promiseStatus.resolve(this.value);
      }else{
        window.removeEventListener('keyup', this.keyEnd, true);
        this.promiseStatus && this.promiseStatus.reject && this.promiseStatus.reject();
      }
    }
  }
}
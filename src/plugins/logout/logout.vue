<template>
  <a @click="logoutClick" class="zoom-logout">{{title}}</a>
</template>
<script>
export default {
  name: "zoom-logout",
  props: {
    op: {
      type: Object,
      url: String, //  注销后要跳转的url
      point: [Boolean, String], //  是否需要提示
      onClick: Function, //  点击事件
      text: String //  文字内容, 默认为注销
    },
    url: String,
    text: String,
    point: [Boolean, String]
  },
  data() {
    return {
      confim: false, //  是否开启确认框
      logoutUrl: null,
      title: "注销"
    };
  },
  created() {
    if (this.op) {
      if (this.op.point) {
        // 是否开启提示
        this.confim = this.op.point;
      }
      if (this.op.url) {
        this.logoutUrl = this.op.url;
      }
      if (this.op.text) {
        this.title = this.op.text;
      }
    } else {
      if (this.point) {
        this.confim = this.point;
      }
      if (this.url) {
        this.logoutUrl = this.url;
      }
      if (this.text) {
        this.title = this.text;
      }
    }
  },
  methods: {
    // 退出预处理事件
    logoutClick() {
      if (this.op && this.op.onClick) {
        this.op.onClick();
      }
      let content = "";
      // 先判断是否有确认框
      if (this.confim) {
        if (typeof this.confim === "string") {
          content = this.confim;
        } else {
          content = "确认要注销吗?";
        }
        this.$zoom.popup({
          title: "提示",
          type: "query",
          content,
          onClick: () => {
            this.logout();
          }
        });
      } else {
        this.logout();
      }
    },
    logout() {
      this.$zoom.cookie.clear();
      sessionStorage.clear();
      window.location.reload(true);
      if (this.logoutUrl) {
        window.location.href = this.logoutUrl;
      }
    }
  }
};
</script>
<style>
.zoom-logout {
  cursor: pointer;
}
</style>
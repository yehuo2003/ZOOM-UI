<template>
  <div class="zoom-internationalisation">
    <div class="internationalisation-info-title">
      <i class="zoom-icon icon-set"></i>
      <span>{{title}}</span>
      <span class="zoom-icon icon-down"></span>
      <span class="zoom-icon icon-up"></span>
    </div>
    <div class="zoom-internationalisation-spread">
      <ul v-for="(item, index) of list" :key="index">
        <li @click="toggleLang(item)" v-show="item.text !== title">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-internationalisation",
  props: {
    op: {
      type: Object,
      url: String, // 切换后要去的页面
      title: String, //  用户名
      data: Array //  自定义候选国际化数据
    }
  },
  data() {
    return {
      title: "中文zh",
      list: [
        { value: "zh", text: "中文zh" },
        { value: "en", text: "英文en" },
        { value: "ja", text: "日文ja" }
      ]
    };
  },
  created() {
    this.load(this.op);
  },
  methods: {
    // 切换语言
    toggleLang(item) {
      this.$zoom
        .confim(
          this.$zoom.$t("internationalisation-toggle", { lang: item.text }),
          this.$zoom.$t("public.hint"),
          {
            type: "query"
          }
        )
        .then(() => {
          let lang = {
            locale: item.value //	要修改的语言
          };
          this.$zoom.setLanguage(lang);
          setTimeout(() => {
            this.title = item.text;
            if (this.op && this.op.url) {
              window.location.href = this.op.url;
            } else {
              window.location.reload();
            }
          }, 500);
        })
        .catch(() => {
          //点取消
        });
    },
    //   父组件动态设置属性
    load(op) {
      if (op) {
        if (op.data) {
          this.list = op.data;
        }
        if (op.title) {
          this.title = op.title;
        }
      }
      let lang = this.$zoom.getLanguage().locale;
      this.list.forEach(item => {
        if (lang === item.value) {
          this.title = item.text;
        }
      });
    }
  }
};
</script>
<style>
.zoom-internationalisation:hover {
  height: 50px;
}
.zoom-internationalisation:hover .internationalisation-info-title .icon-down {
  display: none;
}
.zoom-internationalisation:hover .zoom-internationalisation-spread,
.zoom-internationalisation:hover .internationalisation-info-title .icon-up {
  text-align: center;
  min-height: 30px;
  display: block;
}
.zoom-internationalisation .zoom-internationalisation-spread {
  border: 1px solid #d9d9d9;
  position: absolute;
  cursor: pointer;
  margin-top: 5px;
  min-width: 80px;
  z-index: 9999;
  padding: 5px;
  height: auto;
  display: none;
}
.zoom-internationalisation .zoom-internationalisation-spread li:hover {
  background: #1890ff;
  color: #fff;
}
.zoom-internationalisation .internationalisation-info-title .icon-up,
.zoom-internationalisation .internationalisation-info-title .icon-down {
  float: right;
  padding-right: 5px;
  cursor: pointer;
}
.zoom-internationalisation .internationalisation-info-title .icon-up {
  display: none;
}
.zoom-internationalisation {
  position: relative;
  display: inline-block;
}
.zoom-internationalisation .internationalisation-info-title {
  display: inline-block;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
  min-width: 80px;
}
</style>
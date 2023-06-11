<template>
  <div class="zoom-internationalization">
    <div class="internationalisation-info-title">
      <i class="zoom-icon icon-set"></i>
      <span>{{title}}</span>
      <span class="zoom-icon icon-down"></span>
      <span class="zoom-icon icon-up"></span>
    </div>
    <div class="zoom-internationalization-spread">
      <ul v-for="(item, index) of list" :key="index">
        <li @click="toggleLang(item)" v-show="item.text !== title">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-internationalization",
  props: {
    op: {
      type: Object,
      url: String, // 国际化切换后要跳转的url
      title: String, //  默认要展示的标题, 请与data数组里的text值对应
      data: Array //  国际化数据 value是要切换的国际化名, text是展示给用户的, 与title对应的条目将不会展示在下拉框中
    }
  },
  data() {
    return {
      title: "中文",
      list: [
        { value: "zh", text: "中文" },
        { value: "en", text: "English" },
        { value: "ja", text: "日本語" }
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
        }, 800);
      })
      .catch(() => {
        //点取消
      });
    },
    //   父组件动态设置属性
    load(op) {
      if (op && op.data) {
        this.list = op.data;
      }
      if (op && op.title) {
        this.title = op.title;
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
.zoom-internationalization:hover {
  height: 50px;
}
.zoom-internationalization:hover .internationalisation-info-title .icon-down {
  display: none;
}
.zoom-internationalization:hover .zoom-internationalization-spread,
.zoom-internationalization:hover .internationalisation-info-title .icon-up {
  text-align: center;
  min-height: 30px;
  display: block;
}
.zoom-internationalization .zoom-internationalization-spread {
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
.zoom-internationalization .zoom-internationalization-spread li:hover {
  background: #1890ff;
  color: #fff;
}
.zoom-internationalization .internationalisation-info-title .icon-up,
.zoom-internationalization .internationalisation-info-title .icon-down {
  float: right;
  padding-right: 5px;
  cursor: pointer;
}
.zoom-internationalization .internationalisation-info-title .icon-up {
  display: none;
}
.zoom-internationalization {
  position: relative;
  display: inline-block;
}
.zoom-internationalization .internationalisation-info-title {
  display: inline-block;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
  min-width: 80px;
}
</style>
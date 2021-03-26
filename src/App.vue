<template>
  <div id="app">
    <zoom-layout>
      <header slot="header">
        <zoom-nav-menu slot="header" :op="titleOp"></zoom-nav-menu>
        <div class="header-right">
          <zoom-search v-model="searchVal" :op="searchOp" @search="search"></zoom-search>
          <zoom-internationalisation></zoom-internationalisation>
        </div>
      </header>
      <router-view slot="main"/>
    </zoom-layout>
    <div class="my-mragin-bottom my-mragin-top my-color my-font-size"></div>
  </div>
</template>

<script>
import zh from './locale/zh_cn'
import en from './locale/es_en'
export default {
  data() {
    return {
      searchVal: '',
      list: [],
      searchOp: {
        placeHolder: '搜索组件',
      },
      titleOp: {  //  顶部导航栏
        data: [
          {title: '首页', url: '#/'},
          {title: '环境搭建', url: '#/develop/'},
          {title: '组件', url: '#/component/'},
          {title: '软件开发包', url: '#/SDK'},
          {title: '更多', url: 'https://github.com/yehuo2003', target: 'blank'}
        ]
      },
    }
  },
  created () {
    let lang = {
      locale: 'zh',
      detail: {
          zh: Object.assign(this.$zoom.getLanguage().i18n.zh, zh),
          en: Object.assign(this.$zoom.getLanguage().i18n.en, en)
      }
    }
    this.$zoom.setLanguage(lang);
    let list = [];
    this.$store.state.componetList.forEach(item => {
      list.push(item);
    })
    this.$store.state.devList.forEach(item => {
      list.push(item);
    })
    this.$store.state.sdkList.forEach(item => {
      list.push(item);
    })
    function isChildren(arr) {
      return arr.map(item => {
        if (item.children) {
          return isChildren(item.children)
        } else {
          return item;
        }
      })
    }
    list = list.map(item => {
      if (item.children) {
        return isChildren(item.children)
      } else {
        return item
      }
    })
    this.list = list.flat(Infinity);
  },
  methods: {
    search() {
      let value = this.searchVal.toLowerCase();
      let url = '';
      for (let i = 0; i <= this.list.length; i ++) {
        if (this.list[i] && this.list[i].title) {
          let title = this.list[i].title.toLowerCase();
          if (title.indexOf(value) > -1) {
            url = this.list[i].url
          }
        } else {
          continue;
        }
      }
      if (url && url.indexOf('#') > -1) {
        this.searchVal = '';
        this.$router.push(url.split('#')[1]);
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  color: #303113;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .zoom-header {
    .header-right {
      position: absolute;
      color: #fff;
      z-index: 999;
      right: 10px;
      top: 7px;
      .zoom-internationalisation {
        padding-left: 10px;
        .zoom-internationalisation-spread {
          background: #fff;
          ul {
            color: #333;
          }
        }
      }
    }
  }
  .attribute-type {
    p {
      line-height: inherit;
    }
    p.panel-title {
      span:first-child {
        background: none;
        color: #209dd5;
        font-weight: bold;
        font-size: 16px;
      }
      span:last-child {
        background: none;
        padding-left: 10px;
        font-size: 12px;
        color: #969696;
      }
    }
  }
}
@media (min-width:300px) and (max-width:500px) {
  #app {
    font-size: 10px !important;
    h1 {
      font-size: 25px !important;
    }
    .zoom-showcase {
      display: none;
    }
    .zoom-home>.midden {
      display: block;
      img {
        width: 200px;
      }
      h1 {
        color: #fff;
        text-align: center;
        margin-top: 20px;
        font-size: 40px !important;
      }
    }
    .home-layout>.zoom-aside {
      width: 0 !important;
    }
    .home-layout>.zoom-footer,
    .home-layout>.zoom-main {
      left: 0 !important;
      padding: 0 10px;
    }
    .home-layout>.zoom-main>.zoom-layout>.zoom-header {
      height: 35px !important;
      .component-header {
        font-size: 20px !important;
        padding: 0 10px;
      }
    }
    .home-layout>.zoom-main>.zoom-layout>.zoom-main {
      top: 35px !important;
      padding: 0 15px;
      margin-bottom: 10px;
      p {
        font-size: 12px;
        margin-bottom: 5px;
      }
      h2 {
        margin: 10px 0;
      }
      .zoom-panel {
        padding: 0;
        .zoom-panel-content {
          line-height: 25px !important;
        }
      }
    }
    .attribute-type {
      p {
        .zoom-panel-content {
          p {
            line-height: 25px !important;
          }
        }
      }
    }
    .zoom-nav ul li.zoom-list {
      display: none;
    }
    .header-right {
      display: none;
    }
  }
}
.my-back-color {
  background-color: gray;
}
.my-font-size {
  font-size: 14px;
  color: #333;
}
.my-mragin-right {
  margin-right: 10px;
}
.my-mragin-left {
  margin-left: 10px;
}
.my-mragin-top {
  margin-top: 10px;
}
.my-mragin-bottom {
  margin-bottom: 10px;
}
.my-color {
  color: red;
}
</style>

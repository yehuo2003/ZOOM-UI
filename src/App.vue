<template>
  <div id="app">
    <zoom-layout :headerHeight="isHeader ? 50 : 0" ref="layout">
      <header v-show="isHeader" slot="header">
        <zoom-nav-menu class="zoom-instructions-nav" :op="titleOp"></zoom-nav-menu>
        <div class="header-right">
          <zoom-search v-model="searchVal" :op="searchOp" @search="search"></zoom-search>
          <zoom-internationalisation></zoom-internationalisation>
        </div>
      </header>
      <router-view @showHeader="showHeader" ref="main" slot="main"/>
    </zoom-layout>
  </div>
</template>

<script>
import zh from './locale/zh_CN'
import en from './locale/en_US'
export default {
  data() {
    return {
      isHeader: true,
      searchVal: '',
      list: [],
      searchOp: {
        placeHolder: '搜索组件',
        mini: true
      },
      titleOp: {  //  顶部导航栏
        data: [
          {title: '首页', url: '#/'},
          {title: '环境搭建', url: '#/develop/'},
          {title: '组件', url: '#/component/'},
          {title: '软件开发包', url: '#/SDK'},
          {title: '更多', url: '#/more'}
        ]
      },
    }
  },
  created () {
    let lang = {
      locale: this.$zoom.getLanguage().locale,
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
    showHeader(bool) {
      this.isHeader = bool;
    },
    search() {
      if (!this.searchVal) return
      let value = this.searchVal.toLowerCase();
      let res = this.list.find(item => item.title.toLowerCase().indexOf(value) > -1 )
      if (res && res.url && res.url.indexOf('#') > -1) {
        this.$router.push(res.url.split('#')[1]);
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


@media (max-width:600px) {
  #app {
    font-size: 10px;
    h1 {
      font-size: 25px;
    }
    .zoom-showcase {
      display: none;
    }

    // .zoom-mobile {
    //   align-items: center;
    //   background-color: #111;
    //   display: flex;
    //   font-family: "Roboto", sans-serif;
    //   justify-content: center;
    //   min-height: 100vw;
    //   position: fixed;
    //   z-index: 999;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    // }
    // .zoom-mobile>.midden {
    //   display: block;
    //   img {
    //     width: 200px;
    //   }
    //   h1 {
    //     color: #fff;
    //     text-align: center;
    //     margin-top: 20px;
    //     font-size: 40px !important;
    //   }
    // }
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
    .zoom-instructions-nav {
      .tree {
        .menu-btn {
          width: 45px;
          height: 45px;
        }
      }
      .zoom-list {
        display: none;
      }
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

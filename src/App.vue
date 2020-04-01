<template>
  <div id="app">
    <zoom-layout>
      <header slot="header">
        <zoom-nav-menu slot="header" :op="titleOp"></zoom-nav-menu>
        <zoom-search v-model="searchVal" @search="search"></zoom-search>
      </header>
      <router-view slot="main"/>
    </zoom-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: '',
      list: [],
      titleOp: {  //  顶部导航栏
        data: [
          {title: '首页', url: '#/'},
          {title: '环境搭建', url: '#/develop/'},
          {title: '组件', url: '#/component/'},
          {title: '软件开发包', url: '#/SDK'},
          {title: '更多'}
        ]
      },
    }
  },
  created () {
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
    .zoom-search {
      position: absolute;
      right: 50px;
      top: 7px;
      z-index: 999;
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
</style>

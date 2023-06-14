<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-06-14 22:41:50
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-14 23:30:29
-->
<template>
  <div id="app">
    <zoom-layout class="hidden-scroll" headerHeight="50">
      <header slot="header">
        <zoom-nav-menu class="zoom-instructions-nav" :op="titleOp"></zoom-nav-menu>
        <div class="header-right">
          <zoom-search v-model="searchVal" :op="searchOp" @search="search"></zoom-search>
          <zoom-internationalization :op="op"></zoom-internationalization>
        </div>
      </header>
      <router-view slot="main"/>
    </zoom-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      op: {
        title: '中文', //  默认要展示的标题, 请与data数组里的text值对应
        data: [ // 国际化数据 value是要切换的国际化名, text是展示给用户的, 与title对应的条目将不会展示在下拉框中
          {value: 'zh', text: '中文'},
          {value: 'en', text: 'English'}
        ]
      },
      searchVal: '',
      list: [],
      searchOp: {
        placeHolder: this.$zoom.$t('搜索组件'),
        mini: true
      },
      titleOp: {  //  顶部导航栏
        data: [
          {title: this.$zoom.$t('首页'), url: '#/'},
          {title: this.$zoom.$t('环境搭建'), url: '#/develop/'},
          {title: this.$zoom.$t('组件'), url: '#/component/'},
          {title: this.$zoom.$t('软件开发包'), url: '#/SDK'},
          {title: this.$zoom.$t('更多'), url: '#/more'}
        ]
      },
    }
  },
  created () {
    let list = [];
    let self = this.$zoom;
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
        item.title = self.$t(item.title);
        if (item.children) {
          return isChildren(item.children)
        } else {
          return item;
        }
      })
    }
    list = list.map(item => {
      item.title = self.$t(item.title);
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
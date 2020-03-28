<template>
  <zoom-layout class="home-layout">
    <zoom-nav-menu slot="header" :op="titleOp"></zoom-nav-menu>
    <zoom-tree-menu slot="aside" style="font-size: 14px;" :op="navOp"></zoom-tree-menu>
    <!-- 主体部分 -->
    <router-view slot="main"></router-view>
  </zoom-layout>
</template>

<script>
export default {
  data() {
    //数据属性
    return {
      titleOp: {  //  顶部导航栏
        data: [
          {title: '首页', url: '#/'},
          {title: '环境搭建', url: '#/develop/'},
          {title: '组件', url: '#/component/'},
          {title: '软件开发包', url: '#/SDK'},
          {title: '更多'}
        ]
      },
      navOp: {  //  侧边栏
        accordion: true,
        data: [
          {title: '环境准备', url: '#/develop/setting '},  //  安装
          {title: '组件安装', url: '#/develop/install-develop'},
          {title: '快速上手', url: '#/develop/use-develop'},
          {title: '组件升级', url: '#/develop/upgrade'},  //  升级
        ]
      }
    };
  },
};
</script>
<style lang="scss">
.home-layout {
  .zoom-main {
    padding: 0 50px;
    margin-bottom: 50px;
    overflow-y: auto;
    .attribute-type {
      p {
        line-height: inherit;
        .name {
          color: #209dd5;
          font-weight: bold;
          font-size: 1.2em;
        }
        .type {
          padding-left: 10px;
          font-size: 12px;
          color: #969696;
        }
      }
    }
    .content-active {
      border: 1px solid #d9d9d9;
    }
    .tip {
      padding: 8px 16px;
      background: #ecf8ff;
      border-radius: 4px;
      border-left: 5px solid #50bfff;
      margin: 20px 0;
      font-size: 14px;
      color: #5e6d82;
    }
    h2 {
      margin: 40px 0 20px 0;
      padding-bottom: .3rem;
      border-bottom: 1px solid #eaecef;
    }
    p {
      font-size: 16px;
      color: #5e6d82;
      line-height: 1.7em;
      span {
        color: #476582;
        padding: .25rem .5rem;
        margin: 0;
        font-size: .85em;
        background: rgba(27, 31, 35, 0.05);
        border-radius: 3px;
      }
    }
  }
}
</style>

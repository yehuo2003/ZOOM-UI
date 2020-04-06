<template>
  <zoom-layout class="home-layout">
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
      navOp: {  //  侧边栏
        accordion: true,
        data: []
      }
    };
  },
  created () {
    this.navOp.data = this.$store.state.devList;
  }
};
</script>
<style lang="scss">
.home-layout {
  .zoom-main {
    padding: 0 50px;
    margin-bottom: 20px;
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

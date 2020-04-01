<template>
  <zoom-layout class="home-layout">
    <zoom-tree-menu slot="aside" style="font-size: 14px;" :op="navOp"></zoom-tree-menu>
    <!-- 主体部分 -->
      <zoom-layout slot="main">
        <h1 class="component-header" slot="header">
          {{nowTitle}}
        </h1>
        <router-view slot="main"></router-view>
      </zoom-layout>
    <div slot="footer">
      <p @click="toClick(leftUrl)" v-show="leftTitle" style="float: left;">
        <span class="zoom-icon icon-left"></span>
        {{leftTitle}}
      </p>
      <p @click="toClick(rightUrl)" v-show="rightTitle" style="float: right;">
        {{rightTitle}}
        <span class="zoom-icon icon-right"></span>
      </p>
    </div>
  </zoom-layout>
</template>

<script>
export default {
  data() {
    //数据属性
    return {
      leftTitle: null,
      rightTitle: null,
      leftUrl: null,
      rightUrl: null,
      nowTitle: null,
      list: [],
      navOp: {  //  侧边栏
        accordion: true,
        data: []
      }
    };
  },
  created() {
    /**
     * @function 三维数组转化成一维数组
     * @description 采用递归方式 将三维数组转化成一维数组
     */
    this.navOp.data = this.$store.state.componetList;
    function isChildren(arr) {
      return arr.map(item => {
        if (item.children) {
          return isChildren(item.children)
        } else {
          return item;
        }
      })
    }
    let list = this.$store.state.componetList.map(item => isChildren(item.children).flat(Infinity));
    this.list = list.flat(Infinity);
    setTimeout(() => {
      this.loadUrl();
    });
  },
  methods: {
    /**
     * @function 跳转的点击事件
     * @param String url #/component/xxx
     * @description 截取#后面的路由, 做跳转
     */
    toClick(url) {
      if (url.indexOf('#') === -1) {
        return
      }
      this.$router.push(url.split('#')[1]);
      setTimeout(() => {
        this.$nextTick(() => {
          this.loadUrl();
        })
      }, 200);
    },
    /**
     * @function 根据当前路由设置页脚的上一个组件和下一个组件
     * @description
     * 先获取当前url地址, 然后循环list列表, 找到和当前地址匹配的, 如果当前地址在list列表里不是第一个元素,
     * 那就取它前一个作为left的信息, 如果当前地址在list列表里不是最后一个, 就取它后一个作为right的信息
     */
    loadUrl() {
      let leftTitle = null;
      let rightTitle = null;
      let leftUrl = null;
      let rightUrl = null;
      let current = '#' + this.$route.path;
      let currentIndex = 0;
      this.list.forEach((item, index) => {
        if (item.url === current) {
          currentIndex = index;
          this.nowTitle = item.title;
        }
      })
      if (this.list[currentIndex - 1]) {
        leftUrl = this.list[currentIndex - 1].url;
        leftTitle = this.list[currentIndex - 1].title;
      }
      if (this.list[currentIndex + 1]) {
        rightUrl = this.list[currentIndex + 1].url;
        rightTitle = this.list[currentIndex + 1].title;
      }
      this.leftTitle =  leftTitle;
      this.rightTitle =  rightTitle;
      this.leftUrl =  leftUrl;
      this.rightUrl =  rightUrl;
    }
  }
};
</script>
<style lang="scss">
.home-layout {
  .component-header {
    padding: 0 50px;
    color: #333;
  }
  .zoom-footer {
    padding: 0 50px;
    p {
      cursor: pointer;
      transition: color .2s ease-in-out;
      span {
        color: #1890ff;
        font-weight: bold;
      }
      &:hover {
        color: #1890ff;
      }
    }
  }
  .zoom-main {
    padding: 0 50px;
    margin-bottom: 50px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      position: absolute;
      background: #fff;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
        box-shadow: inset 0 0 6px rgba(20, 117, 173, 0.3);
        background: rgba(85,85,85, .5);
      }
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
      box-shadow: inset 0 0 1px rgba(0,0,0,0);
      border-radius: 10px;
      background: #F5F5F5;
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
    h3 {
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      color: #5e6d82;
      line-height: 1.7em;
      margin-bottom: 10px;
      span {
        color: #476582;
        padding: .25rem .5rem;
        margin: 0 .25rem;
        margin: 0;
        font-size: .85em;
        background: rgba(27, 31, 35, 0.05);
        border-radius: 3px;
      }
    }
  }
}
</style>

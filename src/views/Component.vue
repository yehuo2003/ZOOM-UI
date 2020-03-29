<template>
  <zoom-layout class="home-layout">
    <zoom-nav-menu slot="header" :op="titleOp"></zoom-nav-menu>
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
      list2: [
        {title: '框架风格', children: [
          {title: 'Color色彩', url: '#/component/custom-color'},
          {title: 'Layout布局', url: '#/component/custom-layout'},
          {title: 'Icon字体图标', url: '#/component/custom-icon'},
          {title: 'Row/Col栅格布局', url: '#/component/zoom-row-col'},
        ]},
        {title: '导航组件', url: '', children: [
          {title: 'Breadcrumb面包屑', url: '#/component/zoom-breadcrumb'},
          {title: 'Navmenu瀑布菜单', url: '#/component/zoom-nav-menu'},
          {title: 'Treemenu树形菜单', url: '#/component/zoom-tree-menu'},
          {title: 'Floatbar浮动框菜单栏', url: '#/component/zoom-floatbar'}
        ]},
        {title: '容器组件', url: '', children: [
          {title: 'Carousel轮播图', url: '#/component/zoom-carousel'},
          {title: 'Card卡片组件', url: '#/component/zoom-card'},
          {title: 'Dialogbox对话框组件', url: '#/component/zoom-dialog-box'},
          {title: 'Tabs页组件', url: '#/component/zoom-tabs'},
          {title: 'Panel折叠面板', url: '#/component/zoom-panel'}
        ]},
        {title: '表单组件', children: [
          {title: 'Button按钮', url: '#/component/zoom-button'},
          {title: 'Input输入框', url: '#/component/zoom-input'},
          {title: 'Dropdown下拉框', url: '#/component/zoom-dropdown'},
          {title: 'Search搜索框', url: '#/component/zoom-search'},
          {title: 'Numeric数字框', url: '#/component/zoom-numeric'},
          {title: 'Textarea文本域组件', url: '#/component/zoom-textarea'},
          {title: '验证码', children: [
            {title: 'Testing文字验证码', url: '#/component/zoom-testing'},
            {title: 'Captcha滑块验证码', url: '#/component/zoom-captcha'},
          ]},
          {title: 'Slider滑块组件', url: '#/component/zoom-slider'},
          {title: 'Textpopup弹出编辑', url: '#/component/zoom-text-popup'},
          {title: 'Date日期选择', url: '#/component/zoom-date'},
          {title: 'Switch开关组件', url: '#/component/zoom-switch'},
          {title: 'Radio单选框', url: '#/component/zoom-radio'},
          {title: 'Checkbox复选框', url: '#/component/zoom-checkbox'},
          {title: 'Form/Item表单组件', url: '#/component/zoom-form'},
          {title: 'Fileupload文件上传', url: '#/component/zoom-file-upload'},
        ]},
        {title: '数据组件', children: [
          {title: '分页组件', url: '#/component/zoom-pager'},
          {title: '表格组件', url: '#/component/zoom-grid'},
          {title: '穿梭框组件', url: '#/component/zoom-transfer'},
        ]},
        {title: '提示组件', children: [
          {title: 'Alert警告', url: '#/component/zoom-alert'},
          {title: 'Popup弹出框', url: '#/component/zoom-popup'},
          {title: 'Tip文字提示', url: '#/component/zoom-tip'},
          {title: 'loading加载', url: '#/component/zoom-loading'}
        ]},
        {title: '业务组件', children: [
          {title: 'Logout注销组件', url: '#/component/zoom-logout'},
          {title: 'Userinfo用户组件', url: '#/component/zoom-userinfo'}
        ]},
        {title: '其他组件', children: [
          {title: 'imgupload图片预览组件', url: '#/component/zoom-imgupload'},
          {title: 'PhotoZoom放大镜组件', url: '#/component/zoom-photoZoom'},
          {title: 'Rate评分组件', url: '#/component/zoom-rate'},
          {title: 'Notice文字滚动', url: '#/component/zoom-notice'},
          {title: 'Tag标签', url: '#/component/zoom-tag'},
          {title: 'Link文字链接', url: '#/component/zoom-link'},
          {title: 'Progress进度条', url: '#/component/zoom-progress'},
          {title: 'Gallery画廊幻灯片', url: '#/component/zoom-gallery'}
        ]}
      ],
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
        data: []
      }
    };
  },
  created() {
    /**
     * @function 三维数组转化成一维数组
     * @description 采用递归方式 将三维数组转化成一维数组
     */
    this.navOp.data = this.list2;
    function isChildren(arr) {
      return arr.map(item => {
        if (item.children) {
          return isChildren(item.children)
        } else {
          return item;
        }
      })
    }
    let list = this.list2.map(item => isChildren(item.children).flat(Infinity));
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
}
</style>

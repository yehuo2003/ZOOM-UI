<template>
  <div class="container">
    <zoom-layout :headerHeight="isHead ? 60 : 0">
      <div slot="header">
        <zoom-nav-menu :op="titleOp"></zoom-nav-menu>
        <zoom-internationalization :op="interOp"></zoom-internationalization>
      </div>
      <div slot="main">
        <zoom-layout asideWidth="200" headerHeight="60" toggleAside="true">
          <zoom-tree-menu :op="navOp" slot="aside"></zoom-tree-menu>
          <!-- <div slot="main">
            <zoom-button @click="changeHead">改变高度</zoom-button>
            <zoom-form @submit.prevent="false">
              <zoom-form-item>
                <zoom-search :op="searchOp"></zoom-search>
              </zoom-form-item>
              <zoom-form-item>
                <zoom-input></zoom-input>
              </zoom-form-item>
              <zoom-form-item inline="true">
                <zoom-search style="width: 130px;"></zoom-search>
              </zoom-form-item>
              <zoom-form-item inline="true">
                <zoom-numeric style="width: 130px;"></zoom-numeric>
              </zoom-form-item>
              <zoom-form-item>
                <zoom-text-popup></zoom-text-popup>
              </zoom-form-item>
              <zoom-form-item>
                <span slot="label">sssss</span>
                <zoom-date></zoom-date>
              </zoom-form-item>
            </zoom-form>
          </div> -->
        </zoom-layout>
      </div>
      <div slot="footer">
        尾部
      </div>
    </zoom-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHead: true,
      searchOp: {
        // disabled: true,
        // mini: true,
        placeHolder: '搜索框已禁用',
        hideClose: false,
        data: [
          {value: '1', text: '所有'},
          {value: '2', text: '找人'},
          {value: '3', text: '文章'}
        ],
        onClick: (val, key) => {
          console.log(val, key);
        },
      },
      interOp: {
        title: 'china',
        // url: 'http://www.baidu.com',
        data: [
          {value: 'zh', text: 'china'},
          {value: 'en', text: 'enlish'},
          {value: 'ja', text: 'japan'}
        ]
      },
      titleOp: {  //  顶部导航栏
        theme: 'primary',
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
        onClick: (val, index) => {
          console.log(val, 'val');
          console.log(index, 'index');
        },
        data: [
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
            // {title: 'imgupload图片预览组件', url: '#/component/zoom-imgupload'},
            {title: 'Photo放大镜组件', url: '#/component/zoom-photo'},
            {title: 'Rate评分组件', url: '#/component/zoom-rate'},
            {title: 'Notice文字滚动', url: '#/component/zoom-notice'},
            {title: 'Tag标签', url: '#/component/zoom-tag'},
            {title: 'Link文字链接', url: '#/component/zoom-link'},
            {title: 'Progress进度条', url: '#/component/zoom-progress'},
            {title: 'Gallery画廊幻灯片', url: '#/component/zoom-gallery'}
          ]}
        ]
      },
    }
  },
  methods: {
    changeHead() {
      let url = 'http://127.0.0.1:8090/dish';
      let params = 's=stest&i=itest2'
      this.$zoom.network.post(url, params).then(res => {
        console.log(res, 'res==');
      })
    }
  }
};
</script>
<style>
.navtab {
  --navtab-width: 600px;
  --navtab-item-width: calc(var(--navtab-width) / 4 - 20px);
  --navtab-overlay-width: calc(var(--navtab-item-width) + 80px);
  --active-index: 0;
  position: relative;
  width: var(--navtab-width);
  height: 150px;
  background: white;
  border: 1em solid white;
  border-radius: 5% 5% 15% 15% / 15% 15% 50% 50%;
  overflow: hidden;
}
.navtab ul {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.navtab ul .navtab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  flex-direction: column;
  width: var(--navtab-item-width);
  height: 100%;
  color: #0288d1;
  cursor: pointer;
  transition: 0.5s ease;
}
.navtab ul .navtab-item svg {
  transition: 0.5s ease;
}
.navtab ul .navtab-item span {
  font-size: 20px;
  user-select: none;
  opacity: 0;
  transition: 0.5s ease;
}
.navtab ul .navtab-item.active {
  width: var(--navtab-overlay-width);
}
.navtab ul .navtab-item.active svg {
  transform: translateY(-10px);
}
.navtab ul .navtab-item.active span {
  opacity: 1;
}
.navtab::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  height: 100%;
  width: var(--navtab-overlay-width);
  background: #b3e5fc;
  border-radius: 20px;
  transform: translateX(calc(var(--navtab-item-width) * var(--active-index)));
  transition: 0.5s ease;
}


.zoom-header .zoom-internationalization {
  position: absolute;
  z-index: 1000;
  right: 0;
  top: 0;
}
.container .zoom-header {
  background:#1890ff;
}
.container .zoom-aside {
  background:#73d13d;
}
.container .zoom-main {
  background:#ffc53d;
}
.container .zoom-footer {
  background: #ff4d4f;
}
.zoom-layout>.zoom-main {
  padding: 20px;
}
</style>
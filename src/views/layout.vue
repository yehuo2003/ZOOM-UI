<template>
  <div class="container">
    <zoom-layout>
      <div slot="header" style="disaplay: flex;">
        <zoom-nav-menu :op="titleOp"></zoom-nav-menu>
        <zoom-internationalisation :op="interOp"></zoom-internationalisation>
      </div>
      <div slot="main">
        <zoom-layout>
          <zoom-tree-menu :op="navOp" slot="aside"></zoom-tree-menu>
          <div slot="main">
            <zoom-dialog-box :show="visibility" @close="handleClose">
              <!-- <h1 slot="header">
                自定义头部
              </h1> -->
              <h1>弹框测试</h1>
              <div slot="footer">
                <zoom-button>自定义button</zoom-button>
              </div>
            </zoom-dialog-box>

            <nav class="navtab">
              <ul>
                <li class="navtab-item active">
                  <svg t="1580196202692" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="781" width="36" height="36"><path d="M555.541333 117.994667l312.874667 224.565333A117.333333 117.333333 0 0 1 917.333333 437.866667V800c0 64.8-52.533333 117.333333-117.333333 117.333333H640V746.666667c0-70.688-57.312-128-128-128s-128 57.312-128 128v170.666666H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V437.877333a117.333333 117.333333 0 0 1 48.917333-95.317333l312.874667-224.565333a74.666667 74.666667 0 0 1 87.082666 0z" p-id="782" fill="currentColor"></path></svg>
                  <span>Home</span>
                </li>
                <li class="navtab-item">
                  <svg t="1580196351612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1159" width="36" height="36"><path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m149.162667 222.901334L444.16 386.357333a96 96 0 0 0-57.802667 57.813334l-78.122666 216.992a42.666667 42.666667 0 0 0 54.602666 54.602666l217.002667-78.122666a96 96 0 0 0 57.802667-57.813334l78.122666-216.992a42.666667 42.666667 0 0 0-54.602666-54.602666zM512 565.333333a53.333333 53.333333 0 1 0 0-106.666666 53.333333 53.333333 0 0 0 0 106.666666z" p-id="1160" fill="currentColor"></path></svg>
                  <span>Explore</span>
                </li>
                <li class="navtab-item">
                  <svg t="1580196428669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2609" width="30" height="30"><path d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z" p-id="2610" fill="currentColor"></path></svg>
                  <span>Collection</span>
                </li>
                <li class="navtab-item">
                  <svg t="1580196480651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2891" width="30" height="30"><path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 586.666667a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m-2.517333-373.333333c-48.416 0-92.746667 24.16-118.613334 63.413333a137.088 137.088 0 0 0-15.978666 33.237333 32 32 0 0 0 60.906666 19.690667c2.016-6.24 4.885333-12.202667 8.522667-17.717333C458.4 375.914667 482.709333 362.666667 509.482667 362.666667 552.277333 362.666667 586.666667 396.266667 586.666667 437.333333s-34.4 74.666667-77.194667 74.666667a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0v-35.584C603.946667 558.197333 650.666667 503.232 650.666667 437.333333c0-76.757333-63.381333-138.666667-141.194667-138.666666z" p-id="2892" fill="currentColor"></path></svg>
                  <span>Help</span>
                </li>
              </ul>
            </nav>

            <zoom-tabs :value="curTab" @tabChange="tabChange">
              <zoom-tab-item :index="0" :label="'Tab1'">
                <div>
                  <zoom-input v-model="name"></zoom-input>
                  <zoom-button @click="updateName">按钮改变nmae</zoom-button>
                </div>
              </zoom-tab-item>
              <zoom-tab-item :index="1" :label="'Tab2'">
                <h5 slot="label">
                  我是tab2
                  <i class="zoom-icon icon-close-plus"></i>
                </h5>
                <div>Tab2的内容</div>
              </zoom-tab-item>
              <zoom-tab-item :index="2" :label="'Tab3'">
                <div>Tab3的内容</div>
              </zoom-tab-item>
            </zoom-tabs>
            <zoom-button @click="visibility = true">弹框测试</zoom-button>
            <zoom-button @click="confimClick">confim测试</zoom-button>
          </div>
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
      name: '222',
      curTab: 0, // 当前激活的tab索引
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
      visibility: false,
    }
  },
  methods: {
    updateName() {
      this.name = '6666';
      console.log(this.name, 'nmame');
    },
    tabChange(index) {
      this.curTab = index
    },
    confimClick() {
      this.$zoom.confim('是否登录?',{
        yesBtnText:'登录',
      }).then(() => {
        console.log('登录');
          //点登录
      }).catch(() => {
          console.log('取消');
          //点取消
      });
    },
    handleClose(val) {
      console.log(this.$zoom.confim, '=this.$zoom.confim');
      this.visibility = false;
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


.zoom-header .zoom-internationalisation {
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
</style>
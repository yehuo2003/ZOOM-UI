import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//多组件所共用的公共存储仓库
export default new Vuex.Store({
  state: {
    componetList: [
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
        {title: 'Confim确认框', url: '#/component/zoom-confim'},
        {title: 'Prompt提示框', url: '#/component/zoom-prompt'},
        {title: 'Tip文字提示', url: '#/component/zoom-tip'},
        {title: 'loading加载', url: '#/component/zoom-loading'}
      ]},
      {title: '业务组件', children: [
        {title: 'Logout注销组件', url: '#/component/zoom-logout'},
        {title: 'i18n国际化组件', url: '#/component/zoom-internationalisation'},
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
        {title: 'colorPicker取色器', url: '#/component/zoom-color-picker'},
        {title: 'Gallery画廊幻灯片', url: '#/component/zoom-gallery'}
      ]}
    ],
    devList: [
      {title: '环境准备', url: '#/develop/setting '},  //  安装
      {title: '组件安装', url: '#/develop/install-develop'},
      {title: '快速上手', url: '#/develop/use-develop'},
      {title: '组件升级', url: '#/develop/upgrade'},  //  升级
    ],
    sdkList: [
      {title: 'SDK说明', url: '#/SDK/explanation'},  //  说明
      {title: '内置指令', url: '#/SDK/zoom-directive'},  //  zoom-ui内置指令
      {title: '国际化', url: '#/SDK/internationalisation'},  //  国际化
      {title: 'Dom操作命令', url: '#/SDK/dom-operation'},  //  DOM操作
      {title: '内置方法', children: [   //  方法
        {title: '日期格式化', url: '#/SDK/date-format'}, //  日期格式化
        {title: 'cookie操作', url: '#/SDK/cookie-operation'}, //  cookie操作
        {title: '深拷贝', url: '#/SDK/copy-clone'}, //  深拷贝
        {title: '随机数/颜色', url: '#/SDK/random'}, //  随机数
      ]},
    ]
  },
  mutations: {}
})

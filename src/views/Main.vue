<template>
  <zoom-layout class="home-layout">
    <div slot="header">
      头部
    </div>
    <div slot="aside">
      <zoom-tree-menu style="font-size: 14px;" :op="navOp"></zoom-tree-menu>
    </div>
    <main slot="main" class="home-main">
      <!-- 主体部分 -->
      <router-view></router-view>
    </main>
  </zoom-layout>
</template>

<script>
export default {
  data() {
    //数据属性
    return {
      navOp: {
        // width: '18%',
        accordion: true,
        data: [
          {title: '快速上手', url: '#/component/index', icon: 'icon-set'},
          {title: '自定义主题', url: '', children: [
            {title: '颜色', url: '', icon: 'icon-list'},
            {title: 'Icon图标', url: '#/component/custom-icon', icon: 'icon-add-plus'}
          ]},
          {title: '表单组件', url: '', children: [
            {title: '按钮', url: '#/component/zoom-button', icon: 'icon-list'},
            {title: '输入框', url: '#/component/zoom-input', icon: 'icon-add-plus'},
            {title: '下拉框', url: '#/component/zoom-dropdown', icon: 'icon-add-plus'},
            {title: '搜索框', url: '#/component/zoom-search', icon: 'icon-add-plus'},
            {title: '数字框', url: '#/component/zoom-numeric', icon: 'icon-add-plus'},
            {title: '文本域组件', url: '#/component/zoom-textarea', icon: 'icon-add-plus'},
            {title: '验证码', children: [
              {title: '文字验证码', url: '#/component/zoom-testing', icon: 'icon-list'},
              {title: '滑块验证码', url: '#/component/zoom-captcha', icon: 'icon-add-plus'},
            ]},
            {title: '滑块组件', url: '#/component/zoom-slider', icon: 'icon-add-plus'},
            {title: '弹出编辑', url: '#/component/zoom-text-popup', icon: 'icon-add-plus'},
            {title: '日期选择', url: '#/component/zoom-date', icon: 'icon-add-plus'},
            {title: '开关组件', url: '#/component/zoom-switch', icon: 'icon-add-plus'},
            {title: '单选框', url: '#/component/', icon: 'icon-add-plus'},
            {title: '复选框', url: '#/component/', icon: 'icon-add-plus'},
            {title: 'form表单组件', url: '#/component/', icon: 'icon-add-plus'},
          ]},
          {title: '导航组件', url: '', children: [
            {title: '导航菜单组件', url: '#/dish/list', icon: 'icon-list'},
            {title: '树形菜单', url: '#/dish/list', icon: 'icon-list'},
            {title: '导航菜单栏', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '面包屑导航', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '浮动框菜单栏', url: '#/dish/add', icon: 'icon-add-plus'}
          ]},
          {title: '布局组件', url: '', children: [
            {title: 'layout布局', url: '#/dish/list', icon: 'icon-list'},
            {title: 'row行布局', url: '#/dish/list', children: [
              {title: 'col列布局', url: '#/dish/add', icon: 'icon-add-plus'},
            ]}
          ]},
          {title: '容器组件', url: '', children: [
            {title: '卡片容器', url: '#/dish/list', children: [
              {title: '卡片组件', url: '#/dish/list', icon: 'icon-list'},
              {title: '卡片头部', url: '#/dish/list', icon: 'icon-list'},
              {title: '卡片内容', url: '#/dish/list', icon: 'icon-list'},
              {title: '卡片尾部', url: '#/dish/list', icon: 'icon-list'},
              {title: '对话框组件', url: '#/dish/list', icon: 'icon-list'},
              {title: 'tab页组件', url: '#/dish/list', icon: 'icon-list'},
            ]},
            {title: '树形菜单', url: '#/dish/list', icon: 'icon-list'},
            {title: '导航菜单栏', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '浮动框菜单栏', url: '#/dish/add', icon: 'icon-add-plus'}
          ]},
          {title: '数据组件', url: '', children: [
            {title: '分页组件', url: '#/dish/list', icon: 'icon-list'},
            {title: '表格组件', url: '#/dish/list', icon: 'icon-list'},
            {title: '穿梭框组件', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '浮动框菜单栏', url: '#/dish/add', icon: 'icon-add-plus'}
          ]},
          {title: '业务组件', url: '', children: [
            {title: 'alert提示框', url: '#/dish/list', icon: 'icon-list'},
            {title: 'loading组件', url: '#/dish/list', icon: 'icon-list'},
            {title: '标签组件', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '文字链接', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '滚动栏组件', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: '注销组件', url: '#/dish/add', icon: 'icon-add-plus'},
            {title: 'popup弹框', url: '#/dish/add', icon: 'icon-add-plus'}
          ]},
          {title: '上传图片组件', url: '#/order/list', icon: 'icon-order'},
          {title: '放大镜组件', url: '#/security', icon: 'icon-store'},
          {title: '轮播图组件', url: '#/security', icon: 'icon-store'},
          {title: '评分组件', url: '#/security', icon: 'icon-store'},
          {title: '画廊幻灯片', url: '#/security', icon: 'icon-store'},
          {title: '步骤条组件', url: '#/security', icon: 'icon-store'},
          {title: 'Tips组件', url: '#/security', icon: 'icon-store'},
        ]
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.home-layout {
  .home-main {
    padding: 0 50px;
    margin-bottom: 50px;
  }
}
</style>

<template>
  <div class="custom-zoom-nav-menu">
    <!-- 普通 -->
    <h2>基本用法</h2>
    <h3>基础按钮的用法</h3>
    <p>一级菜单始终显示, 并且可以配置自定义icon图标</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-nav-menu :op="op"></zoom-nav-menu>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="btn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>隐藏迷你菜单</h2>
    <p>通过op对象配置, 左边按钮为迷你菜单 鼠标经过时候显示</p>
    <p>
      通过设置
      <span>hideTree</span>属性来隐藏左边迷你导航菜单
    </p>
    <zoom-tabs class="basic" :value="reseTab" @tabChange="reseChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-nav-menu :op="navMenuOp"></zoom-nav-menu>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="resetBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <attribute :list="attributeList"></attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attributeList: [
        {
          id: 1,
          title: "属性",
          content: [
            {
              id: 1,
              title: "导航数据",
              name: "data",
              type: "Array",
              text:
                "以数组对象形式保存, 需要配置二级或三级菜单数据, 在子对象中添加children数组",
              text2:
                '用法: 配置op对象, 设置<span>data: [{title: xx, url: xxx}]</span>'
            },
            {
              id: 2,
              title: "跳转链接",
              name: "url",
              type: "String",
              text:
                "可以自定义跳转链接, 默认在当前窗口打开, 如果要新窗口打开可以添加属性<span>target: 'blank'</span>",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>url: xx</span>'
            },
            {
              id: 3,
              title: "自定义标题",
              name: "title",
              type: "String",
              text:
                "可以自定义导航标题",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>title: xx</span>'
            },
            {
              id: 4,
              title: "自定义样式",
              name: "css",
              type: "String",
              text:
                "可以自定义导航样式",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>css: xx</span>'
            },
            {
              id: 5,
              title: "自定义icon图标",
              name: "icon",
              type: "String",
              text:
                "自定义导航一级导航标题前的icon图标",
              text2: '用法: 配置op对象, 设置 <span>icon: 属性</span>'
            },
            {
              id: 6,
              title: '隐藏迷你菜单',
              name: 'hideTree',
              type: 'Boolean',
              text: '左侧迷你导航菜单, 默认显示,配置<span>hideTree</span>设置属性为<span>true</span>可隐藏'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "自定义点击事件",
              name: "onClick",
              type: "Function",
              text: "可绑定点击事件",
              text2: '用法: 配置op对象并设置data数据, 在条目中绑定<span> onClick: "自定义事件"</span>'
            }
          ]
        }
      ],
      op: {
        data: [
          {title: '首页', icon: 'icon-entrepot', url: ''},	// 一级菜单, url是要跳转的地址, 默认当前页, 加target: 'blank' 可打开新页面
          {title: '导航组件', url: '', children: [	// children可配置二级菜单	当有子数据的时候 可以看到扩展箭头,鼠标hover显示数据
            {title: '导航', children: [	// 三级菜单 目前最高支持到三级
              {title: '导航'}
            ]},
            {title: '菜单', children: [
              {title: '瀑布菜单'},
              {title: '树形菜单'}
            ]},
          ]},
          {title: '表单组件', icon: 'icon-channel', children: [
            {title: '按钮组件', url: '#/component/zoom-button'},
            {title: '输入框组件', url: '#/component/zoom-input', target: 'blank'}
          ]}
        ]
      },
      navMenuOp: {
        hideTree: true,
        data: [
          {title: '首页', url: ''},
          {title: '导航组件', url: '', children: [
            {title: '导航', children: [
              {title: '导航'}
            ]},
            {title: '菜单', children: [
              {title: '瀑布菜单'},
              {title: '树形菜单'}
            ]},
          ]},
          {title: '表单组件', children: [
            {title: '按钮组件', url: '#/component/zoom-button'},
            {title: '输入框组件', url: '#/component/zoom-input', target: 'blank'}
          ]}
        ]
      },
      curTab: 0,
      reseTab: 0,
      resetBtn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-nav-menu :op="navMenuOp"&gt;&lt;/zoom-nav-menu&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                navMenuOp: {
                  hideTree: true,
                  data: [
                    {title: '首页', url: ''},
                    {title: '导航组件', url: '', children: [
                      {title: '导航', children: [
                        {title: '导航'}
                      ]},
                      {title: '菜单', children: [
                        {title: '瀑布菜单'},
                        {title: '树形菜单'}
                      ]},
                    ]},
                    {title: '表单组件', children: [
                      {title: '按钮组件', url: '#/component/zoom-button'},
                      {title: '输入框组件', url: '#/component/zoom-input', target: 'blank'}
                    ]}
                  ]
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      btn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-nav-menu :op="op"&gt;&lt;/zoom-nav-menu&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                op: {
                  data: [
                    {title: '首页', icon: 'icon-entrepot', url: ''},	// 一级菜单, url是要跳转的地址, 默认当前页, 加target: 'blank' 可打开新页面
                    {title: '导航组件', url: '', children: [	// children可配置二级菜单	当有子数据的时候 可以看到扩展箭头,鼠标hover显示数据
                      {title: '导航', children: [	// 三级菜单 目前最高支持到三级
                        {title: '导航'}
                      ]},
                      {title: '菜单', children: [
                        {title: '瀑布菜单'},
                        {title: '树形菜单'}
                      ]},
                    ]},
                    {title: '表单组件', icon: 'icon-channel', children: [
                      {title: '按钮组件', url: '#/component/zoom-button'},
                      {title: '输入框组件', url: '#/component/zoom-input', target: 'blank'}
                    ]}
                  ]
                }
              }
            }
          }
        &lt;/script&gt;
      `
    };
  },
  methods: {
    tabChange(index) {
      this.curTab = index;
    },
    reseChange(index) {
      this.reseTab = index;
    },
    sizeChange(index) {
      this.sizeTab = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-nav-menu {
  .basic {
    /deep/ .content-active {
      min-height: 250px;
    }
  }
}
</style>
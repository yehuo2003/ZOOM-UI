<template>
  <div class="custom-zoom-tree-menu">
    <!-- 普通 -->
    <tab-template :code="treeCode">
      <template slot="header">
        <h2>基本用法</h2>
        <p>一级菜单始终显示, 并且可以配置自定义icon图标</p>
      </template>
      <zoom-tree-menu :op="op"></zoom-tree-menu>
    </tab-template>
    <!-- 手风琴模式 -->
    <tab-template :code="treeCustom">
      <template slot="header">
        <h2>手风琴模式</h2>
        <p>通过op对象配置, 手风琴模式下, 默认展开一级菜单, 并且只针对有二级菜单的有效</p>
      </template>
      <zoom-tree-menu :op="threeMenuOp"></zoom-tree-menu>
    </tab-template>
    <div class="tip">
      title为标题, url为要跳转的地址, 如果加target: 'blank', 则会在新窗口打开, 如果需要创建二级菜单可以在对象里追加children数组, 内部写法与父级相同,可再配置三级菜单 菜单最多支持三级, 每个条目可自定义点击事件,添加onClick, 有两个参数 val是当前行数据, index当前下标. 如果配置了children数组, 可以添加事件load函数, 可以在点击展开的时候,动态获取服务数据(需要后台服务的支持)
    </div>
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
              title: '手风琴模式',
              name: 'accordion',
              type: 'Boolean',
              text: '左侧迷你导航菜单, 默认false,配置<span>accordion</span>设置属性为<span>true</span>可开启',
              text2: '用法: 配置op对象, 设置 <span>accordion: true</span>'
            },
            {
              id: 7,
              title: '导航宽度',
              name: 'width',
              type: 'String',
              text: '导航宽度, 默认100%, 可自定义',
              text2: '用法: 配置op对象, 设置 <span>width: 宽度</span>'
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
            },
            {
              id: 2,
              title: "动态加载数据",
              name: "load",
              type: "Function",
              text: "如果配置了children数组, 可以添加事件load函数, load函数有两个参数, 一个是当前数据, 一个是当前下标, 可以在点击展开的时候,动态获取服务数据(需要后台服务的支持)",
              text2: '用法: 配置op对象并设置data数据, 在条目中绑定<span> load: "自定义事件"</span>'
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
      threeMenuOp: {
        accordion: true,
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
      treeCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tree-menu :op="threeMenuOp"&gt;&lt;/zoom-tree-menu&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  threeMenuOp: {
                    accordion: true,  //  手风琴模式开启
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
          &lt;/script&gt;`,
      treeCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tree-menu :op="op"&gt;&lt;/zoom-tree-menu&gt;
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
          &lt;/script&gt;`
    };
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-tree-menu {
  .basic {
    /deep/ .content-active {
      min-height: 250px;
      overflow: auto;
    }
  }
}
</style>
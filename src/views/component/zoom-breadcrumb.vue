<template>
  <div class="custom-zoom-breadcrumb">
    <!-- 普通 -->
    <h2>基本用法</h2>
    <p>可以对条目自定义自定义点击事件, 在条目上绑定<span>onClick</span>回调函数</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-breadcrumb :op="op"></zoom-breadcrumb>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="btn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>自定义分隔符</h2>
    <p>
      通过
      <span>flag</span>属性修改面包屑导航中间的分隔符
    </p>
    <zoom-tabs class="basic" :value="reseTab" @tabChange="reseChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="resetBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>自定义样式</h2>
    <p>
      通过
      <span>css</span>属性来添加自定义class
    </p>
    <zoom-tabs class="basic" :value="sizeTab" @tabChange="sizeChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-breadcrumb :op="breadcrumbOp2"></zoom-breadcrumb>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="sizeBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <div class="tip">
      zoom-ui组件设置属性通过两种方法，一种是标签内绑定属性设置，另一种是配置op对象后，在op对象里设置属性，当设置了op对象内的属性后，标签内样式将会被覆盖。
      组件暂不支持页面渲染后再改变属性，v-model除外。
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
              title: "面包屑导航数据",
              name: "data",
              type: "Array",
              text:
                "以数组对象形式保存",
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
                "可以自定义面包屑标题",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>title: xx</span>'
            },
            {
              id: 4,
              title: "自定义样式",
              name: "css",
              type: "String",
              text:
                "可以自定义面包屑样式",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>css: xx</span>'
            },
            {
              id: 5,
              title: "自定义分隔符",
              name: "flag",
              type: "String",
              text:
                "自定义面包屑导航中间的分隔符, 默认为 <span> "<" </span>",
              text2: '用法: 配置op对象, 设置 <span>flag: 属性</span>'
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
              text2: '用法: 配置op对象并设置data数据, 在条目中绑定<span> onClick="自定义事件"</span>'
            }
          ]
        }
      ],
      op: {
        data: [
          {
            id: 1,
            url: "#/home",
            target: "blank",
            title: "首页"
          },
          { id: 2,
            title: "详情",
            onClick: (val, index) => {
              console.log(val, index);
            }
          }
        ] //回调函数 点击时候触发
      },
      breadcrumbOp: {
        flag: '/',
        data: [
          {id: 1, title: '首页'},
          {id: 2, title: '详情'},
          {id: 3, title: '面包屑导航'}
        ]
      },
      breadcrumbOp2: {
        data: [
          {id: 1, title: '首页'},
          {id: 2, css: 'custom', title: '详情'},
          {id: 3, title: '面包屑导航'}
        ]
      },
      curTab: 0,
      reseTab: 0,
      sizeTab: 0,
      sizeBtn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-breadcrumb :op="breadcrumbOp2"&gt;&lt;/zoom-breadcrumb&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                breadcrumbOp2: {
                  data: [
                    {id: 1, title: '首页'},
                    {id: 2, css: 'custom', title: '详情'},
                    {id: 3, title: '面包屑导航'}
                  ]
                }
              }
            }
          }
        &lt;/script&gt;
        &lt;style&gt;
        .custom {
          color: red;
        }
        &lt;/style&gt;
      `,
      resetBtn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-breadcrumb :op="breadcrumbOp"&gt;&lt;/zoom-breadcrumb&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                breadcrumbOp: {
                  flag: '/',
                  data: [
                    {id: 1, title: '首页'},
                    {id: 2, title: '详情'},
                    {id: 3, title: '面包屑导航'}
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
            &lt;zoom-breadcrumb :op="op"&gt;&lt;/zoom-breadcrumb&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                op: {
                  data: [
                    {
                      id: 1,
                      url: "#/home",
                      target: "blank",
                      title: "首页"
                    },
                    { id: 2,
                      title: "详情",
                      onClick: (val, index) =&gt; {
                        console.log(val, index);
                      }
                    }
                  ] //回调函数 点击时候触发
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
.custom-zoom-breadcrumb {
  .basic {
    .content-active {
      .zoom-breadcrumb {
        /deep/ .custom {
          color: red !important;
        }
      }
    }
  }
}
</style>
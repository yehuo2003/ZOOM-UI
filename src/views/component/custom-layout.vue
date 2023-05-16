<template>
  <div class="custom-zoom-layout">
    <!-- 普通 -->
    <tab-template :code="basiclayout">
      <template slot="header">
        <h2>使用方法</h2>
        <div class="tip">
          layout本身没有默认宽高, 跟随父元素宽高, layout布局提供四个<span>slot插槽</span>, 有
          <span>slot="header"</span>、
          <span>slot="aside"</span>、
          <span>slot="main"</span>、
          <span>slot="footer"</span>，
          开发者可以自由布局定义, 还可以嵌套使用<br>
          组件默认每次路由变化后, 会自动将滚动条返回顶部, 可手动关闭该功能
        </div>
        <h3>经典布局</h3>
      </template>
      <zoom-layout headerHeight="60" asideWidth="200" style="height: 300px;">
        <div slot="header">header</div>
        <div slot="aside">aside</div>
        <div slot="main">main</div>
      </zoom-layout>
    </tab-template>
    <!-- 简单布局 -->
    <tab-template :code="adaption">
      <template slot="header">
        <h2>简单布局</h2>
      </template>
      <zoom-layout asideWidth="200" style="height: 300px;">
        <div slot="aside">aside</div>
        <div slot="main">main</div>
      </zoom-layout>
    </tab-template>
    <!-- 圣杯布局 -->
    <tab-template :code="flexHtml">
      <template slot="header">
        <h2>圣杯布局</h2>
      </template>
      <zoom-layout headerHeight="60"  footerHeight="60" style="height: 300px;">
        <div slot="header">header</div>
        <div slot="main">main</div>
        <div slot="footer">footer</div>
      </zoom-layout>
    </tab-template>
    <!-- 时尚布局 -->
    <tab-template :code="orderHtml">
      <template slot="header">
        <h2>时尚布局</h2>
      </template>
      <zoom-layout headerHeight="60" asideWidth="200" footerHeight="60" style="height: 300px;">
        <div slot="header">header</div>
        <div slot="aside">aside</div>
        <div slot="main">main</div>
        <div slot="footer">footer</div>
      </zoom-layout>
    </tab-template>
    <!-- 嵌套用法 -->
    <tab-template :code="offsetrHtml">
      <template slot="header">
        <h2>嵌套用法</h2>
        <div class="tip">
          Layout布局的头部和尾部默认高度为 <span>0</span>, 侧边栏宽度默认为 <span>0</span>, 可以通过 layout 标签上的
          <span>headerHeight</span>、
          <span>footerHeight</span>、
          <span>asideWidth</span>，
          来修改，主体部分将会自动计算
        </div>
      </template>
      <zoom-layout headerHeight="60" footerHeight="60" style="height: 300px;">
        <div slot="header">header</div>
        <zoom-layout asideWidth="200" slot="main">
          <div slot="aside">aside</div>
          <div slot="main">main</div>
        </zoom-layout>
        <div slot="footer">footer</div>
      </zoom-layout>
    </tab-template>
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
              title: "头部高度",
              name: "headerHeight",
              type: "Number",
              text: "默认为 <span>0</span> 可通过<span>zoom-layout</span> 标签上设置属性来自定义头部高度",
              text2: '用法: 在<span>zoom-layout</span> 标签上, 绑定属性 <span>headerHeight=60</span>'
            },
            {
              id: 2,
              title: "尾部高度",
              name: "footerHeight",
              type: "Number",
              text: "默认为 <span>0</span> 可通过<span>zoom-layout</span> 标签上设置属性来自定义头部高度",
              text2: '用法: 在<span>zoom-layout</span> 标签上, 绑定属性 <span>footerHeight=60</span>'
            },
            {
              id: 3,
              title: "侧边栏宽度",
              name: "asideWidth",
              type: "Number",
              text: "默认为 <span>200px</span> 可通过<span>zoom-layout</span> 标签上设置属性来自定义头部高度",
              text2: '用法: 在<span>zoom-layout</span> 标签上, 绑定属性 <span>asideWidth=200</span>'
            },
            {
              id: 4,
              title: "关闭返回顶部",
              name: "stopTop",
              type: "Boolean",
              text: "默认为 <span>false</span>, 每次页面改变会返回顶部, 为<span>true</span>禁止",
              text2: '用法: 在<span>zoom-layout</span> 标签上, 绑定属性 <span>stopTop=true</span>'
            },
            {
              id: 5,
              title: "侧边栏收缩按钮",
              name: "toggleAside",
              type: "Boolean",
              text: "默认为 <span>false</span>, 配置后在侧边栏显示收缩按钮, 点击收缩按钮可收缩侧边栏,再次点击则展开",
              text2: '用法: 在<span>zoom-layout</span> 标签上, 绑定属性 <span>toggleAside</span>'
            }
          ]
        },
        {
          id: 2,
          title: '方法',
          content: [
            {
              id: 1,
              title: "返回顶部",
              name: "goTop",
              type: "Function",
              text: "调用该方法可以使zoom-layout布局元素滚动条返回顶部, 即使设置了<span>stopTop</span>属性也可以生效",
              text2: '用法: 绑定ref属性, 调用方法<span>this.$refs[绑定属性.goTop()</span>'
            }
          ]
        }
      ],
      offsetrHtml:
        `&lt;zoom-layout headerHeight="60" footerHeight="60" style="height: 300px;"&gt;
            &lt;div slot="header"&gt;header&lt;/div&gt;
            &lt;zoom-layout asideWidth="200" slot="main"&gt;
              &lt;div slot="aside"&gt;aside&lt;/div&gt;
              &lt;div slot="main"&gt;main&lt;/div&gt;
            &lt;/zoom-layout&gt;
            &lt;div slot="footer"&gt;footer&lt;/div&gt;
          &lt;/zoom-layout&gt;`,
      orderHtml:
        `&lt;zoom-layout headerHeight="60" asideWidth="200" footerHeight="60" style="height: 300px;"&gt;
            &lt;div slot="header"&gt;header&lt;/div&gt;
            &lt;div slot="aside"&gt;aside&lt;/div&gt;
            &lt;div slot="main"&gt;main&lt;/div&gt;
            &lt;div slot="footer"&gt;footer&lt;/div&gt;
          &lt;/zoom-layout&gt;`,
      flexHtml:
        `&lt;zoom-layout headerHeight="60"  footerHeight="60" style="height: 300px;"&gt;
            &lt;div slot="header"&gt;header&lt;/div&gt;
            &lt;div slot="main"&gt;main&lt;/div&gt;
            &lt;div slot="footer"&gt;footer&lt;/div&gt;
          &lt;/zoom-layout&gt;`,
      adaption:
        `&lt;zoom-layout asideWidth="200" style="height: 300px;">
            &lt;div slot="aside">aside&lt;/div>
            &lt;div slot="main">main&lt;/div>
          &lt;/zoom-layout&gt;`,
      basiclayout:
        `&lt;zoom-layout headerHeight="60" asideWidth="200" style="height: 300px;"&gt;
            &lt;div slot="header"&gt;header&lt;/div&gt;
            &lt;div slot="aside"&gt;aside&lt;/div&gt;
            &lt;div slot="main"&gt;main&lt;/div&gt;
          &lt;/zoom-layout&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-layout {
  .basic {
    .zoom-layout {
      text-align: center;
      color: #fff;
      /deep/ .zoom-header {
        padding: 10px;
        background: #40a9ff;
        border: 3px solid #fff;
      }
      /deep/ .zoom-aside {
        padding: 10px;
        background: #ff4d4f;
        border: 3px solid #fff;
      }
      /deep/ .zoom-main {
        padding: 10px;
        background: #ffc53d;
        border: 3px solid #fff;
        margin-bottom: 0;
      }
      /deep/ .zoom-footer {
        padding: 10px;
        background: #73d13d;
        border: 3px solid #fff;
      }
    }
  }
}
</style>
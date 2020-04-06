<template>
  <div class="custom-zoom-layout">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      layout本身没有默认宽高, 跟随父元素宽高, layout布局提供四个<span>slot插槽</span>, 有
      <span>slot="header"</span>、
      <span>slot="aside"</span>、
      <span>slot="main"</span>、
      <span>slot="footer"</span>，
      开发者可以自由布局定义, 还可以嵌套使用
    </div>
    <h3>经典布局</h3>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-layout style="height: 300px;">
          <div slot="header">header</div>
          <div slot="aside">aside</div>
          <div slot="main">main</div>
        </zoom-layout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="basiclayout"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>简单布局</h2>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-layout style="height: 300px;">
          <div slot="aside">aside</div>
          <div slot="main">main</div>
        </zoom-layout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="adaption"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>圣杯布局</h2>
    <zoom-tabs class="basic" :value="flexTab" @tabChange="flexChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-layout style="height: 300px;">
          <div slot="header">header</div>
          <div slot="main">main</div>
          <div slot="footer">footer</div>
        </zoom-layout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="flexHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>时尚布局</h2>
    <zoom-tabs class="basic" :value="orderTab" @tabChange="orderChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-layout style="height: 300px;">
          <div slot="header">header</div>
          <div slot="aside">aside</div>
          <div slot="main">main</div>
          <div slot="footer">footer</div>
        </zoom-layout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="orderHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>嵌套用法</h2>
    <zoom-tabs class="basic" :value="offsetTab" @tabChange="offsetChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-layout style="height: 300px;">
          <div slot="header">header</div>
          <zoom-layout slot="main">
            <div slot="aside">aside</div>
            <div slot="main">main</div>
          </zoom-layout>
          <div slot="footer">footer</div>
        </zoom-layout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="offsetrHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <div class="tip">
      Layout布局的头部和尾部默认高度为 <span>60px</span>, 侧边栏宽度默认为 <span>200px</span>, 可以通过 layout 标签上的
      <span>headerHeight</span>、
      <span>footerHeight</span>、
      <span>asideWidth</span>，
      来修改，主体部分将会自动计算
    </div>
    <h2>属性</h2>
    <div class="attribute-type">
      <zoom-panel title="<span class='name'>headerHeight</span><span class='type'>Number</span>">
        <h3>头部高度</h3>
        <p>默认为 <span>60px</span> 可通过<span>zoom-layout</span> 标签上设置属性 <span>headerHeight="60"</span> 来自定义头部高度</p>
        <p>用法: 在标签上标记<span>headerHeight="高度"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>footerHeight</span><span class='type'>Number</span>">
        <h3>尾部高度</h3>
        <p>默认为 <span>60px</span> 可通过<span>zoom-layout</span> 标签上设置属性 <span>footerHeight="60"</span> 来自定义尾部高度</p>
        <p>用法: 在标签上标记<span>footerHeight="高度"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>asideWidth</span><span class='type'>Number</span>">
        <h3>侧边栏宽度</h3>
        <p>默认为 <span>200px</span> 可通过<span>zoom-layout</span> 标签上设置属性 <span>asideWidth="200"</span> 来自定义侧边栏宽度</p>
        <p>用法: 在标签上标记<span>asideWidth="宽度"</span></p>
      </zoom-panel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      opTab: 0,
      curTab: 0,
      flexTab: 0,
      orderTab: 0,
      offsetTab: 0,
      offsetrHtml: `
        &lt;zoom-layout style="height: 300px;"&gt;
          &lt;div slot="header"&gt;header&lt;/div&gt;
          &lt;zoom-layout slot="main"&gt;
            &lt;div slot="aside"&gt;aside&lt;/div&gt;
            &lt;div slot="main"&gt;main&lt;/div&gt;
          &lt;/zoom-layout&gt;
          &lt;div slot="footer"&gt;footer&lt;/div&gt;
        &lt;/zoom-layout&gt;
      `,
      orderHtml: `
        &lt;zoom-layout style="height: 300px;"&gt;
          &lt;div slot="header"&gt;header&lt;/div&gt;
          &lt;div slot="aside"&gt;aside&lt;/div&gt;
          &lt;div slot="main"&gt;main&lt;/div&gt;
          &lt;div slot="footer"&gt;footer&lt;/div&gt;
        &lt;/zoom-layout&gt;
      `,
      flexHtml: `
        &lt;zoom-layout style="height: 300px;"&gt;
          &lt;div slot="header"&gt;header&lt;/div&gt;
          &lt;div slot="main"&gt;main&lt;/div&gt;
          &lt;div slot="footer"&gt;footer&lt;/div&gt;
        &lt;/zoom-layout&gt;
      `,
      adaption: `
        &lt;zoom-layout style="height: 300px;">
          &lt;div slot="aside">aside&lt;/div>
          &lt;div slot="main">main&lt;/div>
        &lt;/zoom-layout&gt;
      `,
      basiclayout:`
        &lt;zoom-layout style="height: 300px;"&gt;
          &lt;div slot="header"&gt;header&lt;/div&gt;
          &lt;div slot="aside"&gt;aside&lt;/div&gt;
          &lt;div slot="main"&gt;main&lt;/div&gt;
        &lt;/zoom-layout&gt;
      `
    }
  },
  methods: {
    offsetChange(index) {
      this.offsetTab = index
    },
    orderChange(index) {
      this.orderTab = index
    },
    flexChange(index) {
      this.flexTab = index
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
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
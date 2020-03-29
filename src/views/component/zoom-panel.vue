<template>
  <div class="custom-zoom-panel">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <p>可通过<span>title</span>来自定义标题, <span>show</span>属性控制默认隐藏或显示</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-panel title="折叠面板">
          内容
          <p>默认隐藏</p>
        </zoom-panel>
        <zoom-panel title="折叠面板2" :show="true">
          内容
          <p>默认显示</p>
        </zoom-panel>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>自定义title标签</h2>
    <p>可对<span>title</span>绑定自定义html片段</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-panel :title="panelTitle">
          内容
          <p>自定义title标签</p>
        </zoom-panel>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
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
              title: "标题",
              name: "title",
              type: "String",
              text: "设置折叠面板头部信息, 可以绑定文字或者自定义html片段",
              text2: '用法: 组件标签上设置属性 <span>title="标题"</span>'
            },
            {
              id: 2,
              title: "显示折叠内容",
              name: "show",
              type: "Boolean",
              text: "默认<span>false</span>, 设置为<span>true</span>则默认展开",
              text2: '用法: 组件标签上设置属性 <span>show="true"</span>'
            }
          ]
        },
      ],
      panelTitle: '<h1>自定义头部</h1>',
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-panel :title="panelTitle"&gt;
              内容
              &lt;p&gt;自定义title标签&lt;/p&gt;
            &lt;/zoom-panel&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                panelTitle: '&lt;h1&gt;自定义头部&lt;/h1&gt;',
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;zoom-panel title="折叠面板"&gt;
          内容
          &lt;p&gt;默认隐藏&lt;/p&gt;
        &lt;/zoom-panel&gt;
        &lt;zoom-panel title="折叠面板2" :show="true"&gt;
          内容
          &lt;p&gt;默认显示&lt;/p&gt;
        &lt;/zoom-panel&gt;
      `
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  methods: {
    panel2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    panel1Num() {
      console.log('滑块1当前值是' + this.num1);
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
<template>
  <div class="custom-zoom-panel">
    <!-- 普通 -->
    <tab-template :code="panelCode">
      <template slot="header">
        <h2>{{ $zoom.$t('使用方法') }}</h2>
        <text-template code="可通过*title*来自定义标题, *show*属性控制默认隐藏或显示" />
      </template>
      <zoom-panel title="折叠面板">
        内容
        <p>默认隐藏</p>
      </zoom-panel>
      <zoom-panel title="折叠面板2" :show="true">
        内容
        <p>默认显示</p>
      </zoom-panel>
    </tab-template>
    <!-- 自定义title标签 -->
    <tab-template :code="panelCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('自定义title标签') }}</h2>
        <text-template code="可对*title*绑定自定义html片段" />
      </template>
      <zoom-panel :title="panelTitle">
        内容
        <p>自定义title标签</p>
      </zoom-panel>
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
      panelTitle: '<p>自定义头部</p>',
      panelCustom:
        `&lt;template&gt;
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
          &lt;/script&gt;`,
      panelCode:
        `&lt;zoom-panel title="折叠面板"&gt;
            内容
            &lt;p&gt;默认隐藏&lt;/p&gt;
          &lt;/zoom-panel&gt;
          &lt;zoom-panel title="折叠面板2" :show="true"&gt;
            内容
            &lt;p&gt;默认显示&lt;/p&gt;
          &lt;/zoom-panel&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-panel {
  .basic {
    ::v-deep .content-active {
      p {
        line-height: 3;
      }
    }
  }
}
</style>
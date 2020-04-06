<template>
  <div class="custom-zoom-card">
    <!-- 普通 -->
    <h2>基本用法</h2>
    <p>可以在组件标签中自定义内容</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-card>
          <h1>自定义内容</h1>
        </zoom-card>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="cardCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>边框阴影</h2>
    <p>
      通过组件标签设置属性
      <span>border="true"</span>开启边框,
      <span>hover-shadow="true"</span>鼠标经过时阴影显示
    </p>
    <zoom-tabs class="basic" :value="reseTab" @tabChange="reseChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-card border="true" hover-shadow="true">
          <h1>自定义内容</h1>
          <h3>边框阴影</h3>
        </zoom-card>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="cardBorder"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <div class="tip">
      卡片组件默认为块级元素, 宽度为100%
      可以设置边框和边框阴影
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
              title: "边框",
              name: "border",
              type: "Boolean",
              text:
                "卡片边框效果, 默认<span>false</span>, 为<span>true</span>显示",
              text2:
                '用法: 在组件标签上设置<span>border="true"</span>'
            },
            {
              id: 2,
              title: "边框阴影",
              name: "hover-shadow",
              type: "Boolean",
              text:
                "卡片边框阴影, 鼠标进过显示, 默认<span>false</span>, 为<span>true</span>显示",
              text2:
                '用法: 在组件标签上设置<span>hover-shadow="true"</span>'
            }
          ]
        }
      ],
      curTab: 0,
      reseTab: 0,
      cardBorder:
        `&lt;zoom-card border="true" hover-shadow="true"&gt;
            &lt;h1&gt;自定义内容&lt;/h1&gt;
            &lt;h3&gt;边框阴影&lt;/h3&gt;
          &lt;/zoom-card&gt;`,
      cardCode:
        `&lt;zoom-card&gt;
            &lt;h1&gt;自定义内容&lt;/h1&gt;
          &lt;/zoom-card&gt;`
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
.custom-zoom-card {
  .basic {
    /deep/ .content-active {
      min-height: 250px;
      overflow: auto;
    }
  }
}
</style>
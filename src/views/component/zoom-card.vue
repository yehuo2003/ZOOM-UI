<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 14:15:16
-->
<template>
  <div class="custom-zoom-card">
    <div class="tip">
      <text-template code="卡片组件默认为块级元素, 宽度为100%可以设置边框和边框阴影" />
    </div>
    <!-- 普通 -->
    <tab-template :code="cardCode">
      <template slot="header">
        <h2>{{ $zoom.$t('基本用法') }}</h2>
        <text-template code="可以在卡片组件标签中自定义内容" />
      </template>
      <zoom-card>
        <h1>{{ $zoom.$t('自定义内容') }}</h1>
      </zoom-card>
    </tab-template>
    <!-- 边框阴影 -->
    <tab-template :code="cardBorder">
      <template slot="header">
        <h2>{{ $zoom.$t('边框阴影') }}</h2>
        <text-template code="通过组件标签设置属性 *border='true'*开启边框, *hover-shadow='true'*鼠标经过时阴影显示" />
      </template>
      <zoom-card border="true" hover-shadow="true">
        <h1>{{ $zoom.$t('自定义内容') }}</h1>
        <h3>{{ $zoom.$t('边框阴影') }}</h3>
      </zoom-card>
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
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-card {
  .basic {
    ::v-deep .content-active {
      overflow: auto;
    }
  }
}
</style>
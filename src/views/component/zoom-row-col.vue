<template>
  <div class="custom-zoom-row">
    <!-- 普通 -->
    <tab-template :code="basicRow">
      <template slot="header">
        <h2>{{ $zoom.$t('使用方法') }}</h2>
        <div class="tip">
          <text-template code="参照bootstrap，通过Row列配置" />
          <text-template code="还可以通过flex属性实现flex布局" />
        </div>
        <h3>{{ $zoom.$t('基础用法') }}</h3>
      </template>
      <zoom-row>
        <zoom-col span="12">12</zoom-col>
        <zoom-col span="6">6</zoom-col>
        <zoom-col span="6">6</zoom-col>
        <zoom-col span="4">4</zoom-col>
        <zoom-col span="4">4</zoom-col>
        <zoom-col span="4">4</zoom-col>
      </zoom-row>
      <zoom-row>
        <zoom-col v-for="item of 6" :key="item" span="2">2</zoom-col>
      </zoom-row>
      <zoom-row>
        <zoom-col span="1">1</zoom-col>
        <zoom-col span="4">4</zoom-col>
        <zoom-col span="2">2</zoom-col>
        <zoom-col span="4">4</zoom-col>
        <zoom-col span="1">1</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- 适配不同屏幕 -->
    <tab-template :code="adaption">
      <template slot="header">
        <h2>{{ $zoom.$t('适配不同屏幕') }}</h2>
        <h3>{{ $zoom.$t('可以根据不同屏幕, 设置不同分栏大小') }}</h3>
        <text-template code="可通过col配置的属性 超大屏*xl*、 大屏*lg*、 中屏*md*、 小屏*sm*、 超小屏*xs* 来分别设置不同屏幕下分栏效果，值范围*1 ~ 12*" />
      </template>
      <zoom-row>
        <zoom-col xl="3" lg="4" md="6" sm="9" xs="12">不同屏自适应</zoom-col>
        <zoom-col span="12">通用</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- Flex布局 -->
    <tab-template :code="flexHtml">
      <template slot="header">
        <h2>{{ $zoom.$t('Flex布局') }}</h2>
        <text-template code="通过设置*flex*属性为true来启用*flex*布局, 并通过*justify*与*align*属性调整子元素的对齐方式" />
      </template>
      <zoom-row flex="true" justify="space-around" align="middle">
        <zoom-col span="3">第一个</zoom-col>
        <zoom-col span="3">第二个</zoom-col>
        <zoom-col span="3">第三个</zoom-col>
      </zoom-row>
      <zoom-row flex="true" justify="space-around" align="top">
        <zoom-col span="3">第一个</zoom-col>
        <zoom-col span="3">第二个</zoom-col>
        <zoom-col span="3">第三个</zoom-col>
      </zoom-row>
      <zoom-row flex="true" justify="end" align="middle">
        <zoom-col span="3">第一个</zoom-col>
        <zoom-col span="3">第二个</zoom-col>
        <zoom-col span="3">第三个</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- Order排序 -->
    <tab-template :code="orderHtml">
      <template slot="header">
        <h2>{{ $zoom.$t('Order排序') }}</h2>
        <text-template code="在启用*flex*布局时, 可通过设置*Row*组件的*order*属性, 给*Col*组件进行排序" />
      </template>
      <zoom-row flex="true" justify="space-around" align="middle">
        <zoom-col order="2" span="3">第一个</zoom-col>
        <zoom-col order="1" span="3">第二个</zoom-col>
        <zoom-col order="3" span="3">第三个</zoom-col>
        <zoom-col order="4" span="3">第四个</zoom-col>
      </zoom-row>
      <zoom-row flex="true" justify="space-around" align="middle">
        <zoom-col order="4" span="3">第一个</zoom-col>
        <zoom-col order="3" span="3">第二个</zoom-col>
        <zoom-col order="2" span="3">第三个</zoom-col>
        <zoom-col order="1" span="3">第四个</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- Col列偏移 -->
    <tab-template :code="offsetrHtml">
      <template slot="header">
        <h2>{{ $zoom.$t('Col列偏移') }}</h2>
        <text-template code="通过设置*Col*组件的*offset*属性来指定分栏偏移的栏数" />
      </template>
      <zoom-row>
        <zoom-col span="2">第一个</zoom-col>
        <zoom-col span="2" offset="1">第二个</zoom-col>
        <zoom-col span="2">第三个</zoom-col>
        <zoom-col span="2" offset="2">第四个</zoom-col>
      </zoom-row>
      <zoom-row>
        <zoom-col span="2" offset="3">第一个</zoom-col>
        <zoom-col span="2">第二个</zoom-col>
      </zoom-row>
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
              title: "分栏属性",
              name: "span / xl / lg / md / sm / xs",
              type: "String",
              text: "说明: 可以在不同屏幕下适配不同尺寸大小, <span>xl</span>为超大屏, <span>lg</span>为大屏, <span>md</span>为中屏, <span>sm</span>为小屏, <span>xs</span>为超小屏, span为所有屏通用, 范围在 <span>1 ~ 12</span> 之间",
              text2: '用法: span="可选参数",在<span>zoom-col</span> 标签上，绑定属性, 默认: <span>span="12"</span>'
            },
            {
              id: 2,
              title: "弹性布局",
              name: "flex",
              type: "Boolean",
              text: "在 <span>zoom-row</span> 标签上设置属性 <span>:flex=true</span> 可开启弹性布局, 注意在低版本IE下可能会不兼容",
              text2: '用法: 在<span>zoom-row</span>标签上标记<span>:flex="true"</span>'
            },
            {
              id: 3,
              title: "排列方式",
              name: "justify",
              type: "String",
              text: "配置了flex弹性布局后，可以定义排列方式。可选参数: <span>center</span> <span>end</span> <span>space-around</span>",
              text2: '用法: 在<span>zoom-row</span> 标签上，绑定属性 <span>justify="属性"</span>'
            },
            {
              id: 4,
              title: "对齐方式",
              name: "align",
              type: "String",
              text: "配置了flex弹性布局后，可以定义对齐方式。可选参数: <span>top</span> <span>middle</span> <span>bottom</span>",
              text2: '用法: 在<span>zoom-row</span> 标签上，绑定属性 <span>align="属性"</span>'
            },
            {
              id: 5,
              title: "偏移",
              name: "offset",
              type: "String",
              text: "说明: 通过设置<span>Col</span>组件的<span>offset</span>属性来指定分栏偏移的栏数, 范围 1 ~ 12 之间",
              text2: '用法: 在<span>zoom-col</span> 标签上，绑定属性 <span>offset="col偏移数( 1 ~ 12 之间)"</span>'
            }
          ]
        }
      ],
      offsetrHtml:
        `&lt;zoom-row>
            &lt;zoom-col span="2">第一个&lt;/zoom-col>
            &lt;zoom-col span="2" offset="1">第二个&lt;/zoom-col>
            &lt;zoom-col span="2">第三个&lt;/zoom-col>
            &lt;zoom-col span="2" offset="2">第四个&lt;/zoom-col>
          &lt;/zoom-row>
          &lt;zoom-row>
            &lt;zoom-col span="2" offset="3">第一个&lt;/zoom-col>
            &lt;zoom-col span="2">第二个&lt;/zoom-col>
          &lt;/zoom-row&gt;`,
      orderHtml:
        `&lt;zoom-row flex="true" justify="space-around" align="middle"&gt;
            &lt;zoom-col order="2" span="3"&gt;第一个&lt;/zoom-col&gt;
            &lt;zoom-col order="1" span="3"&gt;第二个&lt;/zoom-col&gt;
            &lt;zoom-col order="3" span="3"&gt;第三个&lt;/zoom-col&gt;
            &lt;zoom-col order="4" span="3"&gt;第四个&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;
          &lt;zoom-row flex="true" justify="space-around" align="middle"&gt;
            &lt;zoom-col order="4" span="3"&gt;第一个&lt;/zoom-col&gt;
            &lt;zoom-col order="3" span="3"&gt;第二个&lt;/zoom-col&gt;
            &lt;zoom-col order="2" span="3"&gt;第三个&lt;/zoom-col&gt;
            &lt;zoom-col order="1" span="3"&gt;第四个&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      flexHtml:
        `&lt;zoom-row flex="true" justify="space-around" align="middle"&gt;
            &lt;zoom-col span="3"&gt;第一个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第二个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第三个&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;
          &lt;zoom-row flex="true" justify="space-around" align="top"&gt;
            &lt;zoom-col span="3"&gt;第一个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第二个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第三个&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;
          &lt;zoom-row flex="true" justify="end" align="middle"&gt;
            &lt;zoom-col span="3"&gt;第一个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第二个&lt;/zoom-col&gt;
            &lt;zoom-col span="3"&gt;第三个&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      adaption:
        `&lt;zoom-row&gt;
            &lt;zoom-col xl="3" lg="4" md="6" sm="9" xs="12"&gt;不同屏自适应&lt;/zoom-col&gt;
            &lt;zoom-col span="12"&gt;通用&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      basicRow:
        `&lt;zoom-row&gt;
            &lt;zoom-col span="12"&gt;12&lt;/zoom-col&gt;
            &lt;zoom-col span="6"&gt;6&lt;/zoom-col&gt;
            &lt;zoom-col span="6"&gt;6&lt;/zoom-col&gt;
            &lt;zoom-col span="4"&gt;4&lt;/zoom-col&gt;
            &lt;zoom-col span="4"&gt;4&lt;/zoom-col&gt;
            &lt;zoom-col span="4"&gt;4&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;
          &lt;zoom-row&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;
          &lt;zoom-row&gt;
            &lt;zoom-col span="1"&gt;1&lt;/zoom-col&gt;
            &lt;zoom-col span="4"&gt;4&lt;/zoom-col&gt;
            &lt;zoom-col span="2"&gt;2&lt;/zoom-col&gt;
            &lt;zoom-col span="4"&gt;4&lt;/zoom-col&gt;
            &lt;zoom-col span="1"&gt;1&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-row {
  .basic {
    .zoom-row {
      margin: 10px 0;
      text-align: center;
    }
    .zoom-col {
      border: 3px solid #fff;
      background: #50bfff;
      border-radius: 15px;
      line-height: 24px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
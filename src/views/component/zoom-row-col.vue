<template>
  <div class="custom-zoom-row">
    <h1>栅格布局</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      参照bootstrap，通过Row列配置 + Col行配置，实现栅格系统，将屏幕一分为12格，可根据超大屏、大屏、中屏、小屏、超小屏等不同屏幕下，配置屏幕所占比。
      还可以通过flex属性实现flex布局
    </div>
    <h3>基础用法</h3>
    <p>通过<span>span</span>属性来设置分栏属性, 属性值范围 <span>1 ~ 12</span> 之间，无论大屏小屏，始终按照此比例</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
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
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="basicRow"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>适配不同屏幕</h2>
    <h3>可以根据不同屏幕, 设置不同分栏大小</h3>
    <p>
      可通过col配置的属性
      超大屏<span>xl</span>、
      大屏<span>lg</span>、
      中屏<span>md</span>、
      小屏<span>sm</span>、
      超小屏<span>xs</span>
      来分别设置不同屏幕下分栏效果，值范围<span>1 ~ 12</span>
    </p>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-row>
          <zoom-col xl="3" lg="4" md="6" sm="9" xs="12">不同屏自适应</zoom-col>
          <zoom-col span="12">通用</zoom-col>
        </zoom-row>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="adaption"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>Flex布局</h2>
    <p>通过设置<span>flex</span>属性为true来启用<span>flex</span>布局, 并通过<span>justify</span>与<span>align</span>属性调整子元素的对齐方式</p>
    <zoom-tabs class="basic" :value="flexTab" @tabChange="flexChange">
      <zoom-tab-item :index="0" label="效果">
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
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="flexHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>Order排序</h2>
    <p>在启用<span>flex</span>布局时, 可通过设置<span>Row</span>组件的<span>order</span>属性, 给带<span>Col组件</span>进行排序</p>
    <zoom-tabs class="basic" :value="orderTab" @tabChange="orderChange">
      <zoom-tab-item :index="0" label="效果">
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
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="orderHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>Col列偏移</h2>
    <p>通过设置<span>Col</span>组件的<span>offset</span>属性来指定分栏偏移的栏数</p>
    <zoom-tabs class="basic" :value="offsetTab" @tabChange="offsetChange">
      <zoom-tab-item :index="0" label="效果">
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
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="offsetrHtml"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <div class="attribute-type">
      <zoom-panel title="<span class='name'>flex</span><span class='type'>Boolean</span>">
        <h3>弹性布局</h3>
        <p>在 <span>zoom-row</span> 标签上设置属性 <span>:flex="true"</span> 可开启弹性布局, 注意在低版本IE下可能会不兼容</p>
        <p>用法: 在标签上标记<span>:flex="true"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>justify</span><span class='type'>String</span>">
        <h3>排列方式</h3>
        <p>可选参数: <span>center</span> <span>end</span> <span>space-around</span></p>
        <p>配置了flex弹性布局后, 在 <span>zoom-row</span> 标签上标记 <span>justify</span> 可以定义排列方式</p>
        <p>用法: 在标签上标记<span>justify="属性"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>align</span><span class='type'>String</span>">
        <h3>对齐方式</h3>
        <p>可选参数: <span>top</span> <span>middle</span> <span>bottom</span></p>
        <p>配置了flex弹性布局后, 在 <span>zoom-row</span> 标签上标记 <span>align</span> 可以定义对齐方式</p>
        <p>用法: 在标签上标记 <span>align="属性"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>order</span><span class='type'>Number</span>">
        <h3>自定义列排序</h3>
        <p>配置了flex弹性布局后, 在 <span>zoom-col</span> 标签上标记 <span>order</span> 可以定义排序顺序</p>
        <p>用法: 在标签上标记 <span>order="属性"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>span</span><span class='type'>Number</span>">
        <h3>分栏属性</h3>
        <p>可选参数: span / xl / lg / md / sm / xs</p>
        <p>说明: 可以在不同屏幕下适配不同尺寸大小, span默认为所有情况, 范围在 <span>1 ~ 12</span> 之间</p>
        <p>用法: span="可选参数", 默认: <span>span="12"</span></p>
      </zoom-panel>
      <zoom-panel title="<span class='name'>offset</span><span class='type'>Number</span>">
        <p>说明: 通过设置<span>Col</span>组件的<span>offset</span>属性来指定分栏偏移的栏数</p>
        <p>用法: 在标签上标记 <span>offset="col偏移数( 1 ~ 12 之间)"</span></p>
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
        &lt;zoom-row>
          &lt;zoom-col span="2">第一个&lt;/zoom-col>
          &lt;zoom-col span="2" offset="1">第二个&lt;/zoom-col>
          &lt;zoom-col span="2">第三个&lt;/zoom-col>
          &lt;zoom-col span="2" offset="2">第四个&lt;/zoom-col>
        &lt;/zoom-row>
        &lt;zoom-row>
          &lt;zoom-col span="2" offset="3">第一个&lt;/zoom-col>
          &lt;zoom-col span="2">第二个&lt;/zoom-col>
        &lt;/zoom-row&gt;
      `,
      orderHtml: `
        &lt;zoom-row flex="true" justify="space-around" align="middle"&gt;
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
        &lt;/zoom-row&gt;
      `,
      flexHtml: `
        &lt;zoom-row flex="true" justify="space-around" align="middle"&gt;
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
        &lt;/zoom-row&gt;
      `,
      adaption: `
        &lt;zoom-row&gt;
          &lt;zoom-col xl="3" lg="4" md="6" sm="9" xs="12"&gt;不同屏自适应&lt;/zoom-col&gt;
          &lt;zoom-col span="12"&gt;通用&lt;/zoom-col&gt;
        &lt;/zoom-row&gt;
      `,
      basicRow:`
        &lt;zoom-row&gt;
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
        &lt;/zoom-row&gt;
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
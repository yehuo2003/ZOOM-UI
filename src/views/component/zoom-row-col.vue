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
    <h2>属性</h2>
    <p>通过设置<span>Col</span>组件的<span>offset</span>属性来指定分栏偏移的栏数</p>
    <p>zoom-ui提供的row输入框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容</p>
    <div>
      <zoom-panel title="输入框类型: type">
        <p>可选参数: text / password</p>
        <p>默认: text</p>
        <p>类型: String</p>
        <p>用法: type="可选参数"</p>
      </zoom-panel>
      <zoom-panel title="占位符: placeHolder">
        <p>类型: String</p>
        <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
      </zoom-panel>
      <zoom-panel title="自定义icon: IconStyle">
        <p>类型: String</p>
        <p>配置了自定义icon后, 在输入框最右边显示, 可以配合onClick点击事件一起使用</p>
        <p>用法: 配置op对象, 设置 IconStyle="icon类名"</p>
      </zoom-panel>
      <zoom-panel title="错误信息: errMsg">
        <p>类型: String</p>
        <p>需要配置testing方法, 并且在方法返回false的情况下, 才会出现</p>
        <p>用法: 配置op对象, 设置 errMsg="要提示用户的错误信息"</p>
      </zoom-panel>
      <zoom-panel title="禁止输入: readonly">
        <p>类型: Boolean</p>
        <p>默认false, 为true禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容</p>
        <p>用法: 配置op对象, 设置 readonly="true"</p>
      </zoom-panel>
      <zoom-panel title="禁止输入: isdisabled">
        <p>类型: Boolean</p>
        <p>默认false, 为true则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容</p>
        <p>用法: 配置op对象, 设置 isdisabled="true"</p>
      </zoom-panel>
      <h2>方法</h2>
      <zoom-panel title="自定义icon的点击事件: onClick">
        <p>类型: Function</p>
        <p>用法: 配置op对象, 并设置了自定义icon后, 设置 onClick:val => {}; val为输入框内容</p>
      </zoom-panel>
      <zoom-panel title="验证方法: testing">
        <p>类型: Function</p>
        <p>用法: 配置op对象, 并设置了errMsg后, 设置 testing:val => {}; val为输入框内容, 如果方法返回false则显示errMsg的内容</p>
      </zoom-panel>
    </div>
    <zoom-button @click="prevClick">按钮组件</zoom-button>
    <zoom-button @click="nextClick">下拉框组件</zoom-button>
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
    },
    prevClick() {
      this.$router.push('/component/zoom-button');
    },
    nextClick() {
      this.$router.push('/component/zoom-dropdown');
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
      background: #50bfff;
      border: 3px solid #fff;
      border-radius: 10px;
      color: #333;
    }
  }
  h1,h2 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
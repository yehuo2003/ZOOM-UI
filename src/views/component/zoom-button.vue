<template>
  <div class="custom-zoom-button">
    <!-- 普通 -->
    <tab-template :code="btn">
      <template slot="header">
        <h2>基本用法</h2>
        <p>基础按钮的用法</p>
      </template>
      <zoom-button
        v-for="item of btnList"
        :key=" 1 + item.id"
        :type="item.type"
      >{{item.text + '按钮'}}</zoom-button>
      <br />
      <zoom-button
        v-for="item of btnList"
        :key=" 10 + item.id"
        :type="item.type"
        shape="plain"
      >{{item.text + '平角'}}</zoom-button>
      <br />
      <zoom-button
        v-for="item of btnList"
        :key=" 20 + item.id"
        :type="item.type"
        shape="round"
      >{{item.text + '圆角'}}</zoom-button>
      <br />
      <zoom-button
        v-for="item of btnList"
        :key=" 30 + item.id"
        :type="item.type"
        shape="circle"
      >圆形</zoom-button>
    </tab-template>
    <!-- 禁用间隔 -->
    <tab-template :code="resetBtn">
      <template slot="header">
        <h2>禁用/防抖</h2>
        <p>
          通过
          <span>disabled</span>属性设置按钮为禁用状态
        </p>
        <p>
          通过
          <span>reset-time</span>属性设置按钮防抖时间, 单位为毫秒, 默认 <span>1000</span> 毫秒
        </p>
      </template>
      <zoom-button>正常按钮</zoom-button>
      <zoom-button reset-time="5000">禁用5秒</zoom-button>
      <zoom-button reset-time="0">禁用0秒</zoom-button>
    </tab-template>
    <!-- 大小 -->
    <tab-template :code="sizeBtn">
      <template slot="header">
        <h2>按钮大小</h2>
        <p>可指定按钮大小, 属性: size</p>
      </template>
      <zoom-button type="primary" size="mini">迷你</zoom-button>
      <zoom-button type="success" size="small">小按钮</zoom-button>
      <zoom-button>普通按钮</zoom-button>
      <zoom-button type="danger" size="medium">中等按钮</zoom-button>
      <zoom-button type="info" size="large">大按钮</zoom-button>
    </tab-template>
    <!-- op -->
    <tab-template :code="opBtn">
      <template slot="header">
        <h2>自定义配置属性</h2>
        <p>对于属性较多的组件，zoom-ui提供了自定义配置面板，使用需绑定对象op，op里可自定义属性，如按钮类型和按钮禁用等。当配置了op属性后，标签内的属性将会被覆盖失效</p>
      </template>
      <zoom-button :op="op">按钮1</zoom-button>
      <br />
      <zoom-button :op="op2">按钮2</zoom-button>
    </tab-template>
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
              title: "按钮类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>primary</span> / <span>info</span> / <span>warning</span> / <span>success</span> / <span>danger</span>",
              text2: '用法: 配置op对象, 设置 <span>type: "按钮状态"</span>, 或在组件标签上绑定<span>type= "按钮状态"</span>'
            },
            {
              id: 2,
              title: "按钮形状",
              name: "shape",
              type: "String",
              text: "可选参数: <span>plain</span> / <span>round</span> / <span>circle</span>",
              text2: '用法: 配置op对象, 设置 <span>shape: "按钮形状"</span>, 或在组件标签上绑定<span>shape="按钮形状"</span>'
            },
            {
              id: 3,
              title: "按钮大小",
              name: "size",
              type: "String",
              text: "可选参数: <span>mini</span> / <span>small</span> / <span>medium</span> / <span>large</span>",
              text2: '用法: 配置op对象, 设置 <span>size: "属性"</span>, 或在组件标签上绑定<span>size="属性"</span>'
            },
            {
              id: 4,
              title: "点击间隔",
              name: "reset-time",
              type: "Number",
              text: "默认: 1000 毫秒",
              text2: '用法: <span>:reset-time="时间"</span>或者配置op对象, 设置 <span>resetTime: "时间"</span>'
            },
            {
              id: 5,
              title: "按钮禁用",
              name: "disabled",
              type: "Boolean",
              text: "可选参数: <span>true</span> / <span>false</span>, 默认 <span>false</span>",
              text2: '用法: 配置op对象, 设置 <span>disabled="true"</span>'
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
              text2: '用法: 配置op对象, 设置 <span>@click="自定义事件"</span>'
            },
            {
              id: 2,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      op: {
        type: "primary",
        disabled: false, // 是否禁用 类型 布尔
        onClick: () => {
          console.log("按钮被点击了");
        } //回调函数 点击时候触发
      },
      op2: {
        type: "warning",
        disabled: true, // 是否禁用 类型 布尔
        IconStyle: "icon-close", // 启用字体图标,传入icon开头的字体图标class,类型为字符串
        onClick: function() {
          console.log("按钮被点击了");
        } //回调函数 点击时候触发
      },
      btnList: [
        { id: 1, text: "普通", type: null },
        { id: 2, text: "主要", type: "primary" },
        { id: 3, text: "成功", type: "success" },
        { id: 4, text: "警告", type: "warning" },
        { id: 5, text: "危险", type: "danger" },
        { id: 6, text: "信息", type: "info" }
      ],
      sizeBtn: `
        &lt;zoom-button type="primary" size="mini"&gt;迷你&lt;/zoom-button&gt;
        &lt;zoom-button type="success" size="small"&gt;小按钮&lt;/zoom-button&gt;
        &lt;zoom-button&gt;普通按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="danger" size="medium"&gt;中等按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="info" size="large"&gt;大按钮&lt;/zoom-button&gt;`,
      opBtn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-button :op="op"&gt;按钮1&lt;/zoom-button&gt;
            &lt;zoom-button :op="op2"&gt;按钮2&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                op: {
                  type: 'primary',
                  disabled: false,	// 是否禁用 类型 布尔
                  onClick: () =>; {   //回调函数 点击时候触发
                    console.log('按钮被点击了')
                  }
                },
                op2: {
                  type: 'warning',  // 按钮类型
                  disabled: true,	// 是否禁用 类型 布尔
                  IconStyle: 'icon-close',		// 启用字体图标,传入icon开头的字体图标class,类型为字符串
                  onClick: () =>; {
                    console.log('禁用状态无法点击')
                },
              }
            }
          }
        &lt;/script&gt;`,
      resetBtn: `
        &lt;zoom-button&gt;正常按钮&lt;/zoom-button&gt;
        &lt;zoom-button reset-time="5000"&gt;禁用5秒&lt;/zoom-button&gt;
        &lt;zoom-button reset-time="0"&gt;禁用0秒&lt;/zoom-button&gt;`,
      btn: `
        &lt;zoom-button&gt;普通按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="primary"&gt;普通按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="success"&gt;成功按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="warning"&gt;警告按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="danger"&gt;危险按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="info"&gt;信息按钮&lt;/zoom-button&gt;

        &lt;zoom-button shape="plain"&gt;普通平角&lt;/zoom-button&gt;
        &lt;zoom-button shape="plain" type="primary"&gt;普通平角&lt;/zoom-button&gt;
        &lt;zoom-button shape="plain" type="success"&gt;成功平角&lt;/zoom-button&gt;
        &lt;zoom-button shape="plain" type="warning"&gt;警告平角&lt;/zoom-button&gt;
        &lt;zoom-button shape="plain" type="danger"&gt;危险平角&lt;/zoom-button&gt;
        &lt;zoom-button shape="plain" type="info"&gt;信息平角&lt;/zoom-button&gt;

        &lt;zoom-button shape="round"&gt;普通圆角&lt;/zoom-button&gt;
        &lt;zoom-button shape="round" type="primary"&gt;普通圆角&lt;/zoom-button&gt;
        &lt;zoom-button shape="round" type="success"&gt;成功圆角&lt;/zoom-button&gt;
        &lt;zoom-button shape="round" type="warning"&gt;警告圆角&lt;/zoom-button&gt;
        &lt;zoom-button shape="round" type="danger"&gt;危险圆角&lt;/zoom-button&gt;
        &lt;zoom-button shape="round" type="info"&gt;信息圆角&lt;/zoom-button&gt;

        &lt;zoom-button shape="circle"&gt;圆形&lt;/zoom-button&gt;
        &lt;zoom-button shape="circle" type="primary"&gt;圆形&lt;/zoom-button&gt;
        &lt;zoom-button shape="circle" type="success"&gt;圆形&lt;/zoom-button&gt;
        &lt;zoom-button shape="circle" type="warning"&gt;圆形&lt;/zoom-button&gt;
        &lt;zoom-button shape="circle" type="danger"&gt;圆形&lt;/zoom-button&gt;
        &lt;zoom-button shape="circle" type="info"&gt;圆形&lt;/zoom-button&gt;`
    };
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-button {
  .basic {
    .zoom-btn {
      margin: 15px 5px;
    }
    .zoom-circle {
      margin: 15px 25px;
    }
  }
}
</style>
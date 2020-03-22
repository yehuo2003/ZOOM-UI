<template>
  <div class="custom-zoom-button">
    <h1>Button组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <h3>基础样式</h3>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button v-for="item of btnList" :key=" 1 + item.id" :type="item.type">{{item.text + '按钮'}}</zoom-button>
        <br>
        <zoom-button v-for="item of btnList" :key=" 10 + item.id" :type="item.type" shape="plain">{{item.text + '平角'}}</zoom-button>
        <br>
        <zoom-button v-for="item of btnList" :key=" 20 + item.id" :type="item.type" shape="round">{{item.text + '圆角'}}</zoom-button>
        <br>
        <zoom-button v-for="item of btnList" :key=" 30 + item.id" :type="item.type" shape="circle">圆形</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="btn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <!-- 禁用间隔 -->
    <h3>按钮禁用时间间隔</h3>
    <p>点击按钮后禁用的时间，默认为1秒，可以手动设置reset-time属性，单位为毫秒</p>
    <zoom-tabs class="basic" :value="reseTab" @tabChange="reseChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button>正常按钮</zoom-button>
        <zoom-button reset-time="5000">禁用5秒</zoom-button>
        <zoom-button reset-time="0">禁用0秒</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="resetBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <!-- 大小 -->
    <h3>按钮大小</h3>
    <p>可指定按钮大小, 属性: size</p>
    <zoom-tabs class="basic" :value="sizeTab" @tabChange="sizeChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button type="primary" size="mini">迷你</zoom-button>
        <zoom-button type="success" size="small">小按钮</zoom-button>
        <zoom-button>普通按钮</zoom-button>
        <zoom-button type="danger" size="medium">中等按钮</zoom-button>
        <zoom-button type="info" size="large">大按钮</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="sizeBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <!-- op -->
    <h3>自定义配置属性</h3>
    <p>对于属性较多的组件，zoom-ui提供了自定义配置面板，使用需绑定对象op，op里可自定义属性，如type和按钮禁用等</p>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button :op="op">按钮1</zoom-button>
        <br>
        <zoom-button :op="op2">按钮2</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opBtn"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="按钮类型: type">
      <p>可选参数: primary / info / warning / success / danger</p>
      <p>类型: String</p>
      <p>用法: type="可选参数"</p>
    </zoom-panel>
    <zoom-panel title="按钮形状: shape">
      <p>可选参数: plain / round / circle</p>
      <p>类型: String</p>
      <p>用法: shape="可选参数", 默认: plain</p>
    </zoom-panel>
    <zoom-panel title="按钮大小: size">
      <p>可选参数: mini / small / medium / large</p>
      <p>类型: String</p>
      <p>用法: size="可选参数"</p>
    </zoom-panel>
    <zoom-panel title="点击后禁用时间: resetTime">
      <p>默认: 1000 毫秒</p>
      <p>类型: Number</p>
      <p>用法: :reset-time="1000"</p>
    </zoom-panel>
    <zoom-panel title="按钮禁用: isdisabled">
      <p>默认: false</p>
      <p>类型: Boolean</p>
      <p>用法: 配置op对象, 设置 isdisabled="true"</p>
    </zoom-panel>
    <h2>方法</h2>
    <zoom-panel title="点击事件: onClick">
      <p>可绑定点击事件</p>
      <p>类型: Function</p>
      <p>用法: 配置op对象, 设置 @click="自定义事件"</p>
    </zoom-panel>
    <zoom-button @click="prevClick">自定义主题</zoom-button>
    <zoom-button @click="nextClick">输入框组件</zoom-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      op: {
        type: 'primary',
        isdisabled: false,	// 是否禁用 类型 布尔
        onClick: () => {console.log('按钮被点击了')}			//回调函数 点击时候触发
      },
      op2: {
        type: 'warning',
        isdisabled: true,	// 是否禁用 类型 布尔
        IconStyle: 'icon-close',		// 启用字体图标,传入icon开头的字体图标class,类型为字符串
        onClick: function(){console.log('按钮被点击了')}			//回调函数 点击时候触发
      },
      btnList: [
        {id: 1, text: '普通', type: null},
        {id: 2, text: '主要', type: 'primary'},
        {id: 3, text: '成功', type: 'success'},
        {id: 4, text: '警告', type: 'warning'},
        {id: 5, text: '危险', type: 'danger'},
        {id: 6, text: '信息', type: 'info'},
      ],
      curTab: 0,
      reseTab: 0,
      opTab: 0,
      sizeTab: 0,
      sizeBtn: `
        &lt;zoom-button type="primary" size="mini"&gt;迷你&lt;/zoom-button&gt;
        &lt;zoom-button type="success" size="small"&gt;小按钮&lt;/zoom-button&gt;
        &lt;zoom-button&gt;普通按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="danger" size="medium"&gt;中等按钮&lt;/zoom-button&gt;
        &lt;zoom-button type="info" size="large"&gt;大按钮&lt;/zoom-button&gt;
      `,
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
                  isdisabled: false,	// 是否禁用 类型 布尔
                  onClick: () =>; {   //回调函数 点击时候触发
                    console.log('按钮被点击了')
                  }
                },
                op2: {
                  type: 'warning',  // 按钮类型
                  isdisabled: true,	// 是否禁用 类型 布尔
                  IconStyle: 'icon-close',		// 启用字体图标,传入icon开头的字体图标class,类型为字符串
                  onClick: () =>; {
                    console.log('禁用状态无法点击')
                },
              }
            }
          }
        &lt;/script&gt;
      `,
      resetBtn: `
        &lt;zoom-button&gt;正常按钮&lt;/zoom-button&gt;
        &lt;zoom-button reset-time="5000"&gt;禁用5秒&lt;/zoom-button&gt;
        &lt;zoom-button r/78eset-time="0"&gt;禁用0秒&lt;/zoom-button&gt;
      `,
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
        &lt;zoom-button shape="circle" type="info"&gt;圆形&lt;/zoom-button&gt;
      `
    }
  },
  methods: {
    tabChange(index) {
      this.curTab = index
    },
    reseChange(index) {
      this.reseTab = index
    },
    opChange(index) {
      this.opTab = index
    },
    sizeChange(index) {
      this.sizeTab = index
    },
    prevClick() {
      this.$router.push('/component/custom-icon');
    },
    nextClick() {
      this.$router.push('/component/zoom-input');
    }
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
  h1,h2 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
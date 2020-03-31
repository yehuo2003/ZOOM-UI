<template>
  <div class="custom-zoom-rate">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的评分组件, 目前有两种模式, 星星图标和表情图标, 默认展示星星图标<br>
      用户可以用v-model绑定组件, 动态获取用户选中的评分数量
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-rate></zoom-rate>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化设置</h2>
    <p>可对注销组件配置<span>op</span>对象进行个性化设置</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-rate :op="rateOp"></zoom-rate>
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
              title: "模式",
              name: "mode",
              type: "String",
              text: "默认<span>stars</span>, 可选参数: 星星:<span>stars</span>, 表情: <span>emotions</span>",
              text2: '用法: 配置op属性, 设置<span>mode: emotions</span>'
            },
            {
              id: 2,
              title: "是否禁用",
              name: "isdisabled",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁用组件",
              text2: '用法: 配置op属性, 设置<span>isdisabled: "true"</span>'
            },
            {
              id: 3,
              title: "评分组件数据",
              name: "data",
              type: "Array",
              text: "可自定义要绑定的数据, 用<span>v-model</span>动态获取",
              text2: '用法: 配置op属性, 设置<span>data: []</span>'
            }
          ]
        }
      ],
      rateOp: {
        mode: 'emotions',	//	默认 stars, 星星图标, emotions为表情
        isdisabled: false,  //  是否禁用
        data: ['很差', '差', '一般', '好', '很好'],
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-rate :op="rateOp"&gt;&lt;/zoom-rate&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                rateOp: {
                  mode: 'emotions',	//	默认 stars, 星星图标, emotions为表情
                  isdisabled: false,  //  是否禁用
                  data: ['很差', '差', '一般', '好', '很好'], //  对应绑定图标的属性
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;zoom-rate&gt;&lt;/zoom-rate&gt;
      `
    }
  },
  methods: {
    rate2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    rate1Num() {
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
<template>
  <div class="custom-zoom-rate">
    <!-- 普通 -->
    <div class="tip">
      <text-template code="zoom-ui提供的评分组件, 目前有两种模式, 星星图标和表情图标, 默认展示星星图标" />
      <text-template code="用户可以用v-model绑定组件, 动态获取用户选中的评分数量" />
    </div>
    <tab-template :code="rateCode">
      <zoom-rate></zoom-rate>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template cls="data-drop" :code="rateCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('个性化设置') }}</h2>
        <text-template code="可对注销组件配置 *op* 对象进行个性化设置" />
      </template>
      <zoom-rate :op="rateOp"></zoom-rate>
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
              title: "模式",
              name: "mode",
              type: "String",
              text: "默认<span>stars</span>, 可选参数: 星星:<span>stars</span>, 表情: <span>emotions</span>",
              text2: '用法: 配置op属性, 设置<span>mode: emotions</span>'
            },
            {
              id: 2,
              title: "是否禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁用组件",
              text2: '用法: 配置op属性, 设置<span>disabled: "true"</span>'
            },
            {
              id: 3,
              title: "评分组件数据",
              name: "data",
              type: "Array",
              text: "可自定义要绑定的数据, 用<span>v-model</span>动态获取",
              text2: '用法: 配置op属性, 设置<span>data: []</span>'
            },
            {
              id: 4,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      rateOp: {
        mode: 'emotions',	//	默认 stars, 星星图标, emotions为表情
        disabled: false,  //  是否禁用
        data: ['很差', '差', '一般', '好', '很好'],
      },
      rateCustom:
        `&lt;template&gt;
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
                    disabled: false,  //  是否禁用
                    data: ['很差', '差', '一般', '好', '很好'], //  对应绑定图标的属性
                  }
                }
              }
            }
          &lt;/script&gt;`,
      rateCode: `&lt;zoom-rate&gt;&lt;/zoom-rate&gt;`
    }
  },
  methods: {
    rate2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    rate1Num() {
      console.log('滑块1当前值是' + this.num1);
    }
  }
}
</script>
<template>
  <div class="custom-zoom-button">
    <!-- 普通 -->
    <tab-template :code="btn">
      <template slot="header">
        <div class="tip">
          <text-template code="按钮群组即为按钮的集合, 组件包含按钮组件的功能" />
          <text-template code="可以绑定多个按钮为数据" />
        </div>
        <h2>{{ $zoom.$t('基本用法') }}</h2>
        <text-template code="基础按钮的用法" />
      </template>
      <zoom-button-group :op="btnOp"></zoom-button-group>
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
              title: "绑定数据",
              name: "data",
              type: "Array",
              text: "以数组对象方式绑定按钮群组的数据",
              text2: '用法: 绑定op属性, 设置<span>data: [{...}]</span>绑定数据'
            },
            {
              id: 2,
              title: "按钮形状",
              name: "shape",
              type: "String",
              text: "可选参数: <span>plain</span> / <span>round</span> / <span>circle</span>",
              text2: '用法: <span>shape="可选参数"</span>, 默认: <span>plain</span>'
            },
            {
              id: 3,
              title: "按钮大小",
              name: "size",
              type: "String",
              text: "可选参数: <span>mini</span> / <span>small</span> / <span>medium</span> / <span>large</span>",
              text2: '用法: <span>size="参数"</span>'
            },
            {
              id: 4,
              title: "点击间隔",
              name: "reset-time",
              type: "Number",
              text: "默认: 1000 毫秒",
              text2: '用法: <span>:reset-time="时间"</span>'
            },
            {
              id: 5,
              title: "按钮禁用",
              name: "disabled",
              type: "Boolean",
              text: "可选参数: <span>true</span> / <span>false</span>, 默认 <span>false</span>",
              text2: '用法: 配置op对象, 设置 <span>disabled="true"</span>'
            },
            {
              id: 6,
              title: "按钮类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>primary</span> / <span>info</span> / <span>warning</span> / <span>success</span> / <span>danger</span>",
              text2: '用法: 配置op对象, 设置 <span>type: "按钮状态"</span>'
            },
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
      btnOp: {
        disabled: false,  //  是否禁用
        shape: 'plain', //  按钮形状
        // resetTime: 5000, //  防抖时间
        // type: 'primary', // 按钮类型
        data: [ //  按钮数据
          {text: '按钮1', value: 1},
          {text: '按钮2', value: 2},
          {text: '按钮3', value: 3}
        ],
        onClick: (val, index) => {  //  按钮点击事件
          console.log(val, 'val');
          console.log(index, 'index');
        }
      },
      btn:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button-group :op="btnOp"&gt;&lt;/zoom-button-group&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  btnOp: {
                    disabled: false,  //  是否禁用
                    shape: 'plain', //  按钮形状
                    // resetTime: 5000, //  防抖时间
                    // type: 'primary', // 按钮类型
                    data: [ //  按钮数据
                      {text: '按钮1', value: 1},
                      {text: '按钮2', value: 2},
                      {text: '按钮3', value: 3}
                    ],
                    onClick: (val, index) =&gt; {  //  按钮点击事件
                      console.log(val, 'val');
                      console.log(index, 'index');
                    }
                  }
                }
              }
            }
          &lt;/script&gt;`
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
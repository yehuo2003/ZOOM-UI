<template>
  <div class="custom-zoom-floatbar">
    <div class="tip">
      <text-template code="float.bar.tip" />
    </div>
    <!-- 普通 -->
    <tab-template :code="floatbarCode">
      <template slot="header">
        <h2>{{ $zoom.$t('基本用法') }}</h2>
        <h3>{{ $zoom.$t('请看屏幕右边') }}</h3>
      </template>
      <zoom-floatbar :op="op"></zoom-floatbar>
    </tab-template>
    <!-- 自定义模式 -->
    <tab-template :code="floatbarCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('自定义模式') }}</h2>
        <text-template code="如果op属性里未配置data属性, 则启用自定义模式" />
      </template>
      <zoom-floatbar :op="floatBarOp">
        <text-template code="自定义内容" />
        <text-template code="点击按钮" />
        <text-template code="解除固定" />
      </zoom-floatbar>
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
              title: "浮动块导航数据",
              name: "data",
              type: "Array",
              text:
                "以数组对象形式保存",
              text2:
                '用法: 配置op对象, 设置<span>data: [{title: xx, url: xxx}]</span>'
            },
            {
              id: 2,
              title: "跳转链接",
              name: "url",
              type: "String",
              text:
                "可以自定义跳转链接, 默认在当前窗口打开, 如果要新窗口打开可以添加属性<span>target: 'blank'</span>",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>url: xx</span>'
            },
            {
              id: 3,
              title: "自定义标题",
              name: "text",
              type: "String",
              text:
                "可以自定义浮动块标题",
              text2:
                '用法: 配置op对象并设置data数据, 在条目中设置<span>text: xx</span>'
            },
            {
              id: 4,
              title: "定位",
              name: "position",
              type: "String",
              text:
                "浮动块定位, 默认在右边, 可选参数: <span>right</span>, <span>left</span>",
              text2: '用法: 配置op对象, 设置 <span>position: "right"</span>'
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
              text2: '用法: 配置op对象并设置data数据, 在条目中绑定<span> onClick="自定义事件"</span>'
            }
          ]
        }
      ],
      op: {
        position: 'right',	// 默认right 可选参数 left, right
        data: [	//	如果未设置data 则默认显示自定义内容
          {text: '购物车', icon: 'icon-shopping-cart', onClick: val => {console.log(val);}},
          {text: '电话', icon: 'icon-phone'},
          {text: '首页', icon: 'icon-nav', url: '/', target: 'blank'}
        ]
      },
      floatBarOp: {
        position: 'left',
      },
      floatbarCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-floatbar :op="floatBarOp"&gt;
                &lt;a&gt;自定义内容&lt;/a&gt;
                &lt;p&gt;点击按钮&lt;/p&gt;
                &lt;p&gt;解除固定&lt;/p&gt;
              &lt;/zoom-floatbar&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  floatBarOp: {
                    position: 'left',
                  }
                }
              }
            }
          &lt;/script&gt;`,
      floatbarCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-floatbar :op="op"&gt;&lt;/zoom-floatbar&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  op: {
                    position: 'right',	// 默认right 可选参数 left, right
                    data: [	//	如果未设置data 则默认显示自定义内容
                      {text: '购物车', icon: 'icon-shopping-cart', onClick: val =&gt; {console.log(val);}},
                      {text: '电话', icon: 'icon-phone'},
                      {text: '首页', icon: 'icon-nav', url: '/', target: 'blank'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`
    };
  }
};
</script>
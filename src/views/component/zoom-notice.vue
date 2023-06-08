<template>
  <div class="custom-zoom-notice">
    <!-- 普通 -->
    <div class="tip">
      <text-template code="文字滚动可以设置横向滚动或者纵向滚动, 默认为横向滚动" />
      <text-template code="横向滚动时候, 可以设置自定义icon图标, 默认为喇叭" />
      <text-template code="滚动时候当鼠标经过可以暂停滚动, 可关闭此效果" />
    </div>
    <tab-template :code="noticeCode">
      <zoom-notice>这是一段滚动文字内容</zoom-notice>
    </tab-template>
    <!-- 设置纵向滚动 -->
    <tab-template cls="data-drop" :code="noticeCodeCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('设置纵向滚动') }}</h2>
        <text-template code="可以通过组件的 *vertical* 属性修改组件为纵向滚动条" />
      </template>

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
              title: "组件的Icon图标",
              name: "IconStyle",
              type: "String",
              text: "默认图标为喇叭, 只有在组件为横向滚动时候配置才能生效",
              text2: '用法: 配置op属性, 设置<span>IconStyle: 属性</span>'
            },
            {
              id: 2,
              title: "标题",
              name: "title",
              type: "String",
              text: "可以自定义组件的标题, 标题是不会随着内容而滚动的",
              text2: '用法: 配置op属性, 设置<span>title: 标题</span>'
            },
            {
              id: 3,
              title: "关闭鼠标经过暂停效果",
              name: "notSuspend",
              type: "Boolean",
              text: "默认<span>false</span>, 设置为<span>true</span>则关闭鼠标经过时候的暂停效果",
              text2: '用法: 配置op属性, 设置<span>notSuspend: true</span>'
            },
            {
              id: 4,
              title: "滚动时间",
              name: "time",
              type: "Number",
              text: "滚动从头到尾一次的时间, 设置单位: 毫秒",
              text2: '用法: 配置op属性, 设置<span>time: 5000</span>'
            }
          ]
        }
      ],
      noticeOp: {
        IconStyle: 'icon-trumpet',  //  横向滚动时候的图标
        title: '纵向滚动栏',      //  设置标题
        notSuspend: false,  //  滚动时候鼠标经过暂停, 设置true关闭
        vertical: true,  //  是否垂直滚动, 默认false
        time: 5000  //  滚动的时间
      },
      noticeCodeCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-notice :op="noticeOp"&gt;这是一段滚动文字内容&lt;/zoom-notice&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  noticeOp: {
                    IconStyle: 'icon-trumpet',  //  横向滚动时候的图标
                    title: '纵向滚动栏',      //  设置标题
                    notSuspend: false,  //  滚动时候鼠标经过暂停, 设置true关闭
                    vertical: true,  //  是否垂直滚动, 默认false
                    time: 5000  //  滚动的时间
                  }
                }
              }
            }
          &lt;/script&gt;`,
      noticeCode: `&lt;zoom-notice&gt;这是一段滚动文字内容&lt;/zoom-notice&gt;`
    }
  },
  methods: {
    notice2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    notice1Num() {
      console.log('滑块1当前值是' + this.num1);
    }
  }
}
</script>
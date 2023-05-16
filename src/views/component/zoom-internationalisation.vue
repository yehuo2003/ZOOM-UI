<template>
  <div class="custom-zoom-internationalisation">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的国际化组件, 目前已封装了三种国际化, 分别为中文zh、英文en以及日文ja<br>
      封装的国际化仅限于zoom-ui组件部分, 需要配置更多的国际化可前往 <router-link to="/SDK/internationalisation">国际化</router-link> 查看 <br>
      用户还可以动态配置, 自己需要的语言供组件切换
    </div>
    <tab-template cls="data-drop" :code="internationalisationCode">
      <template slot="header">
        <h2>基础使用</h2>
        <p>点击切换对应国际化后会刷新页面</p>
      </template>
      <zoom-internationalisation></zoom-internationalisation>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template cls="data-drop" :code="internationalisationCustom">
      <template slot="header">
        <h2>个性化设置</h2>
        <p>可对国际化组件配置<span>op</span>对象进行个性化设置</p>
      </template>
      <zoom-internationalisation :op="internationalisationOp"></zoom-internationalisation>
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
              title: "切换完国际化后要跳转的页面",
              name: "url",
              type: "String",
              text: "配置切换国际化后, 要跳转的页面, 如果未配置则默认刷新页面",
              text2: '用法: 配置op属性, 设置<span>url: "跳转地址"</span>'
            },
            {
              id: 2,
              title: "展示的名称",
              name: "title",
              type: "String",
              text: "默认要展示的标题, 请与<span>data</span>数组里的<span>text</span>值对应",
              text2: '用法: 配置op属性, 设置<span>title: "名称"</span>'
            },
            {
              id: 3,
              title: "国际化数据",
              name: "data",
              type: "Array",
              text: "国际化数据 <span>value</span>是要切换的国际化名, <span>text</span>是展示给用户的, 与<span>title</span>对应的条目将不会展示在下拉框中",
              text2: '用法: 配置op属性, 设置<span>data: 数组对象</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "动态设置国际化数据",
              name: "load",
              type: "Function",
              text: "动态设置国际化数据, 需要绑定<span>ref</span>来动态设置数据",
              text2: '用法: 标签中绑定ref, <span>this.$refs["绑定数据"].load(this.op)</span>'
            },
          ]
        }
      ],
      internationalisationOp: {
        url: '/',  //  国际化切换后要跳转的url
        title: 'China', //  默认要展示的标题, 请与data数组里的text值对应
        data: [ // 国际化数据 value是要切换的国际化名, text是展示给用户的, 与title对应的条目将不会展示在下拉框中
          {value: 'zh', text: 'China'},
          {value: 'en', text: 'English'}
        ]
      },
      internationalisationCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-internationalisation :op="op"&gt;&lt;/zoom-internationalisation&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  op: {
                    url: '/',  //  国际化切换后要跳转的url
                    title: 'China', //  默认要展示的标题, 请与data数组里的text值对应
                    data: [ // 国际化数据 value是要切换的国际化名, text是展示给用户的, 与title对应的条目将不会展示在下拉框中
                      {value: 'zh', text: 'China'},
                      {value: 'en', text: 'English'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`,
      internationalisationCode: `&lt;zoom-internationalisation&gt;&lt;/zoom-internationalisation&gt;`
    }
  },
  methods: {
    internationalisation2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    internationalisation1Num() {
      console.log('滑块1当前值是' + this.num1);
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-internationalisation {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 120px;
    }
  }
}
</style>
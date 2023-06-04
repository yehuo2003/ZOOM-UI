<!--
 * @Description: SDK
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 13:15:41
-->
<template>
  <div class="explanation">
    <h2>Software Development Kit</h2>
    <div class="tip">
      <text-template code="explanation.tip1" />
      <text-template code="explanation.tip2" />
    </div>
    <h2>{{ $zoom.$t('SDK方法一览') }}</h2>
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
          title: "方法",
          content: [
            {
              id: 1,
              title: "内置扩展指令",
              name: "directive",
              type: "Function",
              text: "参数: <span>focus</span>、<span>drag</span>、<span>tip</span>、<span>lazyupload</span>",
              text2: 'explanation.focus'
            },
            {
              id: 2,
              title: "国际化",
              name: "internationalisation",
              type: "Function",
              text: "先要按照指定方式导入国际化文件, zoom-ui也集成了部分国际化, 可以直接使用",
              text2: '用法:DOM元素内 <span>$zoom.$t("国际化名")</span>, js中使用: <span>this.$zoom.$t("国际化名")</span>, 具体用法参考: <a href="#/SDK/internationalisation">国际化</a>'
            },
            {
              id: 3,
              title: "DOM操作指令",
              name: "dom-operation",
              type: "Function",
              text: "zoom-ui内部封装的类似于<span>jQuery</span>的选择器, 操作方法<span>jQuery</span>大致相同, 虽然没有<span>jQuery</span>功能全面, 但是胜在体积小方便操作, 如果需要更复杂的操作可以引入<span>jQuery</span>",
              text2: '用法: 使用命令: <span>$("元素")</span>或者<span>$Z("元素")</span>可以获取DOM元素, 然后再进行增删改查操作, 具体用法参考: <a href="#/SDK/dom-operation">DOM操作指令</a>'
            },
            {
              id: 4,
              title: "日期格式化",
              name: "date-format",
              type: "Function",
              text: "传入需要格式化的日期和需要格式化的形式, 函数会自动返回开发者想要的时间格式",
              text2: '用法: 调用方法: <span>this.$zoom.dateFormat("YYYY-mm-dd HH:MM", date)</span>, 具体用法参考: <a href="#/SDK/date-format">日期格式化</a>'
            },
            {
              id: 5,
              title: "cookie操作",
              name: "cookie-operation",
              type: "Function",
              text: "zoom-ui封装的一套对于cookie增删改查等一系列的复杂操作",
              text2: '用法: 调用方法: <span>this.$zoom.cookie.func</span>, 具体用法参考: <a href="#/SDK/cookie-operation">cookie操作</a>'
            },
            {
              id: 6,
              title: "深拷贝",
              name: "deep-clone",
              type: "Function",
              text: "可用于对复杂对象、数组、多维数组、数组对象等等进行深拷贝操作",
              text2: '用法: 调用方法: <span>this.$zoom.clone("拷贝对象")</span>, 具体用法参考: <a href="#/SDK/deep-clone">深拷贝</a>'
            },
            {
              id: 7,
              title: "随机数/随机颜色",
              name: "random",
              type: "Function",
              text: "获得一个自定义范围内的随机数/随机颜色",
              text2: '*this.$zoom.$rn("随机数范围")*'
            }
          ]
        }
      ]
    };
  },
  methods: {
    nextClick() {
      this.$router.push('/component/custom-color');
    }
  }
};
</script>
<style lang="scss" scoped>
.explanation {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
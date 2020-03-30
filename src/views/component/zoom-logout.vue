<template>
  <div class="custom-zoom-logout">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的注销组件, 以a标签形式, 默认文字为"注销", 可自行修改<br>
      点击注销后清空cookie缓存, 并刷新页面, 如果有指定的url则进行跳转
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-logout></zoom-logout>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化设置</h2>
    <p>可对注销组件配置<span>op</span>对象进行个性化设置</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-logout :op="logoutOp"></zoom-logout>
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
              title: "选择每页展示数量",
              name: "pageSizes",
              type: "Array",
              text: "配置可供用户选择的每页展示数量, 以下拉框形式呈现",
              text2: '用法: 配置op属性, 设置<span>pageSizes: [每页数量]</span>'
            },
            {
              id: 2,
              title: "分页模式",
              name: "mode",
              type: "String",
              text: "默认<span>Number</span>, 可选参数<span>mini</span>, <span>Number</span>",
              text2: '用法: 配置op属性, 设置<span>mode: "mini"</span>'
            },
            {
              id: 3,
              title: "分页数据",
              name: "pageVal",
              type: "Object",
              text: "以对象形式设置分页数据<span>pageVal</span>, 对象内有三个参数可设置: 总条数<span>total</span>, 当前页<span>curPage</span>, 每页展示数据<span>pageSize</span>",
              text2: '用法: 配置op属性, 设置<span>pageVal: "对象"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "监听下拉数据变化的回调",
              name: "pageSizeSkip",
              type: "Function",
              text: "监听每页大小的下拉框数据发生改变事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>pageSizeSkip: (val, pageVal) => {}</span>'
            },
            {
              id: 2,
              title: "监听跳转前的回调",
              name: "beforeSkip",
              type: "Function",
              text: "监听分页组件跳转事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>beforeSkip: (val, pageVal) => {}</span>'
            },
            {
              id: 3,
              title: "监听跳转后的回调",
              name: "skip",
              type: "Function",
              text: "监听分页组件跳转后事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>skip: (val, pageVal) => {}</span>'
            },
            {
              id: 4,
              title: "动态设置分页数据",
              name: "load",
              type: "Function",
              text: "动态设置分页数据, 需要绑定<span>ref</span>来动态设置数据",
              text2: '用法: 标签中绑定ref, <span>this.$refs["page"].load(pageVal)</span>'
            },
          ]
        }
      ],
      logoutOp: {
        url: '/',  //  注销后要跳转的url
        point: true,  //  是否需要提示
        onClick: () => {
          console.log('注销');
        }, //  点击事件
        text: '注销登录'  //  文字内容, 默认为注销
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-logout :op="logoutOp"&gt;&lt;/zoom-logout&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                logoutOp: {
                  url: '/',  //  注销后要跳转的url
                  point: true,  //  是否需要提示
                  onClick: () =&gt; {
                    console.log('注销');
                  }, //  点击事件
                  text: '注销登录'  //  文字内容, 默认为注销
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;zoom-logout&gt;&lt;/zoom-logout&gt;
      `
    }
  },
  methods: {
    logout2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    logout1Num() {
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
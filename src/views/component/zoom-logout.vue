<template>
  <div class="custom-zoom-logout">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的注销组件, 以a标签形式, 默认文字为"注销", 可自行修改<br>
      点击注销后清空cookie缓存, 并刷新页面, 如果有指定的url则进行跳转
    </div>
    <tab-template :code="logoutCode">
      <zoom-logout></zoom-logout>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template :code="logoutCustom">
      <template slot="header">
        <h2>个性化设置</h2>
        <p>可对注销组件配置<span>op</span>对象进行个性化设置</p>
      </template>
      <zoom-logout :op="logoutOp"></zoom-logout>
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
              title: "注销后要跳转的页面",
              name: "url",
              type: "String",
              text: "注销后要跳转的页面, 可不配置",
              text2: '用法: 配置op属性, 设置<span>url: "跳转地址"</span>'
            },
            {
              id: 2,
              title: "是否提示",
              name: "point",
              type: "Boolean",
              text: "为了防止用户误操作, 属性默认为<span>false</span>设置为<span>true</span>则不提示",
              text2: '用法: 配置op属性, 设置<span>point: true</span>'
            },
            {
              id: 3,
              title: "文字内容",
              name: "text",
              type: "String",
              text: "默认显示 <span>注销</span>可自定义修改",
              text2: '用法: 配置op属性, 设置<span>text: "文字"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "点击注销前的回调",
              name: "onClick",
              type: "Function",
              text: "点击注销前触发的回调函数",
              text2: '用法: 配置op属性, 设置<span>onClick: () => {}</span>'
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
      logoutCustom:
        `&lt;template&gt;
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
          &lt;/script&gt;`,
      logoutCode: `&lt;zoom-logout&gt;&lt;/zoom-logout&gt;`
    }
  },
  methods: {
    logout2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    logout1Num() {
      console.log('滑块1当前值是' + this.num1);
    }
  }
}
</script>
<template>
  <div class="custom-zoom-link">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的文字链接组件, 以a标签形式存在, 有不同的主题可供选择<br>
      可以自定义组件内容、类型、跳转链接和下划线以及是否禁用
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-link>普通文字链接</zoom-link>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="linkCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化设置</h2>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-link>普通文字链接</zoom-link><br>
        <zoom-link type="primary">primary 文字链接</zoom-link><br>
        <zoom-link type="success">success 文字链接</zoom-link><br>
        <zoom-link type="info">info 文字链接</zoom-link><br>
        <zoom-link type="danger">danger 文字链接</zoom-link><br>
        <zoom-link type="warning">warning 文字链接</zoom-link><br>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="linkCustom"></custom-code>
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
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "禁用文字链接, 禁用后无法点击和跳转",
              text2: '用法: 在组件标签上, 配置属性<span>disabled="true"</span>'
            },
            {
              id: 2,
              title: "要跳转的地址",
              name: "url",
              type: "String",
              text: "配置要跳转的地址, 如果要在新页面打开可添加<span>target='blank'</span>",
              text2: '用法: 在组件标签上, 配置属性<span>url="跳转链接"</span>'
            },
            {
              id: 3,
              title: "下划线",
              name: "underline",
              type: "Boolean",
              text: "配置鼠标移入时候,下划线显示或隐藏, 默认显示",
              text2: '用法: 在组件标签上, 配置属性<span>underline="false"</span>'
            },
            {
              id: 4,
              title: "文字链接类型",
              name: "type",
              type: "String",
              text: "文字链接类型, 可选参数<span>primary</span>、<span>warning</span>、<span>success</span>、<span>info</span>、<span>danger</span>，默认<span>danger</span>",
              text2: '用法: 在组件标签上, 配置属性<span>type="属性"</span>'
            },
          ]
        }
      ],
      linkOp: {
        url: '/',  //  注销后要跳转的url
        point: true,  //  是否需要提示
        onClick: () => {
          console.log('注销');
        }, //  点击事件
        text: '注销登录'  //  文字内容, 默认为注销
      },
      opTab: 0,
      curTab: 0,
      linkCustom:
        `&lt;zoom-link&gt;普通文字链接&lt;/zoom-link&gt;&lt;br&gt;
          &lt;zoom-link type="primary"&gt;primary 文字链接&lt;/zoom-link&gt;&lt;br&gt;
          &lt;zoom-link type="success"&gt;success 文字链接&lt;/zoom-link&gt;&lt;br&gt;
          &lt;zoom-link type="info"&gt;info 文字链接&lt;/zoom-link&gt;&lt;br&gt;
          &lt;zoom-link type="danger"&gt;danger 文字链接&lt;/zoom-link&gt;&lt;br&gt;
          &lt;zoom-link type="warning"&gt;warning 文字链接&lt;/zoom-link&gt;&lt;br&gt;`,
      linkCode: `&lt;zoom-link&gt;普通文字链接&lt;/zoom-link&gt;`
    }
  },
  methods: {
    link2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    link1Num() {
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
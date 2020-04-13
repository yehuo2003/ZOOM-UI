<template>
  <div class="custom-zoom-dialog-box">
    <!-- 普通 -->
    <h2>基本用法</h2>
    <p>可以在组件标签中自定义内容</p>
    <zoom-dialog-box title="对话框标题" :show="visibility" @close="visibility=false">
      自定义内容,可任意html片段
      <div slot="footer">
        <zoom-button @click="visibility=false">关闭</zoom-button>
      </div>
    </zoom-dialog-box>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="handleClick">显示对话框</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="dialogCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <div class="tip">
      卡片组件默认为块级元素, 宽度为100%
      可以设置边框和边框阴影
    </div>
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
              title: "对话框状态",
              name: "show",
              type: "Boolean",
              text:
                "决定对话框是显示还是隐藏",
              text2:
                '用法: 在组件标签上绑定<span>show="属性"</span>'
            },
            {
              id: 2,
              title: "对话框标题",
              name: "title",
              type: "String",
              text:
                "对话框的标题, 可自定义",
              text2:
                '用法: 在组件标签上绑定<span>title="属性"</span>'
            },
            {
              id: 3,
              title: "宽度",
              name: "width",
              type: "String",
              text:
                "对话框组件的宽度,  默认占30%, 可自定义",
              text2:
                '用法: 在组件标签上绑定<span>width="宽度"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "关闭事件",
              name: "close",
              type: "Function",
              text: "监听对话框关闭事件",
              text2: '用法: 在组件标签上绑定<span>@close</span>事件, 用来监听弹框关闭事件'
            }
          ]
        }
      ],
      curTab: 0,
      visibility: false,
      dialogCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="handleClick"&gt;显示对话框&lt;/zoom-button&gt;
              &lt;zoom-dialog-box title="对话框标题" :show="visibility" @close="visibility=false"&gt;
                自定义内容,可任意html片段
                &lt;div slot="footer"&gt;
                  &lt;zoom-button @click="visibility=false"&gt;关闭&lt;/zoom-button&gt;
                &lt;/div&gt;
              &lt;/zoom-dialog-box&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  visibility: false,
                }
              },
              methods: {
                handleClick() {
                  this.visibility = true;
                }
              }
            }
          &lt;/script&gt;`
    };
  },
  methods: {
    handleClick() {
      this.visibility = true;
    },
    tabChange(index) {
      this.curTab = index;
    }
  }
};
</script>
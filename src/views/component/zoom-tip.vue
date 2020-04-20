<template>
  <div class="custom-zoom-tip">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供了强大的tip组件, 部分算法来源于网络, 不需要标签引用, 只需要在要调用的标签上写 v-tip="tip内容" 即可<br>
      zoom-tip提供了五种不同的主题, 用户可自由切换, 另外有上下左右四种方向, 可供用户选择优先显示的方向<br>
      用户可以选择点击触发或者鼠标经过触发, 默认为鼠标经过触发<br>
      另外还内置了过渡效果, 可以选择开启/关闭
    </div>
    <h2>基础使用</h2>
    <h3>使用<span>v-tip</span>指令可以实现</h3>
    <p>查看<span>zoom-tip</span>效果</p>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <span v-tip="'tip内容展示'">鼠标经过</span><br>
        <span v-tip.click="'tip内容展示'">点击我</span><br>
        <span v-tip.tranfrom="'tip内容展示'">带过渡效果</span>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="tipCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化操作</h2>
    <p>查看不同主题下的tip提示</p>
    <p>如果设置了方向, 则优先会显示指定方向</p>
    <zoom-tabs class="basic" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <div class="custom-tip">
          <p v-tip.primary.bottom="'tip提示内容'">tip 主题 primary</p>
          <p v-tip.success.right="'tip提示内容'">tip 主题 success</p>
          <p v-tip.warning.top="'tip提示内容'">tip 主题 warning</p>
          <p v-tip.danger.right="'tip提示内容'">tip 主题 danger</p>
          <p v-tip.info.left="'tip提示内容'">tip 主题 info</p>
          <p v-tip.left="'tip提示内容'">tip 主题 正常</p>
        </div>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="tipCustom"></custom-code>
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
          title: "方法",
          content: [
            {
              id: 1,
              title: "标题",
              name: "title",
              type: "Function",
              text: "tip的标题, 可不传",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-tip.title="标题"</span>'
            },
            {
              id: 2,
              title: "主题",
              name: "theme",
              type: "Function",
              text: "可选参数：<span>primary</span>、<span>warning</span>、<span>danger</span>、<span>info</span>、<span>success</span> ",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-tip.primary="内容"</span>'
            },
            {
              id: 3,
              title: "方向",
              name: "direction",
              type: "Function",
              text: "默认<span>right</span>, 可选参数：<span>left</span>、<span>rigth</span>、<span>top</span>、<span>bottom</span> 设置之后, 优先显示此方向",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-tip.top="内容"</span>'
            },
            {
              id: 4,
              title: "过渡效果",
              name: "transition",
              type: "Function",
              text: "可选参数, 加上后显示隐藏时会带有过渡效果",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-tip.transition="内容"</span>'
            },
            {
              id: 5,
              title: "点击出现",
              name: "click",
              type: "Function",
              text: "可选参数, 加上后 则需要点击才会触发该效果",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-tip.click="内容"</span>'
            }
          ]
        }
      ],
      opTab: 0,
      curTab: 0,
      tipCustom:
        `&lt;div class="custom-tip"&gt;
            &lt;p v-tip.primary.bottom="'tip提示内容'"&gt;tip 主题 primary&lt;/p&gt;
            &lt;p v-tip.success.right="'tip提示内容'"&gt;tip 主题 success&lt;/p&gt;
            &lt;p v-tip.warning.top="'tip提示内容'"&gt;tip 主题 warning&lt;/p&gt;
            &lt;p v-tip.danger.right="'tip提示内容'"&gt;tip 主题 danger&lt;/p&gt;
            &lt;p v-tip.info.left="'tip提示内容'"&gt;tip 主题 info&lt;/p&gt;
            &lt;p v-tip.left="'tip提示内容'"&gt;tip 主题 正常&lt;/p&gt;
          &lt;/div&gt;`,
      tipCode:
        `&lt;span v-tip="'tip内容展示'"&gt;鼠标经过&lt;/span&gt;&lt;br&gt;
          &lt;span v-tip.click="'tip内容展示'"&gt;点击我&lt;/span&gt;&lt;br&gt;
          &lt;span v-tip.tranfrom="'tip内容展示'"&gt;带过渡效果&lt;/span&gt;`
    }
  },
  methods: {
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-tip {
  .basic {
    .custom-tip {
      position: relative;
      text-align: center;
      height: 150px;
      p {
        border: 1px solid #d9d9d9;
        width: 200px;
        position: absolute;
        &:first-child {
          top: 0;
          left: 40%;
        }
        &:nth-child(2) {
          top: 30px;
          left: 20%;
        }
        &:nth-child(3) {
          bottom: 0;
          left: 40%;
        }
        &:nth-child(4) {
          bottom: 30px;
          left: 20%;
        }
        &:nth-child(5) {
          bottom: 30px;
          right: 20%;
        }
        &:nth-child(6) {
          top: 30px;
          right: 20%;
        }
      }
    }
    .zoom-btn {
      margin: 15px 5px;
    }
  }
}
</style>
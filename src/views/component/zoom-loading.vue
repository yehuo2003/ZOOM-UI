<template>
  <div class="custom-zoom-loading">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="loading">
      zoom-ui提供了强大的loading组件, 已经全局注册, 不需要标签引用, 只需要在要调用的标签上写 v-loading="loading内容" 即可<br>
      zoom-loading提供了五种不同的主题, 用户可自由切换, 另外有上下左右四种方向, 可供用户选择优先显示的方向<br>
      用户可以选择点击触发或者鼠标经过触发, 默认为鼠标经过触发<br>
      另外还内置了过渡效果, 可以选择开启/关闭
    </div>
    <h2>基础使用</h2>
    <h3>使用<span>v-loading</span>指令可以实现</h3>
    <p>查看<span>zoom-loading</span>效果</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <span v-loading="'loading内容展示'">鼠标经过</span><br>
        <span v-loading.click="'loading内容展示'">点击我</span><br>
        <span v-loading.tranfrom="'loading内容展示'">带过渡效果</span>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化操作</h2>
    <p>查看不同主题下的loading提示</p>
    <p>如果设置了方向, 则优先会显示指定方向</p>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <div class="custom-loading">
          <p v-loading.primary.bottom="'loading提示内容'">loading 主题 primary</p>
          <p v-loading.success.right="'loading提示内容'">loading 主题 success</p>
          <p v-loading.warning.top="'loading提示内容'">loading 主题 warning</p>
          <p v-loading.danger.right="'loading提示内容'">loading 主题 danger</p>
          <p v-loading.info.left="'loading提示内容'">loading 主题 info</p>
          <p v-loading.left="'loading提示内容'">loading 主题 正常</p>
        </div>
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
          title: "方法",
          content: [
            {
              id: 1,
              title: "标题",
              name: "title",
              type: "Function",
              text: "loading的标题, 可不传",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-loading.title="标题"</span>'
            },
            {
              id: 2,
              title: "主题",
              name: "theme",
              type: "Function",
              text: "可选参数：<span>primary</span>、<span>warning</span>、<span>danger</span>、<span>info</span>、<span>success</span> ",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-loading.primary="内容"</span>'
            },
            {
              id: 3,
              title: "方向",
              name: "direction",
              type: "Function",
              text: "默认<span>right</span>, 可选参数：<span>left</span>、<span>rigth</span>、<span>top</span>、<span>bottom</span> 设置之后, 优先显示此方向",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-loading.top="内容"</span>'
            },
            {
              id: 4,
              title: "过渡效果",
              name: "transition",
              type: "Function",
              text: "可选参数, 加上后显示隐藏时会带有过渡效果",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-loading.transition="内容"</span>'
            },
            {
              id: 5,
              title: "点击出现",
              name: "click",
              type: "Function",
              text: "可选参数, 加上后 则需要点击才会触发该效果",
              text2: '用法: 在需要定义的标签上绑定指令<span>v-loading.click="内容"</span>'
            }
          ]
        }
      ],
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-button @click="styleClick('primary')" type="primary"&gt;重点弹框&lt;/zoom-button&gt;
            &lt;zoom-button @click="styleClick('success')" type="success"&gt;成功弹框&lt;/zoom-button&gt;
            &lt;zoom-button @click="styleClick('warning')" type="warning"&gt;警告弹框&lt;/zoom-button&gt;
            &lt;zoom-button @click="styleClick('danger')" type="danger"&gt;危险弹框&lt;/zoom-button&gt;
            &lt;zoom-button @click="styleClick('info')" type="info"&gt;普通弹框&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            methods: {
              styleClick(type) {
                this.$zoom.loading({
                  title: type,	//默认 提示
                  content: '自定义内容',
                  container: '&lt;h1&gt;自定义html片段&lt;/h1&gt;',	//有设置时会覆盖content
                  type: type,	// 状态 有成功 失败 primary和info
                  onClick: ()=&gt;{},	//要执行的回调函数
                  btnText: '自定义确认'	//自定义按钮文字, 默认为确认
                })
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-button @click="loadingClick"&gt;弹出警告框&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            methods: {
              loadingClick() {
                this.$zoom.loading({
                  content: '普通弹框',
                  onClick: () =&gt; {
                    console.log('确认按钮被触发');
                  }
                })
              }
            }
          }
        &lt;/script&gt;
      `
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
.custom-zoom-loading {
  .basic {
    .custom-loading {
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
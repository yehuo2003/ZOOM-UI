<template>
  <div class="custom-zoom-confim">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的弹出确认框组件已经全局注册, 并不需要在页面上创建标签, 就可以直接调用<br>
      通过this.$zoom.confim调用, 使用方法和Popup弹出框有所不同<br>
      可以通过回车键触发确认按钮事件, Esc按键触发取消事件
    </div>
    <h2>基础使用</h2>
    <p>confim确认框是以Promise形式调用, 返回两个回调<span>.then()</span>接受确认按钮事件, <span>.catch()</span>接受取消按钮事件</p>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="confimClick">确认登录框</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="confimCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化操作</h2>
    <p>可对<span>confim</span>确认框传入对象来配置不同属性来实现个性化</p>
    <zoom-tabs class="basic" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="styleClick('primary')" type="primary">重点确认框</zoom-button>
        <zoom-button @click="styleClick('success')" type="success">成功确认框</zoom-button>
        <zoom-button @click="styleClick('warning')" type="warning">警告确认框</zoom-button>
        <zoom-button @click="styleClick('danger')" type="danger">危险确认框</zoom-button>
        <zoom-button @click="styleClick('info')" type="info">普通确认框</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="confimCustom"></custom-code>
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
              title: "标题",
              name: "title",
              type: "String",
              text: "弹出框显示的标题, 可选参数, 如果不传默认为小弹框",
              text2: '用法: <span>this.$zoom.confim({title: "属性"})</span>'
            },
            {
              id: 2,
              title: "内容",
              name: "content",
              type: "String",
              text: "弹出框显示的内容, 可自定义, 如果只传第一个参数, 默认第一个参数为内容, 可传html片段",
              text2: '用法: <span>this.$zoom.confim({content: "内容"})</span>'
            },
            {
              id: 3,
              title: "类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>primary</span>、<span>success</span>、<span>danger</span>、<span>warning</span>, 如果不传默认为普通样式",
              text2: '用法: <span>this.$zoom.confim({type: "属性"})</span>'
            },
            {
              id: 4,
              title: "确认按钮文字",
              name: "confirmText",
              type: "String",
              text: "可选参数,如果不传默认为<span>确认</span>字样",
              text2: '用法: <span>this.$zoom.confim({confirmText: 确认})</span>'
            },
            {
              id: 5,
              title: "取消按钮文字",
              name: "cancelText",
              type: "String",
              text: "可选参数,如果不传默认为<span>取消</span>字样",
              text2: '用法: <span>this.$zoom.confim({cancelText: 取消})</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "点击确认按钮回调",
              name: ".then",
              type: "Function",
              text: "点击确认按钮时, 触发的回调函数, 随后会关闭确认框",
              text2: '用法: 配置op属性, 设置<span>this.$zoom.confim().then(() => {})</span>'
            },
            {
              id: 2,
              title: "点击取消按钮回调",
              name: ".catch",
              type: "Function",
              text: "点击取消按钮时, 触发的回调函数, 随后会关闭确认框",
              text2: '用法: 配置op属性, 设置<span>this.$zoom.confim().then(() => {}).catch(() => {})</span>'
            }
          ]
        }
      ],
      opTab: 0,
      curTab: 0,
      confimCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="styleClick('primary')" type="primary"&gt;重点确认框&lt;/zoom-button&gt;
              &lt;zoom-button @click="styleClick('success')" type="success"&gt;成功确认框&lt;/zoom-button&gt;
              &lt;zoom-button @click="styleClick('warning')" type="warning"&gt;警告确认框&lt;/zoom-button&gt;
              &lt;zoom-button @click="styleClick('danger')" type="danger"&gt;危险确认框&lt;/zoom-button&gt;
              &lt;zoom-button @click="styleClick('info')" type="info"&gt;普通确认框&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              methods: {
                styleClick(type) {
                  this.$zoom.confim({
                    title: type,	//	默认 提示
                    content: '&lt;h5&gt;自定义内容&lt;/h5&gt;', // 可传入HTML片段
                    type: type,	// 状态 有成功 失败 primary和info
                    confirmText: '自定义确认',	//	自定义按钮文字, 默认为确认
                    cancelText: '自定义取消'
                  }).then(() => {
                      //点确认
                      console.log('自定义确认' + type);
                  }).catch(() => {
                      console.log('自定义取消');
                      //点取消
                  });
                }
              }
            }
          &lt;/script&gt;`,
      confimCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="confimClick"&gt;确认登录框&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              methods: {
                confimClick() {
                  this.$zoom.confim('是否登录?', '登录确认', { // 第一个参数为content, 第二个参数为title
                    confirmText:'登录',
                  }).then(() => {
                      //点登录
                      console.log('登录');
                  }).catch(() => {
                      console.log('取消');
                      //点取消
                  });
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    styleClick(type) {
      this.$zoom.confim({
        title: type,	//	默认 提示
        content: '<h5>自定义内容</h5>', // 可传入HTML片段
        type: type,	// 状态 有成功 失败 primary和info
        confirmText: '自定义确认',	//	自定义按钮文字, 默认为确认
        cancelText: '自定义取消'
      }).then(() => {
          //点确认
          console.log('自定义确认' + type);
      }).catch(() => {
          console.log('自定义取消');
          //点取消
      });
    },
    confimClick() {
      this.$zoom.confim('是否登录?', '登录确认', { // 第一个参数为content, 第二个参数为title
        confirmText:'登录',
      }).then(() => {
          //点登录
          console.log('登录');
      }).catch(() => {
          console.log('取消');
          //点取消
      });
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
<style lang="scss" scoped>
.custom-zoom-confim {
  .basic {
    .zoom-btn {
      margin: 15px 5px;
    }
  }
}
</style>
<template>
  <div class="custom-zoom-popup">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的弹出确认框组件已经全局注册, 并不需要在页面上创建标签, 就可以直接调用<br>
      通过this.$zoom.popup调用, 可以自定义标题、内容、类型、自定义按钮文字以及点击按钮的回调事件<br>
      按回车默认确定功能, 按Esc默认是关闭弹框
    </div>
    <h2>基础使用</h2>
    <h3>使用<span>this.$zoom.popup</span>可以调用弹框</h3>
    <p>点击按钮可触发弹框</p>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="popupClick">弹出警告框</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="popupCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化操作</h2>
    <p>可对<span>popup</span>弹框添加标题和不同类型等属性来实现个性化</p>
    <zoom-tabs class="basic" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="styleClick('primary')" type="primary">重点弹框</zoom-button>
        <zoom-button @click="styleClick('success')" type="success">成功弹框</zoom-button>
        <zoom-button @click="styleClick('warning')" type="warning">警告弹框</zoom-button>
        <zoom-button @click="styleClick('danger')" type="danger">危险弹框</zoom-button>
        <zoom-button @click="styleClick('info')" type="info">普通弹框</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="popupCustom"></custom-code>
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
              text: "弹出警告框显示的标题, 可选参数, 如果不传默认为小弹框",
              text2: '用法: <span>this.$zoom.popup({title: 属性})</span>'
            },
            {
              id: 2,
              title: "内容",
              name: "content/container",
              type: "String",
              text: "弹出警告框显示的内容, 可选参数, <span>container</span>可以使用自定义的html片段, 但是可能会覆盖<span>content</span>",
              text2: '用法: <span>this.$zoom.popup({content: 属性})</span>'
            },
            {
              id: 3,
              title: "类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>primary</span>、<span>success</span>、<span>danger</span>、<span>warning</span>, 如果不传默认为普通样式",
              text2: '用法: <span>this.$zoom.popup({type: 属性})</span>'
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
              name: "onClick",
              type: "Function",
              text: "点击确认按钮时, 在弹框关闭前触发的回调, 如果不传则默认只是关闭弹框",
              text2: '用法: 配置op属性, 设置<span>this.$zoom.popup({onClick: ()=>{}})</span>'
            }
          ]
        }
      ],
      opTab: 0,
      curTab: 0,
      popupCustom:
        `&lt;template&gt;
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
                  this.$zoom.popup({
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
          &lt;/script&gt;`,
      popupCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="popupClick"&gt;弹出警告框&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              methods: {
                popupClick() {
                  this.$zoom.popup({
                    content: '普通弹框',
                    onClick: () =&gt; {
                      console.log('确认按钮被触发');
                    }
                  })
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    styleClick(type) {
      this.$zoom.popup({
        title: type,	//	默认 提示
        content: '自定义内容',
        container: '<h1>自定义html片段</h1>',	//	有设置时会覆盖content
        type: type,	// 状态 有成功 失败 primary和info
        onClick: ()=>{},	//	要执行的回调函数
        btnText: '自定义确认'	//	自定义按钮文字, 默认为确认
      })
    },
    popupClick() {
      this.$zoom.popup({
        content: '普通弹框',
        onClick: () => {
          console.log('确认按钮被触发');
        }
      })
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
.custom-zoom-popup {
  .basic {
    .zoom-btn {
      margin: 15px 5px;
    }
  }
}
</style>
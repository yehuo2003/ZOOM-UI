<template>
  <div class="custom-zoom-alert">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的弹出警告框组件已经全局注册, 并不需要在页面上创建标签, 就可以直接调用<br>
      如果不加title属性, 默认为小弹框, 用户可以自定义弹框标题、内容、类型以及消失时间<br>
      弹框设置了五种类型
    </div>
    <tab-template :code="aletCode">
      <template slot="header">
        <h2>基础使用</h2>
        <h3>使用<span>this.$zoom.alert</span>可以调用弹框</h3>
        <p>点击按钮可触发弹框</p>
      </template>
      <zoom-button @click="alertClick">弹出警告框</zoom-button>
    </tab-template>
    <!-- 不同类型弹框 -->
    <tab-template :code="alertType">
      <template slot="header">
        <h2>不同类型弹框</h2>
        <p>可对<span>alert</span>弹框添加标题和不同类型来实现个性化</p>
      </template>
      <zoom-button @click="styleClick('primary')" type="primary">重点弹框</zoom-button>
      <zoom-button @click="styleClick('success')" type="success">成功弹框</zoom-button>
      <zoom-button @click="styleClick('warning')" type="warning">警告弹框</zoom-button>
      <zoom-button @click="styleClick('danger')" type="danger">危险弹框</zoom-button>
      <zoom-button @click="styleClick('info')" type="info">普通弹框</zoom-button>
    </tab-template>
    <!-- 设置弹框存在时间 -->
    <tab-template :code="aletTime">
      <template slot="header">
        <h2>设置弹框存在时间</h2>
        <p>弹框存在时间默认为<span>2000</span>毫秒, 可以自定义存在时间</p>
      </template>
      <zoom-button @click="timeClick('primary', 1000)" type="primary">1000毫秒后关闭</zoom-button>
      <zoom-button @click="timeClick('success', 2000)" type="success">2000毫秒后关闭</zoom-button>
      <zoom-button @click="timeClick('warning', 3000)" type="warning">3000毫秒后关闭</zoom-button>
      <zoom-button @click="timeClick('danger', 4000)" type="danger">4000毫秒后关闭</zoom-button>
      <zoom-button @click="timeClick('info', 5000)" type="info">5000毫秒后关闭</zoom-button>
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
              title: "标题",
              name: "title",
              type: "String",
              text: "弹出警告框显示的标题, 可选参数, 如果不传默认为小弹框",
              text2: '用法: <span>this.$zoom.alert({title: 属性})</span>'
            },
            {
              id: 2,
              title: "内容",
              name: "content",
              type: "String",
              text: "弹出警告框显示的内容, 可选参数",
              text2: '用法: <span>this.$zoom.alert({content: 属性})</span>'
            },
            {
              id: 3,
              title: "类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>primary</span>、<span>success</span>、<span>danger</span>、<span>warning</span>, 如果不传默认为普通样式",
              text2: '用法: <span>this.$zoom.alert({type: 属性})</span>'
            },
            {
              id: 4,
              title: "存在时间",
              name: "time",
              type: "Number",
              text: "可选参数, 传入单位为毫秒, 如果不传默认为<span>2000</span>毫秒",
              text2: '用法: <span>this.$zoom.alert({time: 毫秒数})</span>'
            }
          ]
        }
      ],
      aletTime:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="timeClick('primary', 1000)" type="primary"&gt;1000毫秒后关闭&lt;/zoom-button&gt;
              &lt;zoom-button @click="timeClick('success', 2000)" type="success"&gt;2000毫秒后关闭&lt;/zoom-button&gt;
              &lt;zoom-button @click="timeClick('warning', 3000)" type="warning"&gt;3000毫秒后关闭&lt;/zoom-button&gt;
              &lt;zoom-button @click="timeClick('danger', 4000)" type="danger"&gt;4000毫秒后关闭&lt;/zoom-button&gt;
              &lt;zoom-button @click="timeClick('info', 5000)" type="info"&gt;5000毫秒后关闭&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              methods: {
                timeClick(type, time) {
                  this.$zoom.alert({
                    title: type,
                    content: '普通弹框',
                    type: type,
                    time: time
                  })
                }
              }
            }
          &lt;/script&gt;`,
      alertType:
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
                  this.$zoom.alert({
                    title: type,
                    content: '普通弹框',
                    type: type
                  })
                }
              }
            }
          &lt;/script&gt;`,
      aletCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="alertClick"&gt;弹出警告框&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              methods: {
                alertClick() {
                  this.$zoom.alert({
                    content: '普通弹框'
                  })
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    timeClick(type, time) {
      this.$zoom.alert({
        title: type,
        content: '普通弹框',
        type: type,
        time: time
      })
    },
    styleClick(type) {
      this.$zoom.alert({
        title: type,
        content: '普通弹框',
        type: type
      })
    },
    alertClick() {
      this.$zoom.alert({
        content: '普通弹框'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-alert {
  .basic {
    .zoom-btn {
      margin: 15px 5px;
    }
  }
}
</style>
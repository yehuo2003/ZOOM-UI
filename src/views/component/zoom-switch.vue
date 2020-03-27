<template>
  <div class="custom-zoom-switch">
    <h1>开关组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="data-drop" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-switch open="开启" close="关闭" :op="switchOp"></zoom-switch>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>标签属性</h3>
    <div class="tip">
      配置组件的属性有两种方式，一种是示例中的op对象，另一种是直接将属性配置在组件标签上，如下所示：
      注意：两种方式不能混用，当使用op对象配置属性后，组件其它标签将被忽略(v-model)除外，而且目前还不支持在组件渲染完成后再修改标签属性的值，
      即zoom-ui对标签属性没有做双向绑定(v-model)除外。
    </div>
    <p>禁用状态下，开启或关闭开关</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-switch :op="switchOp"></zoom-switch>
        禁用开关:
        <zoom-switch :op="switchOp2"></zoom-switch>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <attribute :list="attributeList"></attribute>
    <zoom-button @click="prevClick">日期选择组件</zoom-button>
    <zoom-button @click="nextClick">单选框组件</zoom-button>
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
              name: "isdisabled",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则禁用开关, 禁用状态下, 无法开启或关闭开关",
              text2: '用法: 配置op对象, 设置 <span>isdisabled="true"</span>'
            },
            {
              id: 2,
              title: "显示开启时的文本内容",
              name: "open",
              type: "String",
              text: "打开状态下, 要展示给用户看的文本内容",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>open="文本内容"</span>'
            },
            {
              id: 3,
              title: "显示关闭时的文本内容",
              name: "close",
              type: "String",
              text: "打开状态下, 要展示给用户看的文本内容",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>close="文本内容"</span>'
            },
            {
              id: 4,
              title: "组件渲染时的初始状态",
              name: "status",
              type: "String",
              text: "默认<span>close</span>, 为<span>open</span>则是打开状态,",
              text2: '用法: 配置op对象, 设置 <span>status="open"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "点击按钮前触发的回调函数",
              name: "beforeClick",
              type: "Function",
              text: "",
              text2: '用法: 配置op对象后设置回调函数, 会返回一个参数, 是按钮发生改变前的值'
            },
            {
              id: 2,
              title: "点击按钮后触发的回调函数",
              name: "afterClick",
              type: "Function",
              text: "",
              text2: '用法: 配置op对象后设置回调函数, 会返回一个参数, 是按钮发生改变后的值'
            }
          ]
        }
      ],
      switchOp2: {
        isdisabled: true,
      },
      switchOp: {
        isdisabled: false,	// 是否禁用 默认false
        open: '开启',				// 打开的文本
        close: '关闭',			// 关闭的文本
        status: 'open',			// 初始状态(可选open || close, 默认是close)
        beforeClick: val => {			//点击前的回调函数
          console.log('点击前触发', val);
        },
        afterClick: val => {				//点击后的回调函数
          console.log('点击后触发', val);
        }
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-switch :op="switchOp"&gt;&lt;/zoom-switch&gt;
            禁用开关:
            &lt;zoom-switch :op="switchOp2"&gt;&lt;/zoom-switch&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                switchOp2: {
                  isdisabled: true,
                },
                switchOp: {
                  isdisabled: false,	// 是否禁用 默认false
                  open: '开启',	        // 打开的文本
                  close: '关闭',	// 关闭的文本
                  status: 'open',	// 初始状态(可选open || close, 默认是close)
                  beforeClick: val => {	//点击前的回调函数
                    console.log('点击前触发', val);
                  },
                  afterClick: val => {	//点击后的回调函数
                    console.log('点击后触发', val);
                  }
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-switch open="开启" close="关闭"&gt;&lt;/zoom-switch&gt;`
    }
  },
  methods: {
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-date');
    },
    nextClick() {
      this.$router.push('/component/zoom-radio');
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
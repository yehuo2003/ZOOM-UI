<template>
  <div class="custom-zoom-switch">
    <!-- 普通 -->
    <tab-template cls="data-drop" :code="switchCode">
      <zoom-switch open="开启" close="关闭"></zoom-switch>
    </tab-template>
    <!-- 标签属性 -->
    <tab-template cls="data-drop" :code="switchCustom">
      <template slot="header">
        <h2>标签属性</h2>
        <div class="tip">
          配置组件的属性有两种方式，一种是示例中的op对象，另一种是直接将属性配置在组件标签上，如下所示：
          注意：两种方式不能混用，当使用op对象配置属性后，组件其它标签将被忽略(v-model)除外，而且目前还不支持在组件渲染完成后再修改标签属性的值，
          即zoom-ui对标签属性没有做双向绑定(v-model)除外。
        </div>
        <p>禁用状态下，开启或关闭开关</p>
      </template>
      <zoom-switch :op="switchOp"></zoom-switch>
      禁用开关:
      <zoom-switch :op="switchOp2"></zoom-switch>
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
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则禁用开关, 禁用状态下, 无法开启或关闭开关",
              text2: '用法: 配置op对象, 设置 <span>disabled: "true"</span>'
            },
            {
              id: 2,
              title: "显示开启时的文本内容",
              name: "open",
              type: "String",
              text: "打开状态下, 要展示给用户看的文本内容",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>open: "文本内容"</span>'
            },
            {
              id: 3,
              title: "显示关闭时的文本内容",
              name: "close",
              type: "String",
              text: "打开状态下, 要展示给用户看的文本内容",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>close: "文本内容"</span>'
            },
            {
              id: 4,
              title: "组件渲染时的初始状态",
              name: "status",
              type: "String",
              text: "默认<span>close</span>, 为<span>open</span>则是打开状态,",
              text2: '用法: 配置op对象, 设置 <span>status: "open"</span>'
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
              text: '用法: 配置op对象后设置回调函数, 会返回一个参数, 是按钮发生改变前的值'
            },
            {
              id: 2,
              title: "点击按钮后触发的回调函数",
              name: "afterClick",
              type: "Function",
              text: '用法: 配置op对象后设置回调函数, 会返回一个参数, 是按钮发生改变后的值'
            },
            {
              id: 3,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      switchOp2: {
        disabled: true,
      },
      switchOp: {
        disabled: false,	// 是否禁用 默认false
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
      switchCustom:
        `&lt;template&gt;
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
                    disabled: true,
                  },
                  switchOp: {
                    disabled: false,	// 是否禁用 默认false
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
          &lt;/script&gt;`,
      switchCode: `&lt;zoom-switch open="开启" close="关闭"&gt;&lt;/zoom-switch&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
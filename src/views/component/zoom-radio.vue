<template>
  <div class="custom-zoom-radio">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="data-drop" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-radio :op="op"></zoom-radio>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="radioCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>标签属性</h3>
    <div class="tip">
      单选框组件需要绑定自定义<span>op</span>对象, <span>op</span>对象中定义<span>name</span>, 和<span>data</span>, 并且可以通过v-model绑定数据
    </div>
    <p>禁用状态下，开启或关闭开关</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-radio v-model="age" :op="radioOp"></zoom-radio>
        <zoom-button @click="radioClick">当前选中的值</zoom-button><br>
        禁用单选框:<br>
        <zoom-radio :op="radioOp2"></zoom-radio>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="radioCustom"></custom-code>
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
              title: "单选框名称",
              name: "name",
              type: "String",
              text: "一组单选框需要绑定同一个<span>name</span>属性, 系统以此来辨别",
              text2: '用法: 配置op对象, 设置 <span>name: "属性"</span>'
            },
            {
              id: 2,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>, 禁用状态下, 无法选择",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>disabled: true</span>'
            },
            {
              id: 3,
              title: "是否绑定布尔值",
              name: "Bool",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>的情况下, 用户用<span>v-model</span>绑定后, 得到的值为布尔值",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>close: "文本内容"</span>'
            },
            {
              id: 4,
              title: "数据",
              name: "data",
              type: "Array",
              text: "以键值对的方式, 设置单选框的数据, 如 <span>{text: '文本内容1', value: 'value值'}</span>",
              text2: '用法: 配置op对象, 绑定设置 <span>data</span> 属性'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "动态绑定数据",
              name: "load",
              type: "Function",
              text: "在组件渲染完成后, 可用此方法动态渲染数据",
              text2: '用法: <span>this.$refs[属性].load(arr)</span>, 可动态设置数据,<span>arr</span>数据形式和op中<span>data</span>相同'
            }
          ]
        }
      ],
      age: 'secrecy',
      op: {
        name: 'test',
        data: [
          {text: '选项1', value: '1'},
          {text: '选项2', value: '2'},
          {text: '选项3', value: '3'}
        ]
      },
      radioOp2: {
        name: 'list',
        disabled: true,
        data: [
          {text: '男', value: 'man'},
          {text: '女', value: 'woman'},
          {text: '保密', value: 'secrecy', checked: true}
        ]
      },
      radioOp: {
        name: 'age',	//	单选框的name
        disabled: false,	//	是否禁用,为true可禁用
        Bool: false,			//	v-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true
        data: [	//	单选框数据	checked: true	默认选中
          {text: '男', value: 'man'},
          {text: '女', value: 'woman'},
          {text: '保密', value: 'secrecy', checked: true}
        ]
      },
      opTab: 0,
      curTab: 0,
      radioCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-radio v-model="age" :op="radioOp"&gt;&lt;/zoom-radio&gt;
              &lt;zoom-button @click="radioClick"&gt;当前选中的值&lt;/zoom-button&gt;&lt;br&gt;
              禁用单选框:&lt;br&gt;
              &lt;zoom-radio :op="radioOp2"&gt;&lt;/zoom-radio&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  age: 'secrecy',
                  radioOp2: {
                    name: 'list',
                    disabled: true,
                    data: [
                      {text: '男', value: 'man'},
                      {text: '女', value: 'woman'},
                      {text: '保密', value: 'secrecy', checked: true}
                    ]
                  },
                  radioOp: {
                    name: 'age',	//	单选框的name
                    disabled: false,	//	是否禁用,为true可禁用
                    Bool: false,			//	v-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true
                    data: [	//	单选框数据	checked: true	默认选中
                      {text: '男', value: 'man'},
                      {text: '女', value: 'woman'},
                      {text: '保密', value: 'secrecy', checked: true}
                    ]
                  }
                }
              },
              methods: {
                radioClick() {
                  console.log('当前值是', this.age);
                }
              }
            }
          &lt;/script&gt;`,
      radioCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-radio :op="op"&gt;&lt;/zoom-radio&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  op: {
                    name: 'test',
                    data: [
                      {text: '选项1', value: '1'},
                      {text: '选项2', value: '2'},
                      {text: '选项3', value: '3'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    radioClick() {
      console.log('当前值是', this.age);
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
</style>
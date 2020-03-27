<template>
  <div class="custom-zoom-checkbox">
    <h1>复选框组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="data-drop" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-checkbox :op="op"></zoom-checkbox>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>标签属性</h3>
    <div class="tip">
      复选框组件需要绑定自定义<span>op</span>对象, <span>op</span>对象中定义<span>name</span>, 和<span>data</span>, 并且可以通过v-model绑定数据
    </div>
    <p>禁用状态下，开启或关闭开关</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <span>爱好</span><br>
        <zoom-checkbox v-model="fondness" :op="checkboxOp"></zoom-checkbox>
        <zoom-button @click="checkboxClick">当前选中的值</zoom-button><br>
        禁用复选框:<br>
        <zoom-checkbox :op="checkboxOp2"></zoom-checkbox>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <attribute :list="attributeList"></attribute>
    <zoom-button @click="prevClick">单选框组件</zoom-button>
    <zoom-button @click="nextClick">表单组件</zoom-button>
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
              title: "复选框名称",
              name: "name",
              type: "String",
              text: "一组复选框需要绑定同一个<span>name</span>属性, 系统以此来辨别",
              text2: '用法: 配置op对象, 设置 <span>name: "属性"</span>'
            },
            {
              id: 2,
              title: "禁用",
              name: "isdisabled",
              type: "Boolean",
              text: "默认<span>false</span>, 禁用状态下, 无法选择",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>isdisabled:"true"</span>'
            },
            {
              id: 3,
              title: "是否绑定布尔值",
              name: "Bool",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>的情况下, 用户用<span>v-model</span>绑定后, 得到的值为布尔值",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>close="文本内容"</span>'
            },
            {
              id: 4,
              title: "数据",
              name: "data",
              type: "Array",
              text: "以键值对的方式, 设置复选框的数据, 如 <span>{text: '文本内容1', value: 'value值'}</span>",
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
      fondness: 'sports',
      op: {
        name: 'test',
        data: [
          {text: '选项1', value: '1'},
          {text: '选项2', value: '2'},
          {text: '选项3', value: '3'}
        ]
      },
      checkboxOp2: {
        name: 'list',
        isdisabled: true,
        data: [
          {text: '唱歌', value: 'sing', checked: true},
          {text: '跳舞', value: 'dance'},
          {text: '音乐', value: 'music'},
          {text: '运动', value: 'sports', checked: true}
        ]
      },
      checkboxOp: {
        name: 'age',	//	复选框的name
        isdisabled: false,	//	是否禁用,为true可禁用
        Bool: false,			//	v-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true
        data: [	//	复选框数据	checked: true	默认选中
          {text: '唱歌', value: 'sing'},
          {text: '跳舞', value: 'dance'},
          {text: '音乐', value: 'music'},
          {text: '运动', value: 'sports', checked: true}
        ]
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;span&gt;爱好&lt;/span&gt;&lt;br&gt;
            &lt;zoom-checkbox v-model="fondness" :op="checkboxOp"&gt;&lt;/zoom-checkbox&gt;
            &lt;zoom-button @click="checkboxClick"&gt;当前选中的值&lt;/zoom-button&gt;&lt;br&gt;
            禁用复选框:&lt;br&gt;
            &lt;zoom-checkbox :op="checkboxOp2"&gt;&lt;/zoom-checkbox&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                fondness: 'sports',
                checkboxOp2: {
                  name: 'list',
                  isdisabled: true,
                  data: [
                    {text: '唱歌', value: 'sing', checked: true},
                    {text: '跳舞', value: 'dance'},
                    {text: '音乐', value: 'music'},
                    {text: '运动', value: 'sports', checked: true}
                  ]
                },
                checkboxOp: {
                  name: 'age',	//	复选框的name
                  isdisabled: false,	//	是否禁用,为true可禁用
                  Bool: false,			//	v-model 绑定默认是value值, 如果Bool设置为true,那么选中后获取的是true
                  data: [	//	复选框数据	checked: true	默认选中
                    {text: '唱歌', value: 'sing'},
                    {text: '跳舞', value: 'dance'},
                    {text: '音乐', value: 'music'},
                    {text: '运动', value: 'sports', checked: true}
                  ]
                }
              }
            },
            methods: {
              checkboxClick() {
                console.log('当前值是', this.fondness);
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-checkbox :op="op"&gt;&lt;/zoom-checkbox&gt;
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
        &lt;/script&gt;
      `
    }
  },
  methods: {
    checkboxClick() {
      console.log('当前值是', this.fondness);
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-radio');
    },
    nextClick() {
      this.$router.push('/component/zoom-form');
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
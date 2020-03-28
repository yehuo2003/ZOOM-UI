<template>
  <div class="custom-zoom-form">
    <h1>开关组件</h1>
    <!-- 普通 -->
    <div class="tip">
      zoom-ui的form表单组件提供了强大的表单功能，在表单中每个条目默认为块级元素，也可以更改为行内元素，此外表单还提供了一键验证功能，用于自定义验证表单中所有zoom-ui的表单组件，
      此外还有一键重置功能，用于重置表单中所有zoom-ui的表单元素组件。
    </div>
    <h2>使用方法</h2>
    <p>如果表单中只有一个按钮, 默认可以用回车键提交 或者点击会触发默认事件, 如果不想要的话就在zoom-form标签中加<span>submit.prevent="false"</span>阻止默认提交事件</p>
    <zoom-tabs class="data-drop" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-form @submit.prevent="false" label-width="100px">
          <zoom-form-item label="姓名">
            <zoom-input></zoom-input>
          </zoom-form-item>
          <zoom-form-item label="地址">
            <zoom-input></zoom-input>
          </zoom-form-item>
        </zoom-form>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>高级用法</h2>
    <p><span>label-width</span>为label的宽度, 可以自定义</p>
    <p>在<span>zoom-form</span>标签上加 <span>:inline="true"</span> 可以将条目变为行内元素</p>
    <p>在<span>zoom-form-item</span>标签上加 <span>:require="true"</span> 则为必填项, 可配合<span>valid</span>函数做校验</p>
    <p>zoom-ui提供的<span>reset</span>函数可以重置表单内所有表单组件</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-form ref="form" label-width="120px">
          <zoom-form-item inline="true" :require="true" label="名字">
            <zoom-input :op="inputOp" placeholder="请输入名字"></zoom-input>
          </zoom-form-item>
          <zoom-form-item inline="true" label="密码">
            <zoom-input></zoom-input>
          </zoom-form-item>
          <zoom-form-item label="下拉框">
            <zoom-dropdown></zoom-dropdown>
          </zoom-form-item>
          <zoom-form-item :require="true" label="搜索">
            <zoom-search :op="inputOp"></zoom-search>
          </zoom-form-item>
          <zoom-form-item :require="true" label="部门">
            <zoom-input :op="inputOp" placeholder="请输入部门"></zoom-input>
          </zoom-form-item>
          <zoom-form-item label="计数器">
            <zoom-numeric :op="inputOp"></zoom-numeric>
          </zoom-form-item>
          <zoom-form-item label="复选框">
            <zoom-checkbox :op="checkOp"></zoom-checkbox>
          </zoom-form-item>
          <zoom-form-item label="单选框">
            <zoom-radio :op="checkOp"></zoom-radio>
          </zoom-form-item>
          <zoom-form-item :require="true" label="长框">
            <zoom-textarea :op="inputOp"></zoom-textarea>
          </zoom-form-item>
          <zoom-form-item style="text-align: center">
            <zoom-button @click="testingClick" type="primary">验证表单</zoom-button>
            <zoom-button @click="resetClick">重置表单</zoom-button>
          </zoom-form-item>
        </zoom-form>
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
          title: "属性",
          content: [
            {
              id: 1,
              title: "标签名",
              name: "label",
              type: "String",
              text: "表单条目的标签名称",
              text2: '用法: <span>zoom-form-item</span>组件标签上, 绑定 <span>label="标签名"</span>'
            },
            {
              id: 2,
              title: "标签宽度",
              name: "label-width",
              type: "String",
              text: "设置form表单的标签宽度",
              text2: '用法: <span>zoom-form</span>组件标签上, 绑定 <span>label-width="100px"</span>'
            },
            {
              id: 3,
              title: "行内元素方式显示",
              name: "inline",
              type: "Boolean",
              text: "form表单的条目默认为块级元素, 如果需要将其变为行内元素, 可使用属性<span>inline</span>",
              text2: '用法: <span>zoom-form</span>或者<span>zoom-form-item</span>组件标签上, 绑定 <span>:inline="true"/span>'
            },
            {
              id: 4,
              title: "必填验证",
              name: "require",
              type: "Boolean",
              text: "对于绑定<span>require</span>属性的条目, 在调用<span>valid</span>方法时, 优先判断是否填写, 如果有填写, 再判断是否开始<span>testing</span>方法, 如果有则调用",
              text2: '用法: <span>zoom-form-item</span>组件标签上, 绑定 <span>:require="true"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "验证功能",
              name: "valid",
              type: "Function",
              text: "用于验证form表单内所有zoom-ui的表单元素, 验证成功返回<span>true</span>否则返回<span>true</span>",
              text2: '在组件标签中绑定ref属性, 然后this.$refs[绑定属性].valid() 方法直接调用'
            },
            {
              id: 2,
              title: "重置功能",
              name: "reset",
              type: "Function",
              text: "用于重置form表单内所有zoom-ui的表单元素, 将其组件重置为初始值",
              text2: '在组件标签中绑定ref属性, 然后this.$refs[绑定属性].reset() 方法直接调用'
            }
          ]
        }
      ],
      checkOp: {
        data: [
          {value: 1, text: '唱', checked: true},
          {value: 2, text: '跳'},
          {value: 3, text: 'rap'},
          {value: 4, text: '篮球'}
        ]
      },
      inputOp: {
        errMsg: '验证不通过',
        testing: val => {
          if (!val) {
            return false
          } else {
            return true
          }
        }
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-form ref="form" label-width="120px"&gt;
              &lt;zoom-form-item inline="true" :require="true" label="名字"&gt;
                &lt;zoom-input :op="inputOp" placeholder="请输入名字"&gt;&lt;/zoom-input&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item inline="true" label="密码"&gt;
                &lt;zoom-input&gt;&lt;/zoom-input&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item label="下拉框"&gt;
                &lt;zoom-dropdown&gt;&lt;/zoom-dropdown&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item :require="true" label="搜索"&gt;
                &lt;zoom-search :op="inputOp"&gt;&lt;/zoom-search&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item :require="true" label="部门"&gt;
                &lt;zoom-input :op="inputOp" placeholder="请输入部门"&gt;&lt;/zoom-input&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item label="计数器"&gt;
                &lt;zoom-numeric :op="inputOp"&gt;&lt;/zoom-numeric&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item label="复选框"&gt;
                &lt;zoom-checkbox :op="checkOp"&gt;&lt;/zoom-checkbox&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item label="单选框"&gt;
                &lt;zoom-radio :op="checkOp"&gt;&lt;/zoom-radio&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item :require="true" label="长框"&gt;
                &lt;zoom-textarea :op="inputOp"&gt;&lt;/zoom-textarea&gt;
              &lt;/zoom-form-item&gt;
              &lt;zoom-form-item style="text-align: center"&gt;
                &lt;zoom-button @click="testingClick" type="primary"&gt;验证表单&lt;/zoom-button&gt;
                &lt;zoom-button @click="resetClick"&gt;重置表单&lt;/zoom-button&gt;
              &lt;/zoom-form-item&gt;
            &lt;/zoom-form&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                checkOp: {
                  data: [
                    {value: 1, text: '唱', checked: true},
                    {value: 2, text: '跳'},
                    {value: 3, text: 'rap'},
                    {value: 4, text: '篮球'}
                  ]
                },
                inputOp: {
                  errMsg: '验证不通过',
                  testing: val =&gt; {
                    if (!val) {
                      return false
                    } else {
                      return true
                    }
                  }
                }
              }
            },
            methods: {
              testingClick() {
                this.$refs['form'].valid()
              },
              resetClick() {
                this.$refs['form'].reset()
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;zoom-form @submit.prevent="false" label-width="100px"&gt;
          &lt;zoom-form-item label="姓名"&gt;
            &lt;zoom-input&gt;&lt;/zoom-input&gt;
          &lt;/zoom-form-item&gt;
          &lt;zoom-form-item label="地址"&gt;
            &lt;zoom-input&gt;&lt;/zoom-input&gt;
          &lt;/zoom-form-item&gt;
        &lt;/zoom-form&gt;
      `
    }
  },
  methods: {
    testingClick() {
      this.$refs['form'].valid()
    },
    resetClick() {
      this.$refs['form'].reset()
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
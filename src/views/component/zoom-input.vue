<template>
  <div class="custom-zoom-input">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-input></zoom-input>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的input输入框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容</p>
    <zoom-tabs class="basic" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        姓名：<zoom-input :op="inputOp"></zoom-input><br>
        密码：<zoom-input :op="inputOp2"></zoom-input><br>
        禁用：<zoom-input :op="inputOp3"></zoom-input><br>
        禁止输入：<zoom-input v-model="value" :op="inputOp4"></zoom-input>
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
              title: "输入框类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>text</span> / <span>password</span>, 默认: <span>text</span>",
              text2: '用法: <span>type="可选参数"</span>'
            },
            {
              id: 2,
              title: "占位符",
              name: "placeHolder",
              type: "String",
              text: "可自定义占位符内容",
              text2: '用法: 配置op对象, 设置 <span>placeHolder="参数"</span>'
            },
            {
              id: 3,
              title: "自定义icon",
              name: "IconStyle",
              type: "String",
              text: "配置了自定义icon后, 在输入框最右边显示, 可以配合<span>onClick</span>点击事件一起使用",
              text2: '>用法: 配置op对象, 设置 <span>IconStyle="icon类名"</span>'
            },
            {
              id: 4,
              title: "错误信息",
              name: "errMsg",
              type: "String",
              text: "需要配置testing方法, 并且在方法返回<span>false</span>的情况下, 才会出现",
              text2: '用法: 配置op对象, 设置 <span>errMsg="要提示用户的错误信息"</span>'
            },
            {
              id: 5,
              title: "禁止输入",
              name: "readonly",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容",
              text2: '用法: 配置op对象, 设置 <span>readonly="true"</span>'
            },
            {
              id: 6,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容",
              text2: '用法: 配置op对象, 设置 <span>disabled="true"</span>'
            },
            {
              id: 7,
              title: "最小输入字符",
              name: "minLength",
              type: "Number",
              text: "默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",
              text2: '用法: 配置op对象, 设置 <span>minLength: 0</span>'
            },
            {
              id: 8,
              title: "最大输入字符",
              name: "maxLength",
              type: "Number",
              text: "设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",
              text2: '用法: 配置op对象, 设置 <span>maxLength: 50</span>'
            },
            {
              id: 9,
              title: "组件宽度",
              name: "width",
              type: "String",
              text: "默认<span>270px</span>, 可自定义组件的宽度",
              text2: '用法: 配置op对象, 设置 <span>width: "100%"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "验证方法",
              name: "testing",
              type: "String",
              text: "绑定自定义验证方法",
              text2: '用法: 配置op对象, 并设置了<span>errMsg</span>后, 设置 <span>testing:val => {};</span> val为输入框内容, 如果方法返回<span>false</span>则显示<span>errMsg</span>的内容'
            },
            {
              id: 2,
              title: "自定义icon的点击事件",
              name: "onClick",
              type: "Function",
              text: "绑定自定义Icon点击事件",
              text2: '用法: 配置op对象, 并设置了自定义icon后, 设置 <span>onClick:val => {};</span> val为输入框内容'
            }
          ]
        }
      ],
      value: '输入框内容',
      inputOp4: {
        readonly: true
      },
      inputOp3: {
        disabled: true,
      },
      inputOp2: {
        placeHolder: '请输入密码',
        type: 'password',
        errMsg: '密码必须是大写英文',
        testing: value => {
          let reg = /^[A-Z]+$/;
          console.log(reg.test(value), '=reg.testing(value)');
          if(reg.test(value)) {
            return true;
          } else {
            return false;
          }
        }
      },
      inputOp: {
        disabled: false,		// 是否禁用
        placeHolder: '请输入姓名',  //  占位符
        readonly: true,     //  是否禁止输入
        type: 'text',					// 输入框类型 可选text或password
        IconStyle: 'icon-add',	// 在输入框尾部追加自定义icon
        onClick:()=> {					// 当配置了自定义icon, 可以自定义回调函数 点击自定义图标触发
          console.log('按钮被点击');
        },
        errMsg: '姓名长度必须大于10',		// 验证错误时候的提示信息
        testing: value => {			// 用来验证的回调函数 可用正则匹配,如果写了此函数要写验证方法否则默认返回true
          if (value.length > 10) {
            return true;
          } else {
            return false;
          }
        }
      },
      opTab: 0,
      curTab: 0,
      opIpt:
        `&lt;template&gt;
            &lt;div&gt;
              姓名：&lt;zoom-input :op="inputOp"&gt;&lt;/zoom-input&gt;
              密码：&lt;zoom-input :op="inputOp2"&gt;&lt;/zoom-input&gt;
              禁用：&lt;zoom-input :op="inputOp3"&gt;&lt;/zoom-input&gt;
              禁止输入：&lt;zoom-input v-model="value" :op="inputOp4"&gt;&lt;/zoom-input&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  value: '输入框内容',
                  inputOp4: {
                    readonly: true
                  },
                  op3: {
                    disabled: true,
                  },
                  op2: {
                    placeHolder: '请输入密码',
                    type: 'password',
                    errMsg: '密码必须是大写英文',
                    testing: value =>; {
                      let reg = /^[A-Z]+$/;
                      if(reg.test(value)) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  },
                  op: {
                    disabled: false,		// 是否禁用
                    placeHolder: '请输入姓名',  //  占位符
                    readonly: false,     //  是否禁止输入
                    type: 'text',					// 输入框类型 可选text或password
                    IconStyle: 'icon-add',	// 在输入框尾部追加自定义icon
                    onClick:()=>; {					// 当配置了自定义icon, 可以自定义回调函数 点击自定义图标触发
                      console.log('按钮被点击');
                    },
                    errMsg: '姓名长度必须大于10',		// 验证错误时候的提示信息
                    testing: value =>; {			// 用来验证的回调函数 可用正则匹配,如果写了此函数要写验证方法否则默认返回true
                      if (value.length > 10) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  },
                }
              }
            }
          &lt;/script&gt;`,
      ipt: `&lt;zoom-input&gt;&lt;/zoom-input&gt;`
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
.custom-zoom-input {
  .basic {
    .zoom-input {
      margin: 10px 0;
    }
  }
  h1,h2 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
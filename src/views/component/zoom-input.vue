<template>
  <div class="custom-zoom-input">
    <h1>输入框组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-input></zoom-input>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的input输入框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容</p>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
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
    <h2>属性</h2>
    <zoom-panel title="输入框类型: type">
      <p>可选参数: text / password</p>
      <p>默认: text</p>
      <p>类型: String</p>
      <p>用法: type="可选参数"</p>
    </zoom-panel>
    <zoom-panel title="占位符: placeHolder">
      <p>类型: String</p>
      <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
    </zoom-panel>
    <zoom-panel title="自定义icon: IconStyle">
      <p>类型: String</p>
      <p>配置了自定义icon后, 在输入框最右边显示, 可以配合onClick点击事件一起使用</p>
      <p>用法: 配置op对象, 设置 IconStyle="icon类名"</p>
    </zoom-panel>
    <zoom-panel title="错误信息: errMsg">
      <p>类型: String</p>
      <p>需要配置testing方法, 并且在方法返回false的情况下, 才会出现</p>
      <p>用法: 配置op对象, 设置 errMsg="要提示用户的错误信息"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: readonly">
      <p>类型: Boolean</p>
      <p>默认false, 为true禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容</p>
      <p>用法: 配置op对象, 设置 readonly="true"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: isdisabled">
      <p>类型: Boolean</p>
      <p>默认false, 为true则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容</p>
      <p>用法: 配置op对象, 设置 isdisabled="true"</p>
    </zoom-panel>
    <h2>方法</h2>
    <zoom-panel title="自定义icon的点击事件: onClick">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 并设置了自定义icon后, 设置 onClick:val => {}; val为输入框内容</p>
    </zoom-panel>
    <zoom-panel title="验证方法: testing">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 并设置了errMsg后, 设置 testing:val => {}; val为输入框内容, 如果方法返回false则显示errMsg的内容</p>
    </zoom-panel>
    <zoom-button @click="prevClick">按钮组件</zoom-button>
    <zoom-button @click="nextClick">下拉框组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '输入框内容',
      inputOp4: {
        readonly: true
      },
      inputOp3: {
        isdisabled: true,
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
        isdisabled: false,		// 是否禁用
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
      opIpt: `
        &lt;template&gt;
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
                  isdisabled: true,
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
                  isdisabled: false,		// 是否禁用
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
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-input&gt;&lt;/zoom-input&gt;`
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
      this.$router.push('/component/zoom-button');
    },
    nextClick() {
      this.$router.push('/component/zoom-dropdown');
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
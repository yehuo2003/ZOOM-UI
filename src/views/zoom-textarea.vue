<template>
  <div class="custom-zoom-textarea">
    <h1>文本域组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-textarea></zoom-textarea>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的文本域组件，可以用v-model绑定数据，并且可以看到已经输入字节/最大字节。默认宽度为父元素100%，高度用户可自由拖动。可以绑定op对象，并设置常用属性</p>
    <p>禁用状态下，无法拖动文本域</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-textarea :op="textareaOp"></zoom-textarea><br>
        禁用文本域：<br>
        <zoom-textarea :op="textareaOp2"></zoom-textarea>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="占位符: placeHolder">
      <p>类型: String</p>
      <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
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
    <zoom-panel title="验证方法: testing">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 并设置了errMsg后, 设置 testing:val => {}; val为输入框内容, 如果方法返回false则显示errMsg的内容</p>
    </zoom-panel>
    <zoom-button @click="prevClick">数字框组件</zoom-button>
    <zoom-button @click="nextClick">验证码组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textareaOp2: {
        isdisabled: true,
      },
      textareaOp: {
        placeHolder: '请输入内容',	// 占位符
        maxLength: 100,						// 最大输入长度, 默认为50
        isdisabled: false,			// 是否禁用
        readonly: false,		//是否禁止输入
        errMsg: '必填',
        testing: val => {
          if (!val) {
            return false;
          } else {
            return true;
          }
        },
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-textarea :op="textareaOp"&gt;&lt;/zoom-textarea&gt;&lt;br&gt;
            禁用文本域：&lt;br&gt;
            &lt;zoom-textarea :op="textareaOp2"&gt;&lt;/zoom-textarea&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                textareaOp2: {
                  isdisabled: true,
                },
                textareaOp: {
                  placeHolder: '请输入内容',	// 占位符
                  maxLength: 100,	// 最大输入长度, 默认为50
                  isdisabled: false,			// 是否禁用
                  readonly: false,		//是否禁止输入
                  errMsg: '必填',
                  testing: val => {
                    if (!val) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-textarea&gt;&lt;/zoom-textarea&gt;`
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  methods: {
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-numeric');
    },
    nextClick() {
      this.$router.push('/component/zoom-testing');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-textarea {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-textarea {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-textarea {
        margin: 10px;
      }
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
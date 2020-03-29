<template>
  <div class="custom-zoom-testing">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-testing></zoom-testing>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的数字组件，可以用v-model绑定数据, 但是只能绑定Number类型数据，并且进行加或减
      可以绑定op对象，并设置常用属性</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-testing :op="numericOp"></zoom-testing>
        禁用数字框：<zoom-testing v-model="num" :op="numericOp2"></zoom-testing>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="最小值: min">
      <p>类型: Number</p>
      <p>设置用户可输入的的最小值, 设置之后, 用户输入范围最小不得小于最小值, 也无法通过减号按钮让当前值小于最小值</p>
      <p>用法: 配置op对象, 设置 min="最小值"</p>
    </zoom-panel>
    <zoom-panel title="最大值: max">
      <p>类型: Number</p>
      <p>设置用户可输入的的最大值, 设置之后, 用户输入范围最大不得大于最大值, 也无法通过减号按钮让当前值大于最大值</p>
      <p>用法: 配置op对象, 设置 max="最大值"</p>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 5,
      numericOp2: {
        isdisabled: true,
      },
      numericOp: {
        max: 10,  //  最大值
        min: 0,   //  最小值
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
            &lt;zoom-testing :op="numericOp"&gt;&lt;/zoom-testing&gt;
            禁用数字框：&lt;zoom-testing v-model="num" :op="numericOp2"&gt;&lt;/zoom-testing&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                num: 5,
                numericOp2: {
                  isdisabled: true,
                },
                numericOp: {
                  max: 10,  //  最大值
                  min: 0,   //  最小值
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
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-testing&gt;&lt;/zoom-testing&gt;`
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
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-testing {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-testing {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-testing {
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
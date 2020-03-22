<template>
  <div class="custom-zoom-dropdown">
    <h1>下拉框组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-dropdown></zoom-dropdown>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的dropdown下拉框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        下拉单选：<zoom-dropdown :op="dropdownOp"></zoom-dropdown><br>
        下拉多选：<zoom-dropdown :op="dropdownOp2"></zoom-dropdown>
        <br>
        下拉禁用：<zoom-dropdown :op="dropdownOp3"></zoom-dropdown>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>动态设置数据</h3>
    <p>有时候下拉框数据是通过后台请求的，这就用到了动态加载数据，可以帮助开发者方便的开发</p>
    <zoom-tabs class="data-drop" :value="loadTab" @tabChange="loadChange">
      <zoom-tab-item :index="0" label="效果">
        默认无数据：<zoom-dropdown ref="dropdown" :op="dropdownOp4"></zoom-dropdown><br>
        <zoom-button @click="handleClick">点击加载数据</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="loadIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="占位符: placeHolder">
      <p>类型: String</p>
      <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
    </zoom-panel>
    <zoom-panel title="下拉框数据: data">
      <p>类型: Array</p>
      <p>默认为暂无数据, 可手动配置数组对象, 对象里设置value和text, text为前端展示文本, value是传给后台的值</p>
      <p>用法: 配置op对象, 设置 data=[{value: 'xx', text: 'xxx'}]</p>
    </zoom-panel>
    <zoom-panel title="默认选中: defalut">
      <p>类型: String</p>
      <p>default为默认展示的数据, 必须要是data数组里有的数据, default请和value值保持一致</p>
      <p>用法: 配置op对象, 设置 default="属性"</p>
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
    <zoom-panel title="隐藏清除按钮: hideClose">
      <p>类型: Boolean</p>
      <p>默认false, 为true则不显示清除按钮</p>
      <p>用法: 配置op对象, 设置 hideClose="true"</p>
    </zoom-panel>
    <zoom-panel title="是否多选: isChecked">
      <p>类型: Boolean</p>
      <p>默认false, 为true则启用多选功能, 样式为复选框</p>
      <p>用法: 配置op对象, 设置 isChecked="true"</p>
    </zoom-panel>
    <h2>方法</h2>
    <zoom-panel title="验证方法: testing">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 并设置了errMsg后, 设置 testing:val => {}; val为输入框内容, 如果方法返回false则显示errMsg的内容</p>
    </zoom-panel>
    <zoom-panel title="动态设置数据: load">
      <p>类型: Function</p>
      <p>通过ref来获取当前下拉框, 再调用load方法, 入参为数组。</p>
      <p>用法: this.$refs[属性].load(data)</p>
    </zoom-panel>
    <zoom-button @click="prevClick">输入框组件</zoom-button>
    <zoom-button @click="nextClick">搜索框组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdownOp4: {
        placeHolder: '--等待加载数据--',
      },
      dropdownOp3: {
        isdisabled: true,
      },
      dropdownOp2: {
        isChecked: true,
        isdisabled: false,
        placeHolder: '--请选择--',
        readonly: true,
        hideClose: false,
        data: [
          {value: '1', text: '北京'},
          {value: '2', text: '上海'},
          {value: '3', text: '广州'},
          {value: '4', text: '深圳'}
        ],
      },
      dropdownOp: {
        isChecked: false,			//	是否开启多选 为true情况下 v-model绑定返回数组
        isdisabled: false,			// 是否禁用
        placeHolder: '--请选择--',	//占位符
        defalut: '2',			//默认选中的值, 写value
        readonly: false,		//是否禁止输入
        errMsg: '必填',
        testing: val => {
          if (!val) {
            return false;
          } else {
            return true;
          }
        },
        hideClose: true,			//是否隐藏清除按钮 默认false
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: '1', text: '北京'},
          {value: '2', text: '上海'},
          {value: '3', text: '广州'},
          {value: '4', text: '深圳'}
        ],
      },
      opTab: 0,
      curTab: 0,
      loadTab: 0,
      loadIpt: `
        &lt;template&gt;
          &lt;div&gt;
            默认无数据：&lt;zoom-dropdown ref="dropdown"&gt;&lt;/zoom-dropdown&gt;&lt;br&gt;
            &lt;zoom-button @click="handleClick"&gt;点击加载数据&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
              }
            },
            methods: {
              handleClick() {
                let data = [
                  {value: '1', text: '北京'},
                  {value: '2', text: '上海'},
                  {value: '3', text: '广州'},
                  {value: '4', text: '深圳'}
                ];
                this.$refs['dropdown'].load(data);
              }
            }
          }
        &lt;/script&gt;
      `,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            下拉单选：&lt;zoom-dropdown :op="dropdownOp"&gt;&lt;/zoom-dropdown&gt;
            下拉多选：&lt;zoom-dropdown :op="dropdownOp2"&gt;&lt;/zoom-dropdown&gt;
            下拉禁用：&lt;zoom-dropdown :op="dropdownOp3"&gt;&lt;/zoom-dropdown&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                dropdownOp3: {
                  isdisabled: true,
                },
                dropdownOp2: {
                  isChecked: true,
                  isdisabled: false,
                  placeHolder: '--请选择--',
                  readonly: true,
                  hideClose: false,
                  data: [
                    {value: '1', text: '北京'},
                    {value: '2', text: '上海'},
                    {value: '3', text: '广州'},
                    {value: '4', text: '深圳'}
                  ],
                },
                dropdownOp: {
                  isChecked: false,			//	是否开启多选 为true情况下 v-model绑定返回数组
                  isdisabled: false,			// 是否禁用
                  placeHolder: '--请选择--',	//占位符
                  defalut: '2',			//默认选中的值, 写value
                  readonly: false,		//是否禁止输入
                  errMsg: '必填',
                  testing: val =>; {
                    if (!val) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                  hideClose: true,			//是否隐藏清除按钮 默认false
                  data: [						//下拉框数据, 键值对的方式, text是展示的文本
                    {value: '1', text: '北京'},
                    {value: '2', text: '上海'},
                    {value: '3', text: '广州'},
                    {value: '4', text: '深圳'}
                  ],
                },
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-dropdown&gt;&lt;/zoom-dropdown&gt;`
    }
  },
  methods: {
    handleClick() {
      let data = [
        {value: '1', text: '北京'},
        {value: '2', text: '上海'},
        {value: '3', text: '广州'},
        {value: '4', text: '深圳'}
      ];
      this.$refs['dropdown'].load(data);
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    loadChange(index) {
      this.loadTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-input');
    },
    nextClick() {
      this.$router.push('/component/zoom-search');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-dropdown {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 250px;
      .zoom-dropdown {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-dropdown {
        margin: 10px 0;
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
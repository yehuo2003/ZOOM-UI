<template>
  <div class="custom-zoom-dropdown">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-dropdown></zoom-dropdown>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="dropdownCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的dropdown下拉框组件，可以绑定op对象，并设置常用属性。组件自带清除功能，点击输入框右边的清除按钮可清除输入内容</p>
    <zoom-tabs class="data-drop" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        下拉单选：<zoom-dropdown :op="dropdownOp"></zoom-dropdown><br>
        下拉多选：<zoom-dropdown :op="dropdownOp2"></zoom-dropdown>
        <br>
        下拉禁用：<zoom-dropdown :op="dropdownOp3"></zoom-dropdown>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="dropdownCustom"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>动态设置数据</h3>
    <p>有时候下拉框数据是通过后台请求的，这就用到了动态加载数据，可以帮助开发者方便的开发</p>
    <zoom-tabs class="data-drop" :value="loadTab" @change="loadChange">
      <zoom-tab-item :index="0" label="效果">
        默认无数据：<zoom-dropdown ref="dropdown" :op="dropdownOp4"></zoom-dropdown><br>
        <zoom-button @click="handleClick">点击加载数据</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="dropdownLoad"></custom-code>
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
              title: "占位符",
              name: "placeHolder",
              type: "String",
              text: "可自定义占位符内容",
              text2: '用法: 配置op对象, 设置 <span>placeHolder: "参数"</span>'
            },
            {
              id: 2,
              title: "下拉框数据",
              name: "data",
              type: "Array",
              text: "默认为暂无数据, 可手动配置数组对象, 对象里设置<span>value</span>和<span>text</span>, <span>text</span>为前端展示文本, <span>value</span>是传给后台的值",
              text2: '用法: 配置op对象, 设置 <span>data: [{value: "xx", text: "xxx"}]</span>'
            },
            {
              id: 3,
              title: "默认选中",
              name: "default",
              type: "String",
              text: "<span>default</span>为默认展示的数据, 必须要是<span>data</span>数组里有的数据, <span>default</span>请和<span>value</span>值保持一致",
              text2: '用法: 配置op对象, 设置 <span>default: "属性"</span>'
            },
            {
              id: 4,
              title: "错误信息",
              name: "errMsg",
              type: "String",
              text: "需要配置<span>testing</span>方法, 并且在方法返回<span>false</span>的情况下, 才会出现",
              text2: '用法: 配置op对象, 设置 <span>errMsg: "要提示用户的错误信息"</span>'
            },
            {
              id: 5,
              title: "禁止输入",
              name: "readonly",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容",
              text2: '用法: 配置op对象, 设置 <span>readonly: "true"</span>'
            },
            {
              id: 6,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容",
              text2: '用法: 配置op对象, 设置 <span>disabled: "true"</span>'
            },
            {
              id: 7,
              title: "隐藏清除按钮",
              name: "hideClose",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则不显示清除按钮",
              text2: '用法: 配置op对象, 设置 <span>hideClose: "true"</span>'
            },
            {
              id: 8,
              title: "是否多选",
              name: "isChecked",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则启用多选功能, 样式为复选框",
              text2: '用法: 配置op对象, 设置 <span>isChecked: "true"</span>'
            },
            {
              id: 9,
              title: "最小输入字符",
              name: "minLength",
              type: "Number",
              text: "默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",
              text2: '用法: 配置op对象, 设置 <span>minLength: 0</span>'
            },
            {
              id: 10,
              title: "最大输入字符",
              name: "maxLength",
              type: "Number",
              text: "设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",
              text2: '用法: 配置op对象, 设置 <span>maxLength: 50</span>'
            },
            {
              id: 11,
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
              title: "动态设置数据",
              name: "load",
              type: "Function",
              text: "通过ref来获取当前下拉框, 再调用<span></span>load方法, 入参为数组。",
              text2: '用法: <span>this.$refs[属性].load(data)</span>'
            }
          ]
        }
      ],
      dropdownOp4: {
        placeHolder: '--等待加载数据--',
      },
      dropdownOp3: {
        disabled: true,
      },
      dropdownOp2: {
        isChecked: true,
        disabled: false,
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
        disabled: false,			// 是否禁用
        placeHolder: '--请选择--',	//占位符
        default: '2',			//默认选中的值, 写value
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
      dropdownLoad:
        `&lt;template&gt;
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
          &lt;/script&gt;`,
      dropdownCustom:
        `&lt;template&gt;
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
                    disabled: true,
                  },
                  dropdownOp2: {
                    isChecked: true,
                    disabled: false,
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
                    disabled: false,			// 是否禁用
                    placeHolder: '--请选择--',	//占位符
                    default: '2',			//默认选中的值, 写value
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
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`,
      dropdownCode: `&lt;zoom-dropdown&gt;&lt;/zoom-dropdown&gt;`
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
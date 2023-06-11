<template>
  <div class="custom-zoom-dropdown">
    <!-- 普通 -->
    <tab-template :code="dropdownCode">
      <zoom-select></zoom-select>
    </tab-template>
    <!-- 设置属性 -->
    <tab-template cls="data-drop" :code="dropdownCustom">
      <template slot="header">
        <h3>{{ $zoom.$t('设置属性') }}</h3>
        <text-template code="zoom-ui提供的select选择器组件，可以绑定op对象，并设置常用属性。下拉数据可通过zoom-option来进行配置, 并且绑定*value*值和*text*值" />
      </template>
      下拉单选：
      <zoom-select :op="dropdownOp" style="width: 270px;">
        <zoom-option
          v-for="item in options"
          :key="item.value"
          :text="item.text"
          :value="item.value"
          :disabled="item.disabled"
        >
        </zoom-option>
      </zoom-select>
      <br>
      <br>
      下拉多选：
      <zoom-select multiple :op="dropdownOp2" style="width: 270px;">
        <zoom-option
          v-for="item in options2"
          :key="item.value"
          :text="item.text"
          :value="item.value"
          :disabled="item.disabled"
        >
        </zoom-option>
      </zoom-select>
      <br>
      <br>
      下拉禁用：
      <zoom-select style="width: 270px;">
        <zoom-option
          v-for="item in options3"
          :key="item.value"
          :text="item.text"
          :value="item.value"
          :disabled="item.disabled"
        >
        </zoom-option>
      </zoom-select>
    </tab-template>
    <!-- 动态设置数据 -->
    <tab-template cls="data-drop" :code="dropdownLoad">
      <template slot="header">
        <h3>{{ $zoom.$t('动态设置数据') }}</h3>
        <text-template code="有时候下拉框数据是通过后台请求的，这就用到了动态加载数据，可以帮助开发者方便的开发" />
      </template>
      默认无数据：
      <zoom-select ref="select"></zoom-select>
      <br>
      <zoom-button @click="handleClick">点击加载数据</zoom-button>
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
              title: "占位符",
              name: "placeHolder",
              type: "String",
              text: "可自定义占位符内容",
              text2: '用法: 配置op对象, 设置 <span>placeHolder: "参数"</span>, 或者直接在标签上绑定<span>placeHolder="参数"</span>'
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
              text: "使用<span>v-model</span>绑定数据",
              text2: '<span>v-model</span>'
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
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认 <span>false</span>, 为<span>true</span>则无法被选中",
              text2: '用法: 在option配置中, 设置要禁用的选项为 <span>disabled: "true"</span>'
            },
            {
              id: 6,
              title: "是否多选",
              name: "multiple",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则启用多选功能, 样式为复选框",
              text2: '用法: 在标签里直接绑定, 设置 <span>multiple</span>'
            },
            {
              id: 7,
              title: "缩写模式",
              name: "collapseTags",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>开启缩写功能,只有在启用多选模式下才能生效。",
              text2: '用法: 在标签里直接绑定, 设置 <span>collapseTags</span>'
            },
            {
              id: 8,
              title: "组件宽度",
              name: "width",
              type: "String",
              text: "默认<span>100%</span>, 可自定义组件的宽度",
              text2: '用法: 直接在标签里设置, 设置 <span>style="width: 270px;"</span>'
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
        placeHolder: '--请选择--',
      },
      options: [
        {value: '1', text: '北京'},
        {value: '2', text: '上海'},
        {value: '3', text: '广州'},
        {value: '4', text: '深圳'}
      ],
      options2: [
        {value: '3', text: '广州'},
        {value: '1', text: '北京'},
        {value: '2', text: '上海'},
        {value: '4', text: '深圳'}
      ],
      options3: [
        {value: '1', text: '北京', disabled: true},
        {value: '3', text: '广州'},
        {value: '2', text: '上海', disabled: true},
        {value: '4', text: '深圳'}
      ],
      options4: [],
      dropdownOp: {
        placeHolder: '--请选择--',	//占位符
        errMsg: '必填',
        testing: val => {
          if (!val) {
            return false;
          } else {
            return true;
          }
        }
      },
      dropdownLoad:
        `&lt;template&gt;
            &lt;div&gt;
              默认无数据：&lt;zoom-select ref="select"&gt;&lt;/zoom-select&gt;&lt;br&gt;
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
                  this.$refs['select'].load(data);
                }
              }
            }
          &lt;/script&gt;`,
      dropdownCustom:
        `&lt;template&gt;
            &lt;div&gt;
              下拉单选：&lt;zoom-select :op="dropdownOp" style="width: 270px;"&gt;
                &lt;zoom-option
                  v-for="item in options"
                  :key="item.value"
                  :text="item.text"
                  :value="item.value"
                  :disabled="item.disabled"
                &gt;
                &lt;/zoom-option&gt;
              &lt;/zoom-select&gt;
              下拉多选：&lt;zoom-select multiple :op="dropdownOp2" style="width: 270px;"&gt;
                &lt;zoom-option
                  v-for="item in options2"
                  :key="item.value"
                  :text="item.text"
                  :value="item.value"
                  :disabled="item.disabled"
                &gt;
                &lt;/zoom-option&gt;
              &lt;/zoom-select&gt;
              下拉禁用：&lt;zoom-select"&gt;
                &lt;zoom-option
                    v-for="item in options3"
                    :key="item.value"
                    :text="item.text"
                    :value="item.value"
                    :disabled="item.disabled"
                  &gt;
                  &lt;/zoom-option&gt;
              &lt;/zoom-select&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  options: [
                    {value: '1', text: '北京'},
                    {value: '2', text: '上海'},
                    {value: '3', text: '广州'},
                    {value: '4', text: '深圳'}
                  ],
                  options2: [
                    {value: '3', text: '广州'},
                    {value: '1', text: '北京'},
                    {value: '2', text: '上海'},
                    {value: '4', text: '深圳'}
                  ],
                  options3: [
                    {value: '1', text: '北京', disabled: true},
                    {value: '3', text: '广州'},
                    {value: '2', text: '上海', disabled: true},
                    {value: '4', text: '深圳'}
                  ],
                  dropdownOp2: {
                    placeHolder: '--请选择--',
                  },
                  dropdownOp: {
                    placeHolder: '--请选择--',	//占位符
                    errMsg: '必填',
                    testing: val => {
                      if (!val) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  }
                }
              }
            }
          &lt;/script&gt;`,
      dropdownCode: `&lt;zoom-select&gt;&lt;/zoom-select&gt;`
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
      this.$refs['select'].load(data);
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-dropdown {
  .data-drop {
    ::v-deep .zoom-tabs-content.content-active {
      .zoom-dropdown {
        margin: 10px 0;
      }
    }
  }
  .basic {
    ::v-deep .zoom-tabs-content.content-active {
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
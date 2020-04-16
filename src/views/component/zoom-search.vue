<template>
  <div class="custom-zoom-search">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-search></zoom-search>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="searchCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的search下拉框组件，可以绑定op对象，并设置常用属性。组件自带搜索功能，但是需要绑定对应的点击事件</p>
    <zoom-tabs class="data-drop" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-search :op="searchOp"></zoom-search>
        禁用搜索框：<zoom-search :op="searchOp2"></zoom-search>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="searchCustom"></custom-code>
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
              title: "搜索下拉框数据",
              name: "data",
              type: "Array",
              text: "若无配置则不显示, 可手动配置数组对象, 对象里设置value和text, text为前端展示文本, value是传给后台的值。默认展示第一个",
              text2: '用法: 配置op对象, 设置 data: [{value: "xxx", text: "xxx"}]'
            },
            {
              id: 2,
              title: "占位符",
              name: "placeHolder",
              type: "String",
              text: "可自定义占位符内容",
              text2: '用法: 配置op对象, 设置 <span>placeHolder: "参数"</span>'
            },
            {
              id: 4,
              title: "错误信息",
              name: "errMsg",
              type: "String",
              text: "需要配置testing方法, 并且在方法返回<span>false</span>的情况下, 才会出现",
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
              title: "搜索事件",
              name: "onClick",
              type: "Function",
              text: "可绑定自定义函数",
              text2: '用法: 配置op对象, 设置 <span>onClick:(val, key) => {}</span>; <span>val</span>为输入框内容，<span>key</span>值为搜索框的值，若未配置则为undefined'
            },
            {
              id: 3,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      searchOp2: {
        disabled: true,
        placeHolder: '搜索框已禁用',
        hideClose: false,
        data: [
          {value: '1', text: '所有'},
          {value: '2', text: '找人'},
          {value: '3', text: '文章'}
        ],
      },
      searchOp: {
        disabled: false,			// 是否禁用
        placeHolder: '查找需要的内容',	//占位符  默认为 请输入关键词
        readonly: false,		//是否禁止输入
        errMsg: '必填',
        testing: val => {
          if (!val) {
            return false;
          } else {
            return true;
          }
        },
        onClick: (val, key) => {
          console.log(val, key);
        },
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: '1', text: '所有'},
          {value: '2', text: '找人'},
          {value: '3', text: '文章'}
        ],
      },
      opTab: 0,
      curTab: 0,
      searchCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-search :op="searchOp"&gt;&lt;/zoom-search&gt;
              禁用搜索框：&lt;zoom-search :op="searchOp2"&gt;&lt;/zoom-search&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  searchOp2: {
                    disabled: true,
                    placeHolder: '搜索框已禁用',
                    hideClose: false,
                    data: [
                      {value: '1', text: '所有'},
                      {value: '2', text: '找人'},
                      {value: '3', text: '文章'}
                    ],
                  },
                  searchOp: {
                    disabled: false,			// 是否禁用
                    placeHolder: '查找需要的内容',	//占位符  默认为 请输入关键词
                    readonly: false,		//是否禁止输入
                    errMsg: '必填',
                    testing: val =>; {
                      if (!val) {
                        return false;
                      } else {
                        return true;
                      }
                    },
                    onClick: (val, key) =&gt; {
                      console.log(val, key);
                    },
                    data: [	//下拉框数据, 键值对的方式, text是展示的文本
                      {value: '1', text: '所有'},
                      {value: '2', text: '找人'},
                      {value: '3', text: '文章'}
                    ],
                  },
                }
              }
            }
          &lt;/script&gt;`,
      searchCode: `&lt;zoom-search&gt;&lt;/zoom-search&gt;`
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
      this.$refs['search'].load(data);
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
.custom-zoom-search {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-search {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-search {
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
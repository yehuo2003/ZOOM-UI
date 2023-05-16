<template>
  <div class="custom-zoom-numeric">
    <!-- 普通 -->
    <tab-template :code="numericCode">
      <zoom-numeric></zoom-numeric>
    </tab-template>
    <!-- 设置属性 -->
    <tab-template :code="numericCustom">
      <template slot="header">
        <h2>设置属性</h2>
        <p>zoom-ui提供的数字框组件，可以用v-model绑定数据, 但是只能绑定Number类型数据，并且进行加或减
          可以绑定op对象，并设置常用属性
        </p>
      </template>
      <zoom-numeric :op="numericOp"></zoom-numeric>
      禁用数字框：<zoom-numeric v-model="num" :op="numericOp2"></zoom-numeric>
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
              title: "最小值",
              name: "min",
              type: "Number",
              text: "设置用户可输入的的最小值, 设置之后, 用户输入范围最小不得小于最小值, 也无法通过减号按钮让当前值小于最小值",
              text2: '用法: 配置op对象, 设置 <span>min: "最小值"</span>'
            },
            {
              id: 2,
              title: "最大值",
              name: "max",
              type: "Number",
              text: "设置用户可输入的的最大值, 设置之后, 用户输入范围最大不得大于最大值, 也无法通过减号按钮让当前值大于最大值",
              text2: '用法: 配置op对象, 设置 <span>max: "最大值"</span>'
            },
            {
              id: 3,
              title: "错误信息",
              name: "errMsg",
              type: "String",
              text: "需要配置testing方法, 并且在方法返回<span>false</span>的情况下, 才会出现",
              text2: '用法: 配置op对象, 设置 <span>errMsg: "要提示用户的错误信息"</span>'
            },
            {
              id: 4,
              title: "禁止输入",
              name: "readonly",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁止输入数值, 开启后用户无法输入但是可以通过加减按钮修改输入框里的数值",
              text2: '用法: 配置op对象, 设置 <span>readonly: "true"</span>'
            },
            {
              id: 5,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里数值",
              text2: '用法: 配置op对象, 设置 <span>disabled: "true"</span>'
            },
            {
              id: 6,
              title: "加减幅度",
              name: "space",
              type: "Number",
              text: "默认 <span>1</span>, 可自定义每次点击加号或减号的加减幅度, 但是加减幅度不会超过最大值和最小值",
              text2: '用法: 配置op对象, 设置 <span>space: "数字"</span>'
            },
            {
              id: 7,
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
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      num: 5,
      numericOp2: {
        disabled: true,
      },
      numericOp: {
        max: 20,  //  最大值
        min: 0,   //  最小值
        space: 5, //  每次加减幅度
        disabled: false,			// 是否禁用
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
      numericCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-numeric :op="numericOp"&gt;&lt;/zoom-numeric&gt;
              禁用数字框：&lt;zoom-numeric v-model="num" :op="numericOp2"&gt;&lt;/zoom-numeric&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  num: 5,
                  numericOp2: {
                    disabled: true,
                  },
                  numericOp: {
                    max: 20,  //  最大值
                    min: 0,   //  最小值
                    space: 5, //  每次加减幅度
                    disabled: false,	// 是否禁用
                    readonly: false,	//是否禁止输入
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
          &lt;/script&gt;`,
      numericCode: `&lt;zoom-numeric&gt;&lt;/zoom-numeric&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-numeric {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-numeric {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-numeric {
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
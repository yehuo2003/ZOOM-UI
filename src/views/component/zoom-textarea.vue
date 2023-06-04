<template>
  <div class="custom-zoom-textarea">
    <!-- 普通 -->
    <tab-template :code="textareaCode">
      <zoom-textarea></zoom-textarea>
    </tab-template>
    <!-- 设置属性 -->
    <tab-template :code="textareaCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('设置属性') }}</h2>
        <text-template code="zoom-ui提供的文本域组件，可以用v-model绑定数据，并且可以看到已经输入字节/最大字节。默认宽度为父元素100%，高度用户可自由拖动。可以绑定op对象，并设置常用属性" />
        <text-template code="禁用状态下，无法拖动文本域" />
      </template>
      <zoom-textarea :op="textareaOp"></zoom-textarea><br>
      禁用文本域：<br>
      <zoom-textarea :op="textareaOp2"></zoom-textarea>
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
              text2: '用法: 配置op对象, 设置 <span>placeHolder: "参数"</span>'
            },
            {
              id: 2,
              title: "错误信息",
              name: "errMsg",
              type: "String",
              text: "需要配置testing方法, 并且在方法返回<span>false</span>的情况下, 才会出现",
              text2: '用法: 配置op对象, 设置 <span>errMsg: "要提示用户的错误信息"</span>'
            },
            {
              id: 3,
              title: "禁止输入",
              name: "readonly",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容",
              text2: '用法: 配置op对象, 设置 <span>readonly: "true"</span>'
            },
            {
              id: 4,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认 <span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容",
              text2: '用法: 配置op对象, 设置 <span>disabled: "true"</span>'
            },
            {
              id: 5,
              title: "最小输入字符",
              name: "minLength",
              type: "Number",
              text: "默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",
              text2: '用法: 配置op对象, 设置 <span>minLength: 0</span>'
            },
            {
              id: 6,
              title: "最大输入字符",
              name: "maxLength",
              type: "Number",
              text: "默认<span>50</span>, 设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",
              text2: '用法: 配置op对象, 设置 <span>maxLength: 50</span>'
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
      textareaOp2: {
        disabled: true,
      },
      textareaOp: {
        placeHolder: '请输入内容',	// 占位符
        maxLength: 100,						// 最大输入长度, 默认为50
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
      textareaCustom:
        `&lt;template&gt;
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
                    disabled: true,
                  },
                  textareaOp: {
                    placeHolder: '请输入内容',	// 占位符
                    maxLength: 100,	// 最大输入长度, 默认为50
                    disabled: false,			// 是否禁用
                    readonly: false,		//是否禁止输入
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
      textareaCode: `&lt;zoom-textarea&gt;&lt;/zoom-textarea&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-textarea {
  .data-drop {
    ::v-deep .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-textarea {
        margin: 10px 0;
      }
    }
  }
  .basic {
    ::v-deep .zoom-tabs-content.content-active {
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
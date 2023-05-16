<template>
  <div class="custom-zoom-text-popup">
    <!-- 普通 -->
    <tab-template :code="popupCode">
      <zoom-text-popup></zoom-text-popup>
    </tab-template>
    <!-- 设置属性 -->
    <tab-template :code="popupCustom">
      <template slot="header">
        <h2>设置属性</h2>
        <p>zoom-ui提供的弹出编辑组件，可以用v-model绑定数据，默认展示的是输入框，点击编辑状态成文本域，方便用户输入。可以绑定op对象，并设置常用属性</p>
        <p>禁用状态下，无法拖动和编辑</p>
      </template>
      <zoom-text-popup rows="10" :op="textPopupOp"></zoom-text-popup><br>
      禁用文本域：<br>
      <zoom-text-popup :op="textPopupOp2"></zoom-text-popup>
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
              title: "显示行数",
              name: "rows",
              type: "Number",
              text: "弹出后编辑框默认展示的行数, 默认为5",
              text2: '用法: 在标签上直接配置 <span>rows: "参数"</span>'
            },
            {
              id: 2,
              title: "占位符",
              name: "placeHolder",
              type: "String",
              text: "可自定义占位符内容",
              text2: '用法: 配置op对象, 设置 <span>placeHolder:"参数"</span>'
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
              title: "自定义宽",
              name: "width",
              type: "String",
              text: "默认 <span>150px</span>, 可以自定义宽度",
              text2: '用法: 配置op对象, 设置 <span>width: "宽度"</span>'
            },
            {
              id: 6,
              title: "最大输入字符",
              name: "maxLength",
              type: "Number",
              text: "设置用户可以输入的最大字符长度, 如果输入字符大于该长度将无法继续输入",
              text2: '用法: 配置op对象, 设置 <span>maxLength: 50</span>'
            },
            {
              id: 7,
              title: "最小输入字符",
              name: "minLength",
              type: "Number",
              text: "默认<span>0</span>, 设置用户可以输入的最小字符长度, 如果输入字符小于该长度会有提示",
              text2: '用法: 配置op对象, 设置 <span>minLength: 0</span>'
            }
          ]
        }
      ],
      textPopupOp2: {
        disabled: true,
      },
      textPopupOp: {
        placeHolder: '请输入内容',	// 占位符
        resize: false,						// 是否禁止拖动默认false
        disabled: false,			// 是否禁用默认false
        readonly: false		//是否禁止输入
      },
      popupCustom: `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-text-popup :op="textPopupOp"&gt;&lt;/zoom-text-popup&gt;&lt;br&gt;
              禁用文本域：&lt;br&gt;
              &lt;zoom-text-popup :op="textPopupOp2"&gt;&lt;/zoom-text-popup&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  textPopupOp2: {
                    disabled: true,
                  },
                  textPopupOp: {
                    placeHolder: '请输入内容',	// 占位符
                    resize: false,						// 是否禁止拖动默认false
                    disabled: false,			// 是否禁用默认false
                    readonly: false		//是否禁止输入
                  }
                }
              }
            }
          &lt;/script&gt;`,
      popupCode: `&lt;zoom-text-popup&gt;&lt;/zoom-text-popup&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-text-popup {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-text-popup {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-text-popup {
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
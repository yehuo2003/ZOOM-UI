<template>
  <div class="custom-zoom-color-picker">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的取色器组件, 取色器选择由js算法模拟, 部分算法来源于网络, zoom-ui进行二次封装并且优化<br>
      组件可以自定义初始颜色, 可以自由取色并监听颜色变化 <br>
      也可以隐藏组件或禁用组件
    </div>
    <tab-template :code="colorPickerCode">
      <zoom-color-picker :defaultColor="color" @onChange="colorChange"></zoom-color-picker>
      {{color}}
      <br>
      <zoom-color-picker :disabled="true"></zoom-color-picker>
      禁用
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
              title: "默认颜色",
              name: "defaultColor",
              type: "String",
              text: "默认为黑色, 可绑定默认颜色, 需要传入合法的颜色值",
              text2: '用法: 在组件标签上, 绑定属性<span>defaultColor="#000"</span>'
            },
            {
              id: 2,
              title: "隐藏取色器",
              name: "hideSelect",
              type: "Boolean",
              text: "默认显示, 配置属性为<span>true</span>则隐藏取色器",
              text2: '用法: 在组件标签上, 配置属性<span>hideSelect=true</span>'
            },
            {
              id: 3,
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>为可选, 配置属性为<span>true</span>则禁用取色器, 禁用状态下无法手动选择颜色",
              text2: '用法: 在组件标签上, 配置属性<span>disable=true</span>'
            }
          ]
        },
        {
          id: 2,
          title: '方法',
          content: [
            {
              id: 1,
              title: "监听取色器值",
              name: "onChange",
              type: "Function",
              text: "可以监听取色器值的变化, 取的值默认为16进制颜色",
              text2: '用法: 在组件标签上, 绑定属性<span>@onChange="监听方法"</span>'
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
      color: '#1890ff',
      colorPickerCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-color-picker :defaultColor="color" @onChange="colorChange"&gt;&lt;/zoom-color-picker&gt;
              {{color}}
              &lt;br&gt;
              禁用
              &lt;zoom-color-picker :disabled="true"&gt;&lt;/zoom-color-picker&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  color: '#1890ff'
                }
              },
              methods: {
                colorChange(color) {
                  this.color = color;
                  console.log(color, 'color');
                },
              }
            }
          &lt;/script&gt;`,
    }
  },
  methods: {
    colorChange(color) {
      this.color = color;
      console.log(color, 'color');
    }
  }
}
</script>
<template>
  <div class="custom-zoom-testing">
    <!-- 普通 -->
    <div class="tip">
      验证码组件默认生成4位数随机验证码,随机范围0~9a~Z, <br>
      使用canvas绘制, 有5条干扰线和50个干扰点, 可自定义随机数范围和id
    </div>
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-testing></zoom-testing>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="testingCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>可自定义随机数范围, 也可以通过
      <span>pool</span>属性来定义验证码内容为汉字
    </p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-testing :op="testingOp"></zoom-testing>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="testingCustom"></custom-code>
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
              title: "id",
              name: "id",
              type: "String",
              text: "若不自定义, 则显示随机id",
              text2: '用法: 直接在组件标签上绑定<span>id="参数"</span>, 或者配置op对象, 设置<span>id: "参数"</span>'
            },
            {
              id: 2,
              title: "验证码数据",
              name: "pool",
              type: "String",
              text: "用户自定义验证码数据范围",
              text2: '用法: 配置op对象, 设置 <span>pool: "数据"</span>'
            },
            {
              id: 3,
              title: "隐藏文字",
              name: "hideText",
              type: "Boolean",
              text: "隐藏提示切换的文字信息, 为<span>true</span>时,可点击图片重新随机生成",
              text2: '用法: 配置op对象, 设置 <span>hideText: "true"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "当前验证码值",
              name: "testCode",
              type: "Function",
              text: "获取当前验证码的值",
              text2: '用法: 通过配置ref属性, 调用方法 <span>this.$refs[属性].testCode</span>'
            }
          ]
        }
      ],
      testingOp: {
        id: 'test666',	// id
        pool: '这是一段随机文本验证码将在这段文本内进行取',	// 自定义随机范围
        hideText: true	// 隐藏提示切换的文字信息, 为true时,可点击图片重新随机生成
      },
      opTab: 0,
      curTab: 0,
      testingCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-testing :op="testingOp"&gt;&lt;/zoom-testing&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  testingOp: {
                    id: 'test666',	// id
                    pool: '这是一段随机文本验证码将在这段文本内进行取',	// 自定义随机范围
                    hideText: true	// 隐藏提示切换的文字信息, 为true时,可点击图片重新随机生成
                  }
                }
              }
            }
          &lt;/script&gt;`,
      testingCode: `&lt;zoom-testing&gt;&lt;/zoom-testing&gt;`
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
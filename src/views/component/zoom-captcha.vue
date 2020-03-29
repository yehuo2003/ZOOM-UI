<template>
  <div class="custom-zoom-captcha">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-captcha :op="captchaOp2"></zoom-captcha>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的滑块验证码，使用canvas绘制，默认隐藏图片，鼠标经过时候显示。可以绑定op对象，并设置常用属性</p>
    <p>禁用状态下，无法拖动文本域</p>
    <zoom-tabs :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-captcha :op="captchaOp"></zoom-captcha>
        禁用状态
        <zoom-captcha :op="captchaOp2"></zoom-captcha>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
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
              title: "禁用验证码",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>，当验证成功后为<span>true</span>，可手动修改，禁用后无法再刷新验证码",
              text2: '用法: 配置op对象, 设置 <span>disabled="true"</span>'
            },
            {
              id: 2,
              title: "显示验证码",
              name: "show",
              type: "Boolean",
              text: "默认<span>false</span>，鼠标进过时，才会显示，当设置为<span>true</span>时候，则总是显示",
              text2: '用法: 配置op对象, 设置 <span>show="true"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "随机图片地址",
              name: "RandomSrc",
              type: "Function",
              text: "在op对象中定义，该方法必须返回一个图片地址，用于显示验证码所需要的图片，每次刷新图片时候都会调用一次该方法",
              text2: '用法: 配置op对象, 在op对象里定义该方法，方法需返回一个有效的图片地址'
            },
            {
              id: 2,
              title: "监听验证码成功的回调",
              name: "onSuccess",
              type: "Function",
              text: "在op对象中定义，当用户验证成功后，可以在该方法中监听到，并做下一步逻辑处理",
              text2: '用法: 配置op对象, 在op对象里定义该方法'
            },
            {
              id: 3,
              title: "监听验证码失败的回调",
              name: "onFailed",
              type: "Function",
              text: "在op对象中定义，当用户验证失败后，可以在该方法中监听到，并做下一步逻辑处理",
              text2: '用法: 配置op对象, 在op对象里定义该方法'
            }
          ]
        }
      ],
      captchaOp2: {
        disabled: true,
      },
      captchaOp: {
        show: true, //  总是显示
        disabled: false, //  是否禁用 默认false, 验证成功后自动为true
        errMsg: '必填',
        // RandomSrc: () => {  //  方法必须返回一个有效的图片链接, 如果未设置, 则展示默认地址
        //   return '图片地址'
        // },
        onSuccess: () => {  //  监听验证成功的回调
          console.log('验证成功');
        },
        onFailed: () => { //  监听验证失败后的回调
          console.log('验证失败');
        }
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-captcha :op="captchaOp"&gt;&lt;/zoom-captcha&gt;
            禁用状态
            &lt;zoom-captcha :op="captchaOp2"&gt;&lt;/zoom-captcha&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                captchaOp2: {
                  disabled: true,
                },
                captchaOp: {
                  show: true, //  总是显示  默认false, 鼠标经过时候才显示
                  disabled: false, //  是否禁用 默认false, 验证成功后自动为true
                  // RandomSrc: () =&gt; {  //  方法必须返回一个有效的图片链接, 如果未设置, 则展示默认地址
                  //   return '图片地址'
                  // },
                  onSuccess: () =&gt; {  //  监听验证成功的回调
                    console.log('验证成功');
                  },
                  onFailed: () =&gt; { //  监听验证失败后的回调
                    console.log('验证失败');
                  }
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-captcha&gt;&lt;/zoom-captcha&gt;`
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
.custom-zoom-captcha {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-captcha {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 300px;
      .captcha-model {
        margin-top: 200px;
      }
    }
  }
}
</style>
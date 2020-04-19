<template>
  <div class="custom-zoom-progress">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      进度条群组是在进度条组件的基础上进行封装, 具有和进度条相同样式<br>
      用户可以在进度条群组中配置多条进度条用于展示<br>
    </div>
    <h2>基础使用</h2>
    <p>通过参数<span>progress</span>可以动态绑定进度条的状态</p>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-progress-group :op="groupOp"></zoom-progress-group>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="progressCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>动态设置属性</h2>
    <p>通过方法<span>load</span>可以动态设置进度条群组的数据</p>
    <p>组件会自动根据值从小到大进行排列</p>
    <zoom-tabs class="basic" :value="statusTab" @change="statusChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-progress-group ref="group" :op="progressOp"></zoom-progress-group>
        <br>
        <zoom-button @click="setProgress">点击修改</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="iptStatus"></custom-code>
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
              title: "设置数据",
              name: "data",
              type: "Array",
              text: "以数组对象方式, 绑定进度条群组数据",
              text2: '用法: 配置op属性, 设置<span>data: [{...}]</span>'
            },
            {
              id: 2,
              title: "是否进度条内部展示数值",
              name: "inside",
              type: "Boolean",
              text: "默认为<span>false</span>, 当设置为<span>true</span>, 则在内部展示内容, 和进度条不同, 即使设置了此属性, 外部依然会显示数值",
              text2: '用法: 配置op属性, 设置<span>inside: true</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "动态设置数据",
              name: "load",
              type: "Function",
              text: "可以动态设置进度条组的数据, 需要手动调用方法",
              text2: '用法:绑定ref属性, 调用方法<span>this.$refs[绑定属性].load(data)</span>来设置新数据'
            }
          ]
        }
      ],
      groupOp: {
        inside: false,  //  是否展示内部文字
        data: [
          {progress: 10, status: 'danger'},
          {progress: 30, status: 'info'},
          {progress: 50, status: 'primary'},
          {progress: 70, status: 'warning'},
          {progress: 90, status: 'success'},
        ]
      },
      progressOp: {
        data: [
          {text: '50', progress: 5, status: 'danger'},
          {text: '100', progress: 10, status: 'info'},
          {text: '200', progress: 20, status: 'primary'},
          {text: '250', progress: 25, status: 'warning'},
          {text: '300', progress: 30, status: 'success'}
        ]
      },
      curTab: 0,
      statusTab: 0,
      iptStatus:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-progress-group ref="group" :op="progressOp"&gt;&lt;/zoom-progress-group&gt;
              &lt;br&gt;
              &lt;zoom-button @click="setProgress"&gt;点击修改&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  progressOp: {
                    data: [
                      {text: '50', progress: 5, status: 'danger'},
                      {text: '100', progress: 10, status: 'info'},
                      {text: '200', progress: 20, status: 'primary'},
                      {text: '250', progress: 25, status: 'warning'},
                      {text: '300', progress: 30, status: 'success'}
                    ]
                  }
                }
              },
              methods: {
                setProgress() {
                  let data = [
                      {text: '500', progress: 50, status: 'danger'},
                      {text: '150', progress: 15, status: 'info'},
                      {text: '300', progress: 30, status: 'primary'},
                      {text: '600', progress: 60, status: 'warning'},
                      {text: '750', progress: 75, status: 'success'}
                  ]
                  this.$refs['group'].load(data);
                }
              }
            }
          &lt;/script&gt;`,
      progressCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-progress-group :op="groupOp"&gt;&lt;/zoom-progress-group&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  groupOp: {
                    inside: false,  //  是否展示内部文字
                    data: [
                      {progress: 10, status: 'danger'},
                      {progress: 30, status: 'info'},
                      {progress: 50, status: 'primary'},
                      {progress: 70, status: 'warning'},
                      {progress: 90, status: 'success'},
                    ]
                  }
                }
              },
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    setProgress() {
      let data = [
          {text: '500', progress: 50, status: 'danger'},
          {text: '150', progress: 15, status: 'info'},
          {text: '300', progress: 30, status: 'primary'},
          {text: '600', progress: 60, status: 'warning'},
          {text: '750', progress: 75, status: 'success'}
      ]
      this.$refs['group'].load(data);
    },
    statusChange(index) {
      this.statusTab = index
    },
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-progress {
  .basic {
    /deep/ .content-active {
      p {
        line-height: 1.2;
      }
      .zoom-progress-container {
        width: 90%;
      }
    }
  }
}
</style>
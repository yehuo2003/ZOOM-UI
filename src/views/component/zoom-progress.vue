<template>
  <div class="custom-zoom-progress">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的进度条组件, 取值范围 0% ~ 100%, 初始值为 0, 可自定义<br>
      进度条提供了五种状态, 可供用户自定义 <br>
      还可以自定义数值放在内部或外部
    </div>
    <tab-template :code="progressCode">
      <template slot="header">
        <h2>基础使用</h2>
        <p>通过参数<span>progress</span>可以动态绑定进度条的状态</p>
      </template>
      <zoom-progress :progress="progressNumber"></zoom-progress>
      <zoom-progress :op="progressOp"></zoom-progress>
    </tab-template>
    <!-- 自定义状态 -->
    <tab-template :code="iptStatus">
      <template slot="header">
        <h2>自定义状态</h2>
        <p>通过参数<span>status</span>可以动态绑定进度条的状态</p>
      </template>
      <zoom-progress :progress="progressNumber"></zoom-progress><br>
      <zoom-progress :progress="progressNumber" status="danger"></zoom-progress><br>
      <zoom-progress :progress="progressNumber" status="warning"></zoom-progress><br>
      <zoom-progress :progress="progressNumber" status="info"></zoom-progress><br>
      <zoom-progress :progress="progressNumber" status="success"></zoom-progress>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template cls="data-drop" :code="progressCustom">
      <template slot="header">
        <h2>个性化设置</h2>
        <p>进度条的值和状态均为动态绑定</p>
        <p>点击下面按钮查看效果</p>
      </template>
      <zoom-progress :progress="progressVal" :status="status"></zoom-progress>
      <zoom-button reset-time="5200" @click="addProgress">点我试试</zoom-button>
    </tab-template>
    <attribute :list="attributeList"></attribute>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progressVal: 0,
      status: 'danger',
      progressNumber: 50,
      attributeList: [
        {
          id: 1,
          title: "属性",
          content: [
            {
              id: 1,
              title: "进度条状态",
              name: "progress",
              type: "Number",
              text: "绑定当前进度条状态, 范围1~100之间",
              text2: '用法: 配置op属性, 设置<span>progress: 数值</span>, 或者直接在组件标签绑定属性<span>progress="数值"</span>'
            },
            {
              id: 2,
              title: "进度条状态",
              name: "status",
              type: "String",
              text: "默认<span>primary</span>, 可选参数<span>danger</span>, <span>warning</span>, <span>success</span>, <spaninfo</span>, <span>primary</span>",
              text2: '用法: 配置op属性, 设置<span>status: "状态"</span>, 或者直接在组件标签绑定属性<span>status="状态"</span>'
            },
            {
              id: 3,
              title: "进度条文字内容",
              name: "text",
              type: "String",
              text: "进度条默认展示的文字内容, 如果不设置默认展示百分比, 该值可以设置随进度条百分比动态改变",
              text2: '用法: 配置op属性, 设置<span>text: "内容"</span>, 或者直接在组件标签绑定属性<span>text="内容"</span>'
            },
            {
              id: 4,
              title: "是否进度条内部展示数值",
              name: "inside",
              type: "Boolean",
              text: "默认为<span>false</span>, 当设置为<span>true</span>, 则内容展示在内部",
              text2: '用法: 配置op属性, 设置<span>inside: true</span>'
            }
          ]
        }
      ],
      progressOp: {
        status: 'danger', // 进度条状态
        progress: 30,   //  进度条的值
        inside: true  //  是否显示外部, 设置false显示在内部
      },
      progressCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-progress :progress="progressVal" :status="status"&gt;&lt;/zoom-progress&gt;
              &lt;zoom-button reset-time="5000" @click="addProgress"&gt;点我试试&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  progressVal: 0,
                  status: 'danger',
                }
              },
              methods: {
                addProgress() {
                  this.progressVal = 0;
                  let progressTime = setInterval(() =&gt; {
                    this.progressVal += 1;
                    if (this.progressVal &gt; 30) {
                      this.status = 'info'
                    }
                    if (this.progressVal &gt; 60) {
                      this.status = 'warning'
                    }
                    if (this.progressVal &gt; 99) {
                      this.status = 'success'
                    }
                    if (this.progressVal === 100) {
                      clearInterval(progressTime);
                    }
                  }, 50);
                }
              }
            }
          &lt;/script&gt;`,
      iptStatus:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-progress :progress="progressNumber"&gt;&lt;/zoom-progress&gt;&lt;br&gt;
              &lt;zoom-progress :progress="progressNumber" status="danger"&gt;&lt;/zoom-progress&gt;&lt;br&gt;
              &lt;zoom-progress :progress="progressNumber" status="warning"&gt;&lt;/zoom-progress&gt;&lt;br&gt;
              &lt;zoom-progress :progress="progressNumber" status="info"&gt;&lt;/zoom-progress&gt;&lt;br&gt;
              &lt;zoom-progress :progress="progressNumber" status="success"&gt;&lt;/zoom-progress&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  progressNumber: 50
                }
              }
            }
          &lt;/script&gt;`,
      progressCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-progress :progress="progressNumber"&gt;&lt;/zoom-progress&gt;
              &lt;zoom-progress :op="progressOp"&gt;&lt;/zoom-progress&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  progressNumber: 50,
                  progressOp: {
                    status: 'danger', // 进度条状态
                    progress: 30,   //  进度条的值
                    inside: true  //  是否显示外部, 设置false显示在内部
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    addProgress() {
      this.progressVal = 0;
      let progressTime = setInterval(() => {
        this.progressVal += 1;
        if (this.progressVal > 30) {
          this.status = 'info'
        }
        if (this.progressVal > 60) {
          this.status = 'warning'
        }
        if (this.progressVal > 99) {
          this.status = 'success'
        }
        if (this.progressVal === 100) {
          clearInterval(progressTime);
        }
      }, 50);
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
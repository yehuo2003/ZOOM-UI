<template>
  <div class="custom-zoom-progress">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的进度条组件, 取值范围 0% ~ 100%, 初始值为 0, 可自定义<br>
      进度条提供了五种状态, 可供用户自定义 <br>
      还可以自定义数值放在内部或外部
    </div>
    <h2>基础使用</h2>
    <p>通过参数<span>progress</span>可以动态绑定进度条的状态</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-progress :progress="progressNumber"></zoom-progress>
        <zoom-progress :op="progressOp"></zoom-progress>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>自定义状态</h2>
    <p>通过参数<span>status</span>可以动态绑定进度条的状态</p>
    <zoom-tabs class="basic" :value="statusTab" @tabChange="statusChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-progress :progress="progressNumber"></zoom-progress><br>
        <zoom-progress :progress="progressNumber" status="danger"></zoom-progress><br>
        <zoom-progress :progress="progressNumber" status="warning"></zoom-progress><br>
        <zoom-progress :progress="progressNumber" status="info"></zoom-progress><br>
        <zoom-progress :progress="progressNumber" status="success"></zoom-progress>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="iptStatus"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>个性化设置</h2>
    <p>进度条的值和状态均为动态绑定</p>
    <p>点击下面按钮查看效果</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-progress :progress="progressVal" :status="status"></zoom-progress>
        <zoom-button @click="addProgress">点我试试</zoom-button>
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
              title: "选择每页展示数量",
              name: "pageSizes",
              type: "Array",
              text: "配置可供用户选择的每页展示数量, 以下拉框形式呈现",
              text2: '用法: 配置op属性, 设置<span>pageSizes: [每页数量]</span>'
            },
            {
              id: 2,
              title: "分页模式",
              name: "mode",
              type: "String",
              text: "默认<span>Number</span>, 可选参数<span>mini</span>, <span>Number</span>",
              text2: '用法: 配置op属性, 设置<span>mode: "mini"</span>'
            },
            {
              id: 3,
              title: "分页数据",
              name: "pageVal",
              type: "Object",
              text: "以对象形式设置分页数据<span>pageVal</span>, 对象内有三个参数可设置: 总条数<span>total</span>, 当前页<span>curPage</span>, 每页展示数据<span>pageSize</span>",
              text2: '用法: 配置op属性, 设置<span>pageVal: "对象"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "监听下拉数据变化的回调",
              name: "pageSizeSkip",
              type: "Function",
              text: "监听每页大小的下拉框数据发生改变事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>pageSizeSkip: (val, pageVal) => {}</span>'
            },
            {
              id: 2,
              title: "监听跳转前的回调",
              name: "beforeSkip",
              type: "Function",
              text: "监听分页组件跳转事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>beforeSkip: (val, pageVal) => {}</span>'
            },
            {
              id: 3,
              title: "监听跳转后的回调",
              name: "skip",
              type: "Function",
              text: "监听分页组件跳转后事件, 有两个参数<span>val</span>当前页数据, <span>pageVal</span>分页对象",
              text2: '用法: 配置op属性, 设置<span>skip: (val, pageVal) => {}</span>'
            },
            {
              id: 4,
              title: "动态设置分页数据",
              name: "load",
              type: "Function",
              text: "动态设置分页数据, 需要绑定<span>ref</span>来动态设置数据",
              text2: '用法: 标签中绑定ref, <span>this.$refs["page"].load(pageVal)</span>'
            },
          ]
        }
      ],
      progressOp: {
        status: 'danger', // 进度条状态
        progress: 30,   //  进度条的值
        inside: true  //  是否显示外部, 设置false显示在内部
      },
      opTab: 0,
      curTab: 0,
      statusTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-progress :progress="progressVal" :status="status"&gt;&lt;/zoom-progress&gt;
            &lt;zoom-button @click="addProgress"&gt;点我试试&lt;/zoom-button&gt;
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
                }, 100);
              }
            }
          }
        &lt;/script&gt;
      `,
      iptStatus: `
        &lt;template&gt;
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
        &lt;/script&gt;
      `,
      ipt:`
        &lt;template&gt;
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
        &lt;/script&gt;
      `
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
      }, 100);
    },
    statusChange(index) {
      this.statusTab = index
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
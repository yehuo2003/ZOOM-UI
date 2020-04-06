<template>
  <div class="custom-zoom-pager">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供了强大的分页组件, 可以配合表格组件或者其他组件一起使用<br>
      需要对分页组件配置op对象, 并配置相应信息<br>
      分页组件还提供了多个点击事件, 来方便开发者使用
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-pager :op="pagerOp"></zoom-pager>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="pagerCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>迷你版</h2>
    <p>可对<span>title</span>绑定自定义html片段</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-pager :op="miniOp"></zoom-pager>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="pagerCustom"></custom-code>
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
      pagerOp: {
        pageSizes: [5, 10, 20],	// 可选择每页展示数量
        mode: 'Number',	// 展示模式 mini为简单版, Number为完全版 默认Number
        pageVal: {
          total: 100,	// 总条数
          curPage: 3,	// 展示的当前页
          pageSize: 20	// 每页要展示多少条数据
        },
        pageSizeSkip: (val, pageVal) => {
          this.pageSize = val;	// 每页大小的下拉框数据发生改变事件
        },
        beforeSkip: (val, pageVal) => {
          console.log('要跳转到',val);	//跳转前事件
        },
        skip: (val, pageVal) => {
          console.log('当前页是',val);	//点击跳转触发获取当前页
        }
      },
      miniOp: {
        mode: 'mini',
        pageVal: {
          total: 100,	// 总条数
          curPage: 1,	// 展示的当前页
          pageSize: 20	// 每页要展示多少条数据
        }
      },
      opTab: 0,
      curTab: 0,
      pagerCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-pager :op="miniOp"&gt;&lt;/zoom-pager&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  miniOp: {
                  mode: 'mini',
                    pageVal: {
                      total: 100,	// 总条数
                      curPage: 1,	// 展示的当前页
                      pageSize: 20	// 每页要展示多少条数据
                    }
                  }
                }
              }
            }
          &lt;/script&gt;`,
      pagerCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-pager :op="pagerOp"&gt;&lt;/zoom-pager&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  pagerOp: {
                    pageSizes: [5, 10, 20],	// 可选择每页展示数量
                    mode: 'Number',	// 展示模式 mini为简单版, Number为完全版 默认Number
                    pageVal: {
                      total: 100,	// 总条数
                      curPage: 3,	// 展示的当前页
                      pageSize: 20	// 每页要展示多少条数据
                    },
                    pageSizeSkip: (val, pageVal) =&gt; {
                      this.pageSize = val;	// 每页大小的下拉框数据发生改变事件
                    },
                    beforeSkip: (val, pageVal) =&gt; {
                      console.log('要跳转到',val);	//跳转前事件
                    },
                    skip: (val, pageVal) =&gt; {
                      console.log('当前页是',val);	//点击跳转触发获取当前页
                    }
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    pager2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    pager1Num() {
      console.log('滑块1当前值是' + this.num1);
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
.custom-zoom-pager {
  .basic {
    /deep/ .content-active {
      min-height: 180px;
    }
  }
}
</style>
<template>
  <div class="custom-zoom-search">
    <h1>搜索框组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-search></zoom-search>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的search下拉框组件，可以绑定op对象，并设置常用属性。组件自带搜索功能，但是需要绑定对应的点击事件</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-search :op="searchOp"></zoom-search>
        禁用搜索框：<zoom-search :op="searchOp2"></zoom-search>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="占位符: placeHolder">
      <p>类型: String</p>
      <p>默认: "请输入关键词"</p>
      <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
    </zoom-panel>
    <zoom-panel title="搜索下拉框数据: data">
      <p>类型: Array</p>
      <p>若无配置则不显示, 可手动配置数组对象, 对象里设置value和text, text为前端展示文本, value是传给后台的值。默认展示第一个</p>
      <p>用法: 配置op对象, 设置 data=[{value: 'xx', text: 'xxx'}]</p>
    </zoom-panel>
    <zoom-panel title="错误信息: errMsg">
      <p>类型: String</p>
      <p>需要配置testing方法, 并且在方法返回false的情况下, 才会出现</p>
      <p>用法: 配置op对象, 设置 errMsg="要提示用户的错误信息"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: readonly">
      <p>类型: Boolean</p>
      <p>默认false, 为true禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容</p>
      <p>用法: 配置op对象, 设置 readonly="true"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: isdisabled">
      <p>类型: Boolean</p>
      <p>默认false, 为true则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容</p>
      <p>用法: 配置op对象, 设置 isdisabled="true"</p>
    </zoom-panel>
    <h2>方法</h2>
    <zoom-panel title="验证方法: testing">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 并设置了errMsg后, 设置 testing:val => {}; val为输入框内容, 如果方法返回false则显示errMsg的内容</p>
    </zoom-panel>
    <zoom-panel title="搜索事件: onClick">
      <p>类型: Function</p>
      <p>用法: 配置op对象, 设置 onClick:(val, key) => {}; val为输入框内容，key值为搜索框的值，若未配置则为undefined</p>
    </zoom-panel>
    <zoom-button @click="prevClick">下拉框组件</zoom-button>
    <zoom-button @click="nextClick">计数器组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchOp2: {
        isdisabled: true,
        placeHolder: '搜索框已禁用',
        hideClose: false,
        data: [
          {value: '1', text: '所有'},
          {value: '2', text: '找人'},
          {value: '3', text: '文章'}
        ],
      },
      searchOp: {
        isdisabled: false,			// 是否禁用
        placeHolder: '查找需要的内容',	//占位符  默认为 请输入关键词
        readonly: false,		//是否禁止输入
        errMsg: '必填',
        testing: val => {
          if (!val) {
            return false;
          } else {
            return true;
          }
        },
        onClick: (val, key) => {
          console.log(val, key);
        },
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: '1', text: '所有'},
          {value: '2', text: '找人'},
          {value: '3', text: '文章'}
        ],
      },
      opTab: 0,
      curTab: 0,
      loadIpt: `
        &lt;template&gt;
          &lt;div&gt;
            默认无数据：&lt;zoom-search ref="search"&gt;&lt;/zoom-search&gt;&lt;br&gt;
            &lt;zoom-button @click="handleClick"&gt;点击加载数据&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
              }
            },
            methods: {
              handleClick() {
                let data = [
                  {value: '1', text: '北京'},
                  {value: '2', text: '上海'},
                  {value: '3', text: '广州'},
                  {value: '4', text: '深圳'}
                ];
                this.$refs['search'].load(data);
              }
            }
          }
        &lt;/script&gt;
      `,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-search :op="searchOp"&gt;&lt;/zoom-search&gt;
            禁用搜索框：&lt;zoom-search :op="searchOp2"&gt;&lt;/zoom-search&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                searchOp2: {
                  isdisabled: true,
                  placeHolder: '搜索框已禁用',
                  hideClose: false,
                  data: [
                    {value: '1', text: '所有'},
                    {value: '2', text: '找人'},
                    {value: '3', text: '文章'}
                  ],
                },
                searchOp: {
                  isdisabled: false,			// 是否禁用
                  placeHolder: '查找需要的内容',	//占位符  默认为 请输入关键词
                  readonly: false,		//是否禁止输入
                  errMsg: '必填',
                  testing: val =>; {
                    if (!val) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                  onClick: (val, key) =&gt; {
                    console.log(val, key);
                  },
                  data: [	//下拉框数据, 键值对的方式, text是展示的文本
                    {value: '1', text: '所有'},
                    {value: '2', text: '找人'},
                    {value: '3', text: '文章'}
                  ],
                },
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-search&gt;&lt;/zoom-search&gt;`
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  methods: {
    handleClick() {
      let data = [
        {value: '1', text: '北京'},
        {value: '2', text: '上海'},
        {value: '3', text: '广州'},
        {value: '4', text: '深圳'}
      ];
      this.$refs['search'].load(data);
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-dropdown');
    },
    nextClick() {
      this.$router.push('/component/zoom-numeric');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-search {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-search {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-search {
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
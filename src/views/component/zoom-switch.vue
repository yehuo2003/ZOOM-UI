<template>
  <div class="custom-zoom-date">
    <h1>开关组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="data-drop" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-date></zoom-date>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的日期选择组件，组件可以用v-model绑定,默认显示当前时间, 点击输入框,弹出日期选择框,
      点击年份, 可选择前后六年时间,点击月份 可在1~12月份之间选择,也可以点击左右箭头切换。可以绑定op对象，并设置常用属性</p>
    <p>禁用状态下，无法拖动文本域</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-date :op="dateOp"></zoom-date><br>
        禁用日期选择：<br>
        <zoom-date :op="dateOp2"></zoom-date>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="禁用: isdisabled">
      <p>类型: Boolean</p>
      <p>默认false, 为true则禁用输入框, 禁用状态下, 选择日期</p>
      <p>用法: 配置op对象, 设置 isdisabled="true"</p>
    </zoom-panel>
    <zoom-panel title="初始化时间: dateTime">
      <p>类型: Date</p>
      <p>默认当前日期, 可传入时间戳, 或者其它时间格式类型的数据</p>
      <p>用法: 配置op对象, 设置 dateTime="时间类型"</p>
    </zoom-panel>
    <h2>方法</h2>
    <zoom-panel title="组件编译完成时执行的事件: onComplete">
      <p>类型: Function</p>
      <p>用法: 配置op对象后设置回调函数, 会返回两个参数 arr和time, arr是日期数组(年月日周几 + 时分秒), time是时间</p>
    </zoom-panel>
    <zoom-panel title="组件渲染完成时执行的事件: onRender">
      <p>类型: Function</p>
      <p>用法: 配置op对象后设置回调函数, 会返回两个参数 arr和time, arr是日期数组(年月日周几 + 时分秒), time是时间</p>
    </zoom-panel>
    <zoom-panel title="选择日期框日期后执行的事件: onShow">
      <p>类型: Function</p>
      <p>用法: 配置op对象后设置回调函数, 返回一个参数day, day里面有个参数flag 用来表示是否当前月 false则表示不在当前月</p>
    </zoom-panel>
    <zoom-panel title="动态设置当前时间: load">
      <p>类型: Function</p>
      <p>用法: 在标签中设置自定义ref属性, 通过this.$refs[自定义属性].load(日期对象) 来动态设置当前日期</p>
    </zoom-panel>
    <zoom-button @click="prevClick">弹出编辑</zoom-button>
    <zoom-button @click="nextClick">开关组件组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateOp2: {
        isdisabled: true,
        dateTime: '2020-02-02'
      },
      dateOp: {
        isdisabled: false,  //  是否禁用
        dateTime: 1396945578506,	//	或者字符串 '2019-01-01'  '2019-01-01 12:30:50'	也可以
        onComplete: (arr, time) => {	//	arr是日期数组(年月日周几 + 时分秒)
          console.log('组件编译完成onComplete', arr, time);
        },
        onRender: (arr, time) => {  //  组件渲染完成时执行的事件
          console.log('组件渲染完成onRender', arr, time);
        },
        onShow: day => {	// 选择日期框日期后执行的事件 日期对象 flag 是否当前月 false则表示不在当前月
          console.log('选择日期框日期后执行的事件', day);
        }
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-date :op="dateOp"&gt;&lt;/zoom-date&gt;&lt;br&gt;
            禁用日期选择：&lt;br&gt;
            &lt;zoom-date :op="dateOp2"&gt;&lt;/zoom-date&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                dateOp2: {
                  isdisabled: true,
                  dateTime: '2020-02-02'
                },
                dateOp: {
                  isdisabled: false,  //  是否禁用
                  dateTime: 1396945578506,	//	或者字符串 '2019-01-01'  '2019-01-01 12:30:50'	也可以
                  onComplete: (arr, time) =&gt; {	//	arr是日期数组(年月日周几 + 时分秒)
                    console.log('组件编译完成onComplete', arr, time);
                  },
                  onRender: (arr, time) =&gt; {  //  组件渲染完成时执行的事件
                    console.log('组件渲染完成onRender', arr, time);
                  },
                  onShow: day =&gt; {	// 选择日期框日期后执行的事件 日期对象 flag 是否当前月 false则表示不在当前月
                    console.log('选择日期框日期后执行的事件', day);
                  }
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-date&gt;&lt;/zoom-date&gt;`
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
    },
    prevClick() {
      this.$router.push('/component/zoom-text-popup');
    },
    nextClick() {
      this.$router.push('/component/zoom-switch');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-date {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 400px;
      .zoom-date {
        margin: 10px 0;
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
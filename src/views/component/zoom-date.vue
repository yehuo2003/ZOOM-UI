<template>
  <div class="custom-zoom-date">
    <!-- 普通 -->
    <tab-template cls="data-drop" :code="dateCode">
      <zoom-date></zoom-date>
    </tab-template>
    <!-- 设置属性 -->
    <tab-template cls="data-drop" :code="dateCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('设置属性') }}</h2>
        <text-template code="zoom-ui提供的日期选择组件" />
        <text-template code="禁用状态下，无法拖动文本域" />
      </template>
      <zoom-date :op="dateOp"></zoom-date><br>
      禁用日期选择：<br>
      <zoom-date :op="dateOp2"></zoom-date>
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
              title: "禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>则禁用输入框, 禁用状态下, 选择日期",
              text2: '用法: 配置op对象, 设置 <span>disabled="true"</span>'
            },
            {
              id: 2,
              title: "初始化时间",
              name: "dateTime",
              type: "Date",
              text: "默认当前日期, 可传入时间戳, 或者其它时间格式类型的数据",
              text2: '用法: 配置op对象, 设置 <span>dateTime="时间类型"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "组件编译完成时执行的事件",
              name: "onComplete",
              type: "Function",
              text: "",
              text2: '用法: 配置op对象后设置回调函数, 会返回两个参数 <span>arr</span>和<span>time</span>, <span>arr</span>是日期数组(年月日周几 + 时分秒), <span>time</span>是时间'
            },
            {
              id: 2,
              title: "组件渲染完成时执行的事件",
              name: "onRender",
              type: "Function",
              text: "",
              text2: '用法: 配置op对象后设置回调函数, 会返回两个参数 <span>arr</span>和<span>time</span>, <span>arr</span>是日期数组(年月日周几 + 时分秒), <span>time</span>是时间'
            },
            {
              id: 3,
              title: "选择日期框日期后执行的事件",
              name: "onShow",
              type: "Function",
              text: "",
              text2: '用法: 配置op对象后设置回调函数, 返回一个参数<span>day</span>, <span>day</span>里面有个参数<span>flag</span> 用来表示是否当前月 <span>false</span>则表示不在当前月'
            },
            {
              id: 4,
              title: "动态设置当前时间",
              name: "load",
              type: "Function",
              text: "可以动态设置当前时间, 需要传入时间类型数据",
              text2: '用法: 在标签中设置自定义<span>ref</span>属性, 通过<span>this.$refs[自定义属性].load(日期对象)</span> 来动态设置当前日期'
            },
            {
              id: 5,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            }
          ]
        }
      ],
      dateOp2: {
        disabled: true,
        dateTime: '2020-02-02'
      },
      dateOp: {
        disabled: false,  //  是否禁用
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
      dateCustom:
        `&lt;template&gt;
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
                    disabled: true,
                    dateTime: '2020-02-02'
                  },
                  dateOp: {
                    disabled: false,  //  是否禁用
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
          &lt;/script&gt;`,
      dateCode: `&lt;zoom-date&gt;&lt;/zoom-date&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-date {
  .data-drop {
    ::v-deep .zoom-tabs-content.content-active {
      min-height: 280px;
      .zoom-date {
        margin: 10px 0;
      }
    }
  }
}
</style>
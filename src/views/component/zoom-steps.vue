<template>
  <div class="custom-zoom-steps">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供了三种形态的步骤条, 有横条和竖条还有时间线步骤条 <br>
      可以根据修改type来更换步骤条属性
    </div>
    <tab-template :code="stepCode">
      <template slot="header">
        <h2>使用方法</h2>
        <h3>默认步骤条</h3>
      </template>
      <zoom-steps :op="stepsOp" @change="stepsChange"></zoom-steps>
    </tab-template>
    <!-- 时间线步骤条 -->
    <tab-template cls="data-drop" :code="timeLineCode">
      <template slot="header">
        <h3>时间线步骤条</h3>
        <p>通过修改标签上绑定的<span>type</span>属性为<span>timeLine</span>可以设置为时间线步骤条</p>
        <p>设置了时间线步骤条后, 需要在op的<span>data</span>属性里绑定<span>time</span>属性, 格式为时间格式</p>
      </template>
      <zoom-steps type="timeLine" :op="stepsOp2" @change="stepsChange"></zoom-steps>
    </tab-template>
    <!-- advanced模式步骤条 -->
    <tab-template cls="data-drop" :code="advancedCode">
      <template slot="header">
        <h3>advanced模式步骤条</h3>
        <p>通过修改标签上绑定的<span>type</span>属性为<span>advanced</span>可以设置为时间线步骤条</p>
        <p>设置了时间线步骤条后, 可以在op的<span>data</span>属性里绑定<span>count</span>属性, 格式为<span>Number</span>类型</p>
      </template>
      <zoom-steps type="advanced" :op="stepsOp3" @change="stepsChange"></zoom-steps>
    </tab-template>
    <!-- 主动调用上一步/下一步 -->
    <tab-template cls="data-drop" :code="customCode">
      <template slot="header">
        <h3>主动调用上一步/下一步</h3>
        <p>如果设置了属性<span>disabled</span>后将会无法点击, 这时候可以通过绑定<span>ref</span>属性并调用<span>next()</span>或<span>prev()</span>方法来切换步骤</p>
      </template>
      <zoom-steps :op="stepsOp4" ref="steps"></zoom-steps>
      <zoom-button @click="handleClick('prev')">上一步</zoom-button>
      <zoom-button @click="handleClick('next')" type="primary">下一步</zoom-button>
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
              title: "步骤条类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>normal</span>, <span>timeLine</span>, <span>advanced</span>, 默认 <span>normal</span>",
              text2: '用法: 组件标签上设置属性 <span>type="normal"</span>'
            },
            {
              id: 2,
              title: "数据",
              name: "data",
              type: "Array",
              text: "步骤条的数据, 以数组对象方式设置",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data: [...]</span>'
            },
            {
              id: 3,
              title: "激活的下标",
              name: "active",
              type: "Number",
              text: "要激活的下标, 和index绑定",
              text2: '用法: 绑定属性op, op对象中设置属性<span>active: 下标</span>'
            },
            {
              id: 4,
              title: "禁用组件",
              name: "disabled",
              type: "Boolean",
              text: "默认<span>false</span>, 设置为<span>true</span>可以禁用, 禁用状态下无法鼠标点击切换状态",
              text2: '用法: 绑定属性op, op对象中设置属性<span>disabled: true</span>'
            },
            {
              id: 5,
              title: "步骤条目下标",
              name: "index",
              type: "Number",
              text: "设置步骤条目的下标, 每个下标值都应该是独一无二的, 可以和<span>active</span>绑定",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data</span>数组对象, 对象中设置<span>index: 下标值</span>'
            },
            {
              id: 6,
              title: "步骤条目名称",
              name: "name",
              type: "String",
              text: "设置步骤条目的名称, 用于展示",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data</span>数组对象, 对象中设置<span>name: "名称"</span>'
            },
            {
              id: 7,
              title: "步骤条目时间",
              name: "time",
              type: "Date",
              text: "组件类型为<span>timeLine</span>时候,<span>time</span>属性有效<span>time</span>属性要传标准时间格式",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data</span>数组对象, 对象中设置<span>time: "时间"</span>'
            },
            {
              id: 8,
              title: "步骤条目数量",
              name: "count",
              type: "Number",
              text: "组件类型为<span>advanced</span>时候,<span>count</span>属性有效<span>count</span>属性可用于记录当前条目的待办事项数量",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data</span>数组对象, 对象中设置<span>count: 数量</span>'
            },
            {
              id: 9,
              title: "步骤条目类型",
              name: "type",
              type: "String",
              text: "组件类型为<span>advanced</span>时候,<span>type</span>属性有效<span>type</span>属性有<span>success</span>,<span>warning</span>,<span>danger</span>,<span>info</span>,<span>primary</span>可选",
              text2: '用法: 绑定属性op, op对象中设置属性<span>data</span>数组对象, 对象中设置<span>type: "success"</span>'
            },
          ]
        },
        {
          id: 2,
          title: '方法',
          content: [
            {
              id: 1,
              title: '点击事件',
              name: 'onClick',
              type: 'Function',
              text: "步骤条目点击时候触发的事件, 参数<span>val</span>为点击事件的结果, 当设置属性<span>disabled=true</span>时候, 点击事件无法生效",
              text2: '用法: 配置op属性, 设置<span>onClick: val => {}</span>'
            },
            {
              id: 2,
              title: '监听数据变化',
              name: 'stepsChange',
              type: 'Function',
              text: "步骤条目点击时候触发的事件, 参数<span>val</span>为当前index值, 当设置属性<span>disabled=true</span>时候, 点击事件无法生效",
              text2: '用法: 配置op属性, 设置<span>stepsChange: val => {}</span>'
            },
            {
              id: 3,
              title: '跳转到下一步骤',
              name: 'next',
              type: 'Function',
              text: "调用该事件后, 组件会将激活条目往后移一格, 如果目前步骤条已经全部完成则无效",
              text2: '用法: 绑定ref属性, 设置<span>this.$refs[绑定属性].next();</span>'
            },
            {
              id: 4,
              title: '跳转到上一步骤',
              name: 'prev',
              type: 'Function',
              text: "调用该事件后, 组件会将激活条目往前移一格, 如果目前没有激活的条目则无效",
              text2: '用法: 绑定ref属性, 设置<span>this.$refs[绑定属性].prev();</span>'
            },
            {
              id: 5,
              title: "设置禁用状态",
              name: "setDisabled",
              type: "Function",
              text: "参数传<span>true</span>则设置禁用组件, 为<span>false</span>可取消禁用",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].setDisabled(true)</span>'
            },
            {
              id: 6,
              title: "动态加载数据",
              name: "load",
              type: "Function",
              text: "可以动态设置步骤条的数据",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].load(数据)</span>'
            },
            {
              id: 7,
              title: "状态清空",
              name: "clear",
              type: "Function",
              text: "主动调用方法, 将步骤条所有状态变成未选中状态",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].clear()</span>'
            },
            {
              id: 8,
              title: "完成所有",
              name: "doneAll",
              type: "Function",
              text: "主动调用该方法, 让步骤条组件所有条目变成完成状态",
              text2: '用法: ref属性, 设置 <span>this.$refs[绑定属性].doneAll()</span>'
            }
          ]
        }
      ],
      stepsOp: {
        active: 7,	//	要激活的下标, 和index绑定
        disabled: false,  //  是否禁止点击 默认false
        data:  [
          {index: 5, name: 'Basic Info.'},
          {index: 6, name: 'Vics tab.'},
          {index: 7, name: 'not done.'},
          {index: 8, name: 'not done2'}
        ],
        onClick: val => {	//	鼠标点击事件返回的结果
          console.log('click', val);
        }
      },
      stepsOp4: {
        active: 7,	//	要激活的下标, 和index绑定
        disabled: true,  //  是否禁止点击 默认false
        data:  [
          {index: 5, name: 'Basic Info.'},
          {index: 6, name: 'Vics tab.'},
          {index: 7, name: 'not done.'},
          {index: 8, name: 'not done2'}
        ]
      },
      stepsOp2: {
        active: 7,	//	要激活的下标, 和index绑定
        disabled: false,  //  是否禁止点击 默认false
        data:  [	//	类型为'timeLine'时候,time属性有效 time属性要传标准时间格式
          {index: 5, time: '2008-05-12 14:25:32', name: 'Basic Info.'},
          {index: 6, time: '2018-08-08 08:08:08', name: 'Vics tab.'},
          {index: 7, time: '2018-08-08 08:08:08', name: 'not done.'},
          {index: 8, time: 1583678818399, name: 'not done2'}
        ],
        onClick: val => {	//	鼠标点击事件返回的结果
          console.log('click', val);
        }
      },
      stepsOp3: {
        active: 7,	//	要激活的下标, 和index绑定
        disabled: false,  //  是否禁止点击 默认false
        data:  [	//	类型为advanced时候,可自定义count和type,type属性有'done','doing'
          {index: 5, count: 4, type: 'success', name: 'Basic Info.'},
          {index: 6, count: 6, type: 'warning', name: 'Vics tab.'},
          {index: 7, count: 8, type: 'danger', name: 'not done.'},
          {index: 8, count: 2, type: 'primary', name: 'not done2'}
        ],
        onClick: val => {	//	鼠标点击事件返回的结果
          console.log('click', val);
        }
      },
      customCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-steps :op="stepsOp" ref="steps"&gt;&lt;/zoom-steps&gt;
              &lt;zoom-button @click="handleClick('prev')"&gt;上一步&lt;/zoom-button&gt;
              &lt;zoom-button @click="handleClick('next')" type="primary"&gt;下一步&lt;/zoom-button&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  stepsOp: {
                    active: 7,	// 要激活的下标, 和index绑定
                    disabled: true,  // 是否禁止点击 默认false
                    data:  [
                      {index: 5, name: 'Basic Info.'},
                      {index: 6, name: 'Vics tab.'},
                      {index: 7, name: 'not done.'},
                      {index: 8, name: 'not done2'}
                    ]
                  },
                }
              },
              methods: {
                handleClick(val) {
                  if (val === 'next') {
                    // 将激活条目往前移一格	如果目前没有激活的条目则无效
                    this.$refs['steps'].next();
                  } else {
                    this.$refs['steps'].prev(); // 将激活条目往后移一格 如果目前步骤条已经全部完成则无效
                  }
                },
              }
            }
          &lt;/script&gt;`,
      advancedCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-steps type="advanced" :op="stepsOp" @change="stepsChange"&gt;&lt;/zoom-steps&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  stepsOp: {
                    active: 7,	// 要激活的下标, 和index绑定
                    disabled: false,  // 是否禁止点击 默认false
                    data:  [	// 类型为advanced时候,可自定义count和type,type属性有'done','doing'
                      {index: 5, count: 4, type: 'success', name: 'Basic Info.'},
                      {index: 6, count: 6, type: 'warning', name: 'Vics tab.'},
                      {index: 7, count: 8, type: 'danger', name: 'not done.'},
                      {index: 8, count: 2, type: 'primary', name: 'not done2'}
                    ],
                    onClick: val =&gt; {	//	鼠标点击事件返回的结果
                      console.log('click', val);
                    }
                  }
                }
              },
              methods: {
                stepsChange(val) {
                // 监听数据变化, 返回index值
                  console.log('stepsChange', val);
                },
              }
            }
          &lt;/script&gt;`,
      timeLineCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-steps type="timeLine" :op="stepsOp" @change="stepsChange"&gt;&lt;/zoom-steps&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  stepsOp: {
                    active: 7,	// 要激活的下标, 和index绑定
                    disabled: false,  // 是否禁止点击 默认false
                    data:  [	// 类型为'timeLine'时候,time属性有效 time属性要传标准时间格式
                      {index: 5, time: '2008-05-12 14:25:32', name: 'Basic Info.'},
                      {index: 6, time: '2018-08-08 08:08:08', name: 'Vics tab.'},
                      {index: 7, time: '2018-08-08 08:08:08', name: 'not done.'},
                      {index: 8, time: 1583678818399, name: 'not done2'}
                    ],
                    onClick: val =&gt; {	// 鼠标点击事件返回的结果
                      console.log('click', val);
                    }
                  }
                }
              },
              methods: {
                stepsChange(val) {
                // 监听数据变化, 返回index值
                  console.log('stepsChange', val);
                },
              }
            }
          &lt;/script&gt;`,
      stepCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-steps :op="stepsOp" @change="stepsChange"&gt;&lt;/zoom-steps&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data () {
                return {
                  stepsOp: {
                    active: 7,	// 要激活的下标, 和index绑定
                    disabled: false,  // 是否禁止点击 默认false
                    data:  [
                      {index: 5, name: 'Basic Info.'},
                      {index: 6, name: 'Vics tab.'},
                      {index: 7, name: 'not done.'},
                      {index: 8, name: 'not done2'}
                    ],
                    onClick: val =&gt; {	// 鼠标点击事件返回的结果
                      console.log('click', val);
                    }
                  }
                }
              },
              methods: {
                stepsChange(val) {
                // 监听数据变化, 返回index值
                  console.log('stepsChange', val);
                },
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    handleClick(val) {
      if (val === 'next') {
        // 将激活条目往前移一格	如果目前没有激活的条目则无效
        this.$refs['steps'].next();
      } else {
        this.$refs['steps'].prev(); // 将激活条目往后移一格 如果目前步骤条已经全部完成则无效
      }
    },
    stepsChange(val) {
    //  监听数据变化, 返回index值
      console.log('stepsChange', val);
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-steps {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-steps {
        margin-top: 40px;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-steps {
        margin-top: 40px;
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
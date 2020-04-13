<template>
  <div class="custom-zoom-grid">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的表格组件, 可自由设置表格数据<br>
      配置数据可在组件标签中绑定op对象, 在op对象里绑定数据<br>
      组件默认索引值在第一列, 也可以自己设定隐藏索引值<br>
      如果有按钮的话, 则加载在索引值的后面,  即第二列
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-grid :op="gridOp"></zoom-grid>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="gridCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>手动加载数据</h2>
    <p>请点击 <span>手动加载数据</span> 按钮试试</p>
    <zoom-tabs class="data-drop" :value="opTab" @change="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="loadData">手动加载数据</zoom-button>
        <zoom-grid ref="grid" :op="gridOp2"></zoom-grid>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="gridLoad"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>带复选功能的表格</h3>
    <p>当开启复选框时候, 调用<span>getData()</span>方法获取的是已选中数据</p>
    <zoom-tabs class="data-drop" :value="checkTab" @change="checkChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="loadData">手动加载数据</zoom-button>
        <zoom-grid :op="gridOp3"></zoom-grid>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="gridCheck"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <div class="tip">
      zoom-ui组件设置属性通过两种方法，一种是标签内绑定属性设置，另一种是配置op对象后，在op对象里设置属性，当设置了op对象内的属性后，标签内样式将会被覆盖。
      组件暂不支持页面渲染后再改变属性，v-model除外。如果需要页面加载完毕后再加载表格数据, 请使用组件内置的load方法。
    </div>
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
              title: "表格高度",
              name: "height",
              type: "String",
              text: "当设置了高度, 则对表格内容限制了高度 如果内容溢出将出现滚动条",
              text2: '用法: 配置op属性, 设置<span>height: 高度</span>'
            },
            {
              id: 2,
              title: "表格列宽",
              name: "width",
              type: "String",
              text: "在列对象内设置, 宽度为百分比, 只针对列宽",
              text2: '用法: 配置op属性, 在配置了表头数据后, 在列对象中设置<span>width: 宽度</span>'
            },
            {
              id: 3,
              title: "隐藏索引",
              name: "hideIndex",
              type: "Boolean",
              text: "索引值默认在表格最前边显示, 可以手动设置为<span>true</span>关闭",
              text2: '用法: 配置op属性, 设置<span>hideIndex: true</span>'
            },
            {
              id: 4,
              title: "开启复选框功能",
              name: "isChecked",
              type: "Boolean",
              text: "默认<span>false</span> , 设置为<span>true</span>开启, 开启后点击表头可以全选或取消, 开启后绑定 @fullClick 函数,可以监听全选/取消的状态值变化",
              text2: '用法: 配置op属性, 设置<span>isChecked: true</span>'
            },
            {
              id: 5,
              title: "配置表头数据",
              name: "title",
              type: "Array",
              text: "表头数据为数组对象形式, 配置的表头数据里对象key值需要和表主体的值对应才能成功渲染",
              text2: '用法: 配置op属性, 设置<span>title: []</span>'
            },
            {
              id: 6,
              title: "按钮组",
              name: "btns",
              type: "Array",
              text: "如果需要配置按钮组, 需要在配置表头数据后, 在表头数据内配置, 一般放在最前面, 否则可能会产生BUG",
              text2: '用法: 配置op属性, 在表头配置内设置<span>btns: []</span>'
            },
            {
              id: 7,
              title: "列排序功能",
              name: "sort",
              type: "Boolean",
              text: "排序功能针对列属性, 需要配置表头数据后在表头对象里配置, 默认<span>false</span> , 设置为<span>true</span>开启,</br>开启后在表头列上会显示上下箭头排序按钮,点击可根据索引值升序或者降序",
              text2: '用法: 配置op属性, 在表头配置内设置<span>btns: []</span>'
            },
            {
              id: 8,
              title: "tip提示",
              name: "tip",
              type: "Boolean",
              text: "tip功能默认<span>false</span> , 设置为<span>true</span>开启, 然后在要显示的列中配置",
              text2: '用法: 配置op属性, 设置属性<span>tip: true</span>, 然后再到要展示tip的列对象中内设置<span>tip: true</span>'
            },
            {
              id: 9,
              title: "表格数据",
              name: "data",
              type: "Array",
              text: "表格内容数据 键名需要和表头配置的对应, 需要在页面渲染前配置, 如果页面渲染完成后再配置则无效",
              text2: '用法: 配置op属性, 设置<span>data: []</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "表格行点击事件",
              name: "onClick",
              type: "Function",
              text: "方法有三个参数: <span>dom</span>为当前行dom元素 <span>td</span>当前点击单元格 <span>col</span>当前行",
              text2: '用法: 配置op属性, 设置<span>onClick: (dom, td, col) => => {}</span>'
            },
            {
              id: 2,
              title: "表格按钮点击事件",
              name: "onClick",
              type: "Function",
              text: "方法有两个参数: <span>value</span>为当前行数据 <span>index</span>为当前索引",
              text2: '用法: 配置op属性, 在表头内的<span>btns</span>对象中设置<span>onClick: (value, index) => {}</span>'
            },
            {
              id: 3,
              title: "组件加载时的回调",
              name: "beforeLoad",
              type: "Function",
              text: "组件加载时调用, 可以这时挂载数据",
              text2: '用法: 配置op属性, 设置<span>beforeLoad: () => {}</span>'
            },
            {
              id: 4,
              title: "监听复选框状态的回调",
              name: "fullClick",
              type: "Function",
              text: "可以监听复选框状态的变化, 当选择或者取消选择时会触发该函数",
              text2: '用法: 标签中绑定函数<span>@fullClick</span>可监听变化'
            },
            {
              id: 5,
              title: "获取当前表格数据",
              name: "getData",
              type: "Function",
              text: "可以获取当前表格内全部数据, 如果是复选框状态, 则获取的是选中的数据",
              text2: '用法: 标签中绑定ref, <span> this.$refs["grid"].getData()</span>可调用'
            },
            {
              id: 6,
              title: "设置/加载表格数据",
              name: "load",
              type: "Function",
              text: "可以动态设置/加载表格数据",
              text2: '用法: 标签中绑定ref, <span> this.$refs["grid"].load(数据)</span>可动态渲染'
            },
            {
              id: 7,
              title: "loading效果",
              name: "showLoad",
              type: "Function",
              text: "可以开启/关闭表格内置的loading效果, 默认关闭状态, 可手动开启",
              text2: '用法: 标签中绑定ref, <span> this.$refs["grid"].showLoad(true/false)</span>可开启或关闭'
            },
          ]
        }
      ],
      gridOp: {
        height: '150px',	//	当设置了高度, 则对表格内容限制了高度 如果内容溢出将出现滚动条
        hideIndex: false, //	默认false 为true不显示排序
        tip: true,  //  是否开启tip, 默认false, 开启后在对应列中还要设置tip: true才会生效
        isChecked: false,	//	是否启用复选框选项,默认否 开启后点击表头可以全选或取消, 开启后绑定 @fullClick 函数,可以监听全选/取消的状态值变化
        onClick: (dom, elem, col) => { // 点击行事件 dom为当前行dom元素 td当前点击单元格 col当前行
          console.log(dom, elem, col);
        },
        title: [
          {
            fieId: "btns",  // id,也是键值, 除了btns, 其它表格内容数据要与其对应
            header: '操作', // 表头文本名称
            width: 10,	  // 列宽度
            sort: false,	// 是否启用排序(为true显示上下箭头排序按钮,点击可根据索引值升序或者降序)
            btns: [
              {
                title: '移除',
                css: {
                  icon: "icon-close"
                },
                onClick: (val, index) => {
                  console.log('点击的当前行是:', val);
                  console.log('点击的当前行下标是:', index);
                }
              },
              {
                title: '编辑',
                css: {
                  icon: "icon-edit"
                },
                onClick: (val, index) => {
                  console.log('点击的当前行是:', val);
                  console.log('点击的当前行下标是:', index);
                }
              },
            ]
          },
          {fieId: 'age',tip: false, header: '年龄'},
          {fieId: 'name',tip: false, header: '姓名'},
          {fieId: 'gender', header: '性别'},
          {fieId: 'city',tip: true, header: '地址'},
          {fieId: 'phone',tip: true, header: '联系方式'}
        ],
        data: [ // 表格内容数据 键名需要和表头配置的对应
          {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
          {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
          {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
          {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
        ],
        // beforeLoad: () => { // 组件加载时调用, 可以这时挂载数据
        //   console.log('加载数据');
        //   this.load();
        // },
      },
      gridOp3: {
        hideIndex: true,
        isChecked: true,
        title: [
          {fieId: 'age',tip: false, header: '年龄'},
          {fieId: 'name',tip: false, header: '姓名'},
          {fieId: 'gender', header: '性别'},
          {fieId: 'city',tip: true, header: '地址'},
          {fieId: 'phone',tip: true, header: '联系方式'}
        ],
        data: [ // 表格内容数据 键名需要和表头配置的对应
          {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
          {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
          {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
          {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
        ]
      },
      gridOp2: {
        title: [
          {fieId: 'age',tip: false, header: '年龄'},
          {fieId: 'name',tip: false, header: '姓名'},
          {fieId: 'gender', header: '性别'},
          {fieId: 'city',tip: true, header: '地址'},
          {fieId: 'phone',tip: true, header: '联系方式'}
        ],
        data: []
      },
      list: [ // 表格内容数据 键名需要和表头配置的对应
        {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
        {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
        {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
        {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
      ],
      opTab: 0,
      checkTab: 0,
      curTab: 0,
      gridCheck:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-grid :op="gridOp3"&gt;&lt;/zoom-grid&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  gridOp3: {
                    hideIndex: true,
                    isChecked: true,
                    title: [
                      {fieId: 'age',tip: false, header: '年龄'},
                      {fieId: 'name',tip: false, header: '姓名'},
                      {fieId: 'gender', header: '性别'},
                      {fieId: 'city',tip: true, header: '地址'},
                      {fieId: 'phone',tip: true, header: '联系方式'}
                    ],
                    data: [ // 表格内容数据 键名需要和表头配置的对应
                      {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
                      {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
                      {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
                      {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`,
      gridLoad:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-button @click="loadData"&gt;手动加载数据&lt;/zoom-button&gt;
              &lt;zoom-grid ref="grid" :op="gridOp2"&gt;&lt;/zoom-grid&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  list: [ // 表格内容数据 键名需要和表头配置的对应
                    {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
                    {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
                    {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
                    {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
                  ],
                  gridOp2: {
                    title: [
                      {fieId: 'age',tip: false, header: '年龄'},
                      {fieId: 'name',tip: false, header: '姓名'},
                      {fieId: 'gender', header: '性别'},
                      {fieId: 'city',tip: true, header: '地址'},
                      {fieId: 'phone',tip: true, header: '联系方式'}
                    ],
                    data: []
                  }
                }
              },
              methods: {
                loadData() {
                  this.$refs['grid'].showLoad(true);
                  setTimeout(() =&gt; {
                    this.$refs['grid'].load(this.list);
                    this.$refs['grid'].showLoad(false);
                  }, 2000);
                }
              }
            }
          &lt;/script&gt;`,
      gridCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-grid :op="gridOp"&gt;&lt;/zoom-grid&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  gridOp: {
                    height: '150px',	//	当设置了高度, 则对表格内容限制了高度 如果内容溢出将出现滚动条
                    hideIndex: false, //	默认false 为true不显示排序
                    tip: true,  //  是否开启tip, 默认false, 开启后在对应列中还要设置tip: true才会生效
                    isChecked: false,	//	是否启用复选框选项,默认否 开启后点击表头可以全选或取消, 开启后绑定 @fullClick 函数,可以监听全选/取消的状态值变化
                    onClick: (dom, elem, col) =&gt; { // 点击行事件 dom为当前行dom元素 td当前点击单元格 col当前行
                      console.log(dom, elem, col);
                    },
                    title: [
                      {
                        fieId: "btns",  // id,也是键值, 除了btns, 其它表格内容数据要与其对应
                        header: '操作', // 表头文本名称
                        width: 10,	  // 列宽度
                        sort: false,	// 是否启用排序(为true显示上下箭头排序按钮,点击可根据索引值升序或者降序)
                        btns: [
                          {
                            title: '移除',
                            css: {
                              icon: "icon-close"
                            },
                            onClick: (val, index) =&gt; {
                              console.log('点击的当前行是:', val);
                              console.log('点击的当前行下标是:', index);
                            }
                          },
                          {
                            title: '编辑',
                            css: {
                              icon: "icon-edit"
                            },
                            onClick: (val, index) =&gt; {
                              console.log('点击的当前行是:', val);
                              console.log('点击的当前行下标是:', index);
                            }
                          },
                        ]
                      },
                      {fieId: 'age',tip: false, header: '年龄'},
                      {fieId: 'name',tip: false, header: '姓名'},
                      {fieId: 'gender', header: '性别'},
                      {fieId: 'city',tip: true, header: '地址'},
                      {fieId: 'phone',tip: true, header: '联系方式'}
                    ],
                    data: [ // 表格内容数据 键名需要和表头配置的对应
                      {name: '张三', age: 27, gender: '男', city: '北京', phone: 123456789},
                      {name: '李四', age: 130, gender: '男', city: '上海', phone: 123456789},
                      {name: '赵六', age: 28, gender: '女', city: '广州', phone: 123456789},
                      {name: '王五', age: 30, gender: '男', city: '深圳', phone: 123456789}
                    ],
                    // beforeLoad: () =&gt; { // 组件加载时调用, 可以这时挂载数据
                    //   console.log('加载数据');
                    //   this.load();
                    // },
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    loadData() {
      this.$refs['grid'].showLoad(true);
      setTimeout(() => {
        this.$refs['grid'].load(this.list);
        this.$refs['grid'].showLoad(false);
      }, 2000);
    },
    opChange(index) {
      this.opTab = index
    },
    checkChange(index) {
      this.checkTab = index
    },
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-grid {
  .basic {
    /deep/ .content-active {
      min-height: 180px;
    }
  }
}
</style>
<template>
  <div class="custom-zoom-tag">
    <!-- 普通 -->
    <div class="tip">
      <text-template code="zoom-ui提供的标签组件, 有多种类型可供选择, 点击可以选中标签" />
      <text-template code="可配置动态删除或新增标签" />
    </div>
    <tab-template :code="tagCode">
      <zoom-tag :op="op"></zoom-tag>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template cls="data-drop" :code="tagCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('个性化设置') }}</h2>
        <text-template code="可以在 *op* 对象进行个性化设置, 进行动态新增或删除标签" />
      </template>
      <zoom-tag :op="tagOp"></zoom-tag>
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
              title: "新增标签功能",
              name: "addTag",
              type: "Boolean",
              text: "默认为<span>false</span>, 设置为<span>true</span>可以设置新增或删除标签",
              text2: '用法: 配置op属性, 设置<span>addTag: true</span>'
            },
            {
              id: 2,
              title: "新增按钮文字",
              name: "title",
              type: "String",
              text: "新增标签按钮的提示文字, 默认叫<span>add</span>",
              text2: '用法: 配置op属性, 设置<span>title: 属性</span>'
            },
            {
              id: 3,
              title: "是否禁用",
              name: "disabled",
              type: "Boolean",
              text: "默认为<span>false</span>, 设置为<span>true</span>可以禁用组件, 禁用状态下用户无法选择",
              text2: '用法: 配置op属性, 设置<span>disabled: true</span>'
            },
            {
              id: 4,
              title: "新增标签类型",
              name: "addType",
              type: "String",
              text: "新增标签类型, 可选参数<span>primary</span>、<span>warning</span>、<span>success</span>、<span>info</span>、<span>danger</span>，默认<span>danger</span>",
              text2: '用法: 配置op属性, 设置<span>addType: "属性"</span>'
            },
            {
              id: 5,
              title: "标签内容",
              name: "data",
              type: "Array",
              text: "设置标签初始内容, 以数组对象形式, 配置默认标签的文字以及类型, 是否选中",
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
              title: "获取标签数据",
              name: "tagList",
              type: "Function",
              text: "获取tag组件的完整数据",
              text2: '用法: 在组件标签上绑定ref, 并通过<span>this.$refs[属性].tagList</span>获取数据'
            },
            {
              id: 2,
              title: "添加标签前的回调",
              name: "beforeAddValue",
              type: "Function",
              text: "参数<span>val</span>当前值, 如果用户设置了并且返回<span>false</span>则不添加",
              text2: '用法:  配置op属性, 设置<span>beforeAddValue: val => {}</span>调用函数'
            },
            {
              id: 3,
              title: "添加标签成功后的回调",
              name: "afterAddValue",
              type: "Function",
              text: "添加标签成功后, 执行的方法",
              text2: '用法:  配置op属性, 设置<span>afterAddValue: val => {}</span>调用函数'
            },
            {
              id: 4,
              title: "删除标签前的回调",
              name: "beforeDelete",
              type: "Function",
              text: "参数<span>index</span>删除tag的下标、<span>val</span>当前值, 如果用户设置了并且返回<span>false</span>则不删除",
              text2: '用法:  配置op属性, 设置<span>beforeDelete: (index, val) => {}</span>调用函数'
            },
            {
              id: 5,
              title: "删除标签成功后的回调",
              name: "afterDelete",
              type: "Function",
              text: "参数<span>val</span>为删除后的当前数据列表, 删除标签成功后, 执行的方法",
              text2: '用法:  配置op属性, 设置<span>afterDelete: val => {}</span>调用函数'
            }
          ]
        }
      ],
      op: {
        data: [
          {title: 'javascript', type: 'success', active: true},
          {title: 'Python', type: 'warning'},
          {title: 'Java', type: 'danger'},
          {title: 'C++', type: 'primary'},
          {title: 'PHP', type: 'info'}
        ]
      },
      tagOp: {
        addTag: true, // 启用添加tag标签, 为true时候启用 用户可自由添加 or 删除
        addType: 'primary',  // 新增的标签数据类型
        title: '添加',  // 添加按钮的标题  默认叫 add
        data: [	// active是选中状态 为true选中
          {title: 'javascript', type: 'success', active: true},
          {title: 'Python', type: 'warning'},
          {title: 'Java', type: 'danger'},
          {title: 'PHP', type: 'info'}
        ]
      },
      tagCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tag :op="tagOp"&gt;&lt;/zoom-tag&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  tagOp: {
                    addTag: true, // 启用添加tag标签, 为true时候启用 用户可自由添加 or 删除
                    addType: 'primary',  // 新增的标签数据类型
                    title: '添加',  // 添加按钮的标题  默认叫 add
                    data: [	// active是选中状态 为true选中
                      {title: 'javascript', type: 'success', active: true},
                      {title: 'Python', type: 'warning'},
                      {title: 'Java', type: 'danger'},
                      {title: 'PHP', type: 'info'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`,
      tagCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tag :op="op"&gt;&lt;/zoom-tag&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  op: {
                    data: [
                      {title: 'javascript', type: 'success', active: true},
                      {title: 'Python', type: 'warning'},
                      {title: 'Java', type: 'danger'},
                      {title: 'C++', type: 'primary'},
                      {title: 'PHP', type: 'info'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    tag2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    tag1Num() {
      console.log('滑块1当前值是' + this.num1);
    }
  }
}
</script>
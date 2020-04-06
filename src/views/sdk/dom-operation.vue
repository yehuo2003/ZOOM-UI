<template>
  <div class="dom-operation">
    <h1>DOM操作</h1>
    <h2>dom-operation</h2>
    <div class="tip">
      zoom-ui内部封装的极简化轻量级的DOM操作工具, 可以用来简单查找, 操作DOM元素<br>
      操作方法和jQuery大致相同, 功能方面较为简单, 够满足用户一般操作, 可以进行链式调用<br>
      如果需要进行更多复杂的操作, 建议引入jQuery组件
    </div>
    <h3>查找DOM元素</h3>
    <p>直接通过<span>$("元素")</span>来获取要查找的DOM元素, 可在mounted声明周期内使用</p>
    <custom-code :html="select"></custom-code>
    <h3>链式操作</h3>
    <p>请看以下例子</p>
    <custom-code :html="chain"></custom-code>
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
              title: "获取DOM元素",
              name: "$",
              type: "Function",
              text: "查找DOM元素",
              text2: '用法: 调用方法<span>$("元素")</span>'
            },
            {
              id: 2,
              title: "查找元素",
              name: "find",
              type: "Function",
              text: "查找当前元素下的某个元素",
              text2: '用法: 调用方法<span>$("元素").find("要查找的元素")</span>'
            },
            {
              id: 3,
              title: "选取第n个元素",
              name: "eq",
              type: "Function",
              text: "选择第几个元素 下标从0开始",
              text2: '用法: 调用方法<span>$("元素").eq(n)</span>'
            },
            {
              id: 4,
              title: "删除元素",
              name: "remove",
              type: "Function",
              text: "可删除指定元素",
              text2: '用法: 调用方法<span>$("元素").remove("要删除的元素")</span>'
            },
            {
              id: 5,
              title: "新增class",
              name: "addClass",
              type: "Function",
              text: "要新增的class",
              text2: '用法: 调用方法<span>$("元素").addClass("class")</span>'
            },
            {
              id: 6,
              title: "设置文本内容",
              name: "setText",
              type: "Function",
              text: "设置选中标签的文本内容",
              text2: '用法: 调用方法<span>$("元素").setText("文本内容")</span>'
            }
          ]
        }
      ],
      select: '$(DOM) // return DOM Object',
      chain:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;div&gt;
                &lt;p class="p1"&gt;111&lt;/p&gt;
                &lt;p class="p-con"&gt;222&lt;/p&gt;
                &lt;p&gt;333&lt;/p&gt;
                &lt;p class="p4"&gt;444&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              mounted () {
                $('.p1').addClass('blue'); // 添加class
                $('.p4').setText('666666666666');	//	设置文本内容
                $('div').find('p').eq(1).setText(66666666666).addClass('blue');	//	链式操作
                let title = $Z('.p-con');	//	获取元素
                console.log(title,'sss');
              }
            }
          &lt;/script&gt;
          &lt;style&gt;
          .blue {
            color: blue !important;
          }
          &lt;/style&gt;`
    };
  },
  methods: {
    nextClick() {
      this.$router.push('/component/custom-color');
    }
  }
};
</script>
<style lang="scss" scoped>
.dom-operation {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
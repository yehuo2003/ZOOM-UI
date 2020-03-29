<template>
  <div class="custom-zoom-carousel">
    <!-- 普通 -->
    <div class="tip">
      轮播图可以自定义高度和宽度，高度默认19，宽度默认28，可自行修改。<br>
      当鼠标进入轮播图时，展示左右箭头，点击可切换上一张或下一张。<br>
      图片下方还提供了图片标题，和提示灯，鼠标经过提示灯也可以切换图片。
    </div>
    <h2>用法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-carousel :op="op"></zoom-carousel>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="btn"></custom-code>
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
              title: "宽度",
              name: "width",
              type: "Number",
              text:
                "宽度, 默认是<span>28</span>, 可自定义",
              text2:
                '用法: 配置op对象, 设置<span>width: 宽度</span>'
            },
            {
              id: 2,
              title: "高度",
              name: "height",
              type: "Number",
              text:
                "宽度, 默认是<span>19</span>, 可自定义",
              text2:
                '用法: 配置op对象, 设置<span>height: 高度</span>'
            },
            {
              id: 3,
              title: "轮播的图片",
              name: "images",
              type: "Array",
              text:
                "配置轮播的图片, 传数组,数组里面对象,src是图片路径,title是图片标题, url是要跳转的链接,跳转方式为打开新页面",
              text2:
                '用法: 配置op对象并设置images数组, 设置<span>images: []</span>'
            }
          ]
        }
      ],
      op: {
        width: 28,	// 轮播图的宽度 默认是28
        height: 19, // 轮播图高度 默认是19
        images: [		// 配置轮播的图片, 传数组,数组里面对象,src是图片路径,title是图片标题, url是要跳转的链接,跳转方式为打开新页面
          {src: require('./static/1.jpg'), title: '大山', url: ''},
          {src: require('./static/2.jpg'), title: '城堡', url: ''},
          {src: require('./static/3.jpg'), title: '峡谷', url: ''},
          {src: require('./static/4.jpg'), title: '瀑布', url: ''},
        ]
      },
      curTab: 0,
      btn: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-carousel :op="op"&gt;&lt;/zoom-carousel&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                op: {
                  width: 28,	// 轮播图的宽度 默认是28
                  height: 19, // 轮播图高度 默认是19
                  images: [		// 配置轮播的图片, 传数组,数组里面对象,src是图片路径,title是图片标题, url是要跳转的链接,跳转方式为打开新页面
                    {src: require('./static/1.jpg'), title: '大山', url: ''},
                    {src: require('./static/2.jpg'), title: '城堡', url: ''},
                    {src: require('./static/3.jpg'), title: '峡谷', url: ''},
                    {src: require('./static/4.jpg'), title: '瀑布', url: ''},
                  ]
                }
              }
            }
          }
        &lt;/script&gt;
      `
    };
  },
  methods: {
    tabChange(index) {
      this.curTab = index;
    }
  }
};
</script>
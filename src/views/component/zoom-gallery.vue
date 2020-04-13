<template>
  <div class="custom-zoom-gallery">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的画廊幻灯片组件, 有大小图切换功能<br>
      可以用键盘左右按键控制上一张或者下一张<br>
      还可以开启放大镜功能
    </div>
    <h2>基础使用</h2>
    <p>可以按键盘左键或者右键切换上下张</p>
    <zoom-tabs class="basic" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-gallery :op="op"></zoom-gallery>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="galleryCode"></custom-code>
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
              title: "图片数据",
              name: "data",
              type: "Array",
              text: "图片以数组方式保存",
              text2: '用法: 配置op属性, 设置<span>data: []</span>'
            },
            {
              id: 2,
              title: "开启放大镜",
              name: "showZoom",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>开启放大镜",
              text2: '用法: 配置op属性, 设置<span>showZoom: "true"</span>'
            }
          ]
        }
      ],
      op: {
        showZoom: true, //  是否开启放大镜功能, 默认false
        data: [ //  图片以数组方式保存
          require('./static/1.jpg'),
          require('./static/2.jpg'),
          require('./static/3.jpg'),
          require('./static/4.jpg')
        ]
      },
      curTab: 0,
      galleryCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-gallery :op="op"&gt;&lt;/zoom-gallery&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  op: {
                    showZoom: true, //  是否开启放大镜功能, 默认false
                    data: [ //  图片以数组方式保存
                      require('./static/1.jpg'),
                      require('./static/2.jpg'),
                      require('./static/3.jpg'),
                      require('./static/4.jpg')
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
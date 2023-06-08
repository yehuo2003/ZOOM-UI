<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-08 20:40:08
-->
<template>
  <div class="custom-zoom-gallery">
    <!-- 普通 -->
    <div class="tip">
      <text-template code="Gallery.1" />
    </div>
    <tab-template :code="galleryCode">
      <zoom-gallery :op="op"></zoom-gallery>
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
  }
}
</script>
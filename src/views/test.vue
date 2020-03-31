<template>
  <div>
    <zoom-gallery :op="op"></zoom-gallery>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        op: {
          showZoom: true, //  是否开启放大镜功能, 默认false
          data: [ //  图片以数组方式保存
            // require('./static/1.jpg'),
            // require('./static/2.jpg'),
            // require('./static/3.jpg'),
            // require('./static/4.jpg')
          ]
        }
      }
    }
  }
</script>
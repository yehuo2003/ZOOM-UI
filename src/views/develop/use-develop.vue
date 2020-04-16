<template>
  <div class="install-develop">
    <h1>快速上手</h1>
    <h2>导入组件</h2>
    <h3>完整引入</h3>
    <p>在main.js文件中全局注册，方法如下：</p>
    <custom-code :html="quote"></custom-code>
    <h2>组件使用</h2>
    <p>全局导入后，可以直接通过标签使用，方法如下：</p>
    <custom-code :html="use"></custom-code>
    <h3>更多使用操作请查看 <router-link to="/component">组件使用</router-link></h3>
    <zoom-button @click="nextClick">自定义主题</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      use: '&lt;zoom-button&gt;测试按钮&lt;/zoom-button&gt;',
      quote:
        `import zoomUI from 'zoom-design';
          import 'zoom-design/lib/zoom-design.css';

          Vue.use(zoomUI);`,
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
.install-develop {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 13:58:17
-->
<template>
  <div class="install-develop">
    <h2>{{ $zoom.$t('导入组件') }}</h2>
    <h3>{{ $zoom.$t('完整引入') }}</h3>
    <text-template code="在main.js文件中全局注册，方法如下：" />
    <custom-code :html="quote"></custom-code>
    <h2>{{ $zoom.$t('组件使用') }}</h2>
    <text-template code="全局导入后，可以直接通过标签使用，方法如下：" />
    <custom-code :html="use"></custom-code>
    <h3>{{ $zoom.$t('更多使用操作请查看') }} <router-link to="/component">{{ $zoom.$t('组件使用') }}</router-link></h3>
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
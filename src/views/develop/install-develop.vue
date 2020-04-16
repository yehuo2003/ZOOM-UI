<template>
  <div class="install-develop">
    <h1>组件安装</h1>
    <h2>在要安装的 Vue 项目根目录下运行</h2>
    <h3>使用npm安装</h3>
    <p>通过<span>Win + R</span> 打开cmd命令行，输入命令: </p>
    <custom-code :html="npm"></custom-code>
    <h3>使用yarn安装</h3>
    <custom-code :html="yarn"></custom-code>
    <zoom-button @click="nextClick">自定义主题</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      npm: 'npm install zoom-design --save',
      yarn: 'yarn add zoom-design'
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
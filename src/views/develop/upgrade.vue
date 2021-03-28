<template>
  <div class="install-develop">
    <h2>查看版本</h2>
    <p>在项目根目录下，通过<span>Win + R</span> 打开cmd命令行，输入命令: </p>
    <custom-code :html="quire"></custom-code>
    <h2>版本升级</h2>
    <p>命令如下: </p>
    <custom-code :html="promote"></custom-code>
    <p>使用 Yarn 更新: </p>
    <custom-code :html="yarnPromote"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yarnPromote: 'yarn upgrade',
      quire: 'npm view zoom-design versions',
      promote: 'npm update zoom-design --save',
    };
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
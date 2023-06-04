<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 13:54:27
-->
<template>
  <div class="install-develop">
    <h2>{{ $zoom.$t('在要安装的 Vue 项目根目录下运行') }}</h2>
    <h3>{{ $zoom.$t('使用npm安装') }}</h3>
    <text-template code="通过 *Win + R* 打开cmd命令行，输入命令:" />
    <custom-code :html="yarn"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      npm: 'npm install zoom-design --save',
      yarn: 'yarn add zoom-design'
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
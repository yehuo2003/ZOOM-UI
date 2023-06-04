<!--
 * @Description:环境准备
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 13:51:34
-->
<template>
  <div class="install-develop">
    <h2>Node.js</h2>
    <h3>{{ $zoom.$t('安装zoom-ui前首先确保您的环境安装了Node.js，建议8.0以上版本') }}</h3>
    <h3>
      <text-template code="如果未安装可以到官网 https://nodejs.org 进行下载安装" />
    </h3>
    <text-template code="查看Node.js版本可以通过*Win + R* 打开cmd命令行，输入命令查看Node.js版本：" />
    <custom-code :html="node"></custom-code>
    <text-template code="或者" />
    <custom-code :html="node2"></custom-code>
    <h2>NPM</h2>
    <h3>{{ $zoom.$t('安装完了Node.js后，通过Win + R 打开cmd命令行，输入命令查看Npm版本：') }}</h3>
    <h3>{{ $zoom.$t('推荐版本 6.0 以上') }}</h3>
    <custom-code :html="npm"></custom-code>
    <text-template code="" />
    <h3>{{ $zoom.$t('如果NPM不是最新版本，可以手动升级') }}</h3>
    <text-template code="升级命令:" />
    <custom-code :html="updateNpm"></custom-code>
    <h3>{{ $zoom.$t('因为网络环境原因无法升级成功的可以切换为淘宝镜像') }}</h3>
    <text-template code="输入以下命令，切换到淘宝镜像源：" />
    <custom-code :html="cnpm"></custom-code>
    <h2>{{ $zoom.$t('全局安装yarn') }}</h2>
    <text-template code="yarn 的安装：" />
    <custom-code :html="yarn"></custom-code>
    <text-template code="yarn 淘宝源安装：" />
    <custom-code :html="cyarn"></custom-code>
    <h2>{{ $zoom.$t('Vue 全局安装') }}</h2>
    <text-template code="" />
    <h3>{{ $zoom.$t('建议安装 2.6 以上版本的 Vue') }}</h3>
    <text-template code="安装命令：" />
    <custom-code :html="vue"></custom-code>
    <text-template code="或者" />
    <custom-code :html="vue2"></custom-code>
    <text-template code="查看 Vue 版本:" />
    <custom-code :html="vueVersions"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      node: 'node -v',
      node2: 'node --version',
      npm: 'npm -v',
      updateNpm: 'npm install -g npm',
      cnpm: 'npm install -g cnpm --registry=http://registry.npm.taobao.org',
      yarn:
        `yarn config set registry https://registry.npm.taobao.org -g
          yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g`,
      cyarn:
        `npm install -g yarn
          yarn --version  //  查看版本`,
      vue: 'npm install --global vue-cli',
      vue2: 'npm install -g vue-cli',
      vueVersions: 'vue -V',
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
<template>
  <div class="install-develop">
    <h1>环境准备</h1>
    <h2>Node.js</h2>
    <h3>安装zoom-ui前首先确保您的环境安装了Node.js，建议8.0以上版本</h3>
    <h3>如果未安装可以到官网 <a href="https://nodejs.org" target="_blank">https://nodejs.org</a> 进行下载安装</h3>
    <p>查看Node.js版本可以通过<span>Win + R</span> 打开cmd命令行，输入命令查看Node.js版本：</p>
    <custom-code :html="node"></custom-code>
    <p>或者</p>
    <custom-code :html="node2"></custom-code>
    <h2>Npm</h2>
    <h3>安装完了Node.js后，通过<span>Win + R</span> 打开cmd命令行，输入命令查看Npm版本：</h3>
    <h3>推荐版本 6.0 以上</h3>
    <custom-code :html="npm"></custom-code>
    <h3>如果Npm不是最新版本，可以手动升级</h3>
    <p>升级命令:</p>
    <custom-code :html="updateNpm"></custom-code>
    <h3>因为网络环境原因无法升级成功的可以切换为淘宝镜像</h3>
    <p>输入以下命令，切换到淘宝镜像源：</p>
    <custom-code :html="cnpm"></custom-code>
    <h2>全局安装yarn</h2>
    <p>Yarn 的安装：</p>
    <custom-code :html="yarn"></custom-code>
    <p>Yarn 淘宝源安装：</p>
    <custom-code :html="cyarn"></custom-code>
    <h2>Vue 全局安装</h2>
    <h3>建议安装 2.6 以上版本的 Vue</h3>
    <p>安装命令：</p>
    <custom-code :html="vue"></custom-code>
    <p>或者: </p>
    <custom-code :html="vue2"></custom-code>
    <p>查看 Vue 版本: </p>
    <custom-code :html="vueVersions"></custom-code>
    <zoom-button @click="nextClick">自定义主题</zoom-button>
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
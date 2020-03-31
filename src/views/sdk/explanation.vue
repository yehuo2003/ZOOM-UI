<template>
  <div class="install-develop">
    <h1>SDK 说明</h1>
    <h2>$zoom</h2>
    <h3>使用npm安装</h3>
    <custom-code :html="npm"></custom-code>
    <h3>使用yarn安装</h3>
    <custom-code :html="yarn"></custom-code>
    <h2>导入组件</h2>
    <h3>完整引入</h3>
    <p>在main.js文件中全局注册，方法如下：</p>
    <custom-code :html="quote"></custom-code>
    <zoom-button @click="nextClick">自定义主题</zoom-button>
    <!-- <custom-code :html="markdownhtml" cls="javascript"></custom-code> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      npm: 'npm install zoom-ui-1.0 --save',
      yarn: 'yarn add zoom-ui-1.0',
      quote: `
        import zoomUI from 'zoom-ui-1.0';
        import 'zoom-ui-1.0/lib/zoom-ui-1.0.css';

        Vue.use(zoomUI);
      `,
      markdownhtml: `
        &lt;zoom-layout class="home-layout"&gt;
          &lt;div slot="header"&gt;
            头部
          &lt;/div&gt;
          &lt;div slot="aside"&gt;
            &lt;zoom-tree-menu style="font-size: 14px;" :op="navOp"&gt;&lt;/zoom-tree-menu&gt;
          &lt;/div&gt;
          &lt;main slot="main" class="home-main"&gt;
            &lt;!-- 主体部分 --&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
          &lt;/main&gt;
        &lt;/zoom-layout&gt;
        &lt;script&gt;
        export default {
          data() {
            //数据属性
            return {
              navOp: {
                // width: '18%',
                accordion: true,
                data: [
                  {title: '快速上手', url: '#/component/index', icon: 'icon-set'},
                  {title: '自定义主题', url: '', children: [
                    {title: 'Icon图标', url: '#/table/add', icon: 'icon-add-plus'}
                  ]},
                  {title: '导航组件', url: '', children: [
                    {title: '树形菜单', url: '#/dish/list', icon: 'icon-list'},
                  ]},
                ]
              }
            };
          },
        };
        &lt;/script&gt;
        &lt;style lang="scss" scoped&gt;
        .home-layout {
          .home-main {
            padding: 0 50px;
          }
        }
        &lt;/style&gt;
      `
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
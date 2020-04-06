<template>
  <div class="custom-zoom-loading">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="loading">
      zoom-ui提供的弹出确认框组件已经全局注册, 并不需要在页面上创建标签, 就可以直接调用<br>
      通过this.$zoom.loading调用, 可以自定义loading的主题, 和是否显示全屏遮罩层
    </div>
    <h2>使用方法</h2>
    <p>使用<span>this.$zoom.loading.show()</span>方法可以开启loading</p>
    <p>使用<span>this.$zoom.loading.hide()</span>方法可以关闭loading</p>
    <p>
      还可以通过 <span>color</span> 改变loading的颜色<br>
      <span>full</span>属性可以设置全屏遮罩层
    </p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-button @click="openLoading">默认loading</zoom-button> <span>3秒后消失</span><br>
        <zoom-button @click="customLoading">红色loading</zoom-button> <span>5秒后消失</span>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
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
          title: "方法",
          content: [
            {
              id: 1,
              title: "显示",
              name: "show",
              type: "Function",
              text: "loading的显示",
              text2: '用法: 通过方法<span>this.$zoom.loading.show()</span>直接调用可以显示'
            },
            {
              id: 2,
              title: "隐藏",
              name: "hide",
              type: "Function",
              text: "loading的隐藏",
              text2: '用法: 通过方法<span>this.$zoom.loading.hide()</span>直接调用可以隐藏'
            }
          ]
        },
        {
          id: 2,
          title: "属性",
          content: [
            {
              id: 1,
              title: "颜色",
              name: "color",
              type: "String",
              text: "loading的颜色,可以自定, 也可不传, 默认蓝色",
              text2: '用法: 通过方法<span>this.$zoom.loading.show({color: "颜色"})</span>直接在开启时候设置自定义颜色'
            },
            {
              id: 2,
              title: "显示遮罩层",
              name: "full",
              type: "Boolean",
              text: "默认不显示, 设置属性为<span>true</span>则显示全屏遮罩层, 全屏遮罩层开启时, 无法进行其它操作",
              text2: '用法: 通过方法<span>this.$zoom.loading.show({full: true})</span>直接在开启时候显示全屏遮罩层'
            }
          ]
        },
      ],
      opTab: 0,
      curTab: 0,
      ipt:`
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-button @click="openLoading"&gt;默认loading&lt;/zoom-button&gt; &lt;span&gt;3秒后消失&lt;/span&gt;&lt;br&gt;
            &lt;zoom-button @click="customLoading"&gt;红色loading&lt;/zoom-button&gt; &lt;span&gt;5秒后消失&lt;/span&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            methods: {
              customLoading() {
                this.$zoom.loading.show({color: 'red', full: true});
                setTimeout(() =&gt; {
                  this.$zoom.loading.hide();
                }, 5000);
              },
              openLoading() {
                this.$zoom.loading.show();
                setTimeout(() =&gt; {
                  this.$zoom.loading.hide();
                }, 3000);
              }
            }
          }
        &lt;/script&gt;
      `
    }
  },
  methods: {
    customLoading() {
      this.$zoom.loading.show({color: 'red', full: true});
      setTimeout(() => {
        this.$zoom.loading.hide();
      }, 5000);
    },
    openLoading() {
      this.$zoom.loading.show();
      setTimeout(() => {
        this.$zoom.loading.hide();
      }, 3000);
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-loading {
  .basic {
    .custom-loading {
      position: relative;
      text-align: center;
      height: 150px;
      p {
        border: 1px solid #d9d9d9;
        width: 200px;
        position: absolute;
        &:first-child {
          top: 0;
          left: 40%;
        }
        &:nth-child(2) {
          top: 30px;
          left: 20%;
        }
        &:nth-child(3) {
          bottom: 0;
          left: 40%;
        }
        &:nth-child(4) {
          bottom: 30px;
          left: 20%;
        }
        &:nth-child(5) {
          bottom: 30px;
          right: 20%;
        }
        &:nth-child(6) {
          top: 30px;
          right: 20%;
        }
      }
    }
    .zoom-btn {
      margin: 15px 5px;
    }
  }
}
</style>
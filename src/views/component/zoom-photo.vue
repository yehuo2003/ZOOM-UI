<template>
  <div class="custom-zoom-photo">
    <!-- 普通 -->
    <h2>使用方法</h2>
    <div class="tip">
      zoom-ui提供的放大镜功能, 用户可以上传一张小图一张大图, 也可以只上传一张图片用来显示<br>
      可以设置图片展示区域在内部还是在外部<br>
      还可以自定义放大倍数, 和放大镜样式和宽度
    </div>
    <h2>基础使用</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <div style="width: 500px;">
          <zoom-photo :op="op"></zoom-photo>
        </div>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>内部显示放大镜</h2>
    <p>通过op对象里的属性<span>outShow</span>来决定放大镜在内部还是外部</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-photo :op="photoOp"></zoom-photo>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
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
          title: "属性",
          content: [
            {
              id: 1,
              title: "图片地址",
              name: "url",
              type: "String",
              text: "用来配置图片的url地址",
              text2: '用法: 配置op属性, 设置<span>url: 图片地址</span>'
            },
            {
              id: 2,
              title: "图片懒加载",
              name: "lazyload",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>开启懒加载",
              text2: '用法: 配置op属性, 设置<span>lazyload: true</span>'
            },
            {
              id: 3,
              title: "放大镜宽度",
              name: "width",
              type: "Number",
              text: "放大镜的宽度, 可自定义",
              text2: '用法: 配置op属性, 设置<span>width: 宽度</span>'
            },
            {
              id: 4,
              title: "放大镜倍速",
              name: "scale",
              type: "Number",
              text: "默认为三倍, 可以自定义",
              text2: '用法: 配置op属性, 设置<span>scale: 放大倍速</span>'
            },
            {
              id: 5,
              title: "隐藏放大镜",
              name: "hideZoom",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>隐藏放大镜",
              text2: '用法: 配置op属性, 设置<span>hideZoom: true</span>'
            },
            {
              id: 6,
              title: "放大镜样式",
              name: "selectorStyle",
              type: "Object",
              text: "放大镜的样式, 以对象形式配置",
              text2: '用法: 配置op属性, 设置<span>selectorStyle: {样式}</span>'
            },
            {
              id: 7,
              title: "放大镜外部基线",
              name: "baseline",
              type: "Boolean",
              text: "放大镜的外部基线, 当放大镜显示在外部时候可以开启, 默认为关闭",
              text2: '用法: 配置op属性, 设置<span>baseline: true</span>'
            },
            {
              id: 8,
              title: "放大镜中心点",
              name: "pointer",
              type: "Boolean",
              text: "放大镜的外部基线, 当放大镜显示在外部时候可以开启, 默认为关闭",
              text2: '用法: 配置op属性, 设置<span>pointer: true</span>'
            },
            {
              id: 9,
              title: "图片是否展示在外部",
              name: "outShow",
              type: "Boolean",
              text: "默认<span>false</span>, 为<span>true</span>展示在外部",
              text2: '用法: 配置op属性, 设置<span>pointer: true</span>'
            },
            {
              id: 10,
              title: "放大镜类型",
              name: "type",
              type: "String",
              text: "可选参数: <span>circle</span>, <span>square</span>, 默认类型为<span>square</span>",
              text2: '用法: 配置op属性, 设置<span>type: circle</span>'
            }
          ]
        }
      ],
      op: {
        baseline: true,  // 外部区域的基线
        pointer: true, // 外部区域的中心点
        outShow: true, // 图片展示区域会在图片外部
        lazyload: true, //  开启图片懒加载
        url: require('./static/1.jpg'), //  图片地址
        scale: 3, // 放大倍数
        selectorStyle: {"display": "none;"},  // 放大镜样式
        type: 'square', // 放大镜类型(circle,square)
        width: 100, //  放大镜宽度
      },
      photoOp: {
        outShow: false,
        lazyload: true,
        url: require('./static/2.jpg'),
        scale: 4,
        width: 300,
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-photo :op="photoOp"&gt;&lt;/zoom-photo&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                photoOp: {
                  outShow: false,
                  lazyload: true,
                  url: require('./static/2.jpg'),
                  scale: 4,
                  width: 300,
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-photo :op="op"&gt;&lt;/zoom-photo&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                op: {
                  baseline: true,  // 外部区域的基线
                  pointer: true, // 外部区域的中心点
                  outShow: true, // 图片展示区域会在图片外部
                  lazyload: true, //  开启图片懒加载
                  url: require('./static/1.jpg'), //  图片地址
                  scale: 3, // 放大倍数
                  selectorStyle: {"display": "none;"},  // 放大镜样式
                  type: 'square', // 放大镜类型(circle,square)
                  width: 100, //  放大镜宽度
                }
              }
            }
          }
        &lt;/script&gt;
      `
    }
  },
  methods: {
    usetTest(num) {
      let data = {
        title: num + '号用户',
        img: require(`./static/${num}.jpg`)
      }
      this.$refs['user'].load(data);
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
.custom-zoom-photo {
  .data-drop {
    /deep/ .content-active {
      min-height: 150px;
    }
  }
  .basic {
    /deep/ .content-active {
      min-height: 100px;
    }
  }
}
</style>
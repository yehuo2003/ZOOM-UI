<template>
  <div class="custom-zoom-tabs">
    <!-- 普通 -->
    <tab-template :code="tabsCode">
      <template slot="header">
        <h2>基本用法</h2>
        <div class="tip">
          zoom-tabs组件, 需要配合zoom-tab-item组件一起使用<br>
          可以配置自定义的标签页title和内容<br>
          默认横排显示, 可以切换竖排显示, 靠左或者靠右显示
        </div>
      </template>
      <zoom-tabs :value="curTab2" @change="tabChange2">
        <zoom-tab-item :index="0" :label="'Tab1'">
          <div>
            Tab1的内容
          </div>
        </zoom-tab-item>
        <zoom-tab-item :index="1" :label="'Tab2'">
          <h5 slot="label">
            我是tab2
            <i class="zoom-icon icon-close-plus"></i>
          </h5>
          <div>Tab2的内容</div>
        </zoom-tab-item>
        <zoom-tab-item :index="2" :label="'Tab3'">
          <div>Tab3的内容</div>
        </zoom-tab-item>
      </zoom-tabs>
    </tab-template>
    <!-- 竖排显示 -->
    <tab-template :code="tabsCustom">
      <template slot="header">
        <h2>竖排显示</h2>
        <p>
          如果想要竖排显示, 可以在组件标签设置
          <span>position="left"</span>,
          <span>right</span>就是靠右
        </p>
      </template>
      <zoom-tabs position="left" :value="sizeTab" @change="sizeChange">
        <zoom-tab-item :index="0" :label="'Tab1'">
          <div>
            Tab1的内容
          </div>
        </zoom-tab-item>
        <zoom-tab-item :index="1" :label="'Tab2'">
          <h5 slot="label">
            我是tab2
            <i class="zoom-icon icon-close-plus"></i>
          </h5>
          <div>Tab2的内容</div>
        </zoom-tab-item>
        <zoom-tab-item :index="2" :label="'Tab3'">
          <div>Tab3的内容</div>
        </zoom-tab-item>
      </zoom-tabs>
    </tab-template>
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
              title: "当前激活的tab页索引",
              name: "value",
              type: "String",
              text:
                "value显示的是当前激活的tab页索引",
              text2:
                '用法: 在组件Tabs标签上绑定<span>value="索引"</span>'
            },
            {
              id: 2,
              title: "tab页名称",
              name: "label",
              type: "String",
              text:
                "每个tab-item页签的名字",
              text2:
                '用法: 在组件Tab-item上绑定设置<span>label="属性"</span>, 也可以通过<span>slot="label"</span>来自定义标签'
            },
            {
              id: 3,
              title: "Tab页键值",
              name: "index",
              type: "String",
              text:
                "为每个Tab-item组件绑定独一无二的下标, 避免更新错误",
              text2:
                '用法: 在组件Tab-item上绑定设置<span>:index="索引"</span>'
            },
            {
              id: 4,
              title: "显示边框",
              name: "border",
              type: "Boolean",
              text:
                "默认<span>false</span>, 设置为<span>true</span>可以显示边框",
              text2:
                '用法: 在组件Tab-tabs上绑定设置<span>:border="true"</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "Tab页切换事件",
              name: "tabChange",
              type: "Function",
              text: "切换Tab页时候就会触发该事件, 接受参数val为当前索引",
              text2: '用法: 在组件Tab标签上绑定<span>@change="自定义监听事件"</span>来监听切换事件'
            }
          ]
        }
      ],
      curTab2: 0,
      sizeTab: 0,
      tabsCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tabs position="left" :value="curTab" @change="tabChange"&gt;
                &lt;zoom-tab-item :index="0" :label="'Tab1'"&gt;
                  &lt;div&gt;
                    Tab1的内容
                  &lt;/div&gt;
                &lt;/zoom-tab-item&gt;
                &lt;zoom-tab-item :index="1" :label="'Tab2'"&gt;
                  &lt;h5 slot="label"&gt;
                    我是tab2
                    &lt;i class="zoom-icon icon-close-plus"&gt;&lt;/i&gt;
                  &lt;/h5&gt;
                  &lt;div&gt;Tab2的内容&lt;/div&gt;
                &lt;/zoom-tab-item&gt;
                &lt;zoom-tab-item :index="2" :label="'Tab3'"&gt;
                  &lt;div&gt;Tab3的内容&lt;/div&gt;
                &lt;/zoom-tab-item&gt;
              &lt;/zoom-tabs&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  curTab: 0 // 当前激活的tab索引
                }
              },
              methods: {
                tabChange(index) {
                  this.curTab = index
                }
              }
            }
          &lt;/script&gt;`,
      tabsCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-tabs :value="curTab" @change="tabChange"&gt;
                &lt;zoom-tab-item :index="0" :label="'Tab1'"&gt;
                  &lt;div&gt;
                    Tab1的内容
                  &lt;/div&gt;
                &lt;/zoom-tab-item&gt;
                &lt;zoom-tab-item :index="1" :label="'Tab2'"&gt;
                  &lt;h5 slot="label"&gt;
                    我是tab2
                    &lt;i class="zoom-icon icon-close-plus"&gt;&lt;/i&gt;
                  &lt;/h5&gt;
                  &lt;div&gt;Tab2的内容&lt;/div&gt;
                &lt;/zoom-tab-item&gt;
                &lt;zoom-tab-item :index="2" :label="'Tab3'"&gt;
                  &lt;div&gt;Tab3的内容&lt;/div&gt;
                &lt;/zoom-tab-item&gt;
              &lt;/zoom-tabs&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  curTab: 0 // 当前激活的tab索引
                }
              },
              methods: {
                tabChange(index) {
                  this.curTab = index
                }
              }
            }
          &lt;/script&gt;`
    };
  },
  methods: {
    tabChange2(index) {
      this.curTab2 = index;
    },
    sizeChange(index) {
      this.sizeTab = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-tabs {
  .basic {
    /deep/ .content-active {
      min-height: 250px;
      overflow: auto;
    }
  }
}
</style>
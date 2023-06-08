<template>
  <div class="custom-zoom-userinfo">
    <!-- 普通 -->
    <div class="tip">
      <text-template code="zoom-ui提供的user-info组件, 方便用户进行多用户切换" />
      <text-template code="并且可以配置图片作为用户头像" />
    </div>
    <tab-template :code="userinfoCode">
      <zoom-userinfo></zoom-userinfo>
    </tab-template>
    <!-- 个性化设置 -->
    <tab-template cls="data-drop" :code="userinfoCustom">
      <template slot="header">
        <h2>{{ $zoom.$t('个性化设置') }}</h2>
        <text-template code="可对用户信息组件配置 *op* 对象进行个性化设置" />
      </template>
      <zoom-userinfo  ref="user" :op="userinfoOp">
        <ul>
          <li @click="usetTest(1)">1号用户</li>
          <li @click="usetTest(2)">2号用户</li>
          <li @click="usetTest(3)">3号用户</li>
          <li @click="usetTest(4)">4号用户</li>
        </ul>
      </zoom-userinfo>
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
              title: "用户头像",
              name: "img",
              type: "String",
              text: "配置用户头像, 如果未设置, 默认显示<span>icon-user</span>图标",
              text2: '用法: 配置op属性, 设置<span>img: 图片地址</span>'
            },
            {
              id: 2,
              title: "头像icon",
              name: "icon",
              type: "String",
              text: "默认显示<span>icon-user</span>, 可自定义, 当设置了图片后, icon就会失效",
              text2: '用法: 配置op属性, 设置<span>icon: 属性</span>'
            },
            {
              id: 3,
              title: "名称",
              name: "title",
              type: "String",
              text: "用户名称, 可自定义",
              text2: '用法: 配置op属性, 设置<span>title: 名称</span>'
            }
          ]
        }
      ],
      userinfoOp: {
        title: '1号用户',
				icon: 'icon-user',
        img: require('./static/1.jpg')
      },
      userinfoCustom:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-userinfo  ref="user" :op="userinfoOp"&gt;
                &lt;ul&gt;
                  &lt;li @click="usetTest(1)"&gt;1号用户&lt;/li&gt;
                  &lt;li @click="usetTest(2)"&gt;2号用户&lt;/li&gt;
                  &lt;li @click="usetTest(3)"&gt;3号用户&lt;/li&gt;
                  &lt;li @click="usetTest(4)"&gt;4号用户&lt;/li&gt;
                &lt;/ul&gt;
              &lt;/zoom-userinfo&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  userinfoOp: {
                    title: '1号用户',
                    icon: 'icon-user',
                    img: require('./static/1.jpg')
                  }
                }
              }
            }
          &lt;/script&gt;`,
      userinfoCode: `&lt;zoom-userinfo&gt;&lt;/zoom-userinfo&gt;`
    }
  },
  methods: {
    usetTest(num) {
      let data = {
        title: num + '号用户',
        img: require(`./static/${num}.jpg`)
      }
      this.$refs['user'].load(data);
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-userinfo {
  .data-drop {
    ::v-deep .content-active {
      min-height: 150px;
    }
  }
  .basic {
    ::v-deep .content-active {
      min-height: 100px;
    }
  }
}
</style>
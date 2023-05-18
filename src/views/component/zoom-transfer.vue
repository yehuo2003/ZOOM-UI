<template>
  <div class="custom-zoom-transfer">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供的穿梭框组件, 主要是以表格形式渲染<br>
      组件可以配置自定义数据, 并且实现全选/取消<br>
      此外组件还自带了搜索功能, 方便用户快速检索数据
    </div>
    <tab-template :code="transferCode">
      <zoom-transfer :op="transferOp"></zoom-transfer>
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
              title: "配置表头数据",
              name: "title",
              type: "Array",
              text: "表头数据为数组对象形式, 配置的表头数据里对象key值需要和表主体的值对应才能成功渲染",
              text2: '用法: 配置op属性, 设置<span>title: []</span>'
            },
            {
              id: 2,
              title: "获取选中数据",
              name: "data",
              type: "Array",
              text: "获取当前选中的数据",
              text2: '用法: 标签中绑定ref, <span> this.$refs[表格].list</span>可获取当前选中的数据'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "设置/加载表格数据",
              name: "load",
              type: "Function",
              text: "可以动态设置/加载表格数据, 设置后会清空之前选中的数据",
              text2: '用法: 标签中绑定ref, <span> this.$refs[表格].load(数据)</span>可动态渲染'
            }
          ]
        }
      ],
      transferOp: {
        title: [
          {fieId: 'name', header: '公司名称'},
          {fieId: 'area', header: '区域'},
          {fieId: 'province', header: '省份'},
          {fieId: 'city', header: '城市'}
        ],
        data: [
          {name: 'a公司', area: '华中区', province: '广东省', city: '广州市'},
          {name: 'f公司', area: '华东区', province: '福建省', city: '福州市'},
          {name: 'c公司', area: '华中区', province: '广东省', city: '中山市'},
          {name: 'd公司', area: '华东区', province: '福建省', city: '三明市'},
          {name: 'g公司', area: '华北区', province: '河北省', city: '邯郸市'},
          {name: 'e公司', area: '华东区', province: '福建省', city: '厦门市'},
          {name: 'b公司', area: '华中区', province: '广东省', city: '深圳市'},
          {name: 'h公司', area: '华北区', province: '河北省', city: '石家庄'}
        ]
      },
      transferCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-transfer :op="transferOp"&gt;&lt;/zoom-transfer&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            export default {
              data() {
                return {
                  transferOp: {
                    title: [
                      {fieId: 'name', header: '公司名称'},
                      {fieId: 'area', header: '区域'},
                      {fieId: 'province', header: '省份'},
                      {fieId: 'city', header: '城市'}
                    ],
                    data: [
                      {name: 'a公司', area: '华中区', province: '广东省', city: '广州市'},
                      {name: 'f公司', area: '华东区', province: '福建省', city: '福州市'},
                      {name: 'c公司', area: '华中区', province: '广东省', city: '中山市'},
                      {name: 'd公司', area: '华东区', province: '福建省', city: '三明市'},
                      {name: 'g公司', area: '华北区', province: '河北省', city: '邯郸市'},
                      {name: 'e公司', area: '华东区', province: '福建省', city: '厦门市'},
                      {name: 'b公司', area: '华中区', province: '广东省', city: '深圳市'},
                      {name: 'h公司', area: '华北区', province: '河北省', city: '石家庄'}
                    ]
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-transfer {
  .basic {
    ::v-deep .content-active {
      min-height: 180px;
    }
  }
}
</style>
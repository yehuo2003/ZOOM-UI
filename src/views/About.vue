<template>
  <div class="about">
    <zoom-nav-menu :op="navOp"></zoom-nav-menu>
    <!--<zoom-tag ref="tag" :op="tagOp"></zoom-tag> -->
    <!-- <zoom-grid ref="grid" :op="gridOp"></zoom-grid> -->
    <!-- <zoom-testing ref="test" :op="testOp"></zoom-testing> -->
    <!-- <zoom-pubu></zoom-pubu>
    <zoom-button @click.native="handleClick">测试按钮</zoom-button> -->
    <!-- <zoom-alert ref="msg"></zoom-alert> -->
    <!-- <h1 id="title">晚上好</h1>
    <div class="p-con">
      <p>111</p>
      <p>222</p>
      <p>333</p>
      <p class="p4">444</p>
    </div> -->
    <zoom-tabs>
      <zoom-tab-item title="组件1">
        组件1
      </zoom-tab-item>
      <zoom-tab-item title="组件2">
        组件2
      </zoom-tab-item>
    </zoom-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagOp: {
        addTag: true,
        title: '添加',
        addType: 'danger',
        data: [
          {title: 'javascript', type: 'success', active: true},
          {title: 'Python', type: 'warning'},
          {title: 'Java', type: 'danger'},
          {title: 'PHP', type: 'info'}
        ]
      },
      navOp: {
        data: [
          {title: '首页', url: ''},
          {title: '商品详情', url: '', children: [
            {title: '评论', children: [
              {title: '小明'},
              {title: '小红'},
              {title: '小兰'},
            ]},
            {title: '图片'},
            {title: '销量'},
          ]},
          {title: '最新商品', url: '#/shop'},
          {title: '火热潮款', url: '#/home', target: 'blank'},
          {title: '冬季爆款', url: ''},
        ]
      },
      testOp: {
        id: 'test666',
        pool: '的方式发生的范德萨发生的方法规范的格式共和国凤凰家园如一日同年级和成本',
        hideText: true
      },
      pageOp: {
        pageVal: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      },
      gridOp: {
        onClick: (dom, ele, col) => {
          console.log(dom, ele, col);
        },
        tip: true,
        title: [
          {
            fieId: '',
            header: '',
            width: 30,
            sort: true
          },
          {
            fieId: 'operation',
            header: '操作',
            btns: [
              {
                title: '关闭',
                css: {
                  icon: 'icon-close'
                },
                onClick: val => {
                  console.log('点击的当前行是:', val);
                }
              },
              {
                title: '减少',
                css: {
                  icon: 'icon-jian'
                },
                onClick: val => {
                  console.log('点击的当前行是jian:', val);
                }
              }
            ],
            width: 30
          },
          {
            fieId: 'userName',
            header: '用户名',
            width: 120
          },
          {
            fieId: 'fullName',
            header: '中文名',
            sort: true,
            width: 80
          },
          {
            fieId: 'userEmail',
            header: '电子邮箱',
            tip: true,
            width: 80
          },
          {
            fieId: 'role',
            header: '权限',
            width: 60
          },
          {
            fieId: 'phone',
            header: '电话',
            width: 80
          },
          {
            fieId: 'addr',
            header: '联系地址',
            width: 200
          },
          {
            fieId: 'createDate',
            header: '创建时间',
            tip: true,
            width: 200
          },
        ],
        datas: [],
        beforeLoad: () => {
          // this.handleClick();
        },
        pagerOp: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      }
    }
  },
  mounted() {
    // $('p').addClass('blue');

    // $('.p4').setText('666666666666');
    // $('div').find('p').eq(1).setText(66666666666).addClass('blue');
    // let title = $Z('.p-con');
    // console.log(title,'sss');

  },
  methods: {
    handleClick() {
      // this.$refs['msg'].alert('6666')
      //  let code = this.$refs['test'].testCode;
      //  console.log(code);
      // let data = [
      //       {userName: 'Tom', fullName: '汤姆', userEmail: 'Tom@qq.com', role: '游客', phone: '12345678901', addr: '联系地址', createDate: '2019-11-11'},
      //       {userName: 'Jerry', fullName: '杰瑞', userEmail: 'Jerry@qq.com', role: 'VIP1', phone: '138445156166', addr: '联系地址', createDate: '2019-11-12'},
      //       {userName: 'dingding', fullName: '钉钉', userEmail: 'dingding@qq.com', role: 'VIP2', phone: '15415163154', addr: '联系地址', createDate: '2019-11-13'},
      //       {userName: 'Lin', fullName: '林主明', userEmail: 'linzhuming@qq.com', role: 'BOSS', phone: '13666990716', addr: '联系地址', createDate: '2019-10-11'},
      //       {userName: 'yangmi', fullName: '杨幂', userEmail: 'yangmi@qq.com', role: 'VIP6', phone: '13906080567', addr: '联系地址', createDate: '2019-11-15'},
      //       {userName: 'renzhengfei', fullName: '阿飞', userEmail: 'renzhengfei@qq.com', role: 'BOSS', phone: '15115156748', addr: '联系地址', createDate: '2018-11-11'}
      //   ]
      //   this.$refs['grid'].load(data);
      // console.log(this.$refs['tag'].tagList, 'tagList');
    }
  }
}
</script>
<style>
.blue {
  color: blue;
}
</style>
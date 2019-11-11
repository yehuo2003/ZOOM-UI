<template>
  <div class="about">
    <zoom-grid :op="gridOp"></zoom-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageOp: {
        pageVal: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      },
      gridOp: {
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
            width: 200
          },
        ],
        datas: [
            {userName: 'Tom', fullName: '汤姆', userEmail: 'Tom@qq.com', role: '游客', phone: '12345678901', addr: '联系地址', createDate: '2019-11-11'},
            {userName: 'Jerry', fullName: '杰瑞', userEmail: 'Jerry@qq.com', role: 'VIP1', phone: '138445156166', addr: '联系地址', createDate: '2019-11-12'},
            {userName: 'dingding', fullName: '钉钉', userEmail: 'dingding@qq.com', role: 'VIP2', phone: '15415163154', addr: '联系地址', createDate: '2019-11-13'},
            {userName: 'Lin', fullName: '林主明', userEmail: 'linzhuming@qq.com', role: 'BOSS', phone: '13666990716', addr: '联系地址', createDate: '2019-10-11'},
            {userName: 'yangmi', fullName: '杨幂', userEmail: 'yangmi@qq.com', role: 'VIP6', phone: '13906080567', addr: '联系地址', createDate: '2019-11-15'},
            {userName: 'renzhengfei', fullName: '阿飞', userEmail: 'renzhengfei@qq.com', role: 'BOSS', phone: '15115156748', addr: '联系地址', createDate: '2018-11-11'}
        ],
        pagerOp: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      }
    }
  }
}
</script>
<style>

</style>
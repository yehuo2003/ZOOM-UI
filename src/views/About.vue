<template>
  <div class="about">
    <zoom-grid :op="gridOp"></zoom-grid>
    <zoom-pager :op="pageOp"></zoom-pager>
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
        data: [
          {
            fieId: '',
            header: '',
            width: 30
          },
          {
            fieId: 'operation',
            header: '操作',
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
        ]
      }
    }
  }
}
</script>
<style>

</style>
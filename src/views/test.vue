<template>
  <div>
    <zoom-pager :op="miniOp"></zoom-pager>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        miniOp: {
        mode: 'mini',
          pageVal: {
            total: 100,	// 总条数
            curPage: 1,	// 展示的当前页
            pageSize: 20	// 每页要展示多少条数据
          }
        }
      }
    }
  }
</script>
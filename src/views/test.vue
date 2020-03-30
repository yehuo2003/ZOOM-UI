<template>
  <div>
    <zoom-logout :op="logoutOp"></zoom-logout>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        logoutOp: {
          url: '/',  //  注销后要跳转的url
          point: true,  //  是否需要提示
          onClick: () => {
            console.log('注销');
          }, //  点击事件
          text: '注销登录'  //  文字内容, 默认为注销
        }
      }
    }
  }
</script>
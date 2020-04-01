<template>
  <div>
    <div>
      <p class="p1">111</p>
      <p class="p-con">222</p>
      <p>333</p>
      <p class="p4">444</p>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      $('.p1').addClass('blue');
      $('.p4').setText('666666666666');
      $('div').find('p').eq(1).setText(66666666666).addClass('blue');
      let title = $Z('.p-con');
      console.log(title,'sss');
    }
  }
</script>
<style>
.blue {
  color: blue !important;
}
</style>
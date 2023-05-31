<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-31 23:30:04
-->
<template>
  <div class="date-format">
    <h2>dateFormat</h2>
    <div class="tip">
      <text-template code="zoom-ui封装的日期时间格式化组件, 用户可以自定义要格式化的时间格式" />
    </div>
    <h3>{{ $zoom.$t('使用方法') }}</h3>
    <text-template code="通过 *this.$zoom.dateformat('自定义格式化', 时间对象)* 方法调用" />
    <custom-code :html="format"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      format:
        `let date = 1585735759701;
          this.$zoom.dateFormat("YYYY-mm-dd HH:MM", date);  //  2020-04-01 18:09`
    };
  }
};
</script>
<style lang="scss" scoped>
.date-format {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="date-format">
    <h1>日期格式化</h1>
    <h2>dateformat</h2>
    <div class="tip">
      zoom-ui封装的日期时间格式化组件, 用户可以自定义要格式化的时间格式
    </div>
    <h3>使用方法</h3>
    <p>通过<span>this.$zoom.dateformat("自定义格式化", 时间对象)</span>方法调用</p>
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
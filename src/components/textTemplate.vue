<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-05-30 22:29:16
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-30 22:55:52
-->
<template>
  <p v-html="html"></p>
</template>
<script>
export default {
  name: 'text-template',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      html: ''
    }
  },
  created () {
    const text = this.$zoom.$t(this.code);
    if (text) {
      const regex = /\*([^*]+)\*/g;
      const regex2 = /'([^']*)'/g;
      this.html = text.replace(regex, '<span>$1</span>').replace(regex2, "\"$1\"");
    }
  }
};
</script>
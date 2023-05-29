<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-29 22:49:57
-->
<template>
  <div class="zoom-code">
    <div
      v-highlight
      v-html="customHtml"
    ></div>
    <i
      v-clipboard:copy="copyHtml"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="copy-code"
    >{{ $zoom.$t('复制') }}</i>
  </div>
</template>

<script>
export default {
  name: "custom-code",
  props: {
    html: {
      //  自定义代码片段
      type: String,
      default: null
    },
    cls: {
      //  自定义class
      type: String,
      default: null
    }
  },
  data() {
    return {
      customHtml: null,
      copyHtml: null
    };
  },
  created() {
    if (this.html) {
      this.customHtml = `
        <pre>
          <code ${this.cls ? "class=" + this.cls : ""}">
          ${this.html}
          </code>
        </pre>
      `;
      this.copyHtml = this.html.replace(/&lt;/g,"<").replace(/&gt;/g,">")
    }
  },
  methods: {
    // 复制成功
    onCopy(e) {
      this.$zoom.alert({
        type: 'success',
        content: '复制成功'
      })
    },
    // 复制失败
    onError(e) {
      this.$zoom.alert({
        type: 'danger',
        content: '复制失败'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.zoom-code {
  position: relative;
  .copy-code {
    pointer-events: auto;
    display: block;
    position: absolute;
    right: 0;
    top: 20px;
    color: #ccc;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: #fff;
    }
  }
}
</style>

<template>
  <div
    v-highlight
    v-clipboard:copy="copyHtml"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"
    v-html="customHtml"
    class="zoom-code"
    zoom-label="复制"
  ></div>
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
  &::after {
    content: attr(zoom-label);
    pointer-events: auto;
    display: block;
    position: absolute;
    right: 0;
    top: 20px;
    color: #ccc;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
  }
  &:hover {
    &::after {
      color: #fff;
    }
  }
}
</style>

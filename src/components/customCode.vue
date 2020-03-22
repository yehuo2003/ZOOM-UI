<template>
  <div v-highlight v-html="customHtml" class="zoom-code" zoom-label="复制" @click="handleClick">
  </div>
</template>

<script>
export default {
  name: 'custom-code',
  props: {
    html: { //  自定义代码片段
      type: String,
      default: null
    },
    cls: {  //  自定义class
      type: String,
      default: null
    }
  },
  data() {
    return {
      customHtml: null
    }
  },
  created() {
    if (this.html) {
      this.customHtml = `
        <pre>
          <code ${this.cls ? 'class=' + this.cls : ''}">
          ${this.html}
          </code>
        </pre>
      `
    }
  },
  methods: {
    handleClick() {
      console.log(666);
    }
  }
};
</script>
<style lang="scss" scoped>
.zoom-code {
  position: relative;
  pointer-events: none;
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

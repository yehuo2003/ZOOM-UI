<script>
export default {
  name: "zoom-tabs-content",
  props: {
    active: [String, Boolean],
    border: [Boolean],
    panels: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  render(h) {
    const contents = this.panels[0].$slots.default;
    return h(
      "div",
      {
        class: ["zoom-tabs-content", this.active ? 'content-active' : '', this.border ? 'is-border' : '']
      },
      contents
    );
  }
};
</script>

<style>
.zoom-tabs-content {
  position: relative;
  padding: 15px 24px;
  overflow: hidden;
  display: none;
}
.zoom-tabs-content.content-active {
  display: block;
}
.zoom-tabs-content.content-active.is-border {
  border: 1px solid #d9d9d9;
}
</style>
<script>
export default {
  name: "zoom-tabs-content",
  props: {
    panels: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  render(h) {
    const contents = this.panels.map(tab => {
      return tab.active ? tab.$slots.default : null;
    });
    return h(
      "div",
      {
        class: "zoom-tabs-content"
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
}
</style>
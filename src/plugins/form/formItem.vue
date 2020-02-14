<script>
export default {
  name: "zoom-form-item",
  props: {
    content: {
      type: String,
      default: ""
    },
    inline: {
      type: [String, Boolean],
      default: null
    },
    label: {
      type: String,
      default: ""
    }
  },
  render(h) {
    const labels =
      this.$slots.label ||
      h(
        "label",
        {
          class: "form-item-label",
          style: "width: " + this.$parent.labelWidth + ";"
        },
        this.label
      );
    const slot = this.$slots.content;
    return h(
      "div",
      {
        class: ["zoom-form-item", this.inline ? "form-item-inline" : ""]
      },
      [labels, slot]
    );
  }
};
</script>
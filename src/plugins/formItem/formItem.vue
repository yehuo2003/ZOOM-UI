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
    require: {
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
    const slot = this.$slots.default;
    return h(
      "div",
      {
        class: [
          "zoom-form-item",
          this.inline ? "form-item-inline" : "",
          this.require ? "is-require" : ""
        ]
      },
      [labels, slot]
    );
  }
};
</script>
<style>
.zoom-form-item {
  margin: 0 0 12px;
}
.zoom-form-item>.form-item-label {
  color: #333;
  text-align: right;
  vertical-align: middle;
  line-height: 30px;
  float: left;
  padding: 0 8px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-break: break-all;
  font-weight: 400;
  margin: 0;
}
.zoom-form-item::after,
.zoom-form-item::before {
  content: "";
  display: table;
}
.zoom-form.form-inline>.zoom-form-item,
.zoom-form>.form-item-inline {
  margin-right: 10px;
  display: inline-block;
  vertical-align: top;
}
.zoom-form.form-inline>.form-item-label,
.zoom-form>.form-item-inline .form-item-label {
  float: none;
  display: inline-block;
}
.is-require>label.form-item-label::before {
  content: "*";
  color: #f5222d;
  margin-right: 4px;
}
.zoom-form.form-align-left>.zoom-form-item > .form-item-label {
  text-align: left;
}
.zoom-form.form-align-right>.zoom-form-item > .form-item-label {
  text-align: right;
}
.zoom-form.form-align-center>.zoom-form-item > .form-item-label {
  text-align: center;
}
</style>
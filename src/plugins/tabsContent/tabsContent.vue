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
  -webkit-animation-name: tabs-content;
  animation-name: tabs-content;
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
.zoom-tabs-content.content-active {
  display: block;
}
.zoom-tabs-content.content-active.is-border {
  border: 1px solid #d9d9d9;
}

@-webkit-keyframes tabs-content {
  from {
    opacity: 0;
    -webkit-transform: translateY(33%);
            transform: translateY(33%);
  }
  to {
    opacity: 1;
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
  }
}
</style>
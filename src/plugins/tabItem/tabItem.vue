<script>
export default {
  name: "zoom-tab-item",
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String
    }
  },
  mounted() {
    this.$parent.panels.push([this]);
  },
  render(h) {
    const tab = this.$slots.label || h("span", this.label); // 如果用name=label的slot,则用slot,否则展示label prop
    return h(
      "li",
      {
        class: this.classes,
        on: {
          click: () => {
            this.activeCurTab();
          }
        }
      },
      [tab]
    );
  },
  computed: {
    active() {
      return this.index === this.$parent.value;
    },
    classes() {
      return ["zoom-tab-item", this.active ? "tab-active" : ""];
    }
  },
  methods: {
    activeCurTab() {
      this.$parent.tabChange(this.index);
    }
  }
};
</script>

<style>
.zoom-tab-item .zoom-icon {
  position: relative;
  font-size: 12px;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  line-height: 15px;
  overflow: hidden;
  top: -1px;
  right: -2px;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
.zoom-tab-item:last-child {
  border-right: 1px solid #d9d9d9;
}
.zoom-tab-item {
  padding: 0 24px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid #d9d9d9;
  border-right: none;
  border-bottom: none;
  top: 1px;
  z-index: 9;
  -webkit-transition: color 0.3s cubic-bezier(645, 0.045, 0.355, 1),
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.3s cubic-bezier(645, 0.045, 0.355, 1),
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.zoom-tab-item.tab-active::before {
  position: absolute;
  content: "";
  width: calc(100% + 1px);
  height: 3px;
  left: -1px;
  background: #1890ff;
}
.zoom-tab-item.tab-active {
  border-bottom: 1px solid #fff;
  border-top: 0;
  color: #1890ff;
}
</style>
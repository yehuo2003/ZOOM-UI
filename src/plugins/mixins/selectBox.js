export default {
  props: {
    op: {
      type: Object,
      name: String,
      data: Array,
      Bool: Boolean,
      disabled: Boolean
    }
  },
  data() {
    return {
      active: false,
      disabled: false,
      list: [],
      name: ""
    };
  },
  created() {
    this.reset();
  },
  methods: {
    /**
     * zoom-form组件可以直接调用此功能重置表单
     */
    reset() {
      if (this.op) {
        if (this.op.name) {
          this.name = this.op.name;
        }
        if (this.op.data) {
          this.each(this.op.data);
        }
        if (this.op.disabled) {
          this.disabled = !!this.op.disabled;
        }
      }
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.disabled = status;
    },
    //   动态加载数据
    load(data) {
      if (data) {
        this.each(data);
      }
    }
  }
}
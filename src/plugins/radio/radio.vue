<template>
  <span class="zoom-radio">
    <label
      v-for="(item, index) of list"
      :key="index"
      @click.prevent="handleClick(item, 'click')"
      :disabled="disabled"
      class="radio-item"
    >
      <i class="zoom-icon" :class="item.checked ? 'icon-radio-fill' : 'icon-success-box'"></i>
      <input v-show="false" type="radio" :value="item.value" :name="name" :disabled="disabled" />
      {{item.text}}
    </label>
  </span>
</template>
<script>
export default {
  name: "zoom-radio",
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
          let list = [];
          this.op.data.forEach(item => {
            if (!item.checked) {
              item.checked = false;
            } else {
              item.checked = true;
              if (this.op.Bool) {
                this.$emit("input", item.checked);
              } else {
                this.$emit("input", item.value);
              }
            }
            list.push(item);
          });
          this.list = this.$zoom.clone(list);
        }
        if (this.op.disabled) {
          this.disabled = !!this.op.disabled;
        }
      }
    },
    load(data) {
      if (data) {
        let list = [];
        data.forEach(item => {
          if (!item.checked) {
            item.checked = false;
          } else {
            item.checked = true;
            if (this.op.Bool) {
              this.$emit("input", item.checked);
            } else {
              this.$emit("input", item.value);
            }
          }
          list.push(item);
        });
        this.list = this.$zoom.clone(list);
      }
    },
    sendVal(item) {
      let res = "";
      this.list.forEach(elem => {
        elem.checked = false;
      });
      item.checked = true;
      res = item.value;
      //   如果选择Bool模式,则返回布尔值
      if (this.op.Bool) {
        this.$emit("input", item.checked);
      } else {
        this.$emit("input", res);
      }
    },
    handleClick(item, e) {
      if (!this.disabled) {
        this.$emit(e);
        this.sendVal(item);
      }
    }
  }
};
</script>
<style>
.zoom-radio .radio-item:first-child {
  margin-left: 5px;
}
.zoom-radio .radio-item {
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
}
.zoom-radio .radio-item[disabled],
.zoom-radio .radio-item[disabled]:hover,
.zoom-radio .radio-item[disabled]:focus,
.zoom-radio .radio-item[disabled]:active,
.zoom-radio .radio-item[disabled] i.zoom-icon,
.zoom-radio .radio-item[disabled] i.zoom-icon:hover,
.zoom-radio .radio-item[disabled] i.zoom-icon:focus,
.zoom-radio .radio-item[disabled] i.zoom-icon:active {
  color: #d9d9d9;
  cursor: no-drop;
}

.zoom-radio .radio-item i.zoom-icon:active,
.zoom-radio .radio-item i.zoom-icon:focus {
  color: #096dd9;
}
.zoom-radio .radio-item i.zoom-icon:hover {
  color: #40a9ff;
}

.zoom-radio .radio-item i.icon-radio-fill {
  color: #1890ff;
}
.zoom-radio .radio-item i.icon-success-box {
  color: #d9d9d9;
}
</style>
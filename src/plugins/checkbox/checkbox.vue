<template>
  <span class="zoom-checkbox">
    <label
      v-for="(item, index) of list"
      :key="index"
      @click.prevent="handleClick(item, 'click')"
      :disabled="isdisabled"
      class="checkbox-item"
    >
      <i class="zoom-icon" :class="item.checked ? 'icon-checkbox-fill' : 'icon-checkbox'"></i>
      {{item.text}}
      <slot></slot>
    </label>
  </span>
</template>
<script>
export default {
  name: "zoom-checkbox",
  props: {
    op: {
      type: Object,
      name: String,
      data: Array,
      Bool: Boolean,
      isdisabled: Boolean
    }
  },
  data() {
    return {
      active: false,
      isdisabled: false,
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
            // 判断是否设置了默认项
            if (!item.checked) {
              item.checked = false;
            } else {
              item.checked = true;
            }
            list.push(item);
          });
          this.list = this.$zoom.clone(list);
          this.sendVal();
        }
        if (this.op.isdisabled) {
          this.isdisabled = !!this.op.isdisabled;
        }
      }
    },
    //   动态加载数据
    load(data) {
      if (data) {
        let list = [];
        data.forEach(item => {
          if (!item.checked) {
            item.checked = false;
          } else {
            item.checked = true;
          }
          list.push(item);
        });
        this.list = this.$zoom.clone(list);
        this.sendVal();
      }
    },
    sendVal() {
      let list = [];
      let Bool = false;
      this.list.forEach(item => {
        if (item.checked) {
          list.push(item.value);
          Bool = true;
        }
      });
      //   如果选择Bool模式,则返回布尔值
      if (this.op.Bool) {
        this.$emit("input", Bool);
      } else {
        this.$emit("input", list);
      }
    },
    handleClick(item, e) {
      if (!this.isdisabled) {
        this.$emit(e);
        item.checked = !item.checked;
        this.sendVal();
      }
    }
  }
};
</script>
<style>
.zoom-checkbox .checkbox-item:first-child {
  margin-left: 5px;
}
.zoom-checkbox .checkbox-item {
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
}
.zoom-checkbox .checkbox-item[disabled],
.zoom-checkbox .checkbox-item[disabled]:hover,
.zoom-checkbox .checkbox-item[disabled]:focus,
.zoom-checkbox .checkbox-item[disabled]:active,
.zoom-checkbox .checkbox-item[disabled] i.zoom-icon,
.zoom-checkbox .checkbox-item[disabled] i.zoom-icon:hover,
.zoom-checkbox .checkbox-item[disabled] i.zoom-icon:focus,
.zoom-checkbox .checkbox-item[disabled] i.zoom-icon:active {
  color: #d9d9d9;
  cursor: no-drop;
}
.zoom-checkbox .checkbox-item i.zoom-icon:active,
.zoom-checkbox .checkbox-item i.zoom-icon:focus {
  color: #096dd9;
}
.zoom-checkbox .checkbox-item i.zoom-icon:hover {
  color: #40a9ff;
}
.zoom-checkbox .checkbox-item i.icon-checkbox-fill {
  color: #1890ff;
}
.zoom-checkbox .checkbox-item i.icon-checkbox {
  color: #d9d9d9;
}
</style>
<template>
  <span
    :class="status ? 'switch-active' : '' "
    @click="openSwitch"
    :disabled="isdisabled"
    class="zoom-switch"
  >
    <span class="switch-inner">
      <div>{{text}}</div>
    </span>
  </span>
</template>
<script>
export default {
  name: "zoom-switch",
  props: {
    op: {
      type: Object,
      isdisabled: {
        type: Boolean,
        default: false
      },
      open: {
        type: String,
        default: "ON"
      },
      close: {
        type: String,
        default: "close"
      }
    },
    open: {
      type: String,
      default: "ON"
    },
    close: {
      type: String,
      default: "close"
    }
  },
  data() {
    return {
      status: false,
      OPEN: "ON",
      CLOSE: "OFF",
      text: "OFF",
      isdisabled: false
    };
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      if (this.op) {
        if (this.op.isdisabled) {
          this.isdisabled = this.op.isdisabled;
        }
        this.OPEN = this.op.open;
        this.CLOSE = this.op.close;
        if (this.op.status === "open") {
          this.status = true;
        } else {
          this.status = false;
        }
      } else {
        this.OPEN = this.open;
        this.CLOSE = this.close;
      }
      this.text = this.OPEN;
    },
    openSwitch() {
      if (this.isdisabled) {
        return;
      }
      if (this.op && this.op.beforeClick) {
        this.op.beforeClick(this.status);
      }
      this.status = !this.status;
      if (this.status) {
        this.text = this.OPEN;
      } else {
        this.text = this.CLOSE;
      }
      this.$emit("change", this.status);
      if (this.op && this.op.afterClick) {
        this.op.afterClick(this.status);
      }
    }
  }
};
</script>
<style>
.zoom-switch[disabled] {
  background: #9d9d9d !important;
  border-color: #9d9d9d !important;
  cursor: not-allowed;
}
.zoom-switch.switch-active .switch-inner {
  left: 7px;
}
.zoom-switch.switch-active::after {
  left: calc(100% - 19px);
}
.zoom-switch.switch-active {
  border-color: #1890ff;
  background: #1890ff;
}
.zoom-switch::after {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 20px;
  background: #ffffff;
  position: absolute;
  left: 1px;
  top: 1px;
  cursor: pointer;
  -webkit-transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
  transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
}
.zoom-switch {
  display: inline-block;
  width: 50px;
  height: 22px;
  line-height: 22px;
  border-radius: 24px;
  vertical-align: middle;
  border: 1px solid #bfbfbf;
  background: #bfbfbf;
  position: relative;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.zoom-switch .switch-inner {
  color: #fff;
  font-size: 12px;
  position: absolute;
  left: 21px;
  top: -1px;
}
</style>
<template>
  <li :index="index" @click="activeCurTab" :class="classes">
    <slot v-if="$slots.label" name="label"></slot>
    <span v-else v-html="label"></span>
  </li>
</template>
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
  // render(h) {
  //   const tab = this.$slots.label || h("span", this.label); // 如果用name=label的slot,则用slot,否则展示label prop
  //   return h(
  //     "li",
  //     {
  //       class: this.classes,
  //       on: {
  //         click: () => {
  //           this.activeCurTab();
  //         }
  //       }
  //     },
  //     [tab]
  //   );
  // },
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
  -webkit-transition: color 0.3s cubic-bezier(645, 0.045, 0.355, 1),
  padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.3s cubic-bezier(645, 0.045, 0.355, 1),
  padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  display: inline-block;
  white-space: nowrap;
  border-bottom: none;
  position: relative;
  border-right: none;
  line-height: 40px;
  list-style: none;
  font-weight: 500;
  padding: 0 24px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  height: 40px;
  top: 1px;
  z-index: 9;
}
.zoom-tab-item.tab-active::before {
  position: absolute;
  content: "";
  width: calc(100% + 1px);
  height: 3px;
  left: -1px;
  background: #1890ff;
  -webkit-animation-name: tabitem;
  animation-name: tabitem;
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-duration: .3s;
  animation-duration: .3s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
.zoom-tab-item.tab-active {
  border-bottom: 1px solid #fff;
  border-top: 0;
  color: #1890ff;
  -webkit-animation-name: tabactive;
  animation-name: tabactive;
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

@-webkit-keyframes tabitem {
  from {
    width: 0;
  }
  to {
    width: calc(100% + 1px);
  }
}
@-webkit-keyframes tabactive {
  from {
    color: #333;
    -webkit-transform: rotateY(-180deg);
            transform: rotateY(-180deg);
  }
  to {
    color: #1890ff;
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
  }
}
</style>
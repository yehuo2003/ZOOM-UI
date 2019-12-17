<template>
  <div :class="toggle ? 'zoom-float-toggle' : 'zoom-float-suspended' " :style=" left ? 'left: 5px;' : 'right: 5px;' " class="zoom-float-bar">
      <div v-if="toggle" :class=" fix ? 'fix' : '' " class="float-content">
          <div @click="fixClick" class="float-lock">
              <span class="zoom-icon icon-lock"></span>
          </div>
          <slot></slot>
      </div>
      <ul v-else>
          <li v-for="(item, index) of toolList" :key="index" @click="handleClick(item, index)">
              <span v-show="item.icon" :class="item.icon" class="zoom-icon"></span>
              <a :href="item.url ? item.url : 'javascript: void(0);' " :target="item.target === 'blank' ? '_blank' : '' ">{{item.text}}</a>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "zoom-floatbar",
  props: {
      op: {
          type: Object,
          data: Array,  //  如果有配置data则展示列表数据, 否则显示自定义内容
          left: Boolean //  为true显示在左边
      }
  },
  data() {
      return {
          toolList: [],
          left: false,  //  为true靠左
          toggle: true, //  模式切换
          fix: false    //  是否固定
      }
  },
  created() {
      if (this.op) {
          if (this.op.data && this.op.data.length > 0) {
            //   如果配置了data 就隐藏自定义内容
            this.toggle = false;
            this.toolList = this.op.data;
          } else {
            this.toggle = true;
            this.toolList = [];
          }
          if (this.op.left) {
              this.left = true;
          } else {
              this.left = false;
          }
      }
  },
  methods: {
    //   动态设置属性
      load(data) {
          if (data && data.length) {
              this.toggle = false;
              this.toolList = data;
          } else {
              this.toggle = true;
          }
      },
      handleClick(item, index) {
          let value = JSON.parse(JSON.stringify(item));
          if (item.onClick) {
              delete value.onClick;
              item.onClick(value, index);
          }
      },
      fixClick() {
          this.fix = !this.fix;
      }
  }
};
</script>
<style>
.zoom-float-bar .float-content.fix .float-lock {
    color: #333;
}
.zoom-float-bar .float-content .float-lock {
    position: absolute;
    cursor: pointer;
    color: orange;
    top: 5px;
    right: 5px;
}
.zoom-float-bar:hover .float-content.fix {
    display: block;
}
.zoom-float-bar .float-content.fix {
    display: none;
    transition: all .5s ease;
}
.zoom-float-bar .float-content {
    background: #fff;
    position: relative;
    padding: 10px 20px;
}
.zoom-float-bar {
    font-size: 14px;
    position: fixed;
    z-index: 9999;
    top: 50%;
    overflow: hidden;
    background: #fff;
}
.zoom-float-bar.zoom-float-toggle {
    border: 1px solid #aec1d2;
    border-right: 0;
    border-left: 10px solid #1f9ed8;
    border-radius: 5px 0 0 5px;
    min-height: 120px;
    -webkit-box-shadow: -3px 5px 15px 15px rgba(0, 0, 0, .1);
    box-shadow: -3px 5px 15px 15px rgba(0, 0, 0, .1);
}
.zoom-float-suspended ul li:hover a,
.zoom-float-suspended ul li:hover span.zoom-icon {
    color: #1890ff;
    cursor: pointer;
}
.zoom-float-suspended ul li span.zoom-icon {
    font-size: 25px;
}
.zoom-float-suspended ul li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #333;
    line-height: 30px;
    outline: 0;
}
.zoom-float-bar.zoom-float-suspended ul li {
    display: block;
    background: #fff;
    color: #333;
    min-width: 80px;
    text-align: center;
}
.zoom-float-bar.zoom-float-suspended {
    border: 1px solid #d9d9d9;
    -webkit-box-shadow: 2px 3px 7px rgba(0, 0, 0, .15);
    box-shadow: 2px 3px 7px rgba(0, 0, 0, .15);
    border-radius: 1px;
}
</style>
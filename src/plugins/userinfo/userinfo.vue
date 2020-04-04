<template>
  <div class="zoom-user-info">
    <div class="user-info-title">
      <img v-if="img" :src="img" :alt="title" />
      <i v-else :class=" icon ? icon : 'icon-user' " class="zoom-icon icon-user"></i>
      <span>{{title}}</span>
      <span class="zoom-icon icon-down"></span>
      <span class="zoom-icon icon-up"></span>
    </div>
    <div class="zoom-user-spread">
      <span v-if="Object.keys($slots).length === 0">{{$zoom.$t('grid.no_data')}}</span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-userinfo",
  props: {
    op: {
      type: Object,
      img: String, //  用户头像图片
      title: String, //  用户名
      icon: String //  自定义图标 和图片只允许存在一个 图片优先
    }
  },
  data() {
    return {
      img: "",
      icon: "",
      title: this.$zoom.$t('grid.no_data')
    };
  },
  created() {
    if (this.op) {
      if (this.op.img) {
        this.img = this.op.img;
      }
      if (this.op.title) {
        this.title = this.op.title;
      }
      if (this.op.icon) {
        this.icon = this.op.icon;
      }
    }
  },
  methods: {
    //   父组件动态设置属性
    load(data) {
      if (data) {
        if (data.img) {
          this.img = data.img;
        }
        if (data.title) {
          this.title = data.title;
        }
        if (data.icon) {
          this.icon = data.icon;
        }
      }
    }
  }
};
</script>
<style>
.zoom-user-info:hover {
  height: 50px;
}
.zoom-user-info:hover .user-info-title .icon-down {
  display: none;
}
.zoom-user-info:hover .zoom-user-spread,
.zoom-user-info:hover .user-info-title .icon-up {
  display: block;
  min-height: 30px;
}
.zoom-user-info .zoom-user-spread {
  margin-top: 5px;
  min-width: 200px;
  position: absolute;
  z-index: 9999;
  padding: 5px;
  height: auto;
  border: 1px solid #d9d9d9;
  display: none;
}
.zoom-user-info .user-info-title .icon-up,
.zoom-user-info .user-info-title .icon-down {
  float: right;
  padding-right: 5px;
  cursor: pointer;
}
.zoom-user-info .user-info-title .icon-up {
  display: none;
}
.zoom-user-info .user-info-title .icon-user,
.zoom-user-info .user-info-title img {
  border-radius: 50%;
  margin: 0 5px;
  width: 30px;
  height: 30px;
}
.zoom-user-info {
  position: relative;
  display: inline-block;
}
.zoom-user-info .user-info-title {
  display: inline-block;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
  min-width: 200px;
}
</style>
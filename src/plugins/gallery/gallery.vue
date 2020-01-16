<template>
  <div class="zoom-gallery">
    <div
      v-show="photos.length"
      :style=" zoom ? 'position: absolute;' : 'background-image: url(' + photos[activePhoto] + ');' "
      class="active-photo"
    >
      <button
        v-for="item of ['gallery-prev', 'gallery-next']"
        :key="item"
        @click="clickPhoto(item)"
        :class="item"
      ></button>
    </div>
    <zoom-photo v-show="zoom" :op="photoOp" ref="photo"></zoom-photo>
    <div class="gallery-thumbnails">
      <div
        v-for="(photo, index) in photos"
        :src="photo"
        :key="index"
        @click="changePhoto(index)"
        :class="{'active': activePhoto == index}"
        :style="'background-image: url(' + photo + ')'"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-gallery",
  props: {
    op: {
      type: Object,
      data: Array, //  图片以数组方式保存
      showZoom: {
        //  是否开启放大镜
        type: Boolean,
        default: false
      }
    }
  },
  data() {
    return {
      photos: [],
      zoom: false, //  是否开启放大镜
      photoOp: {
        lazyload: true
      },
      activePhoto: null
    };
  },
  mounted() {
    if (this.op) {
      if (this.op.showZoom) {
        this.zoom = true;
      } else {
        this.zoom = false;
      }
      if (this.op.data) {
        this.photos = this.op.data;
        this.changePhoto(0);
        this.$nextTick(() => {
          // 监听左右箭头事件
          window.addEventListener("keyup", this.keyUp, true);
        });
      }
    }
  },
  destroyed() {
    // 注销时候销毁
    window.removeEventListener("keyup", this.keyUp, true);
  },
  methods: {
    // 监听键盘事件
    keyUp() {
      if (event.which === 37) {
        this.clickPhoto("gallery-prev");
      }
      if (event.which === 39) {
        this.clickPhoto("gallery-next");
      }
    },
    // 切换图片
    changePhoto(index) {
      this.activePhoto = index;
      if (this.zoom) {
        this.$refs["photo"].url = this.photos[index];
      }
    },
    // 点击左右按钮事件
    clickPhoto(val) {
      if (val === "gallery-prev") {
        this.changePhoto(
          this.activePhoto - 1 >= 0
            ? this.activePhoto - 1
            : this.photos.length - 1
        );
      } else {
        this.changePhoto(
          this.activePhoto + 1 < this.photos.length ? this.activePhoto + 1 : 0
        );
      }
    }
  }
};
</script>
<style>
.zoom-gallery .active-photo {
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 65%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid #fff;
  position: relative;
}
.zoom-gallery .active-photo button {
  border: none;
  background-color: transparent;
  font-size: 32px;
  color: #fff;
  opacity: 0.5;
  position: absolute;
  outline: none;
  height: 100%;
}
.zoom-gallery .active-photo button:hover {
  opacity: 1;
}
.zoom-gallery .active-photo button.gallery-prev {
  cursor: pointer;
  z-index: 999;
  padding: 0 1em 0 0.7em;
  left: 0;
  background: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
}
.zoom-gallery .active-photo button.gallery-next {
  cursor: pointer;
  z-index: 999;
  padding: 0 0.7em 0 1em;
  right: 0;
  background: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
}
.zoom-gallery .gallery-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 5px;
}
.zoom-gallery .gallery-thumbnails div {
  width: 100%;
  border: 2px solid #fff;
  outline: 2px solid #fff;
  cursor: pointer;
  padding-bottom: 65%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
}
.zoom-gallery .gallery-thumbnails div:hover {
  opacity: 0.6;
}
.zoom-gallery .gallery-thumbnails div.active {
  outline-color: #5c4084;
  opacity: 1;
}
.zoom-gallery {
  position: relative;
}
</style>
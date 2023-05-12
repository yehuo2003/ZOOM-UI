<template>
  <div class="zoom-slider" ref="zoom-slider">
    <!-- <div class="slider-process" :style="[{width}, 'background: ' + color]"></div> -->
    <div class="slider-process" :style="{background: color, width}"></div>
    <div class="zoom-thunk" ref="zoom-thunk" :style="{left}">
      <div :style="{'border-color': color}" class="slider-block"></div>
      <div class="slider-tips">
        <span>{{ ( scale * 100 ).toFixed() }}%</span>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 */
export default {
  name: "zoom-slider",
  props: {
    color: String, //  颜色, 默认蓝色
    min: {
      //  最小值
      type: [Number, String],
      default: 0
    },
    max: {
      //  最大值
      type: [Number, String],
      default: 100
    },
    value: {
      //  当前值 v-model绑定
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: this.value || 0 //当前值
    };
  },
  //渲染到页面的时候
  mounted() {
    if (this.per > this.max) {
      this.per = null;
      throw new Error(
        // "zoom-ui Error: 当前值不能大于最大值! "
        `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('slider.msg')}`
      );
    }
    this.slider = this.$refs["zoom-slider"];
    this.thunk = this.$refs["zoom-thunk"];
    this.thunk.onmousedown = e => {
      let width = parseInt(this.width);
      let disX = e.clientX;
      document.onmousemove = e => {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width
        // 拖拽的时候获取的新width
        let newWidth = e.clientX - disX + width;
        // 拖拽的时候得到新的百分比
        let scale = newWidth / this.slider.offsetWidth;
        this.per = Math.ceil((this.max - this.min) * scale + this.min);
        this.per = Math.max(this.per, this.min);
        this.per = Math.min(this.per, this.max);
        // 返回给父组件
        this.$emit("input", this.per);
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
  },
  destroyed() {
    this.slider = null;
    this.thunk.onmousedown = null
    this.thunk = null;
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale() {
      return (this.per - this.min) / (this.max - this.min);
    },
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    }
  }
};
</script>
<style>
.zoom-slider {
  position: relative;
  margin: 20px 0;
  width: 400px;
  height: 10px;
  background: #e4e7ed;
  border-radius: 5px;
  cursor: pointer;
}
.zoom-slider .slider-process {
  position: absolute;
  left: 0;
  top: 0;
  width: 112px;
  height: 10px;
  border-radius: 5px;
  background: #409eff;
}
.zoom-slider .zoom-thunk {
  position: absolute;
  left: 100px;
  top: 0;
  transform: translateY(-25%);
  width: 20px;
  height: 20px;
}
.zoom-slider .slider-block {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #409eff;
  background: rgba(255, 255, 255, 1);
  transition: 0.5s all;
}
.zoom-slider .slider-tips {
  position: absolute;
  left: -7px;
  bottom: 30px;
  min-width: 15px;
  text-align: center;
  padding: 4px 8px;
  background: #999;
  border-radius: 5px;
  height: 24px;
  line-height: 1;
  color: #fff;
}
.zoom-slider .slider-tips i {
  position: absolute;
  margin-left: -5px;
  left: 50%;
  bottom: -9px;
  font-size: 16px;
  color: #000;
}
.zoom-slider .slider-block:hover {
  transform: scale(1.1);
}
</style>
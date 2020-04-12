<template>
  <div class="zoom-rate">
    <!-- 遮罩层 禁用状态使用 -->
    <div v-show="disabled" class="warp"></div>
    <input
      v-model="status"
      v-for="item of rateList"
      :key="item"
      type="radio"
      :name=" mode === 'stars' ? 'rate-star' : 'rate-face' "
      :value="item"
    />
  </div>
</template>
<script>
export default {
  name: "zoom-rate",
  props: {
    op: {
      type: Object,
      data: Array, //  绑定的评分内容, 数组形式
      mode: String, //  评分样式    目前只有星星和表情
      disabled: Boolean //   是否禁用
    }
  },
  data() {
    return {
      mode: "stars",
      disabled: false,
      rateList: [5, 4, 3, 2, 1],
      status: null
    };
  },
  watch: {
    status: function(newVal, oldValue) {
      this.$emit('input', newVal);
    }
  },
  created() {
    if (this.op) {
      if (this.op.data) {
        //   将父组件传来的数据反转
        this.rateList = this.op.data.reverse();
      }
      if (this.op.mode) {
        this.mode = this.op.mode;
      }
      if (this.op.disabled) {
        this.disabled = this.op.disabled;
      }
    }
  },
  methods: {
    load(data) {
      if (data) {
        this.rateList = data;
      }
    }
  }
};
</script>
<style>
/* 遮罩层 */
.zoom-rate .warp {
  position: absolute;
  float: left;
  width: 100%;
  height: 100%;
}
.zoom-rate > input {
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  float: right;
}
.zoom-rate {
  position: relative;
  float: left;
}
.zoom-rate input[name="rate-star"],
.zoom-rate input[name="rate-face"] {
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  transition: transform 0.3s ease;
  -webkit-transition: 0.3s ease;
}
.zoom-rate input[name="rate-star"]:checked,
.zoom-rate input[name="rate-star"]:hover,
.zoom-rate input[name="rate-star"]:checked::after,
.zoom-rate input[name="rate-star"]:hover::after,
.zoom-rate input[name="rate-star"]:checked ~ input[name="rate-star"]::after,
.zoom-rate input[name="rate-star"]:checked ~ input[name="rate-star"]::after,
.zoom-rate input[name="rate-star"]:hover ~ input[name="rate-star"]::after {
  content: "\E7B9";
  color: #ffa822;
}
.zoom-rate input[name="rate-face"]:checked,
.zoom-rate input[name="rate-face"]:hover,
.zoom-rate input[name="rate-face"]:checked::after,
.zoom-rate input[name="rate-face"]:hover::after,
.zoom-rate input[name="rate-face"]:checked ~ input[name="rate-face"]::after,
.zoom-rate input[name="rate-face"]:checked ~ input[name="rate-face"]::after,
.zoom-rate input[name="rate-face"]:hover ~ input[name="rate-face"]::after {
  content: "\e8ab";
  color: #ffa822;
}
.zoom-rate input[name="rate-star"]:hover,
.zoom-rate input[name="rate-face"]:hover {
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
}
.zoom-rate input[name="rate-star"],
.zoom-rate input[name="rate-face"] {
  font-family: "iconfont";
  font-size: 30px;
  padding: 5px;
}
.zoom-rate input[name="rate-star"]::after {
  content: "\E7BA";
  color: #999;
  -webkit-transition: color 0.4s ease;
  transition: color 0.4s ease;
}
.zoom-rate input[name="rate-face"]::after {
  content: "\e69c";
  color: #999;
  -webkit-transition: color 0.4s ease;
  transition: color 0.4s ease;
}
</style>
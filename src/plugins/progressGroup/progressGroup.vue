<template>
  <div class="zoom-progress-group">
    <div class="zoom-progress-container">
      <div class="text-progress">
        <span v-for="(item, index) of list" :key="index" :class="item.status" :style="setText(item.progress, index)">{{ item.text || setProgress(item.progress)}}</span>
      </div>
      <p style="width: 0" class="progress"></p>
    </div>
    <div v-for="(item, index) of reverseList" :key="index" class="zoom-progress-container">
      <p :class="item.status" :style="{ width : item.progress + '%' }" class="progress">
        <b v-show="inside">{{ item.text || setProgress(item.progress)}}</b>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-progress-group",
  props: {
    op: {
      type: Object,
      data: { //  进度条数据 [{text: 'danger 400', progress: 40, status: 'danger'}] text如果没有默认显示progress
        type: Array,
        default: []
      },
      inside: { // 数值是否显示在内部, 默认不显示
        type: Boolean,
        default: false
      }
    }
  },
  data() {
    return {
      list: [],
      inside: false,
      reverseList: []
    };
  },
  methods: {
    load(data) {
      // let data = [
      //   {progress: 40, status: 'danger'},
      //   {progress: 20, status: 'info'},
      //   {progress: 60, status: 'primary'},
      //   {progress: 30, status: 'warning'},
      //   {progress: 50, status: 'success'},
      // ]
      if (!data) {
        return
      }
      if (this.op && this.op.inside) {
        this.inside = this.op.inside;
      }
      // 文字从小到大排列, 进度条从大到小排列
      let list = data.sort( (a, b) => b.progress - a.progress);
      this.reverseList = this.$zoom.clone(list);
      this.list = list.reverse();
    },
    /**
     * 数据过滤
     */
    setProgress(val) {
      return val && val > 0 ? Math.floor(Number(val)) + '%' : '0%'
    },
    /**
     * 计算文字所在的位置
     */
    computedText(val) {
      let offset = 0;
      if (!val) {
        return 0
      } else if (val > 30) {
        offset = 50;
      } else if (val > 10) {
        offset = 35;
      } else if (val > 3) {
        offset = 30;
      } else if (val > 1 && val < 3) {
        offset = 10;
      }
      return `margin-left: calc(${val}% - ${offset}px)`
    },
    /**
     * 设置文字所在的位置
     */
    setText(val, index) {
      if (this.list[index - 1]) {
        return this.computedText(this.list[index].progress - this.list[index - 1].progress);
      } else {
        return this.computedText(this.list[index].progress);
      }
    },
  },
  created() {
    if (this.op && this.op.data) {
      this.load(this.op.data);
    }
  }
};
</script>
<style>
.zoom-progress-group .text-progress span {
  color: #1890ff;
}
.zoom-progress-group .text-progress span.info {
  color: #54657e;
}
.zoom-progress-group .text-progress span.success {
  color: #389e0d;
}
.zoom-progress-group .text-progress span.warning {
  color: #faad14;
}
.zoom-progress-group .text-progress span.danger {
  color: #cf1322;
}
.zoom-progress-group .text-progress span {
  transition: margin-left .5s ease-in-out;
  font-size: 14px;
}
.zoom-progress-group .text-progress {
  position: absolute;
  top: -25px;
  width: 100%;
}
.zoom-progress-group .zoom-progress-container:not(:first-child) {
  background: none;
}
.zoom-progress-group .zoom-progress-container {
  position: absolute;
  bottom: 0;
}
.zoom-progress-group {
  position: relative;
  height: 50px;
}
</style>
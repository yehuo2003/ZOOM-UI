<template>
    <div class="zoom-progress">
        <div class="zoom-progress-container">
            <p :class="status" :style="{ width : ValProgress + '%' }" class="progress">
                <b v-if="inside">{{ValProgress}}%</b>
            </p>
        </div>
        <span v-if="!inside" class="zoom-icon">{{ValProgress}}%</span>
    </div>
</template>
<script>
export default {
  name: "zoom-progress",
  props: {
      progress: Number,
      op: {
          status: String,   // 开始时候的状态
          planList: Array,
          automatic: {  //  有配置时可自动增长
              type: Object,
              endVal: Number,   // 结束时候的值
              endTime: Number,   //  结束一共需要多少时间 / 毫秒
              spacing: {    // 每次涨多少 默认1
                type: Number,
                default: 1
              }
          },
          progress: { // 当前值
            type: Number,
            default: 0
          },
          inside: { // 数值是否显示在外部
              type: Boolean,
              default: false
          }
      }
  },
  data() {
      return {
          status: '',
          ValProgress: 0,
          start: 0,
          endVal: null,
          inside: false,
          planList: []
      }
  },
  watch: {
      progress(newVal, oldVal) {
          this.ValProgress = newVal;
      },
      op: { // 深度监听进度条变化
          handler: function(val, oldVal) {
              if (val.progress) {
                  this.ValProgress = val.progress;
              }
          },
          deep: true
      },
      ValProgress(newVal, oldVal) {
        //   根据数值不同呈现不同颜色, 遍历planList
        if (this.planList && this.planList.length) {
            let len = this.planList.length - 1;
            let data = this.planList[this.start];
            // 达到或超过临界点时变色
            if (this.ValProgress >= data.progress) {
                this.status = data.status;
                this.start += 1;
            }
        }
      },
      planList(newVal, oldVal) {
          this.start = 0;
      }
  },
  created() {
      if (this.ValProgress) {
          this.progress = this.ValProgress;
      }
      if (this.op) {
          if (this.op.progress) {
              this.ValProgress = this.op.progress;
          }
          if (this.op.inside) {
              this.inside = this.op.inside;
          }
          if (this.op.planList) {
              this.planList = this.op.planList;
          }
          if (this.op.status) {
              this.status = this.op.status;
          }
          if (this.op.automatic) {
            //   结束值
              let endVal = this.op.automatic.endVal || 100;
            //   每次增长
              let spacing = this.op.automatic.spacing || 1;
            //   总结束时间
              let endTime = this.op.automatic.endTime;
            //   根据总结束时间计算每秒增长率
              let time = Math.floor(endTime / endVal);
              let timer = setInterval(() => {
                this.ValProgress += spacing;
                if (this.ValProgress === endVal) {
                    clearInterval(timer)
                }
              }, time);
          }
      }
  },
};
</script>
<style>
.zoom-progress span {
    padding-left: 1em;
}
.zoom-progress-container {
    height: 20px;
    width: 95%;
    display: inline-block;
    border-radius: 10px;
    background: #ddd;
    margin-left: 2%;
}
.progress.info:hover {
    background: #333;
}
.progress.info {
    background: #54657e;
}
.progress.warning:hover {
    background: #ffc53d;
}
.progress.warning {
    background: #faad14;
}
.progress.success:hover {
    background: #13ce66;
}
.progress.success {
    background: #389e0d;
}
.progress.danger:hover {
    background: #ff4d4f;
}
.progress.danger {
    background: #cf1322;
}
.progress:hover {
    background: #096dd9;
}
.progress {
    background: #1890ff;
    border-radius: 10px;
    height: 100%;
    line-height: 100%;
    text-align: right;
    transition: all .3s linear;
}
.progress>b {
    color:#fff;
    font-weight: 100;
    font-size: 12px;
    padding-right: 1em;
 }
</style>
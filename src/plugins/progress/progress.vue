<template>
  <div class="zoom-progress">
    <div class="zoom-progress-container">
      <p :class="statusProgress" :style="{ width : Numprogress + '%' }" class="progress">
        <b v-if="inside">{{ProgressText || Numprogress + '%'}}</b>
      </p>
    </div>
    <span v-if="!inside" class="zoom-icon">{{ProgressText || Numprogress + '%'}}</span>
  </div>
</template>
<script>
export default {
  name: "zoom-progress",
  props: {
    progress: [Number, String],
    text: [Number, String], //  显示的文字
    status: String,
    op: {
      status: String, // 开始时候的状态
      text: [Number, String],
      automatic: {
        //  有配置时可自动增长
        type: Object,
        endVal: Number, // 结束时候的值
        endTime: Number, //  结束一共需要多少时间 / 毫秒
        spacing: {
          // 每次涨多少 默认1
          type: Number,
          default: 1
        }
      },
      progress: {
        // 当前值
        type: Number,
        default: 0
      },
      inside: {
        // 数值是否显示在外部
        type: Boolean,
        default: false
      }
    }
  },
  data() {
    return {
      statusProgress: '',
      ProgressText: '',
      ValProgress: 0,
      start: 0,
      endVal: null,
      inside: false
    };
  },
  computed: {
    Numprogress() {
      return Math.floor(Number(this.ValProgress));
    }
  },
  watch: {
    //   监听父组件状态变化
    status(newVal, oldVal) {
      this.statusProgress = newVal;
      this.ProgressText = this.text;
    },
    progress(newVal, oldVal) {
      this.ValProgress = newVal;
    },
    op: {
      // 深度监听进度条变化
      handler: function(val, oldVal) {
        if (val.progress) {
          this.ValProgress = val.progress;
          this.ProgressText = val.text;
        }
      },
      deep: true
    }
  },
  created() {
    if (this.progress) {
      this.ValProgress = this.progress;
    }
    if (this.op) {
      if (this.op.progress) {
        this.ValProgress = this.op.progress;
      }
      if (this.op.inside) {
        this.inside = this.op.inside;
      }
      if (this.op.status) {
        this.statusProgress = this.op.status;
      }
      if (this.op.text) {
        this.ProgressText = this.op.text;
      }
    } else {
      if (this.status) {
        this.statusProgress = this.status;
      }
      if (this.text) {
        this.ProgressText = this.text;
      }
    }
  }
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
.progress.error:hover,
.progress.danger:hover {
  background: #ff4d4f;
}
.progress.error,
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
  transition: all 0.3s linear;
}
.progress > b {
  color: #fff;
  font-weight: 100;
  font-size: 12px;
  padding-right: 1em;
  line-height: 20px;
}
</style>
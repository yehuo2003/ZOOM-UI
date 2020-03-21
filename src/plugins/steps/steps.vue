<template>
  <div class="zoom-steps">
    <div v-if="type === 'timeLine' " class="zoom-steps-timeline">
      <div
        v-for="(item, index) of list"
        :key="index"
        :class=" item.status ? 'progress-' + item.status : '' "
        :style="item.index !== list.length ? 'height: 88px;' : '' "
        class="timeline"
      >
        <ul>
          <li class="date-time">
            <span class="date">{{item.time ? item.time.split(' ')[0] : ''}}</span>
            <span class="time">{{item.time ? item.time.split(' ')[1] : ''}}</span>
          </li>
          <li :style="index !== list.length - 1 ? 'height: 88px;' : '' " class="steps-line">
            <div class="steps-icon">
              <span
                @click="handleClick(item)"
                :class=" item.status === 'done' ? 'zoom-icon icon-success-fill' : '' "
              >{{item.status === 'done' ? '' : item.index || (index + 1)}}</span>
            </div>
          </li>
          <li class="steps-name">
            <span>{{item.name}}</span>
            <span class="steps-status">{{setStatus(item.status)}}</span>
          </li>
        </ul>
      </div>
    </div>

    <ul v-else-if=" type === 'advanced' " class="zoom-steps-advanced">
      <li
        @click="advancedClick(item)"
        v-for="(item, index) of list"
        :key="index"
        :class=" item.status ? item.status : '' "
        :style="'width:' + parseInt(100 / list.length) +'%;'"
      >
        <a>
          <span :class=" item.type ? item.type : '' " class="dot"></span>
          {{item.name}}
          <span v-show="item.count" class="count">{{item.count}}</span>
        </a>
      </li>
    </ul>

    <div v-else class="zoom-steps-normal">
      <div
        v-for="item of list"
        :key="item.index"
        :class=" item.status ? 'progress-' + item.status : '' "
        :style="'width:' + parseInt(100 / list.length) +'%;'"
        class="normal"
      >
        <div class="steps-icon">
          <span
            @click="handleClick(item)"
            :class=" item.status === 'done' ? 'zoom-icon icon-success-fill' : '' "
          >{{item.status === 'done' ? '' : item.index || (index + 1)}}</span>
        </div>
        <div :class=" item.status === 'done' ? ' line-done' : '' " class="steps-line"></div>
        <div class="node-description">
          <p class="steps-name">{{item.name}}</p>
          <p class="steps-status">{{setStatus(item.status)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-steps",
  props: {
    type: {
      //  步骤条类型, 默认 'normal', 可选 'timeLine' 或  'advanced'
      type: String,
      default: "normal"
    },
    disabled: Boolean, //  是否禁止点击 默认false
    op: {
      type: Object,
      data: {
        //  数据  list = [{index: 1, time: '2008-05-12 14:25:32', name: 'Basic Info.', status: 'done'}]
        type: Array,
        default: []
      },
      onClick: Function, //  监听点击事件
      active: [Number, String] //  要选中的条目, 和index对应
    }
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    /**
     * @function 加载数据
     * @param data: Array list
     * @time 2020/03/08
     */
    load(data) {
      let arr = [];
      if (data && data.length) {
        arr = this.$zoom.clone(data);
      } else if (this.op.data && this.op.data.length) {
        arr = this.$zoom.clone(this.op.data);
      } else {
        return;
      }

      // 如果是时间轴模式, 就格式化时间为 YYYY-mm-dd HH:MM 格式
      if (this.type === "timeLine") {
        arr.forEach(item => {
          if (item.time) {
            item.time = this.$zoom.dateFormat("YYYY-mm-dd HH:MM", item.time);
            if (item.time.indexOf("NaN") > -1) {
              this.list = [];
              throw new Error(
                // 'zoom-ui TypeError: 请输入有效的时间类型'
                `${this.$zoom.$t("err.zoom_ui_type")}: ${this.$zoom.$t(
                  "steps.error"
                )}`
              );
            }
          } else {
            item.time = this.$zoom.dateFormat("YYYY-mm-dd HH:MM", new Date());
          }
        });
      }
      // 如果用户设置了active, 就循环把active之前的数据都设置为done
      if (this.op.active) {
        this.list = this.setValue(this.op.active, arr);
      } else {
        this.list = arr;
      }
    },
    /**
     * @function 设置当前选中状态
     */
    setValue(active, data) {
      if (!active) {
        return;
      }
      if (!data) {
        data = this.op.data;
      }
      for (let i = 0; i <= data.length; i++) {
        if (data[i].index === active) {
          data[i].status = "current";
          break;
        } else {
          data[i].status = "done";
        }
      }
      return data;
    },
    /**
     * @function 点击事件
     * @description 根据点击的索引判断, 点击条目的前面按钮状态都变成成功, 点击的条目变成进行中, 后面的为未完成
     */
    handleClick(e) {
      if (this.op.disabled) {
        return;
      }
      let arr = this.$zoom.clone(this.list);
      arr.forEach(item => {
        if (item.index < e.index) {
          item.status = "done";
        } else if (item.index === e.index) {
          item.status = "current";
        } else {
          item.status = "";
        }
      });
      this.list = arr;
      if (this.op.onClick) {
        this.op.onClick(e);
      }
      this.$emit("change", e.index);
    },
    /**
     * @function 跳到下个步骤,给父组件调用
     * @description 主要是将进行中状态的条目往后移一格
     * 先判断列表中有没有current状态, 如果都没有就返回
     * 如果有, 将当前current状态的条目变成done,再让下一个按钮变成current(如果还有下一个)
     * 如果列表状态是空的 就把第一个的状态设置为current
     */
    next() {
      let arr = this.$zoom.clone(this.list);
      let count = 0;
      let isDone = false;
      arr.forEach(item => {
        if (item.status === "current" || !item.status || item.status === "") {
          isDone = true;
        }
      });
      if (!isDone) {
        return;
      }
      arr.forEach(item => {
        if (count === 1) {
          count += 1;
          item.status = "current";
          this.$emit("change", item.index);
        } else if (item.status === "current") {
          item.status = "done";
          count += 1;
        }
      });
      if (count === 0 && arr && arr.length) {
        arr[0].status = "current";
        this.$emit("change", arr[0].index);
      }
      this.list = arr;
    },
    /**
     * @function 跳到上一步,给父组件调用
     * @description 将进行中状态条目为current的我往前移一格
     * 如果列表里没有current或者done状态的条目 就返回
     * 如果有再倒序进行循环判断, 将当前current状态的条目变成空, 再将current的上一个条目(如果有)设置成current
     */
    prev() {
      let arr = this.$zoom.clone(this.list);
      let isDone = false;
      arr.forEach(item => {
        if (item.status === "current" || item.status === "done") {
          isDone = true;
        }
      });
      if (!isDone) {
        return;
      }
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].status === "current") {
          arr[i].status = "";
        } else if (arr[i].status === "done") {
          arr[i].status = "current";
          this.$emit("change", arr[i].index);
          break;
        }
      }
      this.list = arr;
    },
    /**
     * @function advancedClick点击事件
     * @description 只将用户点击的条目激活
     */
    advancedClick(e) {
      if (this.op.disabled) {
        return;
      }
      this.list.forEach(item => {
        if (item.index === e.index) {
          item.status = "current";
        } else {
          item.status = "";
        }
      });
    },
    // 状态格式化
    setStatus(val) {
      switch (val) {
        case "done":
          return this.$zoom.$t("steps.completed"); //  已完成
        case "current":
          return this.$zoom.$t("steps.in"); //  进行中
        default:
          return this.$zoom.$t("steps.no_completed"); //  未完成
      }
    }
  }
};
</script>
<style>
.zoom-steps .zoom-steps-timeline .timeline .date-time .time {
  display: block;
  color: #333;
}
.zoom-steps .zoom-steps-timeline .date-time .date {
  font-size: 14px;
}
.zoom-steps .zoom-steps-timeline {
  overflow: hidden;
}
.zoom-steps .zoom-steps-timeline .timeline .date-time {
  width: 100px;
  float: left;
  padding-right: 16px;
  text-align: right;
  color: #333;
}
.zoom-steps .zoom-steps-timeline .steps-icon {
  top: 0;
}
.zoom-steps .zoom-steps-timeline .timeline .steps-name {
  float: left;
  margin-left: 15px;
  font-size: 14px;
}
.zoom-steps .zoom-steps-timeline .timeline .steps-status {
  display: block;
}
.zoom-steps .zoom-steps-timeline .timeline .steps-line {
  width: 4px;
  float: left;
}

.zoom-steps .zoom-steps-advanced li a::after,
.zoom-steps .zoom-steps-advanced li a::before {
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  top: 0;
  content: "";
}
.zoom-steps .zoom-steps-advanced li a::after {
  border-left: 9px solid #fff;
  position: absolute;
  right: -9px;
  z-index: 1;
}
.zoom-steps .zoom-steps-advanced .count {
  background: #f5222d;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  top: -10px;
  right: 10px;
}
.zoom-steps .zoom-steps-advanced .dot.success {
  background: #52c41a;
}
.zoom-steps .zoom-steps-advanced .dot.warning {
  background: #fa8c16;
}
.zoom-steps .zoom-steps-advanced .dot.primary {
  background: #1890ff;
}
.zoom-steps .zoom-steps-advanced .dot.danger {
  background: #f5222d;
}
.zoom-steps .zoom-steps-advanced .dot.info {
  background: rgba(0, 0, 0, 0.5);
}
.zoom-steps .zoom-steps-advanced .dot {
  height: 8px;
  width: 8px;
  padding: 0;
  right: 0;
  border-radius: 50%;
  display: inline-block;
}
.zoom-steps .zoom-steps-advanced li:not(:first-child) a::before {
  border-left: 9px solid #d9d9d9;
  position: absolute;
  left: 0;
}
.zoom-steps .zoom-steps-advanced li a:hover::after {
  border-left-color: #1890ff;
}
.zoom-steps ul.zoom-steps-advanced li.current a::after {
  border-left-color: #1890ff;
}
.zoom-steps ul.zoom-steps-advanced li:hover a,
.zoom-steps ul.zoom-steps-advanced li.current a {
  background: #1890ff;
  color: #fff;
}
.zoom-steps .zoom-steps-advanced li:first-child a {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #d9d9d9;
}
.zoom-steps .zoom-steps-advanced li a {
  border: 1px solid #d9d9d9;
  border-right: none;
  display: block;
  text-align: center;
  position: relative;
  text-decoration: none;
  color: #999;
  font-size: 12px;
}
.zoom-steps .zoom-steps-advanced li {
  cursor: pointer;
  line-height: 28px;
  display: inline-block;
  background: #fff;
}

.zoom-steps .progress-current .steps-name {
  color: #1890ff;
  font-weight: 700;
}
.zoom-steps .zoom-steps-normal .node-description .status {
  font-size: 12px;
  float: left;
  width: 100%;
}
.zoom-steps .zoom-steps-normal .node-description {
  position: relative;
  margin-top: 6px;
  overflow: hidden;
  text-align: center;
}
.zoom-steps .progress-done .steps-line {
  background: #1890ff;
}
.zoom-steps .zoom-steps-normal .normal:last-child .steps-line {
  width: 0;
}
.zoom-steps .steps-line {
  background: #dbdbdb;
}
.zoom-steps .zoom-steps-normal .steps-line {
  height: 4px;
  left: 50%;
  top: -8px;
  position: relative;
}
.zoom-steps .progress-current .steps-icon {
  background: #1890ff;
  color: #fff;
  font-size: 12px;
}
.zoom-steps .progress-done .steps-icon > .zoom-icon {
  font-size: 20px;
}
.zoom-steps .progress-done .steps-icon {
  background: #fff;
  color: #1890ff;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
}
.zoom-steps .steps-icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: relative;
  font-size: 12px;
  text-align: center;
  left: calc(50% - 10px);
  top: 4px;
  border-radius: 50%;
  background: #d9d9d9;
  color: #fff;
  cursor: pointer;
  z-index: 15;
}
.zoom-steps .zoom-steps-normal .normal {
  display: block;
  float: left;
}
.zoom-steps .zoom-steps-normal {
  overflow: hidden;
}
</style>
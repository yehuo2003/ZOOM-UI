<template>
  <div @click.stop="bindEvent" class="zoom-date">
    <div
      ref="zoom-date"
      @click.stop="disabled ? null : showDown()"
      :class="disabled ? 'zoom-date-disabled' : '' "
      class="zoom-input"
    >
      <input v-model="dateTime" :disabled="disabled" type="text" readonly />
      <div class="input-btn">
        <a class="zoom-icon icon-calendar"></a>
      </div>
    </div>

    <div v-show="show" ref="date-modal" class="zoom-date-wrap">
      <div class="zoom-date-header">
        <span
          v-if="!selectMonth"
          class="zoom-date-header-btn zoom-date-header-btn-pre"
          @click.stop="switchYear(-1)"
        >&lt;&lt;</span>

        <span
          v-if="!selectMonth && !selectYear"
          class="zoom-date-header-btn zoom-date-header-btn-pre"
          @click.stop="switchMonth(-1)"
        >&lt;</span>

        <span class="zoom-date-header-btn-day">
          <!-- 年 -->
          <span class="zoom-date-header-btn" @click.stop="openSelectYear">{{ select.year + $zoom.$t('date.year') }}</span>
          <!-- 月 -->
          <span class="zoom-date-header-btn" @click.stop="openSelectMonth">{{ select.month + $zoom.$t('date.month') }}</span>
        </span>

        <span
          v-if="!selectMonth"
          class="zoom-date-header-btn zoom-date-header-btn-next"
          @click.stop="switchYear(1)"
        >&gt;&gt;</span>

        <span
          v-if="!selectMonth && !selectYear"
          class="zoom-date-header-btn zoom-date-header-btn-next"
          @click.stop="switchMonth(1)"
        >&gt;</span>
      </div>

      <div class="zoom-date-content">
        <table>
          <thead>
            <!-- <th v-for="item of ['日', '一', '二', '三', '四', '五', '六']" :key="item">{{item}}</th> -->
            <th v-for="item of $zoom.$t('date.week')" :key="item">{{item}}</th>
          </thead>

          <tbody>
            <tr v-for="(week,index) of list" :key="'week_'+index">
              <td
                v-for="(weekday,idx) of week"
                :key="'weekday_'+index+idx"
                :class="{'flag': weekday.flag,'active': !weekday.flag && weekday.text == current.date && select.month == current.month && select.year == current.year}"
                @click="pick(weekday)"
              >{{ weekday.text }}</td>
            </tr>
          </tbody>
        </table>

        <keep-alive>
          <div v-if="selectYear" class="agm-date-picker-year-panel zoom-date-picker">
            <div class="panel-list">
              <div v-for="(y, index) of years" :key="'year_' + index" class="panel-item">
                <div
                  :class="{active: y === select.year}"
                  class="panel-item-inner"
                  @click.stop="pickYear(y)"
                >{{ y + $zoom.$t('date.year') }}</div>  <!-- 年 -->
              </div>
            </div>
          </div>
        </keep-alive>

        <keep-alive>
          <div v-if="selectMonth" class="agm-date-picker-month-panel zoom-date-picker">
            <div class="panel-list">
              <div v-for="item of 12" :key="'month_' + item" class="panel-item">
                <div
                  :class="{active: item === select.month}"
                  @click.stop="pickMonth(item)"
                  class="panel-item-inner"
                >{{ item + $zoom.$t('date.month') }}</div>  <!-- 月 -->
              </div>
            </div>
          </div>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-date",
  inheritAttrs: false,
  props: {
    op: {
      type: Object,
      disabled: Boolean, //  是否禁用
      maxDate: String, //  最大日期
      minDate: String, //  最小日期
      onComplete: Function, //  组件编译完成时执行的事件
      onRender: Function, //  组件渲染完成时执行的事件
      onShow: Function, //  选择日期框日期后执行的事件
      dateTime: {
        type: [Number, String],
        default() {
          return new Date().getTime();
        }
      }
    }
  },
  data() {
    return {
      moment: "",
      disabled: false,
      setDisable: false,
      dateTime: "", //  显示的时间
      show: false, // 控制日历面板的显示与隐藏
      selectYear: false, // 控制年份的面板的显示和隐藏
      selectMonth: false, // 控制月份的面板的显示和隐藏
      current: "", // 已选择的日期时间。yyyy-MM-dd
      select: {
        // 已选择的日期对象
        year: "", //  年
        month: "", //  月
        date: "", //  日
        day: "", //  星期几
        hours: "", //  小时
        minutes: "", //  分
        seconds: "" //  秒
      },
      currentMonthFirstDay: null, // 当前月的1号属于星期几
      currentMonthEndDate: null, // 当前月的最后一天是几号
      currentMonthEndDay: null, // 当前月的最后一天属于星期几
      lastMonthEndDate: null, // 上个月的最后一天是几号
      list: [], // 日历的二维数组
      years: [] // 1900-2100
    };
  },
  watch: {
    select: {
      handler(newVal) {
        let pre;
        if (newVal.month == 1) {
          pre = new Date(newVal.year - 1, 12, 0);
        } else {
          pre = new Date(newVal.year, newVal.month - 1, 0);
        }
        this.lastMonthEndDate = pre.getDate(); // 获取日历排表
        this.getDateList();
      },
      deep: true
    }, // 打开年份选择器的时候使当前年份、月份出现在窗口顶部

    selectYear(newVal) {
      if (newVal) {
        this.years = [];
        this.$nextTick(() => {
          let year = this.select.year;
          this.setYear(year);
        });
      }
    }

  },

  created() {
    this.moment = new Date().getTime();
    if (this.op) {
      if (this.op.dateTime) {
        this.moment = this.op.dateTime;
      }
      if (this.op.disabled) {
        this.disabled = this.op.disabled;
      }
      if (this.op.onComplete) {
        this.op.onComplete(this.select, this.dateTime);
      }
    }
    this.load();
  },

  mounted() {
    // 如果父组件有onRender就调用,并返回当前日期对象和要显示的时间
    if (this.op && this.op.onRender) {
      this.op.onRender(this.select, this.dateTime);
    }
    this.$nextTick(() => {
      document.body.appendChild(this.$refs['date-modal']);
    })
  },

  methods: {
    /**
     * 计算并打开弹窗
     */
    showDown() {
      if (this.show) {
        this.show = false;
        return;
      }
      // 获取目标元素的位置信息
      const targetElement = this.$refs['zoom-date'];
      const targetRect = targetElement.getBoundingClientRect();
      // 获取需要定位的元素
      const elementToPosition = this.$refs['date-modal'];
      // 计算元素距离浏览器底部的距离
      const distanceToBottom = document.documentElement.clientHeight - targetRect.bottom;
      // 设置需要定位的元素的位置信息
      elementToPosition.style.position = 'absolute';
      elementToPosition.style.left = `${targetRect.left}px`;
      if (distanceToBottom > 200) {
        elementToPosition.style.top = `${targetRect.bottom + 10}px`;
      } else {
        elementToPosition.style.top = `${targetRect.bottom - elementToPosition.offsetHeight - 210}px`;
      }
      this.$nextTick(() => {
        this.show = true;
      })
    },
    reset() {
      this.load();
    },
    /**
     * 加载数据
     */
    setYear(year) {
      let startYear = year - 6; // 获得年份列表： 1900-2100
      for (let i = startYear; i < startYear + 12; i++) {
        this.years.push(i);
      }
    },
    load(time) {
      time = time || this.moment;
      this.transform(time);
      this.complete();
      const date = new Date();
      let year = date.getFullYear();
      this.setYear(year);
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.setDisable = status;
      this.disabled = status;
    },
    /**
     * 将时间转化为具体的 年、月、日、星期
     */
    transform(time) {
      const date = new Date(time);
      this.select.year = date.getFullYear();
      this.select.month = date.getMonth() + 1;
      this.select.date = date.getDate();
      this.select.day = date.getDay();
      // this.select.hours = date.getHours();
      // this.select.minutes = date.getMinutes();
      // this.select.seconds = date.getSeconds();

      this.currentMonthFirstDay = new Date(
        this.select.year,
        this.select.month - 1,
        1,
        0
      ).getDay();

      this.currentMonthEndDate = new Date(
        this.select.year,
        this.select.month,
        0
      ).getDate();
      this.currentMonthEndDay = new Date(
        this.select.year,
        this.select.month,
        0
      ).getDay();
    },
    /**
     * 格式化日期时间
     */
    formatDate(val) {
      if (!val) {
        return "";
      }
      let date = `${val.year}-${val.month}-${val.date}`.replace(/\d+/g, a => {
        return a.length === 4 ? a : a.length === 2 ? a : "0" + a;
      });
      // 如果有时分秒就设置
      if (val.hours > 0 || val.minutes > 0 || val.seconds > 0) {
        let time = ` ${val.hours}:${val.minutes}:${val.seconds}`.replace(
          /\d+/g,
          a => {
            return a.length === 2 ? a : "0" + a;
          }
        );
        date += time;
      }
      return date;
    },

    /**
     * 计算出日历列表，二维数组
     * 第一层为星期，第二层为每星期的第几天
     */
    getDateList() {
      this.list = []; // 获取日历第一行的数据（需加上第一个星期中所包含上个月的几天）
      let temp = this.lastMonthEndDate - (this.currentMonthFirstDay - 1);
      let list = this.numberList(temp, this.lastMonthEndDate, true).concat(
        this.numberList(1, 7 - this.currentMonthFirstDay)
      );
      this.list.push(list);
      temp = 7 - this.currentMonthFirstDay + 1;
      /**
       * 剩下的行数
       * 计算除了第一行剩下的天数
       */
      const leftDays =
        this.currentMonthEndDate - (7 - this.currentMonthFirstDay); // 剩下的星期数
      const lineNumber = Math.ceil(leftDays / 7); // 包含下个月日历的天数
      const nextDays = 7 - (leftDays % 7);
      for (let i = 0; i < lineNumber; i++) {
        if (i === lineNumber - 1 && nextDays > 0 && nextDays !== 7) {
          this.list[lineNumber] = this.numberList(
            temp,
            this.currentMonthEndDate
          ).concat(this.numberList(1, nextDays, true));
        } else {
          this.list.push(this.numberList(temp, temp + 6));
        }
        temp = temp + 7;
      } // 补齐6排
      if (lineNumber < 5) {
        this.list.push(this.numberList(nextDays + 1, nextDays + 7, true));
      }
    },
    /**
     * 获得日历数组
     * start: 开始日
     * end: 结束日
     * flag： boolean值，判断是否属于本月
     */
    numberList(start, end, flag) {
      let list = [];
      for (let i = start; i <= end; i++) {
        list.push({
          text: i,
          flag: !!flag
        });
      }
      return list;
    },
    /**
     * 切换月份， -1为当前月份-1，+1为当前月份+1
     */
    switchMonth(n) {
      let year = this.select.year;
      if (n === -1) {
        const pre = this.select.month === 1 ? 12 : this.select.month - 1;
        if (pre === 12) {
          this.transform(new Date(year - 1, pre - 1, this.select.date));
        } else {
          this.transform(new Date(year, pre - 1, this.select.date));
        }
      } else {
        const next = this.select.month === 12 ? 1 : this.select.month + 1;
        if (next === 1) {
          this.transform(new Date(year + 1, next - 1, this.select.date));
        } else {
          this.transform(new Date(year, next - 1, this.select.date));
        }
      }
    },
    /**
     * 切换年份， -1为当前年份-1，+1为当前年份+1
     */
    switchYear(n) {
      if (this.selectYear) {
        let year = this.years[0];
        this.years = [];
        if (n === -1) {
          for (let i = year - 10; i < year; i++) {
            this.years.push(i);
          }
        } else {
          for (let i = year + 10; i < year + 20; i++) {
            this.years.push(i);
          }
        }
      } else {
        let year = this.select.year;
        if (n === -1) {
          this.transform(
            new Date(year - 1, this.select.month - 1, this.select.date)
          );
        } else {
          this.transform(
            new Date(year + 1, this.select.month - 1, this.select.date)
          );
        }
      }
    },

    pick(day) {
      if (day.flag) {
        // 当页日历上可能还会显示部分上个月或者下个月的部分天数，根据标识来做判断
        // 并对月份作出相应的处理
        if (parseInt(day.text) > 15) {
          this.transform(
            new Date(
              this.select.year,
              this.select.month - 2,
              parseInt(day.text)
            )
          );
        } else {
          this.transform(
            new Date(this.select.year, this.select.month, parseInt(day.text))
          );
        }
      } else {
        this.transform(
          new Date(this.select.year, this.select.month - 1, parseInt(day.text))
        );
      }
      if (this.op && this.op.onShow) {
        this.op.onShow(day);
      }
      this.complete();
      this.bindEvent();
    },
    // 绑定事件：点击关闭日历面板
    bindEvent() {
      this.show = false;
      this.selectYear = false;
      this.selectMonth = false;
    },
    // 打开选择年份
    openSelectYear() {
      this.selectYear = !this.selectYear;
      this.selectMonth = false;
    },
    // 打开选择月份
    openSelectMonth() {
      this.selectMonth = !this.selectMonth;
      this.selectYear = false;
    },
    // 选取年
    pickYear(n) {
      this.select.year = n;
      this.selectYear = !this.selectYear;
      this.selectMonth = true;
    },
    // 选取月
    pickMonth(n) {
      // this.transform(new Date(this.select.year, n - 1, this.select.date))
      this.select.month = n;
      this.selectMonth = !this.selectMonth;
    },
    // 更改选中时间并向父组件派发事件
    complete() {
      this.current = {
        year: this.select.year,
        month: this.select.month,
        date: this.select.date,
        // hours: this.select.hours,
        // minutes: this.select.minutes,
        // seconds: this.select.seconds
      };
      this.dateTime = this.formatDate(this.current);
      this.$emit("input", this.dateTime);
      if (this.dateTime.indexOf("NaN") > -1) {
        throw new Error(
          // "zoom-ui TypeError: 请检查入参是否为有效时间格式! "
          `${this.$zoom.$t('err.zoom_ui_type')}: ${this.$zoom.$t('date.type')}`
        );
      }
    }
  }
};
</script>
<style>
.zoom-date {
  position: relative;
  width: 200px;
  height: 36px;
  color: #515e6e;
}
.zoom-date-wrap {
  width: 270px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  margin: 5px 0;
  background: #fff;
}
.zoom-date-wrap .zoom-date-header {
  padding: 0 10px;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  border-bottom: 1px solid #e8eaec;
}
.zoom-date-wrap .zoom-date-header .zoom-date-header-btn {
  cursor: pointer;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.zoom-date-wrap .zoom-date-header .zoom-date-header-btn:hover {
  color: #008afe;
}
.zoom-date-wrap .zoom-date-header .zoom-date-header-btn-pre {
  float: left;
  padding-right: 5px;
  font-size: 22px;
  -webkit-transform: scale(0.5, 1);
  transform: scale(0.5, 1);
}
.zoom-date-wrap .zoom-date-header .zoom-date-header-btn-next {
  padding-left: 5px;
  float: right;
  font-size: 22px;
  -webkit-transform: scale(0.5, 1);
  transform: scale(0.5, 1);
}
.zoom-date-wrap .zoom-date-content {
  position: relative;
}
.zoom-date-wrap .zoom-date-content table {
  width: 100%;
  border-collapse: collapse;
}
.zoom-date-wrap .zoom-date-content table thead {
  line-height: 30px;
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
.zoom-date-wrap .zoom-date-content table tbody tr td {
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.zoom-date-wrap .zoom-date-content table tbody tr td:hover {
  background: #eee;
}
.zoom-date-wrap .zoom-date-content table tbody tr td.active,
.zoom-date-wrap .zoom-date-content table tbody tr td.active:hover {
  color: #fff;
  background: #1890ff;
}
.zoom-date-wrap .zoom-date-content table tbody tr td.flag {
  color: #aaa;
}
.zoom-date-wrap .zoom-date-content .zoom-date-picker {
  border: 1px solid #e8eaec;
  border-top: 0;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: absolute;
  background: #fff;
  font-size: 14px;
  width: 70px;
  height: 150px;
  overflow: auto;
  top: 0;
}
.zoom-date-picker::-webkit-scrollbar {
  width: 4px;
}
.zoom-date-picker::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
}
.zoom-date-picker::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
.zoom-date-wrap .zoom-date-content .agm-date-picker-year-panel {
  left: 30%;
}
.zoom-date-wrap .zoom-date-content .agm-date-picker-month-panel {
  right: 25%;
}
.zoom-date
  .zoom-date-wrap
  .zoom-date-content
  .zoom-date-picker
  .panel-item:hover {
  background: #e1f0fe;
}
.zoom-date {
  display: inline-block;
}
.zoom-date-wrap .zoom-date-content .zoom-date-picker .panel-item {
  line-height: 25px;
  cursor: pointer;
  padding: 0 5px;
  transition: background .3s;
}
.zoom-date-wrap .zoom-date-content .zoom-date-picker .panel-item:hover {
  background: #eee;
}
.zoom-date .zoom-date-disabled .icon-calendar {
  cursor: no-drop;
}
.zoom-date .zoom-input .icon-calendar {
  cursor: pointer;
}
</style>
<template>
   <div

    v-click-outside="bindEvent"

    ref="agm-datepicker"

    class="agm-datepicker">

    <div

      :class="{active: show}"

      class="agm-input"

      @click.stop="show=!show">

      <input

        :value="current | dateFormat"

        type="text"

        readonly>

    </div>

    <div

      v-if="show"

      :class="{positionTop:positionTop}"

      class="agm-datepicker-wrap">

      <div

        class="agm-datepicker-header"

        @click.stop="">

        <span

          v-if="!selectMonth"

          class="agm-datepicker-header-btn agm-datepicker-header-btn-pre"

          @click.stop="switchYear(-1)">&lt;&lt;</span>

        <span

          v-if="!selectMonth && !selectYear"

          class="agm-datepicker-header-btn agm-datepicker-header-btn-pre"

          @click.stop="switchMonth(-1)">&lt;</span>

        <span class="agm-datepicker-header-btn-day">

          <span

            class="agm-datepicker-header-btn"

            @click.stop="openSelectYear">{{ select.year }}年 </span>

          <span

            class="agm-datepicker-header-btn"

            @click.stop="openSelectMonth">{{ select.month }}月</span>

        </span>

        <span

          v-if="!selectMonth"

          class="agm-datepicker-header-btn agm-datepicker-header-btn-next"

          @click.stop="switchYear(1)">&gt;&gt;</span>

        <span

          v-if="!selectMonth && !selectYear"

          class="agm-datepicker-header-btn agm-datepicker-header-btn-next"

          @click.stop="switchMonth(1)">&gt;</span>

      </div>

      <div class="agm-datepicker-content">

        <table>

          <thead>

            <th>日</th>

            <th>一</th>

            <th>二</th>

            <th>三</th>

            <th>四</th>

            <th>五</th>

            <th>六</th>

          </thead>

          <tbody>

            <tr

              v-for="(week,index) of list"

              :key="'week_'+index">

              <td

                v-for="(weekday,idx) of week"

                :key="'weekday_'+index+idx"

                :class="{

                  'flag': weekday.flag,

                  'active': !weekday.flag && weekday.text == current.date

                && select.month == current.month && select.year == current.year}"

                @click="pick(weekday)">

                {{ weekday.text }}

              </td>

            </tr>

          </tbody>

        </table>

        <div

          v-if="selectYear"

          class="agm-date-picker-year-panel">

          <div class="panel-list">

            <div

              v-for="(y, index) of years"

              :key="'year_'+index"

              class="panel-item">

              <div

                :class="{active: y===select.year}"

                class="panel-item-inner"

                @click.stop="pickYear(y)">{{ y }}</div> 

            </div>

          </div>

        </div>

        <div

          v-if="selectMonth"

          class="agm-date-picker-year-panel">

          <div class="panel-list">

            <div

              v-for="(m, index) of months"

              :key="'month_'+index"

              class="panel-item">

              <div

                :class="{active: (index+1)===select.month}"

                class="panel-item-inner"

                @click.stop="pickMonth(index+1)">{{ m }}</div> 

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {

  name: 'AgmDatePicker',

  filters: {

    // 日期格式过滤器

    dateFormat(val) {

      if (!val) {

        return ''

      }

      return `${val.year}-${val.month}-${val.date}`.replace(/\d+/g, a => {

        return a.length === 4 ? a : a.length === 2 ? a : '0' + a

      })

    }

  },

  inheritAttrs: false,

  props: {

    moment: {

      type: Number,

      default() {

        return new Date().getTime()

      }

    }

  },

  data() {

    return {

      show: false, // 控制日历面板的显示与隐藏

      selectYear: false, // 控制年份的面板的显示和隐藏

      selectMonth: false, // 控制月份的面板的显示和隐藏

      positionTop: false, // 控制面板显示方向

      current: '', // 已选择的日期时间。yyyy-MM-dd

      select: {

        // 已选择的日期对象

        year: '',

        month: '',

        date: '',

        day: ''

      },

      currentMonthFirstDay: null, // 当前月的1号属于星期几

      currentMonthEndDate: null, // 当前月的最后一天是几号

      currentMonthEndDay: null, // 当前月的最后一天属于星期几

      lastMonthEndDate: null, // 上个月的最后一天是几号

      list: [], // 日历的二维数组

      years: [], // 1900-2100

      months: [

        '1月',

        '2月',

        '3月',

        '4月',

        '5月',

        '6月',

        '7月',

        '8月',

        '9月',

        '10月',

        '11月',

        '12月'

      ]

    }

  },

  watch: {

    select: {

      handler(newVal) {

        let pre

        if (newVal.month == 1) {

          pre = new Date(newVal.year - 1, 12, 0)

        } else {

          pre = new Date(newVal.year, newVal.month - 1, 0)

        }

        this.lastMonthEndDate = pre.getDate()

        // 获取日历排表

        this.getDateList()

      },

      deep: true

    },

    // 打开年份选择器的时候使当前年份、月份出现在窗口顶部

    selectYear(newVal) {

      if (newVal) {

        this.years = []

        this.$nextTick(() => {

          let year = this.select.year

          let startYear = ((year / 10) | 0) * 10

          // 获得年份列表： 1900-2100

          for (let i = startYear; i < startYear + 10; i++) {

            this.years.push(i)

          }

        })

      }

    },

    show(newVal) {

      if (newVal) {

        this.checkOffsetBottom()

      }

    }

  },

  created() {

    this.transform(this.moment)

    this.complete()

    const date = new Date()

    let year = date.getFullYear()

    let startYear = ((year / 10) | 0) * 10

    // 获得年份列表： 1900-2100

    for (let i = startYear; i < startYear + 10; i++) {

      this.years.push(i)

    }

  },

  methods: {

    /**

    * 将时间转化为具体的 年、月、日、星期

    **/

    transform(time) {

      const date = new Date(time)

      this.select.year = date.getFullYear()

      this.select.month = date.getMonth() + 1

      this.select.date = date.getDate()

      this.select.day = date.getDay()

      this.currentMonthFirstDay = new Date(

        this.select.year,

        this.select.month - 1,

        1,

        0

      ).getDay()

      this.currentMonthEndDate = new Date(

        this.select.year,

        this.select.month,

        0

      ).getDate()

      this.currentMonthEndDay = new Date(

        this.select.year,

        this.select.month,

        0

      ).getDay()

    },

    /*

            * 计算出日历列表，二维数组

            * 第一层为星期，第二层为每星期的第几天

            */

    getDateList() {

      this.list = []

      // 获取日历第一行的数据（需加上第一个星期中所包含上个月的几天）

      let temp = this.lastMonthEndDate - (this.currentMonthFirstDay - 1)

      let list = this.numberList(temp, this.lastMonthEndDate, true).concat(

        this.numberList(1, 7 - this.currentMonthFirstDay)

      )

      this.list.push(list)

      temp = 7 - this.currentMonthFirstDay + 1

      /*

                * 剩下的行数

                */

      // 计算除了第一行剩下的天数

      const leftDays =

        this.currentMonthEndDate - (7 - this.currentMonthFirstDay)

      // 剩下的星期数

      const lineNumber = Math.ceil(leftDays / 7)

      // 包含下个月日历的天数

      const nextDays = 7 - (leftDays % 7)

      for (let i = 0; i < lineNumber; i++) {

        if (i === lineNumber - 1 && nextDays > 0 && nextDays !== 7) {

          this.list[lineNumber] = this.numberList(

            temp,

            this.currentMonthEndDate

          ).concat(this.numberList(1, nextDays, true))

        } else {

          this.list.push(this.numberList(temp, temp + 6))

        }

        temp = temp + 7

      }

      // 补齐6排

      if (lineNumber < 5) {

        this.list.push(this.numberList(nextDays + 1, nextDays + 7, true))

      }

    },

    /*

            * 获得日历数组

            * start: 开始日

            * end: 结束日

            * flag： boolean值，判断是否属于本月

            */

    numberList(start, end, flag) {

      let list = []

      for (let i = start; i <= end; i++) {

        list.push({

          text: i,

          flag: !!flag

        })

      }

      return list

    },

    /*

            * 切换月份， -1为当前月份-1，+1为当前月份+1

            */

    switchMonth(n) {

      let year = this.select.year

      if (n === -1) {

        const pre = this.select.month === 1 ? 12 : this.select.month - 1

        if (pre === 12) {

          this.transform(new Date(year - 1, pre - 1, this.select.date))

        } else {

          this.transform(new Date(year, pre - 1, this.select.date))

        }

      } else {

        const next = this.select.month === 12 ? 1 : this.select.month + 1

        if (next === 1) {

          this.transform(new Date(year + 1, next - 1, this.select.date))

        } else {

          this.transform(new Date(year, next - 1, this.select.date))

        }

      }

    },

    /*

            * 切换年份， -1为当前年份-1，+1为当前年份+1

            */

    switchYear(n) {

      if (this.selectYear) {

        let year = this.years[0]

        this.years = []

        if (n === -1) {

          for (var i = year - 10; i < year; i++) {

            this.years.push(i)

          }

        } else {

          for (var i = year + 10; i < year + 20; i++) {

            this.years.push(i)

          }

        }

      } else {

        let year = this.select.year

        if (n === -1) {

          this.transform(

            new Date(year - 1, this.select.month - 1, this.select.date)

          )

        } else {

          this.transform(

            new Date(year + 1, this.select.month - 1, this.select.date)

          )

        }

      }

    },

    pick(day) {

      if (!!day.flag) {

        // 当页日历上可能还会显示部分上个月或者下个月的部分天数，根据标识来做判断

        // 并对月份作出相应的处理

        if (parseInt(day.text) > 15) {

          this.transform(

            new Date(

              this.select.year,

              this.select.month - 2,

              parseInt(day.text)

            )

          )

        } else {

          this.transform(

            new Date(this.select.year, this.select.month, parseInt(day.text))

          )

        }

      } else {

        this.transform(

          new Date(this.select.year, this.select.month - 1, parseInt(day.text))

        )

      }

      this.complete()

      this.bindEvent()

    },

    // 绑定事件：点击关闭日历面板

    bindEvent() {

      this.show = false

      this.selectYear = false

      this.selectMonth = false

    },

    // 打开选择年份

    openSelectYear() {

      this.selectYear = !this.selectYear

      this.selectMonth = false

    },

    // 打开选择月份

    openSelectMonth() {

      this.selectMonth = !this.selectMonth

      this.selectYear = false

    },

    // 选取年

    pickYear(n) {

      // this.transform(new Date(n, this.select.month - 1, this.select.date))

      this.select.year = n

      this.selectYear = !this.selectYear

      this.selectMonth = true

      // this.complete()

    },

    // 选取月

    pickMonth(n) {

      // this.transform(new Date(this.select.year, n - 1, this.select.date))

      this.select.month = n

      this.selectMonth = !this.selectMonth

      // this.complete()

    },

    // 更改选中时间并向父组件派发事件

    complete() {

      // 触发父组件的传过来的picked事件。三个参数: 年，月，日

      this.$emit(

        'picked',

        this.select.year,

        this.select.month,

        this.select.date

      )

      this.current = {

        year: this.select.year,

        month: this.select.month,

        date: this.select.date

      }

    },

    checkOffsetBottom() {

      // console.log(this.$refs['agm-datepicker'].screenTop)

      // console.log(this.$refs['agm-datepicker'].offsetTop)

      // console.log(this.$refs['agm-datepicker'].offsetHeight)

      // console.log(this.$refs['agm-datepicker'].getBoundingClientRect())

      let scrollTop =

        (document.documentElement && document.documentElement.scrollTop) ||

        document.body.scrollTop

      let clientHeight =

        (document.documentElement && document.documentElement.clientHeight) ||

        document.body.clientHeight

      let offsetBottom =

        clientHeight -

        (this.$refs['agm-datepicker'].offsetTop -

          scrollTop +

          this.$refs['agm-datepicker'].offsetHeight)

      offsetBottom < 250

        ? (this.positionTop = true)

        : (this.positionTop = false)

    }

  }

}
</script>
<style lang="scss">
.agm-datepicker {

  position: relative;

  width: 200px;

  height: 36px;

  color: #515a6e;

  .agm-input {

    height: 100%;

    width: 100%;

    box-sizing: border-box;

    border: 1px solid #bfcbd7;

    border-radius: 3px;

    cursor: pointer;

    input {

      height: 100%;

      width: 100%;

      box-sizing: border-box;

      padding: 5px 10px;

      border: none;

      background: none;

      font-size: 14px;

      outline: none;

    }

    &.active {

      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);

      border: 1px solid #20a0ff;

    }

  }

  .agm-datepicker-wrap {

    width: 240px;

    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

    border-radius: 4px;

    z-index: 10;

    position: absolute;

    top: 100%;

    left: 0;

    margin: 5px 0;

    background-color: #fff;

    &.positionTop {

      top: -250px;

    }

    .agm-datepicker-header {

      padding: 0px 10px;

      font-size: 14px;

      text-align: center;

      line-height: 36px;

      border-bottom: 1px solid #e8eaec;

      .agm-datepicker-header-btn {

        cursor: pointer;

        transition: color 0.2s ease-in-out;

        user-select: none;

        &:hover {

          color: #008afe;

        }

      }

      .agm-datepicker-header-btn-pre {

        float: left;

        padding-right: 5px;

        font-size: 18px;

        transform: scale(0.5, 1);

      }

      .agm-datepicker-header-btn-day {

      }

      .agm-datepicker-header-btn-next {

        padding-left: 5px;

        float: right;

        font-size: 18px;

        transform: scale(0.5, 1);

      }

    }

    .agm-datepicker-content {

      position: relative;

      table {

        width: 100%;

        border-collapse: collapse;

        thead {

          line-height: 30px;

          font-size: 12px;

          color: #999;

        }

        tbody {

          tr {

            line-height: 28px;

            td {

              font-size: 12px;

              text-align: center;

              cursor: pointer;

              border-radius: 3px;

              transition: all 0.2s ease-in-out;

              &.active,

              &.active:hover {

                color: #fff;

                background: #008afe;

              }

              &.flag {

                color: #999;

              }

            }

            td:hover {

              background: #eee;

            }

          }

        }

      }

      .agm-date-picker-year-panel {

        position: absolute;

        top: 0;

        left: 0;

        width: 100%;

        height: 100%;

        background: #fff;

        font-size: 14px;

        .panel-list {

          @include list(row);

          height: 100%;

          .panel-item {

            @include list(row);

            justify-content: center;

            align-items: center;

            width: 33.33333%;

            height: 25%;

            .panel-item-inner {

              width: 80%;

              text-align: center;

              padding: 10px 0;

              border-radius: 3px;

              transition: all 0.2s ease-in-out;

              cursor: pointer;

              &:hover {

                background-color: #e1f0fe;

              }

              &.active {

                background-color: #e1f0fe;

              }

            }

          }

        }

      }

    }

  }

}
</style>
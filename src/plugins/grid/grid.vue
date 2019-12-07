<template>
  <div class="zoom-grid">
    <div class="zoom-grid-body">
      <!-- 表头 -->
      <div class="grid-head">
        <div class="grid-headbox">
          <table class="grid-table grid-thead">
            <thead class="grid-head-content">
              <tr>
                <!-- 表格宽度 -->
                <th
                  v-for="item of titleData"
                  :key="item.id"
                  :col="item.id"
                  :class="item.sort ? 'item-sort' : ''"
                  :style=" 'width: ' + item.minWidth + '%;' "
                  class="grid-item"
                >
                  <div v-if="item.sort" class="zoom-sort">
                    <span
                      @click="sortClick('up', item)"
                      class="asc zoom-icon icon-up-fill"
                    ></span>
                    <span
                      @click="sortClick('down', item)"
                      class="asc zoom-icon icon-down-fill"
                    ></span>
                  </div>
                  <span class="thead-title">{{item.title}}</span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <!-- 内容 -->
      <div class="grid-body">
        <div v-if="bodyData.length === 0" class="zoom-not-data">
        <!-- <div v-if="!bodyData" class="zoom-not-data"> -->
          <p v-show="!showLoad">
            <i class="zoom-icon icon-glass"></i>
            <span>暂无数据</span>
          </p>
          <zoom-loading color="#1890ff" :show="showLoad"></zoom-loading>
        </div>
        <div class="grid-bodybox">
          <table class="grid-table grid-tbody">
            <tbody class="grid-body-content">
              <tr
                v-for="item of bodyData"
                :key="item.indexId"
                :_row="item.indexId"
                :class="{'active':item.indexId == clickIndex}"
                @click="clickIndex = item.indexId"
                class="grid-row"
              >
                <td
                  @click="itemClick($event, i, item, name)"
                  v-for="(i, name, index) of item"
                  :key="index"
                  :fieId="name"
                  :zoom-tip="tips ? i === item.btns ? 'btns' : i : false"
                  class="grid-item"
                >
                  <span class="grid-input">
                    {{i === item.btns ? '' : i}}
                    <!-- 如果是按钮组, 就不展示文本信息, 而是渲染按钮 -->
                    <span v-if="i === item.btns">
                      <a
                        v-for="(j, jIndex) of item.btns"
                        :key="jIndex"
                        :title="j.title"
                        @click.stop="iconClick(j, item)"
                        class="zoom-icon"
                      >
                        <span :class="j.css.icon ? 'zoom-icon ' + j.css.icon : j.css"></span>
                      </a>
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <div v-if="showPager">
      <zoom-pager :op="defaultPagerOp"></zoom-pager>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-grid",
  props: {
    op: {
      type: Object,
      hideIndex: {  // 是否隐藏序列号
        type: Boolean,
        default: false,
      },
      tip: {   // 是否显示tip
        type: Boolean,
        default: false
      },
      title: {  // 表格头部数据
        type: Array,
        default() {
          return [];
        }
      },
      datas: {
        type: Array,
        default() {
          return {};
        }
      },
      beforeLoad: Function, // 组件加载时调用, 可以这时挂载数据
      pagerOp: Object // 是否启用分页组件
    }
  },
  data() {
    return {
      tips: false,
      serial: false, //  是否显示序列号
      showLoad: false, //  loading
      surplus: [], //   剩余数据
      showPager: false,
      defaultPagerOp: {
        pageVal: {
          total: 0,
          curPage: 1,
          pageSize: 10
        }
      },
      clickIndex: -1,
      titleData: [],
      bodyData: []
    };
  },
  mounted() {
    if (this.op && this.op.beforeLoad) {
      this.op.beforeLoad();
    } else {
      this.load();
    }
  },
  methods: {
    setWidth() {
      let data = this.titleData;
      if (this.op.tip) {
        this.tips = true;
      } else {
        this.tips = false;
      }
      this.$nextTick(() => {
        data.forEach(item => {
          if (item.minWidth && item.fieId) {
            let arr = document.querySelectorAll(`[fieId=${item.fieId}]`);
            arr.forEach(i => {
              // 如果用户设置了不显示序列号选项 则隐藏
              if (item.fieId === 'indexId' && this.serial) {
                $Z('[col="1"]')[0].style = i.style = 'display: none;';
              } else {
                // 判断是否有自定义样式
              if (item.css && typeof item.css === "string") {
                i.classList.add(item.css);
              }
            //   判断是否开启tip 并且有tip属性
              if (item.tip && this.tips) {
                i.classList.add("zoom-tip");
              }
            //   设置列宽
              i.style = `width: ${item.minWidth}%;`;
              }
            });
          }
        });
      });
      this.titleData = data;
    },
    load(gridData) {
      // 看用户是否设置了隐藏序列号
      if (this.op && this.op.hideIndex) {
        this.serial = this.op.hideIndex;
      }
      this.showLoad = true;
      if (!this.op) {
        return;
      }
      if (this.op.title) {
        let title = this.op.title;
        let titleData = [];
        // let fieIdArr = ["indexId"];
        let fieIdArr = [];
        let btns = [];
        title.forEach((item, index) => {
          titleData.push({
            id: index + 1,
            fieId: item.fieId,
            title: item.header,
            minWidth: item.width,
            sort: item.sort,
            css: item.css,
            tip: item.tip
          });
          // 给每列内容加fieId
          if (item.fieId) {
            fieIdArr.push(item.fieId);
          }
          // 如果有按钮就给每列加上
          if (item.btns) {
            btns = item.btns;
          }
        });
        this.titleData = titleData;
        // 如果内容部分有传值
        let data = [];
        if (gridData) {
          data = gridData;
        } else if (this.op.datas) {
          data = this.op.datas;
        } else {
          return;
        }
        let dataArr = [];
        // 循环先判断datas数组里每个对象里key值是否和title里key值对应
        data.forEach((item, index) => {
          let obj = {};
          // 设置索引值
          obj.indexId = index + 1;
          // obj.index = index + 1;
          // 是否有设置按钮
          if (btns && btns.length) {
            obj.btns = btns;
          }
          if (this.op.onClick) {
            obj.onClick = this.op.onClick;
          }
          for (let key in item) {
            if (fieIdArr.indexOf(key) > -1) {
              // 和头部的键对应才会加入进对象
              obj[key] = item[key];
            }
          }
          dataArr.push(obj);
        });
        // 是否设置了分页
        // if (this.op.pagerOp) {
        //   this.showPager = true;
        //   this.defaultPagerOp = this.op.pagerOp;
        // } else if (dataArr && dataArr.length) {
        //   this.defaultPagerOp.pageVal.total = dataArr.length;
        // }
        // if (
        //   this.defaultPagerOp.pageVal &&
        //   this.defaultPagerOp.pageVal.pageSize
        // ) {
        //   let data1 = dataArr.splice(0, this.defaultPagerOp.pageVal.pageSize);
        //   this.bodyData = data1; //  当前页数据
        //   this.surplus = dataArr; //  剩余数据
        // } else {
        //   this.bodyData = dataArr;
        // }
        this.bodyData = dataArr;
        this.showLoad = false;
      }
      this.setWidth();
    },
    //   排序方法
    compare(fun, property) {
      return function(a, b) {
        let value1 = a[property];
        let value2 = b[property];
        if (fun === "up") {
          return value1 - value2;
        } else {
          return value2 - value1;
        }
      };
    },
    // 排序
    sortClick(fun, item) {
      let data = this.bodyData;
      let arr = data.sort(this.compare(fun, "indexId"));
    },
    // 行点击事件
    itemClick(dom, elemnt, col, fieId) {
      // 防止改变原数据
      //  dom元素 elemnt 当前点击单元格   col 当前行
      if (col.onClick) {
        let value = JSON.parse(JSON.stringify(col));
        delete value.onClick;
        col.onClick(dom, elemnt, value, fieId);
      }
    },
    // 按钮点击事件
    iconClick(e, item) {
      if (e.onClick) {
        // 防止改变原数据
        let value = JSON.parse(JSON.stringify(item));
        delete value.btns;
        e.onClick(value);
      }
    }
  }
};
</script>
<style>
.grid-body-content .zoom-tip {
  position: relative;
}
.grid-body-content > tr:first-child td.zoom-tip::before {
  bottom: -10% !important;
  transform: rotate(180deg) !important;
}
.grid-body-content > tr:first-child td.zoom-tip::after {
  bottom: -166% !important;
}
.grid-body-content .zoom-tip::after,
.grid-body-content > tr:first-child td.zoom-tip::after {
  content: attr(zoom-tip);
  display: none;
  position: absolute;
  padding: 5px 10px;
  left: 15%;
  bottom: 100%;
  width: 150px;
  margin-bottom: 12px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  font-size: 12px;
  border-radius: 5px;
  background: #000;
  color: #fff;
  cursor: default;
}
.grid-body-content .zoom-tip::before,
.grid-body-content > tr:first-child td.zoom-tip::before {
  content: " ";
  position: absolute;
  display: none;
  left: 15%;
  bottom: 100%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  margin-bottom: 3px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 9px solid #000;
}
.grid-body-content > tr:first-child td.zoom-tip:hover::after,
.grid-body-content > tr:first-child td.zoom-tip:hover::before,
.zoom-tip:hover::after,
.zoom-tip:hover::before {
  display: block;
}
.grid-bodybox .grid-input .zoom-icon span:hover {
  cursor: pointer;
  font-weight: bold;
  color: #096dd9;
}
.grid-bodybox .grid-input .zoom-icon span {
  font-size: 20px;
  line-height: 20px;
  color: #1890ff;
}
.grid-body .zoom-not-data p span {
  display: block;
}
.grid-body .zoom-not-data p .zoom-icon {
    font-size: 4em;
    font-weight: bold;
}
.grid-body .zoom-not-data p {
  padding: 50px 0;
}
.grid-body .zoom-not-data {
  text-align: center;
}
.grid-tbody tbody tr:nth-child(odd),
.grid-tfoot tbody tr:nth-child(odd),
.grid-thead tbody tr:nth-child(odd) {
  background: #fff;
}
.grid-tbody tbody tr:hover,
.grid-tfoot tbody tr:hover,
.grid-thead tbody tr:hover {
  background: #e4ecef;
}
.grid-tbody .grid-row.active {
  background: #e6f7ff;
}
.zoom-grid .grid-table tbody tr td .grid-input {
  position: relative;
  padding-left: 0.2em;
  width: 100%;
  display: block;
}
.grid-tbody tbody tr:first-child td,
.grid-tfoot tbody tr:first-child td,
.grid-thead tbody tr:first-child td {
  border-top: none;
}
.grid-tbody .grid-row .grid-item {
  height: 30px;
  line-height: 30px;
  cursor: default;
  color: #333;
}
.grid-tbody tbody tr,
.grid-tfoot tbody tr,
.grid-thead tbody tr {
  color: #333;
  background: #fafafa;
}
.grid-body {
  position: relative;
  overflow-y: auto;
}
/* 表格头 */
.grid-thead thead:last-child tr:last-child th {
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  padding-left: 0.2em;
  color: #333;
}
.grid-thead span:not(.zoom-icon) {
  overflow: hidden;
  text-overflow: ellipsis;
  word-spacing: normal;
  height: 30px;
  line-height: 28px;
}
.grid-thead .zoom-sort span {
  position: absolute;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  width: 100%;
  height: 14px;
  line-height: 14px;
  margin-top: 5px;
  top: -1px;
  left: 0;
}
.grid-thead .zoom-sort span + span {
  top: 31%;
}
.grid-thead .zoom-sort .zoom-icon:hover {
  color: #333;
}
.grid-thead .zoom-sort .zoom-icon {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.grid-thead .zoom-sort span {
  position: absolute;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  width: 100%;
  height: 14px;
  line-height: 14px;
  margin-top: 5px;
  top: -1px;
  left: 0;
}
.grid-thead .zoom-sort {
  float: right;
  cursor: pointer;
  position: relative;
  height: 30px;
  width: 20px;
  text-align: center;
}
.zoom-grid .grid-inneritem,
.zoom-grid td .grid-input,
.zoom-grid th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zoom-grid .grid-head thead .grid-inneritem {
  height: 30px;
  line-height: 30px;
}
.grid-table thead.grid-head-content th.grid-item {
  text-align: left;
}
.grid-tbody tbody tr td:first-child,
.grid-tbody tbody tr th:first-child,
.grid-tbody thead tr td:first-child,
.grid-tbody thead tr th:first-child,
.grid-tfoot tbody tr td:first-child,
.grid-tfoot tbody tr th:first-child,
.grid-tfoot thead tr td:first-child,
.grid-tfoot thead tr th:first-child,
.grid-thead tbody tr td:first-child,
.grid-thead tbody tr th:first-child,
.grid-thead thead tr td:first-child,
.grid-thead thead tr th:first-child {
  text-align: center;
  border-left: 0;
  width: 80px;
}
.grid-thead thead tr th:first-child {
  border-right: none;
}
.zoom-grid .grid-table thead.grid-head-content tr {
  height: 36px;
  background: #f1f1f1;
  color: #333;
}
.grid-thead tr:first-child {
  border-top-color: transparent;
}
.grid-tbody thead,
.grid-tfoot thead,
.grid-thead thead {
  background: #f1f1f1;
  color: #333;
}
.grid-tbody thead,
.grid-tbody thead:first-child td,
.grid-tbody thead:first-child th,
.grid-tfoot thead,
.grid-tfoot thead:first-child td,
.grid-tfoot thead:first-child th,
.grid-thead thead,
.grid-thead thead:first-child td,
.grid-thead thead:first-child th {
  border: none;
}
.grid-tbody,
.grid-tfoot,
.grid-thead {
  table-layout: fixed;
  width: 100%;
}
.grid-head .grid-headbox {
  border-top: none;
  border-bottom: none;
  padding-right: 0;
}
.grid-body,
.grid-foot,
.grid-head {
  overflow: hidden;
}
.zoom-grid .zoom-grid-body {
  text-align: left;
  border-bottom: 1px solid #d9d9d9;
  background: #ffffff;
}
.zoom-grid .item-checkbox,
.zoom-grid .item-checkbox-checked,
.zoom-grid .zoom-grid-body,
.zoom-grid .table-data-rate {
  position: relative;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
<template>
  <div class="zoom-grid">
      <div class="zoom-grid-body">
          <!-- 表头 -->
          <div class="grid-head">
              <div class="grid-headbox">
                  <table class="grid-table grid-thead">
                      <thead class="grid-head-content">
                          <tr>
                              <!-- <th v-for="item of titleData" :key="item.id" :col="item.id" class="grid-item item-sort" field="indexId" :style=" 'width: ' + item.minWidth + 'px;' "> -->
                              <th v-for="item of titleData" :key="item.id" :col="item.id" :class="item.sort ? 'item-sort' : ''" class="grid-item">
                                  <div v-if="item.sort" minwidth="56" class="grid-sort">
                                      <span @click="sortClick('up', item)" class="asc zoom-icon icon iconfont icon-up"></span>
                                      <span @click="sortClick('down', item)" class="asc zoom-icon icon iconfont icon-down"></span>
                                  </div>
                                  <span class="thead-title">{{item.title}}</span>
                              </th>
                          </tr>
                      </thead>
                  </table>
              </div>
          </div>
          <!-- 内容 -->
          <div  class="grid-body">
              <div v-if="!bodyData" class="zoom-not-data">
                  <p>
                  <span class="icon iconfont icon-close"></span>
                      暂无数据
                  </p>
              </div>
              <div class="grid-bodybox">
                  <table class="grid-table grid-tbody">
                      <tbody class="grid-body-content">
                          <tr v-for="item of bodyData" :key="item.indexId" :_row="item.indexId" :class="{'active':item.indexId == clickIndex}" @click="clickIndex = item.indexId" class="grid-row">
                              <td v-for="(i, index) of item" :key="index" class="grid-item">
                                  <span class="grid-input">
                                      {{i === item.btns ? '' : i}}
                                      <!-- 如果是按钮组, 就不展示文本信息, 而是渲染按钮 -->
                                      <a v-if="i === item.btns" v-for="(j, jIndex) of i" :key="jIndex" :title="j.title" @click="iconClick(j, item)" class="zoom-icon">
                                          <span :class="j.css.icon ? 'icon iconfont ' + j.css.icon : j.css"></span>
                                      </a>
                                  </span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      <!-- 尾部 -->
      <div v-if="showPager" class="grid-foot">
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
          title: {
            type: Array,
            default() {
                return []
            }
          },
          datas: {
              type: Array,
              default() {
                  return {}
              }
          },
          pagerOp: Object
      }
  },
  data() {
      return {
        surplus: [],    //   剩余数据
        showPager: true,
        defaultPagerOp: {
            pageVal: {
                total: 0,
                curPage: 1,
                pageSize: 10
            }
        },
        clickIndex: -1,
        titleData: [
            {id: 0, fieId: "indexId", title: '', minWidth: 36, sort: true},
            {id: 1, fieId: "operation", title: '操作', minWidth: 36},
            {id: 2, fieId: "userName", title: '用户名称', minWidth: 36},
            {id: 3, fieId: "fullName", title: '中文名称', minWidth: 36},
            {id: 4, fieId: "userEmail", title: '邮箱', minWidth: 36},
            {id: 5, fieId: "roleName", title: '角色', minWidth: 36},
            {id: 6, fieId: "depaer1", title: '一级标题', minWidth: 36},
            {id: 7, fieId: "depaer4", title: '四级标题', minWidth: 36},
            {id: 8, fieId: "createDate", title: '创建时间', minWidth: 36}
        ],
        bodyData: [
            {indexId: 0, userName: 'Tom', fullName: '汤姆', userEmail: 'Tom@qq.com', roleName: '游客', depaer1: '一级标题', depaer4: '四级标题', createDate: '2019-11-11'},
            {indexId: 1, userName: 'Jerry', fullName: '杰瑞', userEmail: 'Jerry@qq.com', roleName: 'VIP1', depaer1: '一级标题', depaer4: '四级标题', createDate: '2019-11-12'},
            {indexId: 2, userName: 'dingding', fullName: '钉钉', userEmail: 'dingding@qq.com', roleName: 'VIP2', depaer1: '一级标题', depaer4: '四级标题', createDate: '2019-11-13'},
            {indexId: 3, userName: 'Lin', fullName: '林主明', userEmail: 'linzhuming@qq.com', roleName: 'BOSS', depaer1: '一级标题', depaer4: '四级标题', createDate: '2019-10-11'},
            {indexId: 4, userName: 'yangmi', fullName: '杨幂', userEmail: 'yangmi@qq.com', roleName: 'VIP6', depaer1: '一级标题', depaer4: '四级标题', createDate: '2019-11-15'},
            {indexId: 5, userName: 'renzhengfei', fullName: '阿飞', userEmail: 'renzhengfei@qq.com', roleName: 'BOSS', depaer1: '一级标题', depaer4: '四级标题', createDate: '2018-11-11'}
        ]
      }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (!this.op) {
        return
      }
      if (this.op.title) {
        let title = this.op.title;
        let titleData = [];
        let fieIdArr = ['indexId'];
        let btns = [];
        title.forEach((item, index) => {
            titleData.push({id: index + 1, fieId: item.fieId, title: item.header, minWidth: item.width, sort: item.sort});
            if (item.fieId) {
                fieIdArr.push(item.fieId);
            }
            if (item.btns) {
                btns = item.btns;
            }
        });
        this.titleData = titleData;
            // 如果内容部分有传值
        if (this.op.datas) {
            let data = this.op.datas;
            let dataArr = [];
            // 循环先判断datas数组里每个对象里key值是否和title里key值对应
            data.forEach((item, index) => {
                let obj = {};
                // 设置索引值
                obj.indexId = index + 1;
                // 是否有设置按钮
                if (btns && btns.length) {
                    obj.btns = btns;
                }
                for (let key in item) {
                    if (fieIdArr.indexOf(key) > -1) {
                        // 和头部的键对应才会加入进对象
                        obj[key] = item[key];
                    }
                }
                dataArr.push(obj);
            })
            this.bodyData = dataArr;
        }
      }
        // 是否设置了分页
      if (this.op.pagerOp) {
        this.defaultPagerOp = this.op.pagerOp;
      } else if (this.bodyData && this.bodyData.length) {
        this.defaultPagerOp.pageVal.total = this.bodyData.length;
      }
      if (this.defaultPagerOp.pageVal) {
        let data = this.bodyData;
        let data1 = data.splice(0, this.defaultPagerOp.pageVal.pageSize);
        this.surplus = data;  //  当前页数据
        this.bodyData = data1;  //  当前页数据
      }
    },
    //   排序方法
    compare(fun, property) {
        return function(a, b) {
            let value1 = a[property];
            let value2 = b[property];
            if (fun === 'up') {
                return value1 - value2;
            } else {
                return value2 - value1;
            }
        }
    },
    // 排序
    sortClick(fun, item) {
        let data = this.bodyData;
        let arr = data.sort(this.compare(fun, 'indexId'));
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
.grid-bodybox .grid-input .zoom-icon span:hover {
    cursor: pointer;
    color: #096dd9;
}
.grid-bodybox .grid-input .zoom-icon span {
    font-size: 20px;
    line-height: 20px;
    color: #1890ff;
}
.grid-body .zoom-not-data p {
    line-height: 150px;
}
.grid-body .zoom-not-data {
    text-align: center;
}
.grid-tbody tbody
tr:nth-child(odd), .grid-tfoot tbody
tr:nth-child(odd), .grid-thead
tbody tr:nth-child(odd) {
    background: #fff;
}
.grid-tbody tbody tr:hover, .grid-tfoot tbody tr:hover, .grid-thead tbody tr:hover {
    background: #e4ecef;
}
.grid-tbody .grid-row.active {
    background: #e6f7ff;
}
.zoom-grid .grid-table tbody tr td .grid-input {
    position: relative;
    padding-left: .2em;
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
.grid-thead thead:last-child
tr:last-child th {
    border-bottom: 1px solid #d9d9d9;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    padding-left: .2em;
    color: #333;
}
.grid-thead span:not(.zoom-icon) {
    overflow: hidden;
    text-overflow: ellipsis;
    word-spacing: normal;
    height: 30px;
    line-height: 28px;
}
.grid-thead .grid-sort span {
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
.grid-thead .grid-sort span+span {
    top: 31%;
}
.grid-thead .grid-sort .zoom-icon:hover {
    color: #333;
}
.grid-thead .grid-sort .zoom-icon {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.grid-thead .grid-sort span {
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
.grid-thead .grid-sort {
    float: right;
    cursor: pointer;
    position: relative;
    height: 30px;
    width: 20px;
    text-align: center;
}
.zoom-grid .grid-inneritem, .zoom-grid td .grid-input, .zoom-grid th {
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
.grid-tbody tbody tr
td:first-child, .grid-tbody tbody tr
th:first-child, .grid-tbody thead tr
td:first-child, .grid-tbody thead tr
th:first-child, .grid-tfoot tbody tr
td:first-child, .grid-tfoot tbody tr
th:first-child, .grid-tfoot thead tr
td:first-child, .grid-tfoot thead tr
th:first-child, .grid-thead tbody tr
td:first-child, .grid-thead tbody tr
th:first-child, .grid-thead thead tr
td:first-child, .grid-thead thead tr
th:first-child {
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
.grid-tbody thead, .grid-tfoot thead, .grid-thead thead {
    background: #f1f1f1;
    color: #333;
}
.grid-tbody thead, .grid-tbody thead:first-child td, .grid-tbody thead:first-child th, .grid-tfoot thead, .grid-tfoot thead:first-child td, .grid-tfoot thead:first-child th, .grid-thead thead, .grid-thead thead:first-child td, .grid-thead thead:first-child th {
    border: none;
}
.grid-tbody, .grid-tfoot, .grid-thead {
    table-layout: fixed;
    width: 100%;
}
.grid-head .grid-headbox {
    border-top: none;
    border-bottom: none;
    padding-right: 0;
}
.grid-body, .grid-foot, .grid-head {
    overflow: hidden;
}
.zoom-grid .zoom-grid-body {
    text-align: left;
    border-bottom: 1px solid #d9d9d9;
    background: #ffffff;
}
.zoom-grid .item-checkbox, .zoom-grid .item-checkbox-checked, .zoom-grid .zoom-grid-body, .zoom-grid .table-data-rate {
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
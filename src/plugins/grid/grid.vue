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
                              <th v-for="item of titleData" :key="item.id" :col="item.id" class="grid-item item-sort">
                                  <div v-if="item.sort" minwidth="56" class="grid-sort">
                                      <span class="asc zoom-icon icon iconfont icon-up"></span>
                                      <span class="asc zoom-icon icon iconfont icon-down"></span>
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
                              <td class="grid-item" fieId="indexId">
                                  <span class="grid-input">{{item.indexId}}</span>
                              </td>
                              <td class="grid-item table-operation" fieId="operate">
                                  <!-- <span v-for="(i, index) of item.btns" :key="index" class="grid-input">
                                      <span>
                                        <a title="i.title">
                                            <span :class="i.css.icon?i.css.icon:i.css"></span>
                                        </a>
                                      </span>
                                  </span> -->
                              </td>
                              <td class="grid-item" fieId="userName">
                                  <span class="grid-input">{{item.userName}}</span>
                              </td>
                              <td class="grid-item" fieId="fullName">
                                  <span class="grid-input">{{item.fullName}}</span>
                              </td>
                              <td class="grid-item" fieId="userEmail">
                                  <span class="grid-input">{{item.userEmail}}</span>
                              </td>
                              <td class="grid-item" fieId="roleName">
                                  <span class="grid-input">{{item.roleName}}</span>
                              </td>
                              <td class="grid-item" fieId="depaer1">
                                  <span class="grid-input">{{item.depaer1}}</span>
                              </td>
                              <td class="grid-item" fieId="depaer4">
                                  <span class="grid-input">{{item.depaer4}}</span>
                              </td>
                              <td class="grid-item" fieId="createDate">
                                  <span class="grid-input">{{item.createDate}}</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "zoom-grid",
  props: {
      op: {
          type: Object,
          data: {
              type: Array,
              default() {
                  return {}
              }
          }
      },
  },
  data() {
      return {
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
    if (this.op) {
        if (this.op.data) {
            let data = this.op.data;
            let titleData = [];
            let btns = [];
            data.forEach((item, index) => {
                titleData.push({id: index + 1, fieId: item.fieId, title: item.header, minWidth: item.width, sort: item.sort});
                if (item.btns) {
                    btns = item.btns;
                }
            });
            this.titleData = titleData;
            // this.bodyData.map(item => {
            //     item.btns = btns;
            //     console.log(item);
            //     return item;
            // })
            console.log(this.titleData, 'this.titleData');
        }
    }
  },
};
</script>
<style>
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
.grid-thead .grid-sort .zoom-icon {
    font-style: normal;
    font-weight: 400;
    position: relative;
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
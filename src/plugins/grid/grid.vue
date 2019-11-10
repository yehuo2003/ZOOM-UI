<template>
  <div>
      grid
  </div>
</template>
<script>
export default {
  name: "zoom-grid",
  props: {
      op: {
      }
  },
  data() {
      return {
      }
  },
  created() {
  },
};
</script>
<style>
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
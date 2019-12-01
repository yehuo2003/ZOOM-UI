<template>
  <div class="zoom-transfer transfer-clear">
      <div class="transfer-clear">
        <!-- 左边原始数据 -->
        <div class="transfer-panel">
        <div class="transfer-panel-header">
            所有数据列表
            <span class="transfer-panel-selected">0 / 12</span>
        </div>
        <div class="transfer-panel-search">
            <zoom-input :op="inputOp"></zoom-input>
        </div>
        <div class="transfer-panel-content">
            <div class="no-data">没有数据</div>
            <!-- <div class="no--match-data">没有匹配到数据</div> -->
        </div>
        <zoom-grid :op="gridOp"></zoom-grid>
        <div class="transfer-panel-pager">
            <zoom-pager></zoom-pager>
        </div>
        </div>
        <!-- 中间图标 -->
        <div class="transfer-center">
        <div class="zoom-icon icon-add"></div>
        <div class="zoom-icon icon-jian"></div>
        </div>
        <!-- 右边选中数据 -->
        <div class="transfer-panel select-panel">
        <div class="transfer-panel-header">
            所有数据列表
            <span class="transfer-panel-selected">0 / 12</span>
        </div>
        <div class="transfer-panel-search">
            <zoom-input :op="inputOp"></zoom-input>
        </div>
        <div class="transfer-panel-content">
            <div class="no-data">没有数据</div>
            <div class="no--match-data">没有匹配到数据</div>
        </div>
        <zoom-grid :op="gridOp"></zoom-grid>
        <div class="transfer-panel-pager">
            <zoom-pager></zoom-pager>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-transfer',
    props: {
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>
<style>
.zoom-transfer .transfer-center .iconfont {
    font-family: iconfont;
    font-size: 20px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 30px;
}
.zoom-transfer .transfer-center {
    position: relative;
    float: left;
    width: 36px;
    margin: 0 16px;
    height: 530px;
    text-align: center;
}
/* 左边 */
.zoom-transfer .transfer-panel .transfer-panel-pager {
    width: 100%;
    height: 30px;
    padding: 0 8px;
    text-align: right;
    margin: 8px 0;
}
.zoom-transfer .transfer-panel .transfer-panel-content .no-data,
.zoom-transfer .transfer-panel .transfer-panel-content .no--match-data {
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.zoom-transfer .transfer-panel .transfer-panel-content {
    width: 100%;
    min-height: 400px;
    padding: 0 8px;
    position: relative;
    margin-bottom: 10px;
}
.zoom-transfer .transfer-panel .transfer-panel-search>.zoom-input {
    width: 100%;
}
.zoom-transfer .transfer-panel .transfer-panel-search {
    width: 100%;
    margin-top: 8px;
    padding: 0 8px;
    height: 40px;
    text-align: left;
}
.zoom-transfer .transfer-panel .transfer-panel-header .transfer-panel-selected {
    float: right;
    text-align: right;
}
.zoom-transfer .transfer-panel .transfer-panel-header {
    height: 36px;
    width: 100%;
    line-height: 36px;
    background: #f5f5f5;
    padding: 0 8px;
    text-align: left;
    color: #333;
    border-bottom: 1px solid #d9d9d9;
}
.zoom-transfer .transfer-panel {
    width: 45%;
    border: 1px solid #d9d9d9;
    float: left;
    border-radius: 3px;
}
.zoom-transfer {
    width: 100%;
    position: relative;
}
.transfer-clear::after, .transfer-clear::before {
    content: " ";
    display: table;
}
</style>

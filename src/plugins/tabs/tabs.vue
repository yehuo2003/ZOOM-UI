<template>
  <div class="zoom-tabs" style="margin: 20px;">
      <div class="zoom-tabs-top">
          <div class="zoom-tab-item">
              <div class="tab-tops-item">
                  Tab 1
                  <span class="zoom-icon icon iconfont icon-close"></span>
              </div>
          </div>
          <div class="zoom-tab-item tab-active">
              <div class="tab-tops-item">
                  Tab 2
                  <span class="zoom-icon icon iconfont icon-close"></span>
              </div>
          </div>
      </div>
      <div class="zoom-tabs-content">
          <slot></slot>
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-tabs',
    props: {
        op: {
        }
    },
}
</script>
<style>
.zoom-tabs-content {
    padding: 15px 24px;
    text-align: left;
    overflow: hidden;
}
.zoom-tabs .zoom-tabs-top .tab-tops-item .zoom-icon {
    position: relative;
    font-size: 12px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item.tab-active::before {
    content: " ";
    display: block;
    border-top: 3px solid #1890ff;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item.tab-active {
    border-bottom: 1px solid #fff;
    border-top: 0;
    color: #1890ff;
}
.zoom-tabs .zoom-tabs-top .tab-tops-item {
    padding: 0 24px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    -webkit-transition: color .3s cubic-bezier(645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
    transition: color .3s cubic-bezier(645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item:last-child {
    border-right: 1px solid #d9d9d9;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item {
    border: 1px solid #d9d9d9;
    border-right: none;
    border-bottom: none;
    top: 1px;
    white-space: nowrap;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    float: left;
    z-index: 2;
}
.zoom-tabs .zoom-tabs-top {
    border-bottom: 1px solid #d9d9d9;
    padding: 0;
    position: relative;
    margin: 0;
    width: 100%;
    float: left;
}
</style>

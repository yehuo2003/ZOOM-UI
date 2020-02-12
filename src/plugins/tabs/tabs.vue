<template>
  <div class="tab-container">
    <ul class="tab-head">
      <slot></slot>
    </ul>
    <content-container :panels="panels" />
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    data() {
      return {
        panels: [] // 子组件mounted的时候将自己push到该数组中
      }
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    methods: {
      tabChange(index) {
        this.$emit('tabChange',index)
      }
    }
  }
</script>

<style scoped>
.tab-container{
  width: 500px;
}
.tab-head {
  padding: 0 15px;
  border-bottom: 2px solid #ccc;
  font-size: 0;
}
/* .zoom-tabs-content {
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
} */
</style>
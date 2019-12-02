<template>
  <div class="zoom-icon-list">
      <div v-for="(item, index) of list" :key="index" class="icon-gorup">
        <span class="zoom-icon icon-comments" :class="item.cls"></span>
        <p>{{item.name}}</p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          list: [
              {cls: 'icon-comments', name: '评论'},
              {cls: 'icon-cry', name: '哭'},
              {cls: 'icon-radio-fill', name: '单选激活'},
              {cls: 'icon-radio', name: '单选'},
              {cls: 'icon-checkbox', name: '复选框'},
              {cls: 'icon-checkbox-fill', name: '复选框选中'},
              {cls: 'icon-box-fill', name: '方形选中'},
              {cls: 'icon-close-plus', name: '关闭-大'},
              {cls: 'icon-close-fill', name: '关闭激活'},
              {cls: 'icon-close', name: '关闭'},
              {cls: 'icon-add', name: '加号'},
              {cls: 'icon-add-plus', name: '加号-大'},
              {cls: 'icon-add-fill', name: '加号-激活'},
              {cls: 'icon-hint-fill', name: '提示-激活'},
              {cls: 'icon-hint', name: '提示'},
              {cls: 'icon-query-fill', name: '疑问-激活'},
              {cls: 'icon-query', name: '疑问'},
              {cls: 'icon-success-box', name: '圆形未选中'},
              {cls: 'icon-success-fill', name: '圆形选中-fill'},
              {cls: 'icon-success', name: '圆形选中'},
              {cls: 'icon-asterisk-fill', name: '标星-fill'},
              {cls: 'icon-asterisk', name: '标星'},
              {cls: 'icon-repeal', name: '撤销'},
              {cls: 'icon-edit', name: '编辑'},
              {cls: 'icon-more', name: '更多'},
              {cls: 'icon-clear', name: '清除'},
              {cls: 'icon-delete', name: '删除'},
              {cls: 'icon-info-fill', name: '信息-fill'},
              {cls: 'icon-info', name: '信息'},
              {cls: 'icon-trim', name: '整理'},
              {cls: 'icon-up-fill', name: '向上-fill'},
              {cls: 'icon-up', name: '向上'},
              {cls: 'icon-down-fill', name: '向下-fill'},
              {cls: 'icon-down', name: '向下'},
              {cls: 'icon-left', name: '左'},
              {cls: 'icon-right', name: '右'},
              {cls: 'icon-towards-right', name: '向右'},
              {cls: 'icon-towards-left', name: '向左'},
              {cls: 'icon-enshrine-fill', name: '收藏-fill'},
              {cls: 'icon-enshrine', name: '收藏'},
              {cls: 'icon-search', name: '搜索'},
              {cls: 'icon-share', name: '分享'},
              {cls: 'icon-message', name: '消息'},
              {cls: 'icon-like-fill', name: '喜欢-fill'},
              {cls: 'icon-like', name: '喜欢'},
              {cls: 'icon-praise-fill', name: '赞-fill'},
              {cls: 'icon-praise', name: '赞'},
              {cls: 'icon-filter', name: '滤镜'},
              {cls: 'icon-photograph-rever', name: '翻转镜头'},
              {cls: 'icon-photograph', name: '拍照'},
              {cls: 'icon-flicker', name: '闪光灯打开'},
              {cls: 'icon-flicker-close', name: '闪光灯关闭'},
              {cls: 'icon-step-back', name: '快退'},
              {cls: 'icon-magnify', name: '变大'},
              {cls: 'icon-step-speed', name: '快进'},
              {cls: 'icon-pause', name: '暂停'},
              {cls: 'icon-trumpet', name: '音量'},
              {cls: 'icon-shrink', name: '缩小'},
              {cls: 'icon-img', name: '图片'},
              {cls: 'icon-nav', name: '导航'},
              {cls: 'icon-to-top', name: '回到顶部'},
              {cls: 'icon-phone', name: '电话'},
              {cls: 'icon-service', name: '客服'},
              {cls: 'icon-list', name: '列表'},
              {cls: 'icon-catalog', name: '目录'},
              {cls: 'icon-clock', name: '闹钟'},
              {cls: 'icon-scan-code', name: '扫一扫'},
              {cls: 'icon-wifi', name: 'wifi'},
              {cls: 'icon-store', name: '店铺'},
              {cls: 'icon-order', name: '订单'},
              {cls: 'icon-order-success', name: '订单 已成功'},
              {cls: 'icon-shopping-cart', name: '购物车'},
              {cls: 'icon-calendar', name: '日历'},
              {cls: 'icon-user', name: '我的'},
              {cls: 'icon-stop', name: '减'},
              {cls: 'icon-refresh', name: '刷新'},
              {cls: 'icon-laugh', name: '笑脸'},
              {cls: 'icon-stop-fill', name: '表单控件 删除'},
              {cls: 'icon-enter', name: '共享航班小'},
              {cls: 'icon-modification', name: '修改'},
              {cls: 'icon-guide', name: '指南'},
              {cls: 'icon-full-screen', name: '全屏'},
              {cls: 'icon-home', name: '说明'},
            //   {cls: 'icon-full-screen', name: ''},
              {cls: 'icon-pie', name: '我的'},
              {cls: 'icon-caution', name: '放大镜'},
              {cls: 'icon-allot', name: '灯泡'},
              {cls: 'icon-warning', name: '警告'},
              {cls: 'icon-set', name: '收起'},
              {cls: 'icon-price', name: '设置/管理'},
              {cls: 'icon-target', name: '关闭'},
              {cls: 'icon-lock', name: '报表'},
              {cls: 'icon-form', name: '锁'},
              {cls: 'icon-channel', name: '单据'},
            //   {cls: 'icon-rmb', name: '价格'},
              {cls: 'icon-release', name: '仓库'},
              {cls: 'icon-turnover', name: '日历'},
              {cls: 'icon-indicator', name: '进出'},
              {cls: 'icon-structure', name: '垃圾桶'},
              {cls: 'icon-location', name: '单据管理'},
              {cls: 'icon-RectangleCopy253', name: '素材中心'},
              {cls: 'icon-location2', name: '定位'},
              {cls: 'icon-logistics', name: '物流'},
          ]
      }
  }
};
</script>
<style>
.zoom-icon-list .icon-gorup:hover {
    color: #1890ff;
    cursor: pointer;
}
.zoom-icon-list .icon-gorup span {
    font-size: 30px;
    line-height: 40px;
}
.zoom-icon-list .icon-gorup {
    float: left;
    padding: 20px;
    width: 120px;
    text-align: center;
}
.zoom-icon-list {
    text-align: left;
    padding: 20px;
}
</style>
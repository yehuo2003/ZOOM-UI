<template>
  <div class="more">
    <h1>说明</h1>
    <div class="explan">
      <ol>
        <li>zoom-ui组件为本人个人所开发，项目从2019年开始开发，至今已有两年，并决定于2021年3月28日开源，本人承诺：本网站内组件永久免费开源，以供各位开发者和设计师使用。</li>
        <li>如果您在使用zoom-ui组件过程中有遇到BUG或者有不明白的地方，或者您对zoom-ui组件有好的建议或者意见，随时可以与本人联系。</li>
        <li>对于发现的BUG或者存在的问题，本人会积极解决并更新组件。</li>
        <li>根据市场需要，本人将不定期添加新组件或优化现有组件功能，更新内容会在本页说明。</li>
        <li>zoom-ui是一款非常强大的UI组件，页面上所开放的仅为zoom-ui部分组件，主要是一些比较大众化、常用的组件。另有其它业务组件没有公开，
      涉及领域如商城、医疗、物流、金融等等。zoom-ui支持私人或者企业定制化组件，如果有具体的业务需求，可与本人联系，定制符合您需求的组件库或插件。</li>
        <li>您要是觉得本组件好用的话，可以推荐给身边的人使用。如果想对zoom-ui组件提供支持的话，也可以和我联系，最后感谢您的肯定和支持！</li>
      </ol>
    </div>
    <zoom-panel title="学习交流" :show="true">
      <p>
        博客：<zoom-link target="_blank" url="https://blog.csdn.net/yehuo2003" type="primary">https://blog.csdn.net/yehuo2003</zoom-link><br>
      </p>
      <p>
        Github：<zoom-link target="_blank" url="https://github.com/yehuo2003" type="primary">https://github.com/yehuo2003</zoom-link><br>
      </p>
      <p>
        Gitee：<zoom-link target="_blank" url="https://gitee.com/yehuo2003" type="primary">https://gitee.com/yehuo2003</zoom-link><br>
      </p>
    </zoom-panel>
    <zoom-panel title="联系方式" :show="true">
      <p>微信：<span>yehuo2003</span></p>
      <p>邮箱：<zoom-link target="_blank" url="mailto:yehuo2103@163.com" type="primary">yehuo2103@163.com</zoom-link></p>
      <p><zoom-link target="_blank" url="http://wpa.qq.com/msgrd?v=3&amp;uin=9208608&amp;site=qq&amp;menu=yes" type="primary">QQ联系</zoom-link></p>
    </zoom-panel>
    <!-- <zoom-panel title="赞助作者" :show="true">
      <div class="sponsored">
        <p><span>微信收款码：</span><br><img :src="require('./component/static/wx.png')" alt="微信收款码" title="微信收款码"></p>
        <p><span>支付宝收款码：</span><br><img :src="require('./component/static/zfb.jpg')" alt="支付宝收款码" title="支付宝收款码"></p>
      </div>
    </zoom-panel> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$zoom.$t('test.iter'), 'test.iter===========');
  }
}
</script>
<style lang="scss">
.more {
  text-align: left;
  padding-left: 20px;
  font-size: 16px;
  .explan {
    margin-top: 20px;
    li {
      list-style-type: unset;
      line-height: 2;
      font-size: 16px;
      margin-left: 20px;
    }
    p {
      line-height: 2;
      font-size: 16px;
    }
  }
  .sponsored {
    p {
      float: left;
      margin-right: 20px;
      span {
        font-size: 14px;
      }
      img {
        width: 400px;
        height: 600px;
      }
    }
  }
}
</style>
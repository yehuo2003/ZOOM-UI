<!--
 * @Description:更多
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2021-03-28 17:09:59
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-18 12:49:19
-->
<template>
  <div class="more">
    <h1>说明</h1>
    <div class="explan">
      <ol>
        <li>zoom-ui组件为本人个人所开发，项目从2019年开始开发，至今仍在更新，并决定于2021年3月28日开源，本人承诺：本网站内组件永久免费开源，以供各位开发者和设计师使用。</li>
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
    <zoom-panel title="更新日志" :show="true">
      <!-- <h3>2021.11---版本：1.1.9</h3>
      <p>修复计数器小数点BUG</p>
      <p>修复下拉框弹出框定位BUG</p>
      <h3>2021.03---版本：1.1.8</h3>
      <p>新增自定义指令 v-longPress</p>
      <p>新增自定义指令 v-waterMarker</p>
      <p>修复zoom-dropdown下拉框新增全选/取消的BUG</p>
      <h3>2021.03---版本：1.1.7</h3>
      <p>zoom-dropdown下拉框新增全选/取消功能,并修复了下拉框复选状态时候的部分BUG</p> -->
      <div v-show="showLog ? true : index < 3" v-for="(item, index) of nodeList" :key="index" class="zoom-log">
        <h3>{{ item.title }}</h3>
        <p v-for="(i, j) of item.content" :key="j">
          {{ i.text }}
        </p>
      </div>
      <div v-if="!showLog" class="hide-box">
        <span class="hide-bt">
          <i @click="logShow" class="zoom-icon icon-down"></i>
        </span>
      </div>
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
      showLog: false,
      nodeList: [
        {
          title: 'May 17, 2023---版本：1.2.9', content: [
            {text: '确认框样式修复'},
            {text: '弹出框样式修复'},
            {text: '提示框样式修复'}
          ]
        },
        {
          title: 'May 15, 2023---版本：1.2.8', content: [
            {text: 'layout组件收缩样式修改'},
            {text: '文件上传组件报错修复'}
          ]
        },
        {
          title: 'May 12, 2023---版本：1.2.7', content: [
            {text: '搜索框组件改新增mini模式'},
            {text: '搜索框组件改造为圆角'}
          ]
        },
        {
          title: 'May 11, 2023---版本：1.2.5', content: [
            {text: 'layout组件修改'},
            {text: 'date组件修改'},
            {text: '滑块组件修改'},
            {text: '弹出编辑组件修改'}
          ]
        },
        {
          title: 'May 7, 2023---版本：1.2.3', content: [
            {text: '表单BUG修复'},
            {text: '表格BUG修复'}
          ]
        },
        {
          title: 'May 7, 2023---版本：1.2.2', content: [
            {text: '树形菜单高亮部分显示错误BUG修复'},
            {text: '输入框日期组件等修复'},
            {text: 'form-item组件修复label标签BUG'}
          ]
        },
        {
          title: 'Mar 13, 2023---版本：1.2.1', content: [
            {text: '滑块验证码组件优化'},
            {text: '选择器组件优化'},
            {text: '删除多余console'}
          ]
        },
        {
          title: 'Mar 10, 2023---版本：1.2.0', content: [
            {text: 'Captcha滑块验证码优化: 如果图片连续加载失败5次,则终止运行'}
          ]
        },
        {
          title: 'Sep 11, 2021---版本：1.1.9', content: [
            {text: '修复计数器小数点BUG'},
            {text: '修复下拉框弹出框定位BUG'}
          ]
        },
        {
          title: 'Apr 3, 2021---版本：1.1.8', content: [
            {text: '新增自定义指令 v-longPress'},
            {text: '新增自定义指令 v-waterMarker'},
            {text: '修复zoom-dropdown下拉框新增全选/取消的BUG'}
          ]
        },
        {
          title: 'Mar 30, 2021---版本：1.1.7', content: [
            {text: 'zoom-dropdown下拉框新增全选/取消功能'},
            {text: '修复了下拉框复选状态时候的部分BUG'}
          ]
        },
      ],
    }
  },
  methods: {
    logShow() {
      this.showLog = true;
    }
  }
}
</script>
<style lang="scss">
.more {
  .zoom-panel-content {
    .zoom-log {
      margin-bottom: 10px;
      p {
        padding: 2px 0;
      }
    }
  }
  .hide-box {
    .hide-bt {
      .zoom-icon.icon-down {
        cursor: pointer;
        display: block;
        text-align: center;
        margin: auto;
        width: 44px;
        height: 22px;
        background: #f0f0f5;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-top: 6px;
      }
      word-wrap: normal;
      word-break: break-all;
      width: 100%;
      padding-top: 78px;
      background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(#fff));
      background: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
  }
  text-align: left;
  padding-left: 20px;
  font-size: 16px;
  position: relative;
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
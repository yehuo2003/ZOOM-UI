<template>
  <div class="custom-zoom-color">
    <!-- 普通 -->
    <tab-template :code="color">
      <template slot="header">
        <h2>色彩类型</h2>
        <h3>对于色彩类型一共有五种</h3>
        <p>分别为
          <span>primary</span>、
          <span>success</span>、
          <span>warning</span>、
          <span>danger</span>、
          <span>info</span>
          如背景色请加class
          <span>bg-primary</span>
        </p>
      </template>
      <zoom-row>
        <zoom-col span="2" class="zoom-custom-color bg-primary">bg-primary</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-success">bg-success</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-warning">bg-warning</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-danger">bg-danger</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-info">bg-info</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- 不同情况下的色彩 -->
    <tab-template :code="color2">
      <template slot="header">
        <h2>不同情况下的色彩</h2>
        <p>对<span>hover</span>、<span>active</span>状态，分别有不同的颜色呈现，以<span>primary</span>色彩示例</p>
      </template>
      <zoom-row>
        <zoom-col span="2" class="zoom-custom-color bg-primary">bg-primary</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-primary-hover">bg-primary-hover</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-primary-active">bg-primary-active</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- 添加伪类效果 -->
    <tab-template :code="color3">
      <template slot="header">
        <h2>添加伪类效果</h2>
        <p>尝试着鼠标经过和点击</p>
        <p>想在背景色基础上增加伪类效果, 可在原有基础上增加<span>class="hover"</span>、<span>class="active"</span></p>
      </template>
      <zoom-row>
        <zoom-col span="2" class="zoom-custom-color bg-primary hover active">bg-primary</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-success hover active">bg-success</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-warning hover active">bg-warning</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-danger hover active">bg-danger</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-info hover active">bg-info</zoom-col>
      </zoom-row>
    </tab-template>
    <!-- 暗色调 -->
    <tab-template :code="color4">
      <template slot="header">
        <h2>暗色调</h2>
        <p>常用的几种暗色调如下</p>
      </template>
      <zoom-row>
        <zoom-col span="2" class="zoom-custom-color bg-navigation">bg-navigation</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-info-darker">bg-info-darker</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-info-dark">bg-info-dark</zoom-col>
        <zoom-col span="2" class="zoom-custom-color bg-info">bg-info</zoom-col>
      </zoom-row>
    </tab-template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color:
        `&lt;zoom-row&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-success"&gt;bg-success&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-warning"&gt;bg-warning&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-danger"&gt;bg-danger&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      color2:
        `&lt;zoom-row&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-primary-hover"&gt;bg-primary-hover&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-primary-active"&gt;bg-primary-active&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      color3:
        `&lt;zoom-row&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-primary hover active"&gt;bg-primary&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-success hover active"&gt;bg-success&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-warning hover active"&gt;bg-warning&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-danger hover active"&gt;bg-danger&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-info hover active"&gt;bg-info&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`,
      color4:
        `&lt;zoom-row&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-navigation"&gt;bg-navigation&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-info-darker"&gt;bg-info-darker&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-info-dark"&gt;bg-info-dark&lt;/zoom-col&gt;
            &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;
          &lt;/zoom-row&gt;`
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-zoom-color {
  .zoom-custom-color {
    height: 80px;
    margin: 10px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    min-width: 175px;
    font-size: 14px;
    display: inline-block;
  }
  h1 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
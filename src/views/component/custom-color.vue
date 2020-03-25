<template>
  <div class="custom-color">
    <h1>Color色彩</h1>
    <!-- 普通 -->
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
    <zoom-tabs class="basic" :value="reseTab" @tabChange="reseChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-row>
          <zoom-col span="2" class="zoom-custom-color bg-primary">bg-primary</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-success">bg-success</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-warning">bg-warning</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-danger">bg-danger</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-info">bg-info</zoom-col>
        </zoom-row>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="color"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>不同情况下的色彩</h2>
    <p>对<span>hover</span>、<span>active</span>状态，分别有不同的颜色呈现，以<span>primary</span>色彩示例</p>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-row>
          <zoom-col span="2" class="zoom-custom-color bg-primary">bg-primary</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-primary-hover">bg-primary-hover</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-primary-active">bg-primary-active</zoom-col>
        </zoom-row>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="color2"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>添加伪类效果</h2>
    <p>尝试着鼠标经过和点击</p>
    <p>想在背景色基础上增加伪类效果, 可在原有基础上增加<span>class="hover"</span>、<span>class="active"</span></p>
    <zoom-tabs class="basic" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-row>
          <zoom-col span="2" class="zoom-custom-color bg-primary hover active">bg-primary</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-success hover active">bg-success</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-warning hover active">bg-warning</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-danger hover active">bg-danger</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-info hover active">bg-info</zoom-col>
        </zoom-row>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="color3"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <!-- 大小 -->
    <h2>暗色调</h2>
    <p>常用的几种暗色调如下</p>
    <zoom-tabs class="basic" :value="sizeTab" @tabChange="sizeChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-row>
          <zoom-col span="2" class="zoom-custom-color bg-navigation">bg-navigation</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-info-darker">bg-info-darker</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-info-dark">bg-info-dark</zoom-col>
          <zoom-col span="2" class="zoom-custom-color bg-info">bg-info</zoom-col>
        </zoom-row>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="color4"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <zoom-button @click="prevClick">自定义主题</zoom-button>
    <zoom-button @click="nextClick">输入框组件</zoom-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curTab: 0,
      reseTab: 0,
      opTab: 0,
      sizeTab: 0,
      color: `
        &lt;zoom-row&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-success"&gt;bg-success&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-warning"&gt;bg-warning&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-danger"&gt;bg-danger&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;
        &lt;/zoom-row&gt;
      `,
      color2: `
        &lt;zoom-row&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-primary"&gt;bg-primary&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-primary-hover"&gt;bg-primary-hover&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-primary-active"&gt;bg-primary-active&lt;/zoom-col&gt;
        &lt;/zoom-row&gt;
      `,
      color3: `
        &lt;zoom-row&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-primary hover active"&gt;bg-primary&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-success hover active"&gt;bg-success&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-warning hover active"&gt;bg-warning&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-danger hover active"&gt;bg-danger&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-info hover active"&gt;bg-info&lt;/zoom-col&gt;
        &lt;/zoom-row&gt;
      `,
      color4: `
        &lt;zoom-row&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-navigation"&gt;bg-navigation&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-info-darker"&gt;bg-info-darker&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-info-dark"&gt;bg-info-dark&lt;/zoom-col&gt;
          &lt;zoom-col span="2" class="zoom-custom-color bg-info"&gt;bg-info&lt;/zoom-col&gt;
        &lt;/zoom-row&gt;
      `
    }
  },
  methods: {
    tabChange(index) {
      this.curTab = index
    },
    reseChange(index) {
      this.reseTab = index
    },
    opChange(index) {
      this.opTab = index
    },
    sizeChange(index) {
      this.sizeTab = index
    },
    prevClick() {
      this.$router.push('/component/custom-icon');
    },
    nextClick() {
      this.$router.push('/component/zoom-input');
    }
  }
};
</script>
<style lang="scss" scoped>
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
.bg-info {
  background: #999;
}
.bg-info.hover:hover {
  background: #54657e;
}
.bg-info.active:active {
  background: #666;
}

.bg-danger {
  background: #f5222d;
}
.bg-danger.hover:hover {
  background: #ff4d4f;
}
.bg-danger.active:active {
  background: #cf1322;
}

.bg-success {
  background: #52c41a;
}
.bg-success.hover:hover {
  background: #73d13d;
}
.bg-success.active:active {
  background: #389e0d;
}

.bg-warning {
  background: #faad14;
}
.bg-warning.hover:hover {
  background: #ffc53d;
}
.bg-warning.active:active {
  background: #faad14;
}

.bg-primary {
  background: #1890ff;
}
.bg-primary.hover:hover {
  background: #40a9ff;
}
.bg-primary.active:active {
  background: #096dd9;
}

.bg-btn-active {
  color: #333;
  background: #e6f7ff;
}
.bg-primary-active {
  background: #096dd9;
}
.bg-primary-hover {
  background: #40a9ff;
}

.bg-info-dark {
  background: #666;
}
.bg-info-darker {
  background: #666;
}
.bg-navigation {
  background: #2e3243;
}

.custom-zoom-color {
  h1 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
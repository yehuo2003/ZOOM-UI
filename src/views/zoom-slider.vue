<template>
  <div class="custom-zoom-slider">
    <h1>滑块组件</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-slider></zoom-slider>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的滑块组件，可以用v-model绑定数值，滑块显示内容为百分比0~100%, 数据可绑定:min最小值和:max最大值</p>
    <p>比如:min=0, :max="500",	那么进度条10%的时候,值就是50,以此类推</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        滑块1
        <zoom-slider v-model="num1"></zoom-slider>
        <zoom-button @click="slider1Num">滑块1的值</zoom-button>
        <br>
        滑块2：<br>
        <zoom-slider v-model="num2" min="50" max="150"></zoom-slider>
        <zoom-button @click="slider2Num">滑块2的值</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="最小值: min">
      <p>类型: Number</p>
      <p>滑块的最小值, 默认 0</p>
      <p>用法: min="0"</p>
    </zoom-panel>
    <zoom-panel title="最大值: max">
      <p>类型: Number</p>
      <p>滑块的最大值, 默认 100</p>
      <p>用法: min="100"</p>
    </zoom-panel>
    <zoom-button @click="prevClick">滑块验证码</zoom-button>
    <zoom-button @click="nextClick">弹出编辑</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num1: 0,
      num2: 100,
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            滑块1
            &lt;zoom-slider v-model="number1"&gt;&lt;/zoom-slider&gt;
            &lt;zoom-button @click="slider1Num"&gt;滑块1的值&lt;/zoom-button&gt;
            &lt;br&gt;
            滑块2：&lt;br&gt;
            &lt;zoom-slider v-model="number2" min="50" max="200"&gt;&lt;/zoom-slider&gt;
            &lt;zoom-button @click="slider2Num"&gt;滑块2的值&lt;/zoom-button&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                number1: 0,
                number2: 100,
              }
            },
            methods: {
              slider2Num() {
                console.log('滑块2当前值是' + this.number2);
              },
              slider1Num() {
                console.log('滑块1当前值是' + this.number1);
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-slider&gt;&lt;/zoom-slider&gt;`
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  methods: {
    slider2Num() {
      console.log('滑块2当前值是' + this.num2);
    },
    slider1Num() {
      console.log('滑块1当前值是' + this.num1);
    },
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-captcha');
    },
    nextClick() {
      this.$router.push('/component/zoom-text-popup');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-slider {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-slider {
        margin-top: 40px;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-slider {
        margin-top: 40px;
      }
    }
  }
  h1,h2 {
    margin-bottom: 20px;
  }
  h3, p {
    margin-bottom: 10px;
  }
}
</style>
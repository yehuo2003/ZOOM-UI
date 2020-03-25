<template>
  <div class="custom-zoom-text-popup">
    <h1>弹出编辑</h1>
    <!-- 普通 -->
    <h2>使用方法</h2>
    <zoom-tabs class="basic" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-text-popup></zoom-text-popup>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="ipt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h3>设置属性</h3>
    <p>zoom-ui提供的弹出编辑组件，可以用v-model绑定数据，默认展示的是输入框，点击编辑状态成文本域，方便用户输入。可以绑定op对象，并设置常用属性</p>
    <p>禁用状态下，无法拖动和编辑</p>
    <zoom-tabs class="data-drop" :value="opTab" @tabChange="opChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-text-popup rows="10" :op="textPopupOp"></zoom-text-popup><br>
        禁用文本域：<br>
        <zoom-text-popup :op="textPopupOp2"></zoom-text-popup>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="opIpt"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <h2>属性</h2>
    <zoom-panel title="显示行数: rows">
      <p>类型: String, Number</p>
      <p>弹出后编辑框默认展示的行数, 默认为5</p>
      <p>用法: 在标签上直接配置 rows="参数"</p>
    </zoom-panel>
    <zoom-panel title="占位符: placeHolder">
      <p>类型: String</p>
      <p>用法: 配置op对象, 设置 placeHolder="参数"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: readonly">
      <p>类型: Boolean</p>
      <p>默认false, 为true禁止输入内容, 开启后用户无法输入但是可以清除输入框里的内容</p>
      <p>用法: 配置op对象, 设置 readonly="true"</p>
    </zoom-panel>
    <zoom-panel title="禁止输入: isdisabled">
      <p>类型: Boolean</p>
      <p>默认false, 为true则禁用输入框, 禁用状态下, 无法输入也无法清除输入框里内容</p>
      <p>用法: 配置op对象, 设置 isdisabled="true"</p>
    </zoom-panel>
    <zoom-button @click="prevClick">滑块组件</zoom-button>
    <zoom-button @click="nextClick">日期选择框组件</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textPopupOp2: {
        isdisabled: true,
      },
      textPopupOp: {
        placeHolder: '请输入内容',	// 占位符
        resize: false,						// 是否禁止拖动默认false
        isdisabled: false,			// 是否禁用默认false
        readonly: false		//是否禁止输入
      },
      opTab: 0,
      curTab: 0,
      opIpt: `
        &lt;template&gt;
          &lt;div&gt;
            &lt;zoom-text-popup :op="textPopupOp"&gt;&lt;/zoom-text-popup&gt;&lt;br&gt;
            禁用文本域：&lt;br&gt;
            &lt;zoom-text-popup :op="textPopupOp2"&gt;&lt;/zoom-text-popup&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                textPopupOp2: {
                  isdisabled: true,
                },
                textPopupOp: {
                  placeHolder: '请输入内容',	// 占位符
                  resize: false,						// 是否禁止拖动默认false
                  isdisabled: false,			// 是否禁用默认false
                  readonly: false		//是否禁止输入
                }
              }
            }
          }
        &lt;/script&gt;
      `,
      ipt:`&lt;zoom-text-popup&gt;&lt;/zoom-text-popup&gt;`
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  methods: {
    opChange(index) {
      this.opTab = index
    },
    tabChange(index) {
      this.curTab = index
    },
    prevClick() {
      this.$router.push('/component/zoom-slider');
    },
    nextClick() {
      this.$router.push('/component/zoom-date');
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-zoom-text-popup {
  .data-drop {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 180px;
      .zoom-text-popup {
        margin: 10px 0;
      }
    }
  }
  .basic {
    /deep/ .zoom-tabs-content.content-active {
      min-height: 100px;
      .zoom-text-popup {
        margin: 10px;
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
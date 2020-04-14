<template>
  <div>
    <zoom-tabs v-model="curTab" :border="true" @change="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
        <div>
          <zoom-input v-model="name" :op="inputOp"></zoom-input>
          <button @click="clear">清除</button>
          <zoom-panel title="折叠面板">
            内容
            <p>默认隐藏</p>
          </zoom-panel>
        </div>
        <zoom-dropdown ref="dropdown" :op="dropdownOp4"></zoom-dropdown>
        <!-- <zoom-dropdown v-model="name" :op="dropdownOp2"></zoom-dropdown> -->
      </zoom-tab-item>
      <zoom-tab-item :index="1" :label="'Tab2'">
        <h5 slot="label">
          我是tab2
          <i class="zoom-icon icon-close-plus"></i>
        </h5>
        <zoom-tabs position="left" :border="true" :value="curTab2" @change="tabChange2">
          <zoom-tab-item :index="0" :label="'Tab1'">
            <div>
              Tab1的内容
            </div>
          </zoom-tab-item>
          <zoom-tab-item :index="1" :label="'Tab2'">
            <div>
              Tab2的内容
            </div>
          </zoom-tab-item>
          <zoom-tab-item :index="2" :label="'Tab3'">
            <div>
              Tab3的内容
            </div>
          </zoom-tab-item>
        </zoom-tabs>
      </zoom-tab-item>
      <zoom-tab-item :index="2" :label="'Tab3'">
        <div>
          tab3
        </div>
      </zoom-tab-item>
    </zoom-tabs>
    <zoom-button @click="ceshiClick">ceshi </zoom-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputOp: {
          // minLength: 5,
          maxLength: 10,
          width: '500px'
        },
        dropdownOp4: {
          placeHolder: '--等待加载数据--',
        },
        dropdownOp2: {
          isChecked: true,
          disabled: false,
          placeHolder: '--请选择--',
          readonly: true,
          hideClose: false,
          data: [
            {value: '1', text: '北京'},
            {value: '2', text: '上海'},
            {value: '3', text: '广州'},
            {value: '4', text: '深圳'}
          ],
        },
        name: "",
        curTab: 0,
        curTab2: 0
      }
    },
    methods: {
      ceshiClick() {
        if (this.curTab > 1) {
          this.curTab = 0;
        } else {
          this.curTab ++;
        }
      },
      clear() {
        // this.name = '';
        let data = [
          {value: '1', text: '北京'},
          {value: '2', text: '上海'},
          {value: '3', text: '广州'},
          {value: '4', text: '深圳'}
        ];
        this.$refs['dropdown'].load(data);
      },
      tabChange(index) {
        this.curTab = index;
      },
      tabChange2(index) {
        this.curTab2 = index;
      }
    }
  }
</script>
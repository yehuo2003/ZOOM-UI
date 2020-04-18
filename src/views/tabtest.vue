<template>
  <div>
    <zoom-tabs v-model="curTab" :border="true" @change="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
        <div>
          <zoom-form ref="form" label-width="120px">
            <zoom-form-item inline="true" :require="true" label="名字">
              <zoom-input :op="inputOp" placeholder="请输入名字"></zoom-input>
            </zoom-form-item>
            <zoom-form-item inline="true" label="密码">
              <zoom-input></zoom-input>
            </zoom-form-item>
            <zoom-form-item label="下拉框">
              <zoom-dropdown></zoom-dropdown>
            </zoom-form-item>
            <zoom-form-item :require="true" label="搜索">
              <zoom-search :op="inputOp"></zoom-search>
            </zoom-form-item>
            <zoom-form-item :require="true" label="部门">
              <zoom-input :op="inputOp" placeholder="请输入部门"></zoom-input>
            </zoom-form-item>
            <zoom-form-item label="计数器">
              <zoom-numeric :op="inputOp"></zoom-numeric>
            </zoom-form-item>
            <zoom-form-item label="复选框">
              <zoom-checkbox :op="checkOp"></zoom-checkbox>
            </zoom-form-item>
            <zoom-form-item label="单选框">
              <zoom-radio :op="checkOp"></zoom-radio>
            </zoom-form-item>
            <zoom-form-item :require="true" label="长框">
              <zoom-textarea :op="inputOp"></zoom-textarea>
            </zoom-form-item>
          </zoom-form>
          <zoom-button @click="tesging">验证</zoom-button>
          <zoom-button @click="clear">清除</zoom-button>
          <zoom-panel title="折叠面板">
            内容
            <p>默认隐藏</p>
          </zoom-panel>
        </div>
        <zoom-floatbar :op="op"></zoom-floatbar>
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
        <div style="width: 500px">
          <zoom-progress-group ref="group" :op="groupOp"></zoom-progress-group>
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
        groupOp: {
          inside: true,
          data: [
            {progress: 40, status: 'danger'},
            {progress: 20, status: 'info'},
            {progress: 60, status: 'primary'},
            {progress: 30, status: 'warning'},
            {progress: 50, status: 'success'},
          ]
        },
        progressNumber: 50,
        op: {
          position: 'right',	// 默认right 可选参数 left, right
          data: [	//	如果未设置data 则默认显示自定义内容
            {text: '购物车', icon: 'icon-shopping-cart', onClick: val => {console.log(val);}},
            {text: '电话', icon: 'icon-phone', url: '/', target: 'blank'},
            {text: '导航', icon: 'icon-nav'}
          ]
        },
        checkOp: {
          data: [
            {value: 1, text: '唱', checked: true},
            {value: 2, text: '跳'},
            {value: 3, text: 'rap'},
            {value: 4, text: '篮球'}
          ]
        },
        inputOp: {
          errMsg: '验证不通过',
          testing: val => {
            if (!val) {
              return false
            } else {
              return true
            }
          }
        },
        dropdownOp4: {
          placeHolder: '--等待加载数据--',
          isChecked: true,
          data:  [
            {value: '1', text: '北京'},
            {value: '2', text: '上海'},
            {value: '3', text: '广州'},
            {value: '4', text: '深圳'}
          ]
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
        curTab: 2,
        curTab2: 0
      }
    },
    methods: {
      ceshiClick() {
        let data = [
            {progress: 35, status: 'danger'},
            {progress: 38, status: 'info'},
            {progress: 50, status: 'primary'},
            {progress: 100, status: 'warning'},
          ]
        this.$refs['group'].load(data);
        // if (this.curTab > 1) {
        //   this.curTab = 0;
        // } else {
        //   this.curTab ++;
        // }
      },
      tesging() {
        this.$refs['form'].valid();
      },
      clear() {
        this.$refs['form'].reset();
        // this.name = '';
        // let data = [
        //   {value: '1', text: '北京'},
        //   {value: '2', text: '上海'},
        //   {value: '3', text: '广州'},
        //   {value: '4', text: '深圳'}
        // ];
        // this.$refs['dropdown'].load(data);
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
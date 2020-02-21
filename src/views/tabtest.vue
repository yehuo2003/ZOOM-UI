<template>
  <div>
    <zoom-tabs :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
        <!-- <zoom-card border="true" hover-shadow="true"> -->
          <div>
            Tab1的内容
          </div>
          <zoom-form ref="form" submit.prevent="false" label-width="120px">
            <zoom-form-item :require="true" inline="true" label="名字">
              <zoom-input :op="inputOp" placeholder="请输入名字"></zoom-input>
            </zoom-form-item>
            <zoom-form-item inline="true" label="密码">
              <zoom-date></zoom-date>
            </zoom-form-item>
            <zoom-form-item :require="true" label="搜索">
              <zoom-search :op="inputOp"></zoom-search>
            </zoom-form-item>
            <zoom-form-item label="部门">
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
            <zoom-form-item label="长框">
              <zoom-textarea :op="inputOp"></zoom-textarea>
            </zoom-form-item>
          </zoom-form>
          <!-- <input v-model="list.apwd" type="text"> -->
        <!-- </zoom-card> -->
        <zoom-button type="primary" @click="test">验证</zoom-button>
        <zoom-button @click="quit">清除</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" :label="'Tab2'">
        <h5 slot="label">
          我是tab2
          <i class="zoom-icon icon-close-plus"></i>
        </h5>
        <div>
          <img v-lazyload="'1.jpg'" alt="">
        </div>
      </zoom-tab-item>
      <zoom-tab-item :index="2" :label="'Tab3'">
        <div>Tab3的内容</div>
      </zoom-tab-item>
    </zoom-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
            return false
          }
        },
        uname: '',
        curTab: 0 // 当前激活的tab索引
      }
    },
    methods: {
      test() {
        this.$refs['form'].valid();
      },
      quit() {
        this.$refs['form'].reset();
        // console.log(this.uname, '==');
        // this.uname = '';
      },
      tabChange(index) {
        this.curTab = index
      }
    }
  }
</script>
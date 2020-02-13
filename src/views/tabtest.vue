<template>
  <div>
    <zoom-tabs :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
        <!-- <zoom-card border="true" hover-shadow="true"> -->
          <div>
            Tab1的内容
          </div>
          <zoom-form submit.prevent="false" label-width="120px">
            <zoom-form-item label="input的名字">
              <zoom-input v-model="uname" placeholder="请输入名字" slot="content"></zoom-input>
            </zoom-form-item>
            <zoom-form-item label="密码">
              <zoom-date slot="content"></zoom-date>
            </zoom-form-item>
            <zoom-form-item label="部门">
              <zoom-input placeholder="请输入部门" slot="content"></zoom-input>
            </zoom-form-item>
          </zoom-form>
          <!-- <input v-model="list.apwd" type="text"> -->
        <!-- </zoom-card> -->
        <zoom-button @click="quit">清除</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" :label="'Tab2'">
        <h5 slot="label">
          我是tab2
          <i class="zoom-icon icon-close-plus"></i>
        </h5>
        <div>Tab2的内容</div>
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
        uname: '',
        curTab: 0 // 当前激活的tab索引
      }
    },
    methods: {
      quit() {
        // console.log(this.uname, '==');
        this.uname = '';
      },
      tabChange(index) {
        this.curTab = index
      }
    }
  }
</script>
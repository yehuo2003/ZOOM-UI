<template>
  <div>
    <zoom-tabs position="left" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
          <div>
            Tab1的内容
          </div>
          <zoom-form ref="form" submit.prevent="false" label-width="120px">
            <zoom-form-item inline="true" :require="true" label="名字">
              <zoom-input v-model="name" :op="inputOp" placeholder="请输入名字"></zoom-input>
            </zoom-form-item>
            <zoom-form-item inline="true" label="密码">
              <zoom-date></zoom-date>
            </zoom-form-item>
            <zoom-form-item label="下拉框">
              <zoom-dropdown ref="dropdown"></zoom-dropdown>
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
        <zoom-button type="primary" @click="test">验证</zoom-button>
        <zoom-button @click="quit">清除</zoom-button>
      </zoom-tab-item>
      <zoom-tab-item :index="1" :label="'Tab2'">
        <h5 slot="label">
          我是tab2
          <i class="zoom-icon icon-close-plus"></i>
        </h5>
        <zoom-steps type="timeLine" :op="stepsOp" ref="steps" @change="stepsChange"></zoom-steps>
            <zoom-button @click="prevTest">上一步</zoom-button>
            <zoom-button @click="nextTest">下一步</zoom-button>
        <!-- <zoom-tabs :value="curTab2" @tabChange="tabChange2">
          <zoom-tab-item :index="0" label="内层tab1">
            内层tab1
          </zoom-tab-item>
          <zoom-tab-item :index="1" label="内层tab2">
            tab2
          </zoom-tab-item>
          <zoom-tab-item :index="2" label="内层tab3">
            tab3
          </zoom-tab-item>
        </zoom-tabs> -->
      </zoom-tab-item>
      <zoom-tab-item :index="2" :label="'Tab3'">
        <div v-tip.transition.success.right="'tip测绘师'">
          drag测试
        </div>
        <!-- <zoom-loading></zoom-loading> -->
      </zoom-tab-item>
    </zoom-tabs>
    <!-- <span>{{$zoom.$t('m.music')}}</span> -->
    <h1>{{$zoom.$t('file.count_error', params)}}</h1>
    <zoom-button @click="updateI18">{{lang}}</zoom-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {count: 12, file: 'doc'},
        $t: '',
        lang: 'zh',
        name: '',
        stepsOp: {
          active: 7,
          disabled: true,
          data:  [
            {index: 5, count: 4, type: 'doing', time: '2008-05-12 14:25:32', name: 'Basic Info.'},
            {index: 6, count: 6, type: 'done', time: '2018-08-08 08:08:08', name: 'Vics tab.'},
            {index: 7, count: 8, type: 'done', time: '2018-08-08 08:08:08', name: 'not done.'},
            {index: 8, count: 2, time: 1583678818399, name: 'not done2'}
          ],
          onClick: val => {
            console.log('click', val);
          }
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
            return false
          }
        },
        uname: '',
        curTab: 2, // 当前激活的tab索引
        curTab2: 2
      }
    },
    created() {
      // this.$zoom.addLanguage({
      //   lang: 'zh',
      //   title: 'err',
      //   value: '错误'
      // });
      console.log(this.$zoom.getLanguage(), '=this.$zoom.getLanguage()');
    },
    methods: {
      updateI18() {
        let locale = ''
        if ( this.lang === 'zh' ) {
          // this.lang = locale = 'en';
          this.lang = locale = 'ja';
        }else {
          this.lang = locale = 'zh';
        }
        let lang = {
          locale,
          detail: {
            zh: {
              'success.button': '按钮错误',
              'success.input': '输入框错误'
            },
            en: {
              'success.button': 'button err',
              'success.input': 'input err'
            }
          }
        }
        console.log(lang.locale, 'lang.locale');
        this.$zoom.setLanguage(lang);
      },
      stepsChange(val) {
        console.log('stepsChange', val);
      },
      prevTest() {
        this.$refs['steps'].prev();
      },
      nextTest() {
        this.$refs['steps'].next();
      },
      test() {
        // let obj = { value: '666', text: '设置选中值'};
        // this.$refs['dropdown'].load(obj);
        this.$refs['form'].valid();
      },
      quit() {
        this.$refs['form'].reset();
        // console.log(this.uname, '==');
        // this.uname = '';
      },
      tabChange(index) {
        this.curTab = index
      },
      tabChange2(index) {
        this.curTab2 = index;
        this.$forceUpdate();
      }
    }
  }
</script>
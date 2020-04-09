<template>
  <div>
    <zoom-tabs :border="true" position="left" :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" :label="'Tab1'">
          <div>
            Tab1的内容
          </div>
          <zoom-form ref="form" submit.prevent="false" label-width="120px">
            <zoom-form-item inline="true" :require="true" label="名字">
              <zoom-input v-model="name" :op="inputOp" placeholder="请输入名字"></zoom-input>
            </zoom-form-item>
            <zoom-form-item inline="true" label="密码">
              <zoom-date :op="dateOp"></zoom-date>
            </zoom-form-item>
            <zoom-form-item label="下拉框">
              <zoom-dropdown ref="dropdown"></zoom-dropdown>
            </zoom-form-item>
            <zoom-form-item :require="true" label="搜索">
              <zoom-search :op="searchOp"></zoom-search>
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
        <zoom-text-popup></zoom-text-popup>
        <!-- <zoom-loading></zoom-loading> -->
      </zoom-tab-item>
    </zoom-tabs>
    <zoom-internationalisation></zoom-internationalisation>
    <zoom-logout :op="logoutOp"></zoom-logout>
    <zoom-button @click="confimClick(222)">conmig</zoom-button>

    <zoom-color-picker
        :defaultColor="color"
        @onChange="onChange"
        ref="picker"
    ></zoom-color-picker>


    <!-- <zoom-progress :progress="num" :status="status"></zoom-progress> -->
    <img ref="confim" v-lazyload>
    <!-- <span>{{$zoom.$t('m.music')}}</span> -->
    <h1>{{$zoom.$t('file.count_error', params)}}</h1>
    <zoom-button @click="updateI18">{{lang}}</zoom-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0,
        color:"#DDDDDD",
        status: 'danger',
        progressOp: {
            status: 'danger',   // 开始时候的状态
            progress: 30,
            inside: true
        },
        logoutOp: {
          url: '/',  //  注销后要跳转的url
          point: true,  //  是否需要提示
          onClick: () => {
            console.log('注销');
          }, //  点击事件
          text: '注销登录'  //  文字内容, 默认为注销
        },
        searchOp: {
          // disabled: true,
          placeHolder: '搜索框已禁用',
          hideClose: false,
          data: [
            {value: '1', text: '所有'},
            {value: '2', text: '找人'},
            {value: '3', text: '文章'}
          ],
        },
        dateOp: {
          disabled: true
        },
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
          disabled: true,
          min: 0,
          max: 10,
          space: 5,
          errMsg: '验证不通过',
          testing: val => {
            return false
          }
        },
        uname: '',
        curTab: 0, // 当前激活的tab索引
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
      onChange(color){
        console.log(color, 'color');
        this.color = color;
      },
      confimClick(a) {
        this.$refs['picker'].openPicker();
        // this.$zoom.tip({
        //   // title: '标题',
        //   // content: '内容',
        //   customComponent: 'zoom-switch',
        //   customProps: {
        //     open: '开启',
        //     close: '关闭',
        //   },
        //   target: this.$refs['confim']
        // })
        // this.$zoom.prompt({
        //   content: '此操作将永久删除该文件, 是否继续？',
        //   value: '2222',
        //   title: '标题',
        //   confirmText:'是',
        //   cancelText:'否',
        //   type: 'warning'
        // }).then((res) => {
        //   console.log(res, 'res==');
        //   console.log('确定');
        //     //点是
        // }).catch(() => {
        //   console.log('关闭');
        //     //点否
        // });
        // this.$zoom.confim('是否登录?',{
        //   confirmText:'登录',
        // }).then((res) => {
        //     //点登录
        //     console.log('登录', res);
        // }).catch(() => {
        //     console.log('取消');
        //     //点取消
        // });
      },
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
        // let data = [
        //           {value: '1', text: '北京'},
        //           {value: '2', text: '上海'},
        //           {value: '3', text: '广州'},
        //           {value: '4', text: '深圳'}
        //         ];
        //         this.$refs['dropdown'].load(data);
        // let obj = { value: '666', text: '设置选中值'};
        // this.$refs['dropdown'].load(obj);
        this.$refs['form'].valid();
        this.$zoom.loading.show({color: 'red', full: true});
        // this.$zoom.loading.show();
      },
      quit() {
        this.$zoom.loading.hide();
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
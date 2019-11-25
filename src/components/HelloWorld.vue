<template>
  <div class="hello">
    <zoom-row>
      <zoom-col span="6">
        <zoom-carousel :op="imglist"></zoom-carousel>
      </zoom-col>
        <zoom-alert ref="msg"></zoom-alert>
      <!-- <zoom-col span="3">
        <zoom-input v-focus :op="inputOp" v-model="name"></zoom-input>
      </zoom-col>
      <zoom-col span="9">
        <zoom-button :op="btnOp">提交</zoom-button>
      </zoom-col>
      <zoom-col>
      </zoom-col>
      <zoom-col span="5">
        <zoom-photo :op="zoomOp"></zoom-photo>
      </zoom-col>
      <zoom-col span="3">
      </zoom-col> -->
    </zoom-row>
    <zoom-dialog-box :op="dialogOp" :show="visibility" @close="handleClose">
      <h1>弹框测试</h1>
    </zoom-dialog-box>
    <zoom-row>
      <!-- <zoom-panel> -->
        <zoom-col span="6">
          <zoom-page :total="104" :prepage="100" :show-page="10" v-model="sPage"></zoom-page>
          <zoom-form label-width="100">
            <zoom-form-item label="单选框:">
              <zoom-radio v-for="(item,index) of list" :key="index" :checck="item.value" v-model="radioStatus" checkname="age">{{item.value}}</zoom-radio>
              <!-- <input type="radio" name="age" v-for="(item,index) of list" :key="index" :value="item.value" v-model="radioStatus"> -->
              <zoom-checkbox>111</zoom-checkbox>
            </zoom-form-item>
            <zoom-form-item label="用户名:">
              <zoom-input :op="nameOp"></zoom-input>
            </zoom-form-item>
            <zoom-form-item label="密 码:">
              <zoom-input></zoom-input>
            </zoom-form-item>
            <zoom-form-item label="计数器">
              <zoom-numeric :op="numOp"></zoom-numeric>
            </zoom-form-item>
            <zoom-form-item label="开关">
              <zoom-switch :op="switchOp"></zoom-switch>
            </zoom-form-item>
            <zoom-form-item label="下拉框">
              <zoom-dropdown :op="dropdownOp"></zoom-dropdown>
            </zoom-form-item>
            <zoom-form-item label="文本域">
              <zoom-textarea :op="textareaOp"></zoom-textarea>
            </zoom-form-item>
            <zoom-form-item>
              <zoom-button :op="bigOp">测试大弹框</zoom-button>
            </zoom-form-item>
          </zoom-form>
        </zoom-col>
      <!-- </zoom-panel> -->
      <zoom-col span="6">
         <zoom-loading color="#1890ff" :show="visibility"></zoom-loading>
        <zoom-button :op="btnOp">测试普通弹框</zoom-button>
      </zoom-col>
      <zoom-col span="6">
        <zoom-input></zoom-input>
      </zoom-col>
      <zoom-alert ref="msg"></zoom-alert>
      <zoom-col lg="5" md="7" sm="8" xs="12">
        <zoom-card>
          <zoom-header>上传图片组件</zoom-header>
          <zoom-container>
            <zoom-upload :op="uploadOp" @imgData="getName"></zoom-upload>
          </zoom-container>
          <zoom-footer>
            <span class="icon iconfont icon-RectangleCopy1"></span>
            <zoom-button hue="green" :op="btnOp">
              提交
            </zoom-button>
          </zoom-footer>
        </zoom-card>
      </zoom-col>

      <!-- <zoom-col span="6">
        <zoom-card>
          <zoom-header>4位数随机验证码</zoom-header>
          <zoom-container>
            <zoom-testing></zoom-testing>
          </zoom-container>
          <zoom-footer>尾部</zoom-footer>
        </zoom-card>
      </zoom-col> -->
    </zoom-row>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      sPage: 1,
      dropdownOp: {
        isdisabled: true,
        placeHolder: '--请选择--',
        // defalut: '5',
        // readonly: true,
        downData: [
          {value: '1', text: '深圳'},
          {value: '2', text: '长沙'},
          {value: '3', text: '武汉'},
          {value: '4', text: '北京'},
          {value: '5', text: '上海'},
          {value: '6', text: '广州'},
          {value: '7', text: '南京'},
          {value: '8', text: '贵州'},
        ],
      },
      radioStatus: '',
      list: [
        {value:'1', text: 111},
        {value:'2', text: 222},
        {value:'3', text: 333},
      ],
      imglist: {
        width: '100%',
        height: '350px',
        images: [
          {src: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2158487696,149747733&fm=26&gp=0.jpg", title: "第一张图", url: "http://www.baidu.com"},
          {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572786826634&di=55abcd40b5b142b295e35480c7ab8391&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F57ce89c1773a5.jpg", title: "第二张图", url: "http://www.baidu.com"},
          {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572786826634&di=49fedaac63bbf333409e0d51d38f3a5f&imgtype=0&src=http%3A%2F%2Fwww.luobou.com%2Fzhuti%2Fuploadpic%2F2016-6%2F201661715215436.jpg", title: "第三张图", url: "http://www.baidu.com"},
          {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572786826634&di=2a189283243a64dcf8ea8cd4406cbfab&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0c75f87795561724670c5746a4fbca9d74c04b2f151eb-608nWl_fw658", title: "第四张图", url: "http://www.baidu.com"}
        ],
      },
      dialogOp: {
        showBtn: true,
        onClick: function() {
          console.log(666666);
        }
      },
      visibility: false,
      switchOp: {
        isdisabled: false,
        open: '开启',
        close: '关闭',
        status: 'open',
        beforeClick: function(val) {
          console.log('点击前触发', val);
        },
        afterClick: function(val) {
          console.log('点击后触发', val);
        }
      },
      numOp: {
        max: 10,
        min: 0,
        isdisabled: true
      },
      textareaOp: {
        isdisabled: false,
        placeHolder: '请输入内容',
        errMsg: '姓名长度必须大于10',
        testing:function(value) {
          if (value.length > 10) {
            return true;
          } else {
            return false;
          }
        }
      },
      nameOp: {
        isdisabled: false,
        type: 'text',
        IconStyle: 'icon-add',
        onClick:()=> {
          // this.$refs['msg'].alert({
          //   title: '自定义标题',
          //   content: '自定义内容',
          //   type: 'error'
          // }, 5000);
        },
        errMsg: '姓名长度必须大于10',
        testing:function(value) {
          if (value.length > 10) {
            return true;
          } else {
            return false;
          }
        }
      },
      zoomOp: {
        baseline: false,
        pointer: false,
        outShow: true,
        lazyload: true,
        url: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572102273&di=79b3ac13b9b47f47d2eac29d9c02cdbb&src=http://g-search1.alicdn.com/bao/uploaded/i1/1801192408/TB2tm4_aGi5V1BjSszbXXb0hVXa_!!1801192408.png',
        scale: 2,
        selectorStyle: {"display": "none;"},
        type: 'square',
        width: 200,
      },
      name: '',
      uploadOp: {
        isdisabled: false,  //是否禁用
        hue: 'warning',     //颜色状态
        content: '上传图片',
        // custom: '<span>自定义按钮</span>',         //自定义图标
        // customdel: '<span>删除</span>',
        size: '1MB',         //文件大小
        beforeEvent: () => {
          console.log('开始上传了');
          return false
        },
        afterEvent: () => {
          console.log('上传完毕');
        },
        deleteEvent: () => {
          console.log('删除图片');
        },
        defeatedEvent: () => {
          console.log('上传失败');
        }
      },
      inputOp: {
        placeHolder: '请输入名字'
      },
      btnOp: {
        isdisabled: false,
        // hue: 'info',
        onClick: () => {
          console.log(this.radioStatus);
          // this.$refs['msg'].msage('小弹框', 2000);
          // this.visibility = true;
        },
        IconStyle: 'icon-close'
        // onClick: function() {
        //   console.log(111);
        // }
      },
      bigOp: {
        isdisabled: false,
        hue: 'yellow',
        onClick: () => {
          // this.$refs['msg'].alert({
          //   title: '标题',
          //   content: '内容',
          //   type: 'primary'
          // }, 5000);
        }
      }
    }
  },
  watch: {
    radioStatus: function(o, v) {
      console.log(o,'-----------o');
      console.log(v,'-----------v');
    }
  },
  methods: {
    handleClose() {
      this.visibility = false;
    },
    // 获取base64编码
    getName(data) {
      console.log('父组件接收', data);
    },
    search() {
      // this.$myMethod();
      if (!this.name) {
        // alert('请输入名字')
        // this.$refs['msg'].alert('请输入名字', 2000);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.img-container {
  width: 500px !important;
  height: 500px !important;
}
</style>

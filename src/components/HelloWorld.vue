<template>
  <div class="hello">
    <!-- <zoom-row>
      <zoom-col span="3">
        <zoom-input v-focus :op="inputOp" v-model="name"></zoom-input>
        <zoom-msg ref="msg"></zoom-msg>
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
      </zoom-col>
    </zoom-row> -->
    <zoom-row>
      <zoom-col span="6">
        <zoom-form label-width="100">
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
          <zoom-form-item>
            <zoom-button :op="bigOp">测试大弹框</zoom-button>
          </zoom-form-item>
        </zoom-form>
      </zoom-col>
      <zoom-col span="6">
         <zoom-loading color="#1890ff" show="true"></zoom-loading>
        <zoom-button :op="btnOp">测试普通弹框</zoom-button>
      </zoom-col>
      <zoom-col span="6">
        <zoom-input></zoom-input>
      </zoom-col>
      <zoom-alert ref="msg"></zoom-alert>
      <!-- <zoom-col lg="5" md="7" sm="8" xs="12">
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
      </zoom-col> -->

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
      nameOp: {
        isdisabled: false,
        type: 'text',
        IconStyle: 'icon-jian',
        onClick:()=> {
          this.$refs['msg'].alert('66666', 2000);
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
          this.$refs['msg'].msage('小弹框', 2000);
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
          this.$refs['msg'].alert({
            title: '标题',
            content: '内容',
            type: 'primary'
          }, 5000);
        }
      }
    }
  },
  methods: {
    getimg(){

    },
    // 获取base64编码
    getName(data) {
      console.log('父组件接收', data);
    },
    search() {
      // this.$myMethod();
      if (!this.name) {
        // alert('请输入名字')
        this.$refs['msg'].alert('请输入名字', 2000);
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

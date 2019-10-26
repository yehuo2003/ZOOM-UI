<template>
  <div class="hello">
    <zoom-row>
      <!-- <zoom-col :span="3">
        <zoom-input v-focus :op="inputOp" v-model="name"></zoom-input>
        <zoom-msg ref="msg"></zoom-msg>
      </zoom-col>
      <zoom-col :span="9">
        <zoom-button :op="btnOp">提交</zoom-button>
      </zoom-col> -->
      <zoom-col :span="3">
      </zoom-col>
      <zoom-col :span="4">
        <zoom-photo :op="zoomOp"></zoom-photo>
      </zoom-col>
      <zoom-col :span="3">
      </zoom-col>
    </zoom-row>

    <zoom-row>
      <zoom-col :span="4">
        <zoom-card>
          <zoom-card-header>上传图片组件</zoom-card-header>
          <zoom-card-container>
            <zoom-upload :op="uploadOp" @imgData="getName"></zoom-upload>
          </zoom-card-container>
          <zoom-card-footer>尾部</zoom-card-footer>
        </zoom-card>
      </zoom-col>

      <zoom-col :span="4">
        <zoom-card>
          <zoom-card-header>4位数随机验证码</zoom-card-header>
          <zoom-card-container>
            <zoom-testing></zoom-testing>
          </zoom-card-container>
          <zoom-card-footer>尾部</zoom-card-footer>
        </zoom-card>
      </zoom-col>
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
        hue: 'error',
        onClick: this.search
        // onClick: function() {
        //   console.log(111);
        // }
      }
    }
  },
  methods: {
    // 获取base64编码
    getName(data) {
      console.log('父组件接收', data);
    },
    search() {
      // this.$myMethod();
      if (!this.name) {
        // alert('请输入名字')
        this.$refs['msg'].msgPlugin('请输入名字', 2000);
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

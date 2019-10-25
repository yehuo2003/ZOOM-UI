<template>
  <div class="hello">
    <zoom-row>
      <zoom-col :span="3">
        <zoom-input v-focus :op="inputOp" v-model="name"></zoom-input>
        <zoom-msg ref="msg"></zoom-msg>
      </zoom-col>
      <zoom-col :span="9">
        <zoom-button :op="btnOp">提交</zoom-button>
      </zoom-col>
      <zoom-col :span="12">
        <zoom-upload :op="uploadOp" @imgData="getName"></zoom-upload>
      </zoom-col>
      <zoom-col :span="12">
        <zoom-testing></zoom-testing>
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
      name: '',
      uploadOp: {
        isdisabled: false,  //是否禁用
        hue: 'warning',     //颜色状态
        content: '自定义内容',
        // custom: '<span>自定义按钮</span>',         //自定义图标
        customdel: '<span>自定义删除</span>',
        size: '30',         //文件大小
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
    getName(data) {
      console.log('父组件接收', data);
    },
    // 获取base64编码
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
</style>

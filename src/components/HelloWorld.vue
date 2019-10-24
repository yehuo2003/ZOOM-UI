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
      inputOp: {
        placeHolder: '请输入名字'
      },
      btnOp: {
        isdisabled: false,
        hue: 'danger',
        onClick: () => {
          this.search();
        }
        // onClick: function() {
        //   console.log(111);
        // }
      }
    }
  },
  methods: {
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

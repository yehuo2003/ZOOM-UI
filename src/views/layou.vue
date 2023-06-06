<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-22 00:14:20
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-05 23:41:20
-->
<template>
  <div class="test-layou">
    <zoom-select ref="select" v-model="curText" multiple style="width: 270px;">
      <zoom-option
        v-for="item in options"
        :key="item.value"
        :text="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </zoom-option>
    </zoom-select>
    <zoom-button @click="testOPT">测试</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: '#1890ff',
      curText: '选项1,选项2,选项3',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        // disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面炒鸡长长长长长长长长长长长长长长长长长长',
        // disabled: true
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      textpop: {
        resize: true
      },
      btnOp: {
        type: 'primary',
        shape: 'round',
        onClick: () => {
          this.$zoom.popup({
            title:'1111',
            content:'我是内容'
          })
        }
      }
    }
  },
  methods: {
    testOPT() {
      this.$refs['select'].reset();
      console.log(this.curText, 'curText==');
    },
    test() {
      console.log(666);
    }
  }
};
</script>
<style>
.test-layou {
  /* height: 1000px; */
}
.test-layou button {
  margin: 10px 5px;
}
.test-layou .item {
  background: red;
  height: 80px;
}
</style>
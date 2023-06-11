<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-22 00:14:20
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-11 22:46:25
-->
<template>
  <div class="test-layou">
    <zoom-form ref="form" label-width="120px">
      <zoom-form-item inline="true" :require="true" label="名字">
        <zoom-input :op="selectOp"></zoom-input>
      </zoom-form-item>
      <zoom-form-item :require="true" inline="true" label="密码">
        <zoom-select ref="select" v-model="curText" placeholder="666" :op="selectOp" style="width: 270px;">
          <zoom-option
            v-for="item in options"
            :key="item.value"
            :text="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </zoom-option>
        </zoom-select>
      </zoom-form-item>
      <zoom-form-item style="text-align: center">
        <zoom-button @click="testOPT">测试</zoom-button>
        <zoom-button @click="load">加载</zoom-button>
      </zoom-form-item>
    </zoom-form>
    <!-- <zoom-input :op="selectOp"></zoom-input> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectOp: {
        placeholder: '需要鸭子',
        placeHolder: '需要鸭子2',
        errMsg: '验证不通过',
        testing: val => {
          console.log(val.length, '!val.length==');
          if (!val.length) {
            return false
          } else {
            return true
          }
        }
      },
      color: '#1890ff',
      // curText: '选项1,选项2,选项3',
      curText: '',
      options: [
        // {
        //   value: '选项1',
        //   label: '黄金糕'
        // }, {
        //   value: '选项2',
        //   label: '双皮奶',
        //   // disabled: true
        // }, {
        //   value: '选项3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '选项4',
        //   label: '龙须面炒鸡长长长长长长长长长长长长长长长长长长',
        //   // disabled: true
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }
      ],
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
    load() {
      let data = [
        {
          value: '选项1',
          text: '黄金糕'
        }, {
          value: '选项2',
          text: '双皮奶',
          // disabled: true
        }, {
          value: '选项3',
          text: '蚵仔煎'
        }, {
          value: '选项4',
          text: '龙须面炒鸡长长长长长长长长长长长长长长长长长长',
          // disabled: true
        }, {
          value: '选项5',
          text: '北京烤鸭'
        }
      ]
      this.$refs['select'].load(data);
    },
    testOPT() {
      // this.$refs['select'].handleBlur();
      // this.$refs['select'].reset();
      let valid = this.$refs['form'].valid();
      console.log(valid, 'valid==');
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
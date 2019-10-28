<template>
  <div class="zoom-input">
      <input :type="options.text" v-focus :placeholder="options.placeHolder">
      <i v-if="options.onIcon" :class="options.onIcon" @click="serach"></i>
  </div>
</template>
<script>
export default {
    name: 'zoom-input',
    props: {
        op: Object
    },
    data() {
        return {
            options: {
                text: 'text',
                placeHolder: null,
                onIcon: false
            }
        }
    },
    created() {
        if (this.op) {
            this.options = this.op;
        }
    },
    methods: {
        serach() {
            this.op.onClick();
        }
    }
}
</script>
<style>
.zoom-input {
    position: relative;
    outline: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    text-align: left;
    width: 270px;
}
.zoom-input>input:focus {
    border: 1px solid #1890ff;
    -webkit-box-shadow: 0 0 0 tansparent;
    box-shadow: 0 0 0 tansparent;
}
.zoom-input>input:active {
    border: 1px solid #1890ff;
    -webkit-box-shadow: 0 0 0 tansparent;
    box-shadow: 0 0 0 tansparent;
}
.zoom-input>input:hover {
    border: 1px solid #1890ff;
}
.zoom-input>input {
    outline: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    color: #333;
    border-radius: 2px;
    background: #ffffff;
    font-size: 12px;
    padding: 0 8px;
    display: block;
    white-space: nowrap;
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    -o-user-select: auto;
    user-select: auto;
    -webkit-transition: border .3s;
    transition: border .3s;
}
</style>
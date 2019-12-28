<template>
<!-- submit.prevent="false" 阻止默认提交事件 -->
  <form :label="labelWidth" id="zoom-form" class="zoom-form">
      <slot></slot>
  </form>
</template>
<script>
export default {
    name: 'zoom-form',
    props: {
        labelWidth: String
    },
    methods: {
        // 获取指定form中所有的<input>对象
        getElements(formId) {
            formId = formId || 'zoom-form';
            let form = this.$zoom.$id(formId);
            let elements = new Array();
            let tagElements = form.getElementsByTagName('input');
            for (var i = 0; i < tagElements.length; i ++) {
                elements.push(tagElements[i]);
            }
            tagElements.getElementsByTagName('select');
            for (var i = 0; i < tagElements.length; i ++) {
                elements.push(tagElements[i]);
            }
            tagElements.getElementsByTagName('textarea');
            for (var i = 0; i < tagElements.length; i ++) {
                elements.push(tagElements[i]);
            }
            return elements;
        }
    }
}
</script>
<style>
.zoom-form {
    width: 100%;
    overflow: hidden;
}
.zoom-form-item {
    margin: 0 0 12px;
}
.zoom-form-item>.form-item-label {
    color: #333;
    text-align: right;
    vertical-align: middle;
    line-height: 30px;
    float: left;
    padding: 0 8px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    word-break: break-all;
    font-weight: 400;
    margin: 0;
}
</style>
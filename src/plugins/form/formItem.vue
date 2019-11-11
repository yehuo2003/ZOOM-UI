<template>
  <div class="zoom-form-item">
      <label :style="labelWidth" class="form-item-label">{{text}}</label>
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-form-item',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            text: '',
            labelWidth: 'width: 100px;'
        }
    },
    mounted() {
        this.text = this.label;
        let form = this.$id('zoom-form');
        if (form && form.getAttribute('label')) {
            this.labelWidth = `width: ${form.getAttribute('label')}px;`;
        }
    }
}
</script>
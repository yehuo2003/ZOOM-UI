<template>
  <div class="zoom-tag">
  </div>
</template>
<script>
export default {
    name: 'zoom-tag',
    props: {
        op: {
            type: Object,
            data: {
                type: Array,
                default: []
            }
        },
        hideTree: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style>
.zoom-tag .add>input {
    border: 0;
}
</style>

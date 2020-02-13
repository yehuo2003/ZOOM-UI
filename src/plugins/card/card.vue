<template>
  <div :class="css" class="zoom-card">
    <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-card',
    props: {
        border: {
            type: [Boolean, String],
            default: null
        },
        hoverShadow: {
            type: [Boolean, String],
            default: null
        }
    },
    data() {
        return {
            css: '',
        }
    },
    created() {
        if (this.border) {
            this.css += ' card-border';
        }
        if (this.hoverShadow) {
            this.css += ' hover-shadow';
        }
    }
}
</script>
<style>
.zoom-card {
  border-radius: 2px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
}
.zoom-card .zoom-header,
.zoom-card .zoom-container,
.zoom-card .zoom-footer {
  padding: 10px;
}

/* 阴影效果 */
.zoom-card.card-border {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
/* 阴影的hover效果 */
.zoom-card.hover-shadow:focus, .zoom-card.hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
<template>
  <div class="zoom-col" :class="cls">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'zoom-col',
    props: {
        span: String,
        lg: String,
        md: String,
        sm: String,
        xs: String
    },
    data() {
        return {
            cls: 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
        }
    },
    created() {
        if (this.span) {
          // 如果有传入span
          if (this.testing(this.span)) {
            this.cls = `col-xs-${this.span} col-sm-${this.span} col-md-${this.span} col-lg-${this.span}`;
          }
        } else {
          // 如果没有span
          let cls = 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
          if (this.lg && this.testing(this.lg)) {
            cls = cls.replace(/col-lg-12/g, `col-lg-${this.lg}`)
          }
          if (this.md && this.testing(this.md)) {
            cls = cls.replace(/col-md-12/g, `col-md-${this.md}`)
          }
          if (this.sm && this.testing(this.sm)) {
            cls = cls.replace(/col-sm-12/g, `col-sm-${this.sm}`)
          }
          if (this.xs && this.testing(this.xs)) {
            cls = cls.replace(/col-xs-12/g, `col-xs-${this.xs}`)
          }
          this.cls = cls;
        }
    },
    methods: {
      // 验证方法
      testing(num) {
        let reg = /^(?:1[0-2]|[1-9])$/;
        if (reg.test(num)) {
            return true;
        } else {
          throw Error(`ZOOM-UI ValueError: value ${num} 解析出错, 请传入一个范围 1~12 之间的正整数!`);
        }
      }
    }
}
</script>
<style>
/*超小设备（手机：小于768px）*/
@media(max-width:768px){
  .col-xs-1{ width: 8.33333333%;}
  .col-xs-2{ width: 16.66666667%;}
  .col-xs-3{ width: 25%;}
  .col-xs-4{ width: 33.33333333%;}
  .col-xs-5{ width: 41.66666667%;}
  .col-xs-6{ width: 50%;}
  .col-xs-7{ width: 58.33333333%;}
  .col-xs-8{ width: 66.66666667%;}
  .col-xs-9{ width: 75%;}
  .col-xs-10{ width: 83.33333333%;}
  .col-xs-11{ width: 91.66666667%;}
  .col-xs-12{ width: 100%;}
}

/*小型设备 （平板电脑：768px起）0*/
@media(min-width:768px){
  .col-sm-1{ width: 8.33333333%;}
  .col-sm-2{ width: 16.66666667%;}
  .col-sm-3{ width: 25%;}
  .col-sm-4{ width: 33.33333333%;}
  .col-sm-5{ width: 41.66666667%;}
  .col-sm-6{ width: 50%;}
  .col-sm-7{ width: 58.33333333%;}
  .col-sm-8{ width: 66.66666667%;}
  .col-sm-9{ width: 75%;}
  .col-sm-10{ width: 83.33333333%;}
  .col-sm-11{ width: 91.66666667%;}
  .col-sm-12{ width: 100%;}
}

/*中型设备（台式电脑：992px起）*/
@media(min-width:992px){
  .col-md-1{ width: 8.33333333%;}
  .col-md-2{ width: 16.66666667%;}
  .col-md-3{ width: 25%;}
  .col-md-4{ width: 33.33333333%;}
  .col-md-5{ width: 41.66666667%;}
  .col-md-6{ width: 50%;}
  .col-md-7{ width: 58.33333333%;}
  .col-md-8{ width: 66.66666667%;}
  .col-md-9{ width: 75%;}
  .col-md-10{ width: 83.33333333%;}
  .col-md-11{ width: 91.66666667%;}
  .col-md-12{ width: 100%;}
}

/*大型设备（台式电脑：1200px起）*/
@media(min-width:1200px){
  .col-lg-1{ width: 8.33333333%;}
  .col-lg-2{ width: 16.66666667%;}
  .col-lg-3{ width: 25%;}
  .col-lg-4{ width: 33.33333333%;}
  .col-lg-5{ width: 41.66666667%;}
  .col-lg-6{ width: 50%;}
  .col-lg-7{ width: 58.33333333%;}
  .col-lg-8{ width: 66.66666667%;}
  .col-lg-9{ width: 75%;}
  .col-lg-10{ width: 83.33333333%;}
  .col-lg-11{ width: 91.66666667%;}
  .col-lg-12{ width: 100%;}
}
/* 被定义的元素内边距和边框不再会增加它的宽度，不加入的话排版会有问题 */
.container *,.container{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.row>div>p{
  background: #ccc;
}
.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12,
.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12,
.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-13,
.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12
{ float: left; padding: 1px 10px;}
</style>
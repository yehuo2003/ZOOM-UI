<template>
  <div class="btn">
      <button class="zoom-btn" :class="css" :disabled="isdisabled" @click="handleClick">
        <slot></slot>
        <i v-if="showIcon" class="icon iconfont" :class="IconStyle"></i>
      </button>
  </div>
</template>
<script>
export default {
    name: 'zoom-button',
    props: {
        op: Object,
        hue: String
    },
    data() {
        return {
            css: '',
            isdisabled: false,
            showIcon: false,
            IconStyle: ''
        }
    },
    created() {
        if (this.op || this.hue) {
            let hue = this.op ? this.op.hue : this.hue; 
            if (!typeof(hue) == 'string') {
                throw Error('zoom-ui error: hue 的类型需要传入字符串');
                return
            }
            switch (hue) {
                case 'err':
                   this.css = 'danger' 
                    break;
                case 'error':
                   this.css = 'danger' 
                    break;
                case 'red':
                   this.css = 'danger' 
                    break;
                case 'green':
                   this.css = 'success' 
                    break;
                case 'yellow':
                   this.css = 'warning' 
                    break;
                case 'gray':
                   this.css = 'info' 
                    break;
                case 'blue':
                   this.css = 'primary' 
                    break;
                default:
                    this.css = hue;
                    break;
            }
            if (this.op && this.op.isdisabled) {
                console.log(this.op.isdisabled,'this.op.isdisabled');
                this.isdisabled = !!this.op.isdisabled;
            }
            if (this.op && this.op.IconStyle) {
                if (this.op.IconStyle.indexOf('icon') > -1) {
                    this.showIcon = true;
                    this.IconStyle = this.op.IconStyle;
                } else {
                    this.IconStyle = '';
                    this.showIcon = false;
                    throw Error(`zoom-ui TypeError: IconStyle: ${this.op.IconStyle} 错误, 请传入有效的icon名`);
                }
            }
        }
    },
    methods: {
        handleClick() {
            if (typeof this.op.onClick === 'function') {
                this.op.onClick();
            } else {
                throw Error('zoom-ui error: onClick 需要绑定一个函数对象')
            }
        }
    }
}
</script>
<style>
/* primary */
.btn .primary[disabled],
.btn .primary[disabled]:hover,
.btn .primary[disabled]:focus,
.btn .primary[disabled]:active
 {
    background: #d9d9d9;
    border-color: #d9d9d9;
}
.btn .primary {
    background: #1890ff;
    border-color: #1890ff;
    color: #fff;
}
.btn .primary:active,
.btn .primary:focus {
    background: #096dd9;
    border-color: #096dd9;
}
.btn .primary:hover {
    background: #40a9ff;
    border-color: #40a9ff;
}
/* danger */
.btn .danger[disabled],
.btn .danger[disabled]:hover,
.btn .danger[disabled]:focus,
.btn .danger[disabled]:active
 {
    background: #d8bab5;
    border-color: #d8bab5;
}
.btn .danger {
    background: #f5222d;
    border-color: #f5222d;
    color: #eee;
}
.btn .danger:active,
.btn .danger:focus {
    background: #cf1322;
    border-color: #cf1322;
}
.btn .danger:hover {
    background: #ff4d4f;
    border-color: #ff4d4f;
}
/* success */
.btn .success[disabled],
.btn .success[disabled]:hover,
.btn .success[disabled]:focus,
.btn .success[disabled]:active
 {
    background: #a6c3b9;
    border-color: #a6c3b9;
}
.btn .success {
    background: #52c41a;
    border-color: #52c41a;
    color: #fff;
}
.btn .success:active,
.btn .success:focus {
    background: #389e0d;
    border-color: #389e0d;
}
.btn .success:hover {
    background: #73d13d;
    border-color: #73d13d;
}
/* info */
.btn .info[disabled],
.btn .info[disabled]:hover,
.btn .info[disabled]:focus,
.btn .info[disabled]:active
 {
    background: #f5f5f5;
    border-color: #d9d9d9;
}
.btn .info {
    background: #333;
    border-color: #333;
    color: #d9d9d9;
}
.btn .info:active,
.btn .info:hover,
.btn .info:focus {
    background: #54657e;
    border-color: #54657e;
}
/* warning */
.btn .warning[disabled],
.btn .warning[disabled]:hover,
.btn .warning[disabled]:focus,
.btn .warning[disabled]:active
 {
    background: #d3c6a2;
    border-color: #d3c6a2;
}
.btn .warning {
    background: #faad14;
    border-color: #faad14;
    color: #fff;
}
.btn .warning:active,
.btn .warning:hover,
.btn .warning:focus {
    background: #ffc53d;
    border-color: #ffc53d;
}
/* 默认样式 */
.btn .zoom-btn[disabled],
.btn .zoom-btn[disabled]:hover,
.btn .zoom-btn[disabled]:focus,
.btn .zoom-btn[disabled]:active
{
    background: #d9d9d9;
    border-color: #d9d9d9;
}
.zoom-btn {
    min-width: 80px;
    min-width: 120px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    color: #1890ff;
    border-radius: 2px;
    background: #ffffff;
    font-size: 12px;
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    -ms-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-transition: border .3s, color .3s, background .3s;
    transition: border .3s, color .3s, background .3s;
    outline: 0;
}
.zoom-btn:hover,
.zoom-btn:focus
{
    border: 1px solid #1890ff;
    background: #ffffff;
}
.zoom-btn:active {
    border: 1px solid #1890ff;
    background: #e6f7ff;
}
.btn .iconfont {
    font-size: 12px;
}
</style>
<template>
  <div :class="lager ? 'alert-lager' : '' ">
      <div class="zoom-alert" :class="msgStatus">
          <div v-if="!lager" class="msg-warpper">
              <span v-if="IconStyle" class="icon iconfont icon-alert" :class="IconStyle"></span>
                  {{content}}
          </div>
          <div v-else class="lager-warpper">
              <span v-if="IconStyle" class="icon iconfont icon-alert" :class="IconStyle"></span>
              <p class="alert-title">{{title}}</p>
              <p class="alert-content">{{content}}</p>
              <i class="icon iconfont close-alert icon-close" @click="close"></i>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-alert',
    props: {
        msg: {
            type: String,
            default: ''
        },
        size: String
    },
    data() {
        return {
            title: '',
            content: '',
            lager: false,
            IconStyle: false,
            msgStatus: false
        }
    },
    created() {
        if (this.size && this.size == 'lager') {
            this.lager = true;
        } else {
            this.lager = false;
        }
    },
    methods: {
        close() {
            this.msgStatus = this.lager = false;
        },
        testing(obj, time) {
            let cls = 'active alert-';
            if (typeof obj === 'object') {
                this.title = obj.title;
                this.content = obj.content;
                cls += obj.type;
                switch (obj.type) {
                    case 'success':
                        this.IconStyle = 'icon-success';
                        break;
                    case 'error':
                        this.IconStyle = 'icon-close';
                        break;
                    case 'warning':
                        this.IconStyle = 'icon-warning';
                        break;
                    case 'primary':
                        this.IconStyle = 'icon-news';
                        break;
                    default:
                        this.IconStyle = false;
                }
            } else if (typeof obj === 'string') {
                this.content = obj;
            } else {
                throw Error(`zoom-ui TypeError: 参数 ${obj} 类型错误, 请参考zoom-ui使用手册! `);
            }
            if (typeof time !== 'number') {
                throw Error(`zoom-ui TypeError: 参数 ${time} 类型错误, 请传入number类型数值! `);
            }
            this.msgStatus = cls;
            setTimeout(() => {
                this.msgStatus = this.lager = false;
            }, time);
        },
        // 大弹框
        alert(obj, time) {
            this.lager = true;
            this.testing(obj, time);
        },
        msage(msg, time) {
            this.lager = false;
            this.title = this.content = '';
            this.testing(msg, time);
        }
    }
}
</script>
<style>
/* 大弹框 */
.alert-lager .lager-warpper .close-alert {
    position: absolute;
    cursor: pointer;
    font-size: 20px;
    top: 0;
    right: 5px;
}
.alert-lager .alert-title {
    font-weight: 700;
    font-size: 20px;
    padding-left: 10px;
}
.alert-lager .alert-content {
    font-size: 14px;
    padding: 10px;
}
.alert-lager .zoom-alert.active .icon-alert {
    position: absolute;
    left: 10px;
    top: 50%;
    font-size: 50px;
}
.alert-lager .zoom-alert.active {
    min-width: 600px;
}
.alert-lager .zoom-alert {
    min-width: 600px;
    padding: 0 60px;
    text-align-last: left;
}
.alert-lager .zoom-alert .icon-alert {
    position: absolute;
    left: 10px;
    top: 0;
    font-size: 50px;
    margin-top: -15px;
}
/* success */
.alert-success .icon-alert,
.alert-success .close-alert {
    color: #52c41a;
}
.zoom-alert.alert-success {
    background: #f6ffed;
    border: 1px solid #95de64;
    color: #333;
}
/* warning */
.alert-warning .icon-alert,
.alert-warning .close-alert {
    color: #fa8c16;
}
.zoom-alert.alert-warning,
.zoom-alert.close-alert {
    background: #fffbe6;
    border: 1px solid #ffd666;
    color: #333;
}
/* error */
.alert-error .icon-alert, 
.alert-error .close-alert
{
    color: #f5222d;
}
.zoom-alert.alert-error {
    background: #fff1f0;
    border: 1px solid #ff7875;
    color: #333;
}
/* primary */
.alert-primary .icon-alert,
.alert-primary .close-alert {
    color: #1890ff;
}
.zoom-alert.alert-primary {
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    color: #333;
}
.msg-warpper {
    padding: 0 20px;
}
.zoom-alert .icon-alert {
    font-size: 16px;
    position: absolute;
    left: 10px;
}
.zoom-alert {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    min-width: 150px;
    min-height: 0;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    border-radius: 5px;
    color: #fff;
    -webkit-font-smoothing: antialiased; 
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    z-index: -1;
    opacity: 0;
}
.zoom-alert.active {
    min-width: 150px;
    min-height: 30px;
    line-height: 30px;
    z-index: 11;
    opacity: 1;
}
</style>
<template>
  <div class="msg" :class="{active:msgStatus}">
      <div class="msg-warpper">
          {{text}}
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-msg',
    props: {
        msg: String
    },
    data() {
        return {
            msgStatus: false,
            text: ''
        }
    },
    methods: {
        msgPlugin(msg, time) {
            this.text = msg;
            this.msgStatus = true;
            time = time || 2000;
            setTimeout(() => {
                this.msgStatus = false;
            }, time);
        }
    }
}
</script>
<style>
.msg {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, 50%);
    width: 0;
    min-height: 0;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    border-radius: 5px;
    color: #fff;
    transition: all .5s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    z-index: -1;
    opacity: 0;
}
.msg.active {
    width: 150px;
    min-height: 25px;
    list-style: 25px;
    opacity: 1;
    z-index: 11;
}
</style>
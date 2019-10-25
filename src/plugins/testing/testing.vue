<template>
  <div class="zoom-testing">
      <canvas id="c3" width="130" height="40"></canvas>
  </div>
</template>
<script>
export default {
    name: 'zoom-testing',
    props: {
        op: Object
    },
    mounted() {
        this.testing();
    },
    methods: {
        $ctx(id,getContext){
            var c3 = this.$id(id);
            return c3.getContext(getContext);
        },
        $fill(style, ctx){
            return ctx.fillStyle = (style)
        },
        $font(fs, ctx){
            return ctx.font = fs + "px SimHei"
        },
        $Text(str,width,height, ctx){
            return ctx.fillText(str,width,height)
        },
        $stroke(style, ctx){
            return ctx.strokeStyle = (style);
        },
        $moveTo(x,y, ctx){
            return  ctx.moveTo(x,y);
        },
        $lineTo(x,y, ctx){
            return  ctx.lineTo(x,y);
        },
        testing() {
            // 创建画笔
            // var canvas = this.$id('c3');
            // var ctx = canvas.getContext('2d');
            var ctx = this.$ctx('c3','2d');
            // 1.创建矩形120*30 背景颜色随机
            this.$fill(this.$rc(180,230), ctx);
            // ctx.fillRect(0,0,120,30)
            ctx.fillRect(0,0,200,100)
            // //2.创建随机字符串4绘制矩形中
            var pool = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890zxcvbnmasdfghjklqwertyuiop";
            for(var i=0;i<4;i++){
            var c = pool[this.$rn(30,pool.length)]
                ctx.textBaseline = "top";
            var fs = this.$rn(10,30)
            this.$font(fs, ctx)
            this.$fill(this.$rc(30,180), ctx);
            this.$Text(c,30*i,0, ctx);
            }
            // //3.创建5条干扰线
            for(var i=0;i<5;i++){
            ctx.beginPath();
            
            this.$stroke(this.$rc(0,230), ctx);
            this.$moveTo(this.$rn(0,120),this.$rn(0,30), ctx);
            this.$lineTo(this.$rn(0,120),this.$rn(0,30), ctx);
            ctx.stroke();
            }
            // //4.创建50个干扰点
            for(var i=0;i<50;i++){
            this.$fill(this.$rc(0,255), ctx);
            ctx.beginPath();
            ctx.arc(this.$rn(0,120),this.$rn(0,30),1,0,2*Math.PI);
            ctx.stroke();
            }
        }
    }
}
</script>
<style>
#c3 {
    width: 200px;
    height: 50px;
    background: #ccc;
}
</style>
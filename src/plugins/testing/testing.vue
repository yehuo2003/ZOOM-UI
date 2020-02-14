<template>
  <div class="zoom-testing">
    <canvas :id="canvasId" @click="changeClick" width="130" height="40"></canvas>
    <a v-if="showText" @click="testing">换一张</a>
  </div>
</template>
<script>
export default {
  name: "zoom-testing",
  props: {
    op: {
      type: Object,
      hideText: {
        type: Boolean,
        default: false
      },
      id: String
    },
    id: String
  },
  data() {
    return {
      showText: true,
      canvasId: null,
      testCode: "",
      pool: "QWERTYUIOPASDFGHJKLZXCVBNM1234567890zxcvbnmasdfghjklqwertyuiop"
    };
  },
  created() {
    let id = "zoom-canvas-" + Math.floor(Math.random() * 1000);
    if (this.id) {
      id = this.id;
    }
    if (this.op) {
      if (this.op.id) {
        id = this.op.id;
      }
      if (this.op.pool) {
        this.pool = this.op.pool;
      }
      if (this.op.hideText) {
        this.showText = false;
      }
    }
    this.canvasId = id;
  },
  mounted() {
    this.testing();
  },
  methods: {
    changeClick() {
      if (!this.showText) {
        this.testing();
      }
    },
    $ctx(id, getContext) {
      var c3 = this.$zoom.$id(id);
      return c3.getContext(getContext);
    },
    $fill(style, ctx) {
      return (ctx.fillStyle = style);
    },
    $font(fs, ctx) {
      return (ctx.font = fs + "px SimHei");
    },
    $Text(str, width, height, ctx) {
      return ctx.fillText(str, width, height);
    },
    $stroke(style, ctx) {
      return (ctx.strokeStyle = style);
    },
    $moveTo(x, y, ctx) {
      return ctx.moveTo(x, y);
    },
    $lineTo(x, y, ctx) {
      return ctx.lineTo(x, y);
    },
    testing() {
      this.testCode = "";
      // 创建画笔
      var ctx = this.$ctx(this.canvasId, "2d");
      // 1.创建矩形 200 * 100 背景颜色随机
      this.$fill(this.$zoom.$rc(200, 100), ctx);
      // ctx.fillRect(0,0,120,30)
      ctx.fillRect(0, 0, 200, 100);
      // 2.创建随机字符串4绘制矩形中
      var pool = this.pool;
      var testCode = "";
      for (var i = 0; i < 4; i++) {
        var c = pool[this.$zoom.$rn(30, pool.length)];
        testCode += c;
        ctx.textBaseline = "top";
        var fs = this.$zoom.$rn(10, 30);
        this.$font(fs, ctx);
        this.$fill(this.$zoom.$rc(30, 180), ctx);
        this.$Text(c, 30 * (i + 0.5), 5, ctx);
      }
      this.testCode = testCode;
      // 3.创建5条干扰线
      for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        this.$stroke(this.$zoom.$rc(0, 230), ctx);
        this.$moveTo(this.$zoom.$rn(0, 200), this.$zoom.$rn(0, 100), ctx);
        this.$lineTo(this.$zoom.$rn(0, 200), this.$zoom.$rn(0, 100), ctx);
        ctx.stroke();
      }
      // 4.创建50个干扰点
      for (var i = 0; i < 50; i++) {
        this.$fill(this.$zoom.$rc(0, 255), ctx);
        ctx.beginPath();
        ctx.arc(
          this.$zoom.$rn(0, 200),
          this.$zoom.$rn(0, 100),
          1,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    }
  }
};
</script>
<style>
.zoom-testing canvas {
  width: 200px;
  height: 50px;
  background: #ccc;
}
.zoom-testing a:hover {
  cursor: pointer;
  color: #096dd9;
}
.zoom-testing a {
  padding: 10px;
  text-decoration: underline;
  color: #1890ff;
}
</style>
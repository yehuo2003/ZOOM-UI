<template>
<div class="progressContainer">
     <div class="progress" :style="{width:progress+'%'}">
          <b>{{progress}}%</b>
     </div>
</div>
</template>
<script>
export default {
  name: "zoom-pubu",
  props: {
      op: {
      }
  },
  data() {
      return {
          progress:30
      }
  },
  created() {
      let timer = setInterval(() => {
          this.progress += 1;
        if (this.progress == 100) {
            clearInterval(timer)
        }
      }, 300)
  },
};
</script>
<style>
div.progressContainer{
          height: 20px;
          width: 96%;
          border-radius: 10px;
          background-color: #ddd;
          margin-left: 2%;
}
div.progress{
            background-color: #1C8DE0;
            border-radius: 10px;
            height:20px;
            line-height: 20px;
}
b{
              color:#fff;
              font-weight: 100;
              font-size: 12px;
 }
</style>
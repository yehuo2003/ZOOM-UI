<template>
<div class="masonry">
    <div class="item">
        <div class="item__content">
            1111
        </div>
    </div>
    <div class="item">
        <div class="item__content">
            222
        </div>
    </div>
    <!-- more items -->
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
      }
  },
  created() {
  },
};
</script>
<style>
.masonry {
    column-count: 5;
    column-gap: 0;
}
.item {
    break-inside: avoid;
    box-sizing: border-box;
    padding: 10px;
}
.masonry {
    column-count: 1;
}
@media (min-width: 400px) {
    .masonry {
        column-count: 2; 
    }
}
@media (min-width: 1200px) {
    .masonry {
        column-count: 3;
    }
}
</style>
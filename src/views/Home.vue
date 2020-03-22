<template>
  <div class="zoom-home">
    <div class="zoom-showcase" style="--duration: 1.1; --step: 0.1;">
      <div class="zoom-showcase-border">
        <div v-for="item of 10" :key="item"></div>
      </div>
      <div class="zoom-showcase-backdrop"></div>
      <h1
        class="zoom-showcase-text zoom-words chars splitting"
        style="--word-total:1; --char-total:8;"
      >
        <span class="word" data-word="Showcase" style="--word-index:0;">
          <span
            v-for="(item, index) of ['Z', 'O', 'O', 'M', '-', '-', 'U', 'I']"
            :key="index"
            class="zoom-char"
            :style="'--char-index: ' + index + ';'"
          >{{item}}</span>
        </span>
      </h1>
      <div class="zoom-showcase-border">
        <div v-for="item of 10" :key="item"></div>
      </div>
    </div>
    <div class="go-to">
      <router-link to="/main">
        进入
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
<style scoped>
@import "./home.css";
</style>
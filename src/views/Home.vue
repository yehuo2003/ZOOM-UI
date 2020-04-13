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
    <div class="go-to-btn go-to-btn-primary go-to-btn-ghost go-to-btn-shine">
      <router-link to="/develop">
        <!-- 进入 -->
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
<style lang="scss" scoped>
@import "./home.css";
.go-to-btn {
  --hue: 190;
  position: absolute;
  bottom: 10%;
  padding: 1rem 3rem;
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  text-transform: uppercase;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;
  a {
    color: #eee;
    font-weight: bold;
  }
  &:hover {
    background: hsl(var(--hue), 100%, 31%);
  }

  &-primary {
    --hue: 187;
  }

  &-ghost {
    color: hsl(var(--hue), 100%, 41%);
    background-color: transparent;
    border-color: hsl(var(--hue), 100%, 41%);

    &:hover {
      color: white;
    }
  }

  &-shine {
    color: white;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        hsla(var(--hue), 100%, 41%, 0.5),
        transparent
      );
      transform: translateX(-100%);
      transition: 0.6s;
    }

    &:hover {
      background: transparent;
      box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
    }

    &:hover::before {
      transform: translateX(100%);
    }
  }
}
</style>
<template>
  <div class="zoom-not-found">
    <section class="center">
      <article>
        <h1 class="header">404</h1>
        <p class="error">{{ $zoom.$t('您访问的页面不存在!') }}</p>
      </article>
      <article>
        <img src="./component/static/logo.png" alt="ZOOM-UI" />
      </article>
      <article>
        <p>{{ $zoom.$t('地址输入有误? 尝试输入框搜索') }}</p>
      </article>
      <article>
        <form action="">
          <input
            v-model="searchVal"
            type="text"
            name="search"
            class="srchFld"
            :placeholder="$zoom.$t('您想查找什么?')"
            required
          />
          <button @keyup.prevent="searchClick" @click.prevent="searchClick" class="search-btn">
            {{ $zoom.$t('搜索') }}
          </button>
        </form>
      </article>
      <article>
        <h3>{{ $zoom.$t('给您提供建议') }}</h3>
        <ul>
          <li>
            <span class="to-link" @click="toLeave(true)">{{ $zoom.$t('首页') }}</span>
          </li>
          <li>
            <span class="to-link" @click="toLeave(false)"
              >{{ $zoom.$t('返回上一级目录') }}</span
            >
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: "",
      showHeader: false,
    };
  },
  methods: {
    toLeave(bool) {
      this.showHeader = !bool;
      this.$emit("showHeader", this.showHeader);
      if (this.showHeader) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    },
    searchClick() {
      this.$parent.$parent.searchVal = this.searchVal;
      this.$parent.$parent.search();
    },
  },
  created() {
    setTimeout(() => {
      this.$emit("showHeader", false);
    }, 0);
  },
};
</script>
<style scoped lang="scss">
.zoom-not-found {
  article {
    margin-bottom: 10px;
  }
  li {
    .to-link {
      color: #75c6d9;
      cursor: pointer;
      transition: color .3s;
      &:hover {
        color: #fff;
      }
    }
  }

  h3 {
    margin-bottom: 1%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 50px;
  }

  .center {
    text-align: center;
  }

  /* Search Bar Styling */
  form > * {
    vertical-align: middle;
  }

  .search-btn {
    border: 0;
    border-radius: 7px;
    // padding: 0 17px;
    background: #f5222d;
    width: 10vh;
    border-bottom: 5px solid #f5222d;
    color: #eee;
    height: 65px;
    font-size: 2.5vh;
    cursor: pointer;
    transition: color .5s, border-color .5s;
    &:hover {
      background: #ff4d4f;
      border-color: #ff4d4f;
    }
    &:active {
      background: #ff4d4f;
      border-color: #ff4d4f;
    }
  }

  .srchFld {
    border: 0;
    border-radius: 7px;
    padding: 0 17px;
    max-width: 404px;
    width: 40vw;
    border-bottom: 5px solid #bdc3c7;
    height: 60px;
    color: #7f8c8d;
    font-size: 2.5vh;
  }

  .srchFld:focus {
    outline-color: rgba(255, 255, 255, 0);
  }

  /* 404 Styling */
  .header {
    font-size: 20vh;
    font-weight: 700;
    // margin: 2% 0 2% 0;
    text-shadow: 0px 3px 0px #7f8c8d;
  }

  /* Error Styling */
  .error {
    margin: auto;
    font-size: 8vh;
    text-shadow: 0px 3px 0px #7f8c8d;
    font-weight: 100;
  }
  background-color: #0a7189;
  color: #fff;
  font: 100% "Lato", sans-serif;
  font-size: 3vh;
  height: 100vh;
  width: 100vw;
}
</style>


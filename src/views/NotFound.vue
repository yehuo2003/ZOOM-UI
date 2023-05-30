<template>
  <div class="zoom-not-found">
    <section class="center">
      <article>
        <h1 class="header">404</h1>
        <p class="error">ERROR</p>
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
<style lang="scss">
.zoom-not-found {
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
    padding: 0 17px;
    background: #e74c3c;
    width: 99px;
    border-bottom: 5px solid #c0392b;
    color: #fff;
    height: 65px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .search-btn:active {
    border-bottom: 0px solid #c0392b;
  }

  .srchFld {
    border: 0;
    border-radius: 7px;
    padding: 0 17px;
    max-width: 404px;
    width: 40%;
    border-bottom: 5px solid #bdc3c7;
    height: 60px;
    color: #7f8c8d;
    font-size: 19px;
  }

  .srchFld:focus {
    outline-color: rgba(255, 255, 255, 0);
  }

  /* 404 Styling */
  .header {
    font-size: 13rem;
    font-weight: 700;
    margin: 2% 0 2% 0;
    text-shadow: 0px 3px 0px #7f8c8d;
  }

  /* Error Styling */
  .error {
    margin: -70px 0 2% 0;
    font-size: 7.4rem;
    text-shadow: 0px 3px 0px #7f8c8d;
    font-weight: 100;
  }
  background-color: #0a7189;
  color: #fff;
  font: 100% "Lato", sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


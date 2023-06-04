<template>
  <div class="cookie-operation">
    <h2>cookie-operation</h2>
    <div class="tip">
      <text-template code="zoom-ui基于window.cookie封装的一套可供用户极简化操作cookie的API" />
      <text-template code="除了对cookie进行简单的增删改查以外, 还可以对cookie设置子项, 也就是以对象方式存入cookie" />
      <text-template code="该操作可以作为全局存值的一种方法" />
    </div>
    <div v-for="item of list" :key="item.id">
      <h2>{{ $zoom.$t(item.title) }}</h2>
      <h3>{{ $zoom.$t(item.title2) }}</h3>
      <p>
        {{ $zoom.$t('调用方法:') }}
        <span>{{item.text}}</span>
      </p>
      <p>
        {{ $zoom.$t('参数说明:') }} <br>
        <span v-for="i of item.content" :key="i.id">{{ $zoom.$t(i.text) }}<br></span>
      </p>
      <custom-code :html="item.code"></custom-code>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {id: 1, title: 'set', title2: '设置一条完整的cookie', text: 'this.$zoom.cookie.set(name, subCookies, expires, domain, path, secure)',
          code: `this.$zoom.cookie.set("info", { name : "zoom", age : 23});`, content: [
          {id: 1, text: 'name : 表示cookie的名称，必填'},
          {id: 2, text: 'subCookies : 表示cookie的值，必填'},
          {id: 3, text: 'expires : 表示cookie的过期时间，可以不填'},
          {id: 4, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 5, text: 'path : 表示cookie的路径，可以不填'},
          {id: 6, text: 'secure : 表示cookie的安全标志，可以不填'}
        ]},
        {id: 2, title: 'setChild', title2: '设置一条子cookie', text: 'this.$zoom.cookie.setChild(name, subName, value, expires, domain, path, secure)',
          code: `this.$zoom.cookie.setChild("info", "sex", "boy");`, content: [
          {id: 1, text: 'value : 表示子cookie的值，必填'},
          {id: 2, text: 'name : 表示cookie的名称，必填'},
          {id: 3, text: 'subName : 表示子cookie的名称，必填'},
          {id: 4, text: 'expires : 表示cookie的过期时间，可以不填'},
          {id: 5, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 6, text: 'path : 表示cookie的路径，可以不填'},
          {id: 7, text: 'secure : 表示cookie的安全标志，可以不填'}
        ]},
        {id: 3, title: 'get', title2: '读取一条完整cookie, 如果没传参数则默认读取所有cookie', text: 'this.$zoom.cookie.get(name)',
          code: `this.$zoom.cookie.get("info");`, content: [
          {id: 1, text: 'name : 表示cookie的名称，必填'},
          {id: 2, text: 'subCookies : 表示cookie的值，必填'},
          {id: 3, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 4, text: 'path : 表示cookie的路径，可以不填'},
          {id: 5, text: 'secure : 表示cookie的安全标志，可以不填'}
        ]},
        {id: 5, title: 'getChild', title2: '读取一条子cookie的值', text: 'this.$zoom.cookie.getChild(name, subName)',
          code: `this.$zoom.cookie.getChild("info", "name");`, content: [
          {id: 1, text: 'name : 表示cookie的名称，必填'},
          {id: 2, text: 'subCookies : 表示cookie的值，必填'},
          {id: 3, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 4, text: 'path : 表示cookie的路径，可以不填'},
          {id: 5, text: 'secure : 表示cookie的安全标志，可以不填'}
        ]},
        {id: 6, title: 'del', title2: '删除一条完整cookie', text: 'this.$zoom.cookie.del(name, domain, path, secure)',
          code: `this.$zoom.cookie.del("info");`, content: [
          {id: 1, text: 'name : 表示cookie的名称，必填'},
          {id: 3, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 4, text: 'path : 表示cookie的路径，可以不填'},
          {id: 5, text: 'secure : 表示cookie的安全标志，可以不填'}
        ]},
        {id: 7, title: 'delChild', title2: '删除一条子cookie', text: 'this.$zoom.cookie.delChild(name, subName, domain, path, secure)',
          code: `this.$zoom.cookie.delChild("info", "name");`, content: [
          {id: 1, text: 'name : 表示cookie的名称，必填'},
          {id: 2, text: 'subCookies : 表示cookie的值，必填'},
          {id: 3, text: 'domain : 表示cookie的域名，可以不填'},
          {id: 4, text: 'path : 表示cookie的路径，可以不填'},
          {id: 5, text: 'secure : 表示cookie的安全标志，可以不填'},
        ]},
        {id: 8, title: 'clear', title2: '清除当前所有cookie', text: 'this.$zoom.cookie.clear()',
          code: `this.$zoom.cookie.clear();`, content: []},
      ],
      set: `this.$zoom.cookie.set("info", { name : "zoom", age : 23});`,
      setChild: `this.$zoom.cookie.setChild("info", "sex", "boy");`,
      get: `this.$zoom.cookie.get("info");`,
      del: `this.$zoom.cookie.del("info");`,
      getChild: `this.$zoom.cookie.getChild("info", "name");`,
      delChild: `this.$zoom.cookie.delChild("info", "name");`,
      clear: `this.$zoom.cookie.clear();`
    };
  }
};
</script>
<style lang="scss" scoped>
.cookie-operation {
  h1,
  h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
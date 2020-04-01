<template>
  <div class="cookie-operation">
    <h1>cookie操作</h1>
    <h2>cookie-operation</h2>
    <div class="tip">
      zoom-ui基于window.cookie封装的一套可供用户极简化操作cookie的API
      <br />除了对cookie进行简单的增删改查以外, 还可以对cookie设置子项, 也就是以对象方式存入cookie
      <br />该操作可以作为全局存值的一种方法
    </div>
    <h2>set</h2>
    <h3>设置一条完整的cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.set(name, subCookies, expires, domain, path, secure)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，必填</span>、<br>
      <span>subCookies : 表示cookie的值，为一个对象，必填</span>、<br>
      <span>expires : 表示cookie的过期时间，可以不填</span>、<br>
      <span>domain : 表示cookie的域名，可以不填</span>、<br>
      <span>path : 表示cookie的路径，可以不填</span>、<br>
      <span>secure : 表示cookie的安全标志，可以不填</span>
    </p>
    <custom-code :html="set"></custom-code>
    <h2>setChild</h2>
    <h3>设置一条子cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.setChild(name, subName, value, expires, domain, path, secure)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，必填</span>、<br>
      <span>subName : 表示子cookie的名称，必填</span>、<br>
      <span>value : 表示子cookie的值，必填</span>、<br>
      <span>expires : 表示cookie的过期时间，可以不填</span>、<br>
      <span>domain : 表示cookie的域名，可以不填</span>、<br>
      <span>path : 表示cookie的路径，可以不填</span>、<br>
      <span>secure : 表示cookie的安全标志，可以不填</span>
    </p>
    <custom-code :html="setChild"></custom-code>
    <h2>get</h2>
    <h3>读取一条完整cookie, 如果没传参数则默认读取所有cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.get(name)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，不填默认获取所有cookie</span>
    </p>
    <custom-code :html="get"></custom-code>
    <h2>getChild</h2>
    <h3>读取一条子cookie的值</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.getChild(name, subName)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，必填</span>、<br>
      <span>subName : 表示子cookie的名称</span>、
    </p>
    <custom-code :html="getChild"></custom-code>
    <h2>del</h2>
    <h3>删除一条完整cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.del(name, domain, path, secure)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，必填</span>、<br>
      <span>domain : 表示cookie的域名，可以不填</span>、<br>
      <span>path : 表示cookie的路径，可以不填</span>、<br>
      <span>secure : 表示cookie的安全标志，可以不填</span>
    </p>
    <custom-code :html="del"></custom-code>
    <h2>delChild</h2>
    <h3>删除一条子cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.delChild(name, subName, domain, path, secure)</span>
    </p>
    <p>
      参数说明: <br>
      <span>name : 表示cookie的名称，必填</span>、<br>
      <span>subCookies : 表示cookie的值，为一个对象，必填</span>、<br>
      <span>domain : 表示cookie的域名，可以不填</span>、<br>
      <span>path : 表示cookie的路径，可以不填</span>、<br>
      <span>secure : 表示cookie的安全标志，可以不填</span>
    </p>
    <custom-code :html="delChild"></custom-code>
    <h2>clear</h2>
    <h3>清除当前所有cookie</h3>
    <p>
      调用方法:
      <span>this.$zoom.cookie.clear()</span>
    </p>
    <custom-code :html="clear"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
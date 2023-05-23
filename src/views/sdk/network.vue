<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-23 23:50:18
-->
<template>
  <div class="network">
    <h2>network</h2>
    <div class="tip">
      zoom-ui内部封装的服务请求, 是基于原生ajax进行封装,
      用户可以不必再引用第三方插件,
      而是可以直接通过zoom-ui内置的服务请求方法进行服务调用。
    </div>
    <h3>调用示例</h3>
    <p>可使用方法有: get/post/put/delete等</p>
    <p>通过调用<span>this.$zoom.network.xx().then()</span>, 返回一个Promise对象</p>
    <span>get方法演示</span>
    <custom-code :html="getNetWork"></custom-code>
    <h3>post方法演示</h3>
    <p>如果调用方法为post/put/delete等, 可以传入请求主体<span>params</span>, 可以以对象形式传参, 也可以依次传参</p>
    <p>依次传参的参数为: url、params、headers</p>
    <custom-code :html="postNetWork"></custom-code>
    <h3>设置更多信息</h3>
    <p>如果要配置服务请求时间, 必须要以对象形式, 配置参数<span>timeout</span>, 单位为毫秒, 当请求时间超过timeout则会终止服务请求。</p>
    <custom-code :html="timeoutNetWork"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getNetWork:
        `const url = 'http://127.0.0.1:8090/get'
          this.$zoom.network.get(url).then((res) => {
            console.log(res)
          }).catch(err => console.error(err));
          /**
           *  url为必填
           *  返回对象为promise
           *  可catch捕捉错误
           */`,
      postNetWork:`
        const url = 'http://127.0.0.1:8090/post'
        const params = {
          userName: 'yehuo2003',
          password: '123456'
        }
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        this.$zoom.network.post(url, params, headers).then((res) => {
          console.log(res)
        }).catch(err => console.error(err));
        /**
         *  url为必填
         *  返回对象为promise
         *  可catch捕捉错误
         */`,
      timeoutNetWork:`
        const url = 'http://127.0.0.1:8090/post'
        const params = {
          userName: 'yehuo2003',
          password: '123456'
        }
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        this.$zoom.network.post({
          url: url,
          params: params,
          headers: params,
          timeout: 30000  // 如果服务超过30秒未响应将会被强制终止
        }).then((res) => {
          console.log(res)
        }).catch(err => console.error(err));
        /**
         *  url为必填
         *  返回对象为promise
         *  可catch捕捉错误
         */`,
    };
  }
};
</script>
<style lang="scss" scoped>
.network {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
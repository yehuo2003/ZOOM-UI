<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-25 23:41:56
-->
<template>
  <div class="network">
    <h2>Network网络类</h2>
    <div class="tip">
      zoom-ui内部封装的Network网络类, 是基于原生ajax进行封装,
      用法和axios基本相同, 只支持异步请求。
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
    <attribute :list="attributeList"></attribute>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attributeList: [
        {
          id: 1,
          title: "属性",
          content: [
            {
              id: 1,
              title: "服务地址",
              name: "url",
              type: "String",
              text: "服务地址, 必填",
              text2: '用法: 调用方法<span>this.$zoom.network.get(url).then()</span>'
            },
            {
              id: 2,
              title: "请求主体",
              name: "params",
              type: "Object",
              text: "服务请求主体, 当服务为post/put/delete时可以使用。",
              text2: '用法: 调用方法<span>this.$zoom.network.post(url, params).then()</span>'
            },
            {
              id: 3,
              title: "请求头",
              name: "headers",
              type: "Object",
              text: "服务请求头, <span>const headers = {'Content-Type': 'application/x-www-form-urlencoded'}</span>",
              text2: '用法: 调用方法<span>this.$zoom.network.post(url, params, headers).then()</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "GET",
              name: "get",
              type: "Function",
              text: "请求指定的页面信息, 并返回实体主体。",
              text2: '用法: <span>this.$zoom.network.get(url).then()</span>'
            },
            {
              id: 2,
              title: "POST",
              name: "post",
              type: "Function",
              text: "向指定资源提交数据进行处理请求（例如表单或者上传文件），数据被包含在请求体中。",
              text2: '用法: 调用方法<span>this.$zoom.network.post(url, params).then()</span>'
            },
            {
              id: 3,
              title: "HEAD",
              name: "head",
              type: "Function",
              text: "类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头。",
              text2: '用法: 调用方法<span>this.$zoom.network.head(url).then()</span>'
            },
            {
              id: 4,
              title: "PUT",
              name: "put",
              type: "Function",
              text: "从客户端向服务器传送的数据取代指定的文档内容。",
              text2: '用法: 调用方法<span>this.$zoom.network.put(url, params).then()</span>'
            },
            {
              id: 5,
              title: "DELETE",
              name: "delete",
              type: "Function",
              text: "从服务器删除指定的数据。",
              text2: '用法: 调用方法<span>this.$zoom.network.delete(url, params).then()</span>'
            },
            {
              id: 6,
              title: "OPTIONS",
              name: "options",
              type: "Function",
              text: "允许客户端查看服务器的性能",
              text2: '用法: 调用方法<span>this.$zoom.network.options(url).then()</span>'
            },
            {
              id: 7,
              title: "TRACE",
              name: "trace",
              type: "Function",
              text: "回显服务器收到的请求，主要用于测试或诊断。",
              text2: '用法: 调用方法<span>this.$zoom.network.trace(url).then()</span>'
            }
          ]
        }
      ],
      getNetWork:
        `
        /**
         *  url为必填
         *  config可选
         *  返回对象为promise
         *  可catch捕捉错误
         */
        const url = 'http://127.0.0.1:8090/get';
        this.$zoom.network.get(url).then((res) => {
          console.log(res)
        }).catch(err => console.error(err));
        `,
      postNetWork:`
        /**
         *  url为必填
         *  params可选
         *  config可选
         *  返回对象为promise
         *  可catch捕捉错误
         */
        const url = 'http://127.0.0.1:8090/post';
        const params = {
          userName: 'yehuo2003',
          password: '123456'
        }
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        this.$zoom.network.post(url, params, headers).then((res) => {
          console.log(res)
        }).catch(err => console.error(err));
        `,
      timeoutNetWork:`
        const url = 'http://127.0.0.1:8090/post';
        const params = {
          userName: 'yehuo2003',
          password: '123456'
        }
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        this.$zoom.network.post({
          url: url,
          params: params,
          headers: headers,
          timeout: 30000  // 如果服务超过30秒未响应将会被强制终止
        }).then((res) => {
          console.log(res);
        }).catch(err => console.error(err));
        `,
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
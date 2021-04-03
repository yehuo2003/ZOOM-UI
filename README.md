<!--
 * @Description:zoom-ui ReadMe
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-22 00:14:20
 * @LastEditors: linzhuming
 * @LastEditTime: 2021-04-03 14:13:54
-->
# zoom-ui文档说明
***
## ZOOM-UI在线文档预览 <a href="http://yehuo2003.gitee.io/zoom-ui-direction" target="_blank">http://yehuo2003.gitee.io/zoom-ui-direction</a>
***
## 环境准备

### Node.js

**安装zoom-ui前首先确保您的环境安装了Node.js，建议8.0以上版本**
**如果未安装可以到官网 <a href="https://nodejs.org" target="_blank">https://nodejs.org</a> 进行下载安装**

查看Node.js版本可以通过Win + R 打开cmd命令行，输入命令查看Node.js版本：

```js

node -v

```

或者

```js
node --version
```

## 组件安装

### 在要安装的 Vue 项目根目录下运行

**使用npm安装**
通过Win + R 打开cmd命令行，输入命令:

```js
npm install zoom-design --save
```

**使用yarn安装**
```js
yarn add zoom-design
```

## 引入组件
**完整引入**
在main.js文件中全局注册，方法如下：
```js
import zoomUI from 'zoom-design';
import 'zoom-design/lib/zoom-design.css';

Vue.use(zoomUI);
```

## 组件使用

全局导入后，可以直接通过标签使用，方法如下：

*.vue

```html
<template>
  <div class="hello">
    <zoom-button>测试按钮</zoom-button>
    输入框: <zoom-input></zoom-input>
  </div>
</template>

```

## 组件升级

**查看版本**
在项目根目录下，通过Win + R 打开cmd命令行，输入命令:
```js
npm view zoom-design versions
```

**版本升级**
使用npm更新命令如下:
```js
npm update zoom-design --save
```
使用 Yarn 更新:
```js
yarn upgrade
```
以上
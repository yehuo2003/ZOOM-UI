# zoom-ui

## 环境准备

### Node.js

**安装zoom-ui前首先确保您的环境安装了Node.js，建议8.0以上版本**
**如果未安装可以到官网 https://nodejs.org 进行下载安装**

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
以上
# zoom-ui

## Usage example

```js

npm install zoom-ui-1.0 --save

```

main.js

```js
import zoomUI from 'zoom-ui-1.0';
Vue.use(zoomUI);

import '../node_modules/zoom-ui-1.0/lib/zoom-ui-1.0.css'
```

*.vue

```html
<template>
  <div class="hello">
    <zoom-row>
      <zoom-col span="4">
        <zoom-card>
          <zoom-card-header>
            按钮组件
          </zoom-card-header>
          <zoom-card-container>
            <zoom-button :op="btnOp">按钮</zoom-button>
          </zoom-card-container>
        </zoom-card>
      </zoom-col>
      <zoom-col span="4">
        <zoom-card>
          <zoom-card-header>
            上传头像
          </zoom-card-header>
          <zoom-card-container>
            <zoom-upload></zoom-upload>
          </zoom-card-container>
        </zoom-card>
      </zoom-col>
      <zoom-col span="4">
        <zoom-card>
          <zoom-card-header>
            随机验证码
          </zoom-card-header>
          <zoom-card-container>
            <zoom-testing></zoom-testing>
          </zoom-card-container>
        </zoom-card>
      </zoom-col>
    </zoom-row>
    <zoom-msg ref="msg"></zoom-msg>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      btnOp: {
        onClick:() => {
          this.$refs['msg'].msgPlugin('test demo',2000);
        }
      }
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```

### Lints and fixes files
```
npm run lint
```

## License

[MIT](https://opensource.org/licenses/MIT)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

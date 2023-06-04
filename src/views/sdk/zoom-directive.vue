<!--
 * @Description:内置指令
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-31 17:28:48
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-04 13:31:34
-->
<template>
  <div class="zoom-directive">
    <h2>directive</h2>
    <div class="tip">
      <text-template code="zoom-ui基于vue封装的扩展指令、目前有自动聚焦、自由拖拽、提示和懒加载功能" />
      <text-template code="用户需要使用可根据规范，在DOM标签上直接通过 v-标签 的形式直接使用。" />
    </div>
    <h3>v-focus</h3>
    <text-template code="自动聚焦指令, 仅限在非禁用状态下的 input 组件内使用, 使用后, 当用户浏览此页面时, 光标自动聚焦在该输入框中" />
    <custom-code :html="focus"></custom-code>
    <h3>v-drag</h3>
    <text-template code="自由拖拽指令, 可以在任意标签上使用, 但是该元素必须要设置属性*position: absolute;*或*position: relative;*或*position: fixed;*,使用前确保该属性已脱离文档流" />
    <custom-code :html="drag"></custom-code>
    <h3>v-color</h3>
    <text-template code="自由颜色指令, 可以在任意标签上使用, 绑定自己需要的色号或颜色*v-color='color'*" />
    <custom-code :html="color"></custom-code>
    <h3>v-lazyload</h3>
    <text-template code="" />
    <p>图片懒加载, 只能对图片标签使用, 取代<span>src</span>属性, 引用后, 图片将自动开启懒加载功能</p>
    <custom-code :html="lazyload"></custom-code>
    <h3>v-longPress</h3>
    <text-template code="长按指令，默认时间为2000毫秒，可以自定义时间*v-longPress:[time]='Function' || v-longPress:2000='Function'*" />
    <custom-code :html="longPress"></custom-code>
    <h3>v-waterMarker</h3>
    <text-template code="使用canvas特性生成base64格式的图片文件" />
    <text-template code="text: 水印文字内容，必填" />
    <text-template code="textColor: 字体颜色，默认*rgba(100, 100, 100, 0.5)*" />
    <text-template code="font: 字体样式，默认*italic bold 16px Microsoft YaHei*" />
    <text-template code="" />
    <custom-code :html="waterMarker"></custom-code>
    <h3>v-tip</h3>
    <text-template code="tip提示, 可在任意标签上使用, 绑定tip内容, 个性化操作请看 Tip文字提示" />
    <custom-code :html="tip" cls="javascript"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      focus: '&lt;input v-focus type="text"&gt;',
      longPress: `&lt;zoom-button v-longPress="handleClick""&gt;默认2000毫秒后触发&lt;/zoom-button&gt;
          &lt;zoom-button v-longPress:500="handleClick""&gt;500毫秒后触发&lt;/zoom-button&gt;`,
      drag: '&lt;div v-drag style="position: relative;"&gt;自由拖拽&lt;/div&gt;',
      waterMarker: `&lt;div v-waterMarker="{text:'zoom-UI版权所有',textColor:'#ff4d4f', font: '10px Microsoft YaHei'}"&gt;添加背景水印&lt;/div&gt;`,
      color: `&lt;span v-color="'red'"&gt;自定义颜色&lt;/span&gt;`,
      lazyload: '&lt;img v-lazyload="src"&gt;',
      tip: `&lt;span v-tip="'提示文字内容'"&gt;一段文字&lt;/span&gt;`
    };
  }
};
</script>
<style lang="scss" scoped>
.zoom-directive {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
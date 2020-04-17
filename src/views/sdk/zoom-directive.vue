<template>
  <div class="zoom-directive">
    <h2>directive</h2>
    <div class="tip">
      zoom-ui基于vue封装的扩展指令、目前有自动聚焦、自由拖拽、提示和懒加载功能<br>
      用户需要使用可根据规范，在DOM标签上直接通过 v-标签 的形式直接使用。
    </div>
    <h3>v-focus</h3>
    <p>自动聚焦指令, 仅限在非禁用状态下的 <span>input</span> 组件内使用, 使用后, 当用户浏览此页面时, 光标自动聚焦在该输入框中</p>
    <custom-code :html="focus"></custom-code>
    <h3>v-drag</h3>
    <p>自由拖拽指令, 可以在任意标签上使用, 但是该元素必须要设置属性<span>position: absolute;</span>或<span>position: relative;</span>或<span>position: fixed;</span>,使用前确保该属性已脱离文档流</p>
    <custom-code :html="drag"></custom-code>
    <h3>v-lazyload</h3>
    <p>图片懒加载, 只能对图片标签使用, 取代<span>src</span>属性, 引用后, 图片将自动开启懒加载功能</p>
    <custom-code :html="lazyload"></custom-code>
    <h3>v-tip</h3>
    <p>tip提示, 可在任意标签上使用, 绑定tip内容, 个性化操作请看 <a href="#/component/zoom-tip">Tip文字提示</a></p>
    <custom-code :html="tip" cls="javascript"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      focus: '&lt;input v-focus type="text"&gt;',
      drag: '&lt;div v-drag style="position: relative;"&gt;自由拖拽&lt;/div&gt;',
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
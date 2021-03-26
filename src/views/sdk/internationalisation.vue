<template>
  <div class="internationalisation">
    <h2>internationalisation</h2>
    <div class="tip">
      zoom-ui内部封装的国际化组件, 目前zoom-ui已经引入了三种语言国际化，分别是：简体中文（zh）、英文（en）、日文（ja）<br>
      用户可以根据自己需要，添加自己需要的国际化语言或者国际化文件，并且可以在项目内自由切换国际化语言
    </div>
    <h3>获取当前国际化</h3>
    <span>{{$zoom.$t("test.iter2")}}</span>
    <span>{{$zoom.$t("test.iter")}}</span>
    <p>通过调用<span>this.$zoom.getLanguage()</span>, 返回当前所有国际化信息</p>
    <custom-code :html="getLanguage"></custom-code>
    <h3>设置/修改国际化</h3>
    <p>通过调用<span>this.$zoom.setLanguage(lang)</span>, 可以设置/修改国际化, 并返回当前最新所有国际化信息</p>
    <p>因为个别浏览器以及缓存原因, 如果切换了国际化后未立马生效请刷新浏览器</p>
    <custom-code :html="setLanguage"></custom-code>
    <h3>使用国际化展示</h3>
    <p>确保国际化名称正常, 可使用<span>$zoom.$t("国际化名称")</span>来展示国际化</p>
    <custom-code :html="use"></custom-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getLanguage:
        `this.$zoom.getLanguage();
          /**
           * return {
           *   locale: "zh",
           *   i18n: {  //  当前所有语言详情
           *     en: {'xxx': 'xxx'}, // 英文
           *     zh: {'xx': 'xxx'}  //  中文
           *     ...
           *   }
           * };
           */`,
      setLanguage:
        `let lang = {
            locale: 'en',	//	要修改的语言
            i18n: { //  要设置/修改的国际化
                zh: {
                  'set.success': '设置成功',
                  'set.failed': '设置失败'
                },
                en: {
                  'set.success': 'set success',
                  'set.failed': 'set failed',
                }
            },
            ...
          }
          this.$zoom.setLanguage(lang);
          //  return {locale: "en", i18n: {en: {'xxx': 'xxx'}, zh: {'xx': 'xxx'}, ... }};  //  返回设置完的最新国际化`,
      use:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;span&gt;{{'file.upload_error', { errCount: 5 })}}&lt;/span&gt;   // 上传失败5个文件！
              &lt;span&gt;{{$zoom.$t("search.msg")}}&lt;/span&gt;   // 请输入关键词
            &lt;/div&gt;
          &lt;/template&gt;`
    };
  }
};
</script>
<style lang="scss" scoped>
.internationalisation {
  h1,h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
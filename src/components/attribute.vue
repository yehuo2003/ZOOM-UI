<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:35:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-12 00:05:18
-->
<template>
  <div>
    <div v-for="item of list" :key="item.id" class="attribute-type">
      <h2>{{ $zoom.$t(item.title) }}</h2>
      <zoom-panel
        v-for="i of item.content"
        :key="i.id"
        :title="'<span>' + i.title +'</span><span>' + i.type + '</span>'"
      >
        <h3>{{ $zoom.$t(i.name) }}</h3>
        <text-template :code="setLanguage(i.text)" />
        <text-template :code="setLanguage(i.text2)" />
        <text-template :code="setLanguage(i.text3)" />
        <!-- <p v-html="i.text"></p>
        <p v-html="i.text2"></p>
        <p v-html="i.text3"></p> -->
      </zoom-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attribute',
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    setLanguage(val) {
      if (val) {
        const regex = /<span>(.*?)<\/span>/g;
        const regex2 = /"([^"]*)"/g;
        const text = val.replace(regex, '*$1*').replace(regex2, "'$1'");
        // console.log(text);
        return text;
      }
      return val;
    }
  }
};
</script>
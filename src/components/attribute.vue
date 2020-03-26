<template>
  <div>
    <div v-for="item of list" :key="item.id" class="attribute-type">
      <h2>{{item.title}}</h2>
      <zoom-panel
        v-for="i of item.content"
        :key="i.id"
        :title="'<span>' + i.name +'</span><span>' + i.type + '</span>'"
      >
        <h3>{{i.title}}</h3>
        <p v-html="i.text"></p>
        <p v-html="i.text2"></p>
        <p v-html="i.text3"></p>
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
  data() {
    return {
    }
  }
};
</script>
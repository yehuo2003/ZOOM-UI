<template>
  <ol class="zoom-breadcrumb">
    <li v-for="(item, index) of value" :key="index" :class="item.css" :zoom-flag="breadcrumbFlag">
      <a
        @click="handleClick(item, index)"
        :data-id="item.id"
        :href="item.url"
        :target="item.target == 'blank' ? '_blank' : '' "
      >{{item.title}}</a>
    </li>
  </ol>
</template>
<script>
export default {
  name: "zoom-breadcrumb",
  props: {
    op: {
      type: Object,
      data: {
        type: Array
      },
      flag: String
    }
  },
  data() {
    return {
      breadcrumbFlag: ">",
      value: []
    };
  },
  created() {
    if (this.op) {
      if (this.op.data) {
        this.value = this.op.data;
      }
      if (this.op.flag) {
        this.breadcrumbFlag = this.op.flag;
      }
    }
  },
  methods: {
    // 点击事件
    handleClick(item, index) {
      let value = JSON.parse(JSON.stringify(item));
      if (item.onClick) {
        delete value.onClick;
        item.onClick(value, index);
      }
    }
  }
};
</script>
<style>
ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.zoom-breadcrumb {
  padding: 8px 0;
  line-height: 1em;
  list-style: none;
}
.zoom-breadcrumb > li {
  display: inline-block;
}
.zoom-breadcrumb > li a {
  padding: 4px;
}
.zoom-breadcrumb > li.breadcrumb-active a {
  font-weight: 700;
  color: #333;
}
.zoom-breadcrumb > li a:hover {
  color: #1890ff;
  cursor: pointer;
}
.zoom-breadcrumb > li + li::before {
  content: attr(zoom-flag);
  font-family: "\5B8B\4F53", sans-serif;
  color: #999;
}
</style>

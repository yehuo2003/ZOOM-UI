<template>
  <div class="zoom-selector">
    <div class="show-warpper" @click="close"></div>
    <div class="selector-content">
      <ul class="zoom-poplist">
        <li
          v-for="(item,index) of options.data"
          :key="index"
          :val="item.value"
          :title="item.text"
          @click="itemClick(item)"
          class="list-item"
        >
          <!-- 多选功能开启时启动复选框 -->
          <zoom-checkbox v-show="isChecked" :op="checkOp">{{item.text}}</zoom-checkbox>
          {{isChecked ? '' : item.text}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-dropdown-content",
  props: {
    options: Object,
    isChecked: Boolean
  },
  data() {
    return {
      checkOp: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "", value: "" }]
      }
    }
  },
  methods: {
    close() {
      if (this.options && this.options.disabled) {
        return;
      }
      // this.showDown = !this.showDown;
    },
    itemClick(e) {
      this.$emit("input", e);
    },
  }
};
</script>
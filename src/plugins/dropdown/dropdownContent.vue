<template>
  <div class="zoom-selector">
    <div class="selector-content">
      <ul class="zoom-poplist">
        <!-- 多选功能时开启 -->
        <li v-if="isChecked" class="list-item"><zoom-checkbox v-model="isSelect" ref="select" :op="checkOp2"></zoom-checkbox></li>
        <li
          v-for="(item,index) of options.data"
          :key="index"
          :val="item.value"
          :title="item.text"
          @click="itemClick(item)"
          class="list-item"
        >
          <!-- 多选功能开启时启动复选框 -->
          <zoom-checkbox v-show="isChecked" :ref="item.value" :op="checkOp">{{item.text}}</zoom-checkbox>
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
  watch: {
    isSelect: function(newVal, oldVal) {
      this.options.data.forEach(item => {
        item.checked = oldVal;
        this.$emit("input", item);
      })
    },
    /**
     * 全选/取消功能
     *
     */
    "options.data": {
      handler: function(val) {
        if (!this.isChecked) return
        let length = val.length;
        let isCheckNum = 0;
        val.forEach(item => {
          if (item.checked) {
            isCheckNum += 1;
          }
          this.$refs[item.value][0].list[0].checked = item.checked
        })
        if (isCheckNum === length) {
          this.$refs['select'].list[0].checked = true;
        } else {
          this.$refs['select'].list[0].checked = false;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      isSelect: false,
      checkOp: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "", value: "" }]
      },
      checkOp2: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "全选/取消", value: false }]
      }
    }
  },
  methods: {
    itemClick(e) {
      this.$emit("input", e);
    }
  }
};
</script>
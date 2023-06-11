<!--
 * @Description:下拉框内容部分
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-04-12 11:40:54
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-06-11 22:32:24
-->
<template>
  <div class="zoom-selector">
    <div class="selector-content">
      <ul class="zoom-poplist">
        <!-- 多选功能时开启 -->
        <li v-if="isChecked" class="list-item">
          <zoom-checkbox
            ref="select"
            :op="checkOp2"
            @click="checkboxClick"
          >
          </zoom-checkbox>
        </li>
        <li
          v-for="(item, index) of options"
          :key="index"
          :val="item.value"
          :title="item.text"
          @click.stop="itemClick(item)"
          :class="item.disabled ? 'is-disabled' : ''"
          class="list-item"
        >
          <!-- 多选功能开启时启动复选框 -->
          <zoom-checkbox v-show="isChecked" :ref="item.value" :op="setCheckOp(item.disabled)">{{
            item.text
          }}</zoom-checkbox>
          {{ isChecked ? "" : item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-select-content",
  props: {
    options: Array,
    isChecked: Boolean,
  },
  data() {
    return {
      checkOp2: {
        //  如果配置了多选
        Bool: true,
        data: [{ text: "全选/取消", value: false }]
      },
    };
  },
  mounted () {
    if (this.isChecked) {
      this.options.forEach(item => {
        if (item.checked) {
          this.$refs[item.value][0].list[0].checked = true;
        }
      })
    }
  },
  methods: {
    setCheckOp(disabled) {
      return {
        Bool: true,
        disabled,
        data: [{text: '', value: ''}]
      }
    },
    checkboxClick() {
      this.$nextTick(() => {
        if (this.$refs["select"].list[0].checked) {
          this.options.forEach(item => {
            if (!item.disabled) {
              this.$refs[item.value][0].list[0].checked = true;
            }
          });
          this.$emit('input', 'all');
        } else {
          this.options.forEach(item => {
            if (!item.disabled) {
              this.$refs[item.value][0].list[0].checked = false;
            }
          });
          this.$emit('input', 'cancel');
        }
      });
    },
    itemClick(e) {
      if (e.disabled) {
        return;
      }
      this.$nextTick(() => {
        if (this.isChecked) {
          let Bool = this.options.find(item => {
            if (!item.disabled) {
              return this.$refs[item.value][0].list[0].checked === !this.$refs[e.value][0].list[0].checked;
            }
          });
          if (!Bool) {
            this.$refs["select"].list[0].checked = !this.$refs["select"].list[0].checked;
          }
          e.checked = !e.checked;
        }
        this.$emit("input", e);
      })
    },
    handlerOption(val) {
      if (!this.isChecked) return;
      let length = val.length;
      let isCheckNum = 0;
      val.forEach((item) => {
        if (item.checked) {
          isCheckNum += 1;
        }
        this.$refs[item.value][0].list[0].checked = item.checked;
      });
      if (isCheckNum === length) {
        this.$refs["select"].list[0].checked = true;
      } else {
        this.$refs["select"].list[0].checked = false;
      }
    },
  },
};
</script>
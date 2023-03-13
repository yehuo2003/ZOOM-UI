<!--
 * @Description: 下拉框数据
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-02-25 18:08:58
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-03-13 20:51:08
-->
<script>
export default {
  name: 'zoom-option',
  props: {
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>
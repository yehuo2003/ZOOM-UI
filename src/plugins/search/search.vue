<template>
  <div class="zoom-search zoom-input">
    <div :class=" focus ? 'focus' : '' " class="search-line">
      <div v-if="list.length > 0" class="search-place">
        <span class="search-text">{{obj.text}}</span>
        <span class="search-outer">
          <a class="zoom-icon icon-down"></a>
        </span>
        <div class="zoom-search-select">
          <div class="select-body">
            <ul class="search-popup">
              <li v-for="item of list" :key="item.value" @click="selectClick(item)">{{item.text}}</li>
            </ul>
          </div>
        </div>
      </div>
      <input
        @focus="focus = true"
        @blur="focus = false"
        @input="Oninput"
        @keyup.enter="search"
        :value="currentValue"
        :placeholder="options.placeHolder"
        :readonly="options.readonly"
        :disabled="options.isdisabled"
        type="text"
        class="zoom-input-search"
      />
      <div class="input-btn">
        <a class="zoom-icon icon-search"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zoom-search",
  props: {
    op: {
      placeHolder: {
        type: String,
        default: "请输入关键词"
      },
      isdisabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        // 是否禁止输入默认false
        type: Boolean,
        default: false
      },
      data: Array //  可选的查找数据
    },
    search: Function, // search(val, key)
    value: String
  },
  data() {
    return {
      list: [],
      obj: {},
      focus: false,
      currentValue: this.value,
      options: {
        placeHolder: "请输入关键词",
        readonly: false,
        isdisabled: false
      }
    };
  },
  created() {
    if (this.op) {
      this.options = this.op;
      if (this.op.data && this.op.data.length > 0) {
        this.list = this.op.data;
        this.obj = this.list[0];
      }
    }
  },
  methods: {
    // 点击搜索条目
    selectClick(e) {
      if (e !== this.obj) {
        this.obj = e;
      }
    },
    Oninput($event) {
      this.currentValue = $event.target.value;
      this.$emit("input", $event.target.value);
    },
    /**
     * 向父组件传递search事件, 可获取参数 input 框value值, 当前查找的obj
     */
    serach() {
      this.$$emit("serach", this.currentValue, this.obj);
      if (this.op && this.op.onClick) {
        this.op.onClick();
      }
    }
  }
};
</script>
<style>
/* 弹出菜单 */
.zoom-search-select .select-body .search-popup li:hover {
  background: #e6f7ff;
  cursor: pointer;
}
.zoom-search-select .select-body .search-popup li {
  min-height: 30px;
  line-height: 30px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
}
.zoom-search-select .select-body .search-popup {
  list-style: none;
  margin: 0;
  padding: 0;
}
.zoom-search-select .select-body {
  min-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.zoom-search .zoom-search-select {
  display: none;
  position: absolute;
  top: 32px;
  left: 0;
  border: 1px solid #d9d9d9;
  overflow: hidden;
  box-shadow: none;
  min-width: 75px;
  border-radius: 2px;
  background: #fff;
  color: #333;
  margin-top: 2px;
  font-size: 12px;
}
/* 搜索框 */
.zoom-search.zoom-input .select-line:hover .zoom-search-select {
  display: block;
}
.zoom-search.zoom-input .select-line.focus {
  border: #1890ff;
}
.zoom-search.zoom-input
  .select-line
  input.zoom-input-search[disabled]
  + .input-btn
  a {
  color: #333;
}
.zoom-search.zoom-input .select-line .input-btn {
  width: 30px;
  height: 30px;
  display: table-cell;
  position: relative;
  vertical-align: middle;
  right: 0;
}
.zoom-input .input-btn a,
.zoom-input .input-btn span {
  text-decoration: none;
  display: block;
  float: left;
  color: #1890ff;
  font-size: 14px;
  width: 30px;
  line-height: 30px;
}
.zoom-search.zoom-input .select-line input.zoom-input-search {
  padding-left: 8px;
  outline: 0;
  border: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: 0 0;
}
.zoom-search.zoom-input .select-line .search-place .search-outer a {
  color: #c4c4c4;
  font-size: 14px;
}
.zoom-search.zoom-input .select-line .search-place .search-outer {
  height: 26px;
  display: inline-block;
  padding: 0 10px;
  line-height: 26px;
  border-right: 1px solid #d9d9d9;
}
.zoom-search.zoom-input .select-line .search-place .search-text {
  color: #333;
  margin-left: 4px;
}
.zoom-search.zoom-input .select-line .search-place {
  line-height: 30px;
  display: table-cell;
  padding: 0 8px;
  width: 1px;
  white-space: nowrap;
  position: relative;
  vertical-align: middle;
  right: 0;
}
.zoom-search.zoom-input .select-line {
  display: inline-table;
  width: 100%;
  height: 30px;
  border: 1px solid #d9d9d9;
  background: #fff;
  transition: 0.5s;
}
</style>
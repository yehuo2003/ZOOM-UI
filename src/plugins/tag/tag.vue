<template>
  <div class="zoom-tag medium">
    <ul>
      <li v-if="addTag" :class="[addFocus ? 'focus' : '', disabled ? 'disabled' : '']" @click="addValue" class="add info">
        <span v-show="!addFocus" class="zoom-icon icon">+</span>
        <span v-show="!addFocus">{{addtitle}}</span>
        <input ref="tag-input" v-show="addFocus" v-model="addVal" @blur="addBlur" @keyup.enter="addBlur" type="text" />
      </li>
      <li
        :disabled="disabled"
        v-for="(item, index) of tagList"
        :key="index"
        :class="item.active ? 'selected' : '' "
        @click="disabled ? null : item.active = !item.active"
        :zoom-type="item.type ? item.type : 'primary' "
        class="tag zoom-border"
      >
        <span :title="item.title" class="text">{{item.title}}</span>
        <span
          v-show="!disabled"
          v-if="addTag"
          @click.stop="deleteTag(item, index)"
          class="zoom-icon icon-close close"
        ></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "zoom-tag",
  props: {
    op: {
      type: Object,
      addTag: {
        //  启用添加tag标签
        type: Boolean,
        default: false
      },
      title: {
        // 添加按钮的标题  默认叫 add
        type: String
      },
      disabled: {
        // 是否禁用
        type: Boolean,
        default: false
      },
      addType: String, // 新增的标签数据类型
      beforeAddValue: Function, //  添加数据前事件
      afterAddValue: Function, //  添加数据成功后
      beforeDelete: Function, //  删除Tag前事件
      afterDelete: Function, //  删除Tag成功后
      data: {
        // 默认数据
        type: Array
      }
    }
  },
  data() {
    return {
      addTag: false, //  为true可以手动添加tag标签
      addtitle: "add",
      disabled: false, //  是否禁用
      tagList: [],
      addFocus: false,
      addVal: ""
    };
  },
  created() {
    if (this.op) {
      // 是否禁用
      if (this.op.disabled) {
        this.disabled = this.op.disabled;
      } else {
        this.disabled = false;
      }
      if (this.op.data) {
        let data = [];
        // 如果没有active, 就添加一个默认值false
        this.op.data.forEach(item => {
          let obj = {
            title: item.title,
            type: item.type,
            active: item.active ? item.active : false
          };
          data.push(obj);
        });
        this.tagList = data;
      }
      // 是否启用添加功能
      if (this.op.addTag) {
        this.addTag = this.op.addTag;
        if (this.op.title) {
          this.addtitle = this.op.title;
        }
      } else {
        this.addTag = false;
      }
    }
  },
  methods: {
    // 关闭标签
    deleteTag(e, index) {
      // 如果设置了beforeDelete方法并返回false就不删除
      if (this.disabled || this.op && this.op.beforeDelete && !this.op.beforeDelete(e, index)) {
        return;
      }
      let arr = JSON.parse(JSON.stringify(this.tagList));
      arr.splice(index, 1);
      this.tagList = arr;
      this.op && this.op.afterDelete && this.op.afterDelete(this.tagList)
    },
    // 点击按钮添加
    addValue() {
      if (this.disabled) {
        return
      }
      this.addVal = "";
      this.addFocus = true;
      this.$nextTick(() => {
        this.$refs["tag-input"].focus();
      });
    },
    // 失去焦点时候添加进数组
    addBlur() {
      if (!this.addVal) {
        return
      }
      let obj = {
        title: this.addVal,
        type: this.op.addType ? this.op.addType : "primary",
        active: false
      };
      if (this.op && this.op.beforeAddValue && !this.op.beforeAddValue(this.addVal)) {
        this.addFocus = false;
        this.addVal = "";
        return false;
      }
      this.tagList.push(obj);
      this.addFocus = false;
      this.addVal = "";
      if (this.op && this.op.afterAddValue) {
        this.op.afterAddValue(this.addVal);
      }
    }
  }
};
</script>
<style>
.zoom-tag .disabled,
.zoom-tag .tag[disabled] {
  cursor: no-drop;
  border-color: rgba(0, 0, 0, 0.2) !important;
  color: rgba(0, 0, 0, 0.5) !important;
  background: rgba(0, 0, 0, 0.1) !important;
}
.zoom-tag .tag[zoom-type="danger"].selected,
.zoom-tag .tag[zoom-type="danger"][selected] {
  color: #fff;
  border-color: #f5222d;
  background: #f5222d;
}
.zoom-tag .tag[zoom-type="danger"] {
  color: #f5222d;
  border-color: rgba(245, 34, 45, 0.15);
  background: rgba(245, 34, 45, 0.06);
}
.zoom-tag .tag[zoom-type="warning"].selected,
.zoom-tag .tag[zoom-type="warning"][selected] {
  color: #fff;
  border-color: #faad14;
  background: #faad14;
}
.zoom-tag .tag[zoom-type="warning"] {
  color: #faad14;
  border-color: rgba(250, 173, 20, 0.15);
  background: rgba(250, 173, 20, 0.06);
}
.zoom-tag .tag[zoom-type="info"].selected,
.zoom-tag .tag[zoom-type="info"][selected] {
  color: #fff;
  border-color: #666;
  background: #666;
}
.zoom-tag .tag[zoom-type="info"] {
  color: #666;
  border-color: rgba(51, 51, 51, 0.15);
  background: rgba(51, 51, 51, 0.06);
}
.zoom-tag .tag[zoom-type="success"].selected,
.zoom-tag .tag[zoom-type="success"][selected] {
  color: #fff;
  border-color: #52c41a;
  background: #52c41a;
}
.zoom-tag .tag[zoom-type="success"] {
  color: #52c41a;
  border-color: rgba(82, 196, 26, 0.15);
  background: rgba(82, 196, 26, 0.06);
}
.zoom-tag .tag[zoom-type="primary"].selected,
.zoom-tag .tag[zoom-type="primary"][selected] {
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
}
.zoom-tag .tag[zoom-type="primary"] {
  color: #1890ff;
  border-color: rgba(24, 144, 255, 0.15);
  background: rgba(24, 144, 255, 0.06);
}
.zoom-tag .add.focus {
  border: 1px solid #1890ff;
}
.zoom-tag .add > input {
  border: 0;
  width: 100%;
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  outline: 0;
}
.zoom-icon {
  font-family: iconfont;
  font-style: normal;
  font-weight: 400;
  position: relative;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.zoom-tag .tag > .close {
  width: 16px;
  background: 0 0;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.5;
  cursor: pointer;
}
.zoom-tag .tag > .text {
  max-width: 120px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  display: inline-block;
}
.zoom-tag .add {
  color: #333;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 66px;
  text-align: center;
}
.zoom-tag .add>input {
  height: 20px;
}
.zoom-tag .add,
.zoom-tag .tag {
  height: 22px;
  line-height: 20px;
  padding: 0 8px;
  border-radius: 2px;
  font-size: 12px;
  margin: 4px;
  float: left;
}
.zoom-tag,
.zoom-tag .tag {
  overflow: hidden;
  cursor: pointer;
}
.zoom-tag .tag.zoom-border {
  border-width: 1px;
  border-style: solid;
}
</style>

<template>
  <div class="zoom-pager">
    <span v-if="mode !== 'mini' " class="pager-total">
      <!-- 共 x 条 -->
      {{ $zoom.$t('pager.total') + total + $zoom.$t('pager.quantity')}}
      <zoom-dropdown :op="dropOp"></zoom-dropdown>条/页
    </span>
    <!-- 当前页如果是第一页, 则上一页和返回首页按钮都禁用, 并且点击的时候传相应的值 -->
    <span
      v-if="mode !== 'mini' "
      :class="{ 'disabled': currentPage === 1}"
      @click="astride('prev', currentPage === 1)"
      class="page page-start"
    >
      <i class="zoom-icon icon-to-top"></i>
    </span>
    <span
      :class="{ 'disabled': currentPage === 1}"
      @click="prePageHandle(currentPage === 1)"
      class="zoom-prev"
    >
      <i class="zoom-icon icon-left"></i>
    </span>

    <span
      v-show="index != 5"
      v-if="index != 7"
      v-for="(page, index) of showPage"
      :key="index"
      :class="{ 'active':(changeStart + page - 1) === currentPage, 'omission': index === 6 && showPage >= 10}"
      @click="changeShow(changeStart + page - 1, index)"
      class="page"
    >{{index === 6 && showPage >= 10 ? '...' : (changeStart + page - 1)}}</span>

    <!-- 如果当前页等于最后一页, 那么下一页按钮和跳转末页按钮则禁用, 并且点击时候传相应的值 -->
    <span
      :class="{ 'disabled': currentPage === pages}"
      @click="nextPageHandle(currentPage === pages)"
      class="zoom-next"
    >
      <i class="zoom-icon icon-right"></i>
    </span>
    <span
      v-if="mode !== 'mini' "
      :class="{ 'disabled': currentPage === pages}"
      @click="astride('next', currentPage === pages)"
      class="page page-end"
    >
      <i class="zoom-icon icon-to-top"></i>
    </span>
    <span v-if="mode !== 'mini' " class="pager-jump">
      <!-- 前往 -->
      <a @click="jump">{{$zoom.$t('pager.go')}}</a>
      <input type="number" onpaste="return false" v-model.number="val" @keyup.enter="jump" />
      <!-- 页 -->
      <a @click="jump">{{$zoom.$t('pager.page')}}</a>
    </span>
  </div>
</template>
<script>
export default {
  name: "zoom-pager",
  props: {
    op: {
      type: Object,
      pageSize: Array,
      pageSizeSkip: Function, // 每页大小的下拉框数据发生改变事件
      beforeSkip: Function, // 页面跳转前事件
      skip: Function, // 监听当前页变化
      pageVal: {
        type: Object,
        total: {
          // 总条数
          type: Number,
          default: 0
        },
        curPage: {
          // 展示的当前页
          type: Number,
          default: 1
        },
        pageSize: {
          // 每页要展示多少条数据
          type: Number,
          default: 0
        }
      },
      mode: {
        // 展示模式 mini为简单版, Number为完全版 默认Number
        type: String,
        default: "Number"
      }
    }
  },
  data() {
    return {
      mode: "Number",
      value: 0,
      showPage: 1, // 要展示多少页
      total: 1, //  总数
      currentPage: 1, //记录当前页
      dropOp: {
        readonly: true,
        hideClose: true,
        isdisable: false,
        default: 10,
        width: '60px',
        onClick: val => {
          this.op.pageVal.pageSize = this.dropOp.default = val.value;
          this.setPager();
          if (this.op && this.op.pageSizeSkip) {
            this.op.pageSizeSkip(val.value, this.op.pageVal);
          }
        },
        data: [
          { value: 5, text: "5" },
          { value: 10, text: "10" },
          { value: 20, text: "20" }
        ]
      },
      pageSizes: [],
      pages: Math.ceil(this.total / this.prepage), //计算需要展示的总页数
      val: "", //记录输入框中的值
      posPage: Math.floor(this.showPage / 2) + 1, //超过这个页码时，固定显示的位置
      start: 1 //第一个页码的开始数字
    };
  },
  created() {
    this.load();
  },
  watch: {
    currentPage(val, old) {
      if (this.op.skip) {
        //   监听当前页
        this.op.pageVal.curPage = val;
        this.op.skip(val, this.op.pageVal);
      }
    },
    total(val, old) {
      //   当总数发生变化时候
      this.op.pageVal.total = val;
      this.setPager();
    },
    pageSize(val, old) {
      //   每页大小发生变化时候
      this.op.pageVal.pageSize = val;
      this.setPager();
    }
  },
  computed: {
    changeStart() {
      //分页逻辑
      this.posPage = Math.floor(this.showPage / 2) + 1;
      if (this.pages <= this.showPage) {
        return (this.start = 1);
      } else {
        if (this.currentPage <= this.posPage) {
          return (this.start = 1);
        } else if (this.pages - this.currentPage <= this.posPage) {
          return (this.start = this.pages - this.showPage + 1);
        } else {
          return (this.start = this.currentPage - this.posPage + 1);
        }
      }
    }
  },
  methods: {
    //   动态设置数据
    load(data) {
      if (data) {
        // data需要是一个对象
        if (typeof data === "object") {
          this.op.pageVal = data;
        } else {
          throw Error(
            // `zoom-ui TypeError: ${data}语法错误, 请参考zoom-ui手册检查语法! `
            `${this.$zoom.$t('err.zoom_ui_grammar')}: ${this.$zoom.$t('err.attribute', {err_attribute: data, attribute: 'Object'})}`
          );
        }
      }
      //   计算页码位置
      if (this.op) {
        // 判断是否有配置OP
        if (this.op.pageSizes) {
          // 配置分页的下拉框数据
          let pageSizes = [];
          this.op.pageSizes.forEach(item => {
            pageSizes.push({ value: item, text: item });
          });
          this.dropOp.default = pageSizes[0].value;
        }
        // 对分页总条数赋值
        if (this.op.pageVal) {
          this.total = this.op.pageVal.total;
          if (this.op.pageVal.pageSize) {
            this.dropOp.default = this.op.pageVal.pageSize;
          }
          // 设置页码当前页
          if (this.op.pageVal.curPage) {
            this.currentPage = this.op.pageVal.curPage;
          }
        }
        // 是否迷你模式
        if (this.op.mode) {
          this.mode = this.op.mode;
        }
      }
      this.setPager();
      this.posPage = Math.floor(this.showPage / 2) + 1;
    },
    // 设置当前显示页
    setPager() {
      this.pageSize = this.dropOp.default;
      this.pages = Math.ceil(this.total / this.pageSize);
      if (this.pages >= 10) {
        this.showPage = 10;
      } else {
        this.showPage = this.pages;
      }
      if (this.mode == "mini" && this.showPage > 3) {
        this.showPage = 3;
      }
    },
    send(curPage) {
      let res = true;
      if (this.op && this.op.beforeSkip) {
        res = this.op.beforeSkip(curPage, this.op.pageVal);
      }
      if (res === false) {
        return;
      }
      this.$emit("input", curPage);
    },
    changeShow(page, index) {
      if (index === 6) {
        return
      }
      this.currentPage = page;
      this.$emit("input", page);
    },
    jump() {
      if (this.val < 1) {
        this.val = 1;
      }
      if (this.val > this.pages) {
        this.val = this.pages;
      }
      this.val = Math.floor(this.val);
      this.$emit("input", this.val);
      this.currentPage = this.val;
      this.val = "";
    },
    /**
     * 跳转到首页或末页
     * astride('prev')  首页
     * astride('end')  末页
     */
    astride(page, curPage) {
      if (curPage) {
        return;
      }
      if (page === "prev") {
        this.currentPage = 1;
      } else {
        this.currentPage = this.pages;
      }
      this.send(this.currentPage);
    },
    /**
     * 跳转到上一页
     * 判断是否禁用 如果禁用就return
     */
    prePageHandle(curPage) {
      if (curPage) {
        return;
      }
      this.currentPage--;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.send(this.currentPage);
    },
    /**
     * 跳转到下一页
     * 判断是否禁用 如果禁用就return
     */
    nextPageHandle(curPage) {
      if (curPage) {
        return;
      }
      this.currentPage++;
      if (this.currentPage > this.pages) {
        this.currentPage = this.pages;
      }
      this.send(this.currentPage);
    }
  }
};
</script>
<style>
.zoom-pager .pager-jump input {
  margin: 0 5px;
}
.zoom-pager .pager-jump a:hover {
  color: #1890ff;
  cursor: pointer;
}
.zoom-pager .pager-jump a {
  color: #333;
}
.zoom-pager .zoom-input .input-btn {
  height: 25px;
  top: -5px;
}
.zoom-pager .zoom-input {
  margin-right: 5px;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.zoom-pager .pager-total {
  float: left;
}
.zoom-pager {
  margin: 10px 0;
  user-select: none;
  text-align: right;
}

.zoom-pager span {
  margin: 0 10px;
  font-size: 14px;
}

.zoom-pager span.page,
.zoom-pager span.zoom-prev,
.zoom-pager span.zoom-next {
  cursor: pointer;
  background: 0 0;
  display: inline-block;
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
  min-width: 30px;
  border: 1px solid #e4e1e1;
  border-radius: 2px;
  color: #666;
  padding: 0 4px;
}

.zoom-pager span.page.active {
  color: #409eff;
  border: 1px solid #409eff;
  cursor: default;
}
.zoom-pager span.page.omission {
  border: 0;
  cursor: auto;
}
.zoom-pager span.page.omission:hover {
  color: #666;
}

.zoom-pager span.zoom-prev,
.zoom-pager span.zoom-next,
.zoom-pager span.page:hover {
  color: #409eff;
}

.zoom-pager span.zoom-prev:not(.disabled):hover,
.zoom-pager span.zoom-next:not(.disabled):hover {
  border: 1px solid #409eff;
}

.zoom-pager span.page-end > .zoom-icon {
  font-weight: bold;
  transform: rotate(90deg);
}

.zoom-pager span.page-start > .zoom-icon {
  font-weight: bold;
  transform: rotate(-90deg);
}

.zoom-pager span.page-end.disabled,
.zoom-pager span.page-start.disabled,
.zoom-pager span.zoom-prev.disabled,
.zoom-pager span.zoom-next.disabled {
  color: #cccccc;
  cursor: not-allowed;
}

.zoom-pager input[type="number"] {
  padding: 2px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 60px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  outline: none;
  transition: 0.2s all;
}
.zoom-pager input[type="number"]:focus {
  border-color: #409eff;
}
</style>
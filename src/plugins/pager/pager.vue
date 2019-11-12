<template>
  <div class="zoom-pager">
      <span v-if="mode !== 'mini' " class="pager-total">
          共{{total}}条
          <zoom-dropdown :op="dropOp"></zoom-dropdown>
          条/页
      </span>

      <span :class="{ 'disabled': changeStart == 1}" @click="prePageHandle" class="zoom-prev">&lt;</span>

      <span v-show="index != 5" v-if="index != 7" v-for="(page, index) of  showPage" :key="index" :class="{ 'active':(changeStart + page - 1) == currentPage}" @click="changeShow(changeStart + page - 1, index)" class="page">
        {{index === 6 && showPage >= 10 ? '...' : (changeStart + page - 1)}}
      </span>

      <span :class="{ 'disabled': changeStart + showPage - 1 == pages}" @click="nextPageHandle" class="zoom-next">&gt;</span>

      <span v-if="mode !== 'mini' " class="jump">
          前往
          <input type="text" v-model="val" @keydown.enter="jump">
          页
      </span>
  </div>
</template>
<script>
export default {
  name: "zoom-pager",
  props:{
    op: {
       type: Object,
       pageSize: Array,
       skip: Function,
       pageVal: {
           type: Object,
           total: {  // 总条数
             type: Number,
             default: 0
           },
           curPage: {  // 展示的当前页
             type: Number,
             default: 1
           },
           pageSize: {  // 每页要展示多少条数据
             type: Number,
             default: 0
           }
       },
       mode: {  // 展示模式 mini为简单版, Number为完全版 默认Number
         type: String,
         default: 'Number'
       }
    },
  },
  data() {
    return {
        mode: 'Number',
        value: 0,
        showPage: 1,
        total: 1,
        dropOp: {
            readonly: true,
            hideClose: true,
            isdisable: false,
            default: 5,
            onClick: (val) => {
                this.dropOp.default = val.value;
                this.setPager();
            },
            downData: [
                {value: 5, text: '5'},
                {value: 10, text: '10'},
                {value: 20, text: '20'}
            ]
        },
        pageSizes: [],
        pages: Math.ceil(this.total/this.prepage),//计算需要展示的总页数
        val: '',//记录输入框中的值
        currentPage: 1,//记录当前页
        posPage: Math.floor(this.showPage/2) + 1,//超过这个页码时，固定显示的位置
        start: 1,//第一个页码的开始数字
    }
  },
  created() {
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
    this.posPage = Math.floor(this.showPage/2) + 1;
  },
  watch: {
      currentPage(val, old) {
          if (this.op.skip) {
            //   监听当前页
              this.op.skip(val, this.op.pageVal);
          }
      }
  },
  computed:{
    changeStart() {//分页逻辑
        this.posPage = Math.floor(this.showPage/2) + 1;
        if(this.pages<=this.showPage){
            return this.start = 1
        } else {
            if (this.currentPage<=this.posPage) {
                return this.start = 1
            } else if (this.pages-this.currentPage<=this.posPage) {
                return  this.start = this.pages - this.showPage + 1
            } else {
                return  this.start = this.currentPage - this.posPage + 1
            }
        }
    }
  },
  methods:{
    // 设置当前显示页
    setPager() {
        this.pageSize = this.dropOp.default;
        this.pages = Math.ceil(this.total / this.pageSize);
        if (this.pages >= 10) {
            this.showPage = 10;
        } else {
            this.showPage = this.pages;
        }
        if ( this.mode == 'mini' && this.showPage > 3) {
            this.showPage = 3;
        }
    },
    send(curPage) {
        let res = true;
        if (this.op.beforeSkip) {
            res = this.op.beforeSkip(curPage, this.op.pageVal);
        }
        if (res === false) {
            return;
        }
        this.$emit('input', curPage);
    },
    changeShow(page, index) {
        this.currentPage = page;
        this.$emit('input',page);

    },
    jump() {
        if (this.val < 1) {
            this.val = 1;
        }
        if (this.val > this.pages) {
            this.val = this.pages;
        }
        this.val = Math.floor(this.val);
        this.$emit('input',this.val);
        this.currentPage = this.val;
        this.val = '';
    },
    prePageHandle() {
        this.currentPage --;
        if (this.currentPage < 1) {
            this.currentPage = 1
        }
        this.send(this.currentPage);
    },
    nextPageHandle() {
        this.currentPage ++;
        if (this.currentPage > this.pages) {
            this.currentPage = this.pages
        }
        this.send(this.currentPage);
    }
  },
};
</script>
<style>
.zoom-pager .zoom-input .input-btn {
    height: 25px;
    top: -5px;
}
.zoom-pager .zoom-input {
    width: 60px;
}
.clear:after {
    content: '';
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
}

.zoom-pager span.page, .zoom-pager span.zoom-prev, .zoom-pager span.zoom-next {
    cursor: pointer;
    background: 0 0;
    display: inline-block;
    font-size: 1em;
    margin-left: 4px;
    text-align: center;
    min-width: 30px;
    border: 1px solid #e4e1e1;
    border-radius: 2px;
    color: #666;
    padding: 0 4px;
}

.zoom-pager span.page:hover {
    color: #409eff;
}

.zoom-pager span.page.active {
    color: #409eff;
    cursor: default;
}

.zoom-pager span.zoom-prev.disabled, .zoom-pager span.next.disabled {
    color: #cccccc;
    cursor: not-allowed;
}

.zoom-pager input[type='text'] {
    padding: 2px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    outline: none;
    transition: .2s all;
}
.zoom-pager input[type='text']:focus {
    border-color: #409eff;
}
</style>
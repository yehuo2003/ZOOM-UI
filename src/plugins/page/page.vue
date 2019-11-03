<template>
  <div class="pagination">
        <span class="total">共 {{total}} 条 / {{pages}} 页</span>
 
        <span class="prev" :class="{'disabled':value==1}" @click="prePageHandle">&lt;</span>
 
        <span class="page" v-for="(page,index) in showPage" :key="index"
        :class="{'active':(changeStart + page-1)==value}"
        @click="changeShow(changeStart + page-1)"
        >{{changeStart + page-1}}</span>
 
        <span class="next" :class="{'disabled':value==pages}" @click="nextPageHandle">&gt;</span>
 
        <span class="jump">
                前往
                <input type="text" v-model="val" @keydown.enter="jump"/>
                页
            </span>
    </div>
</template>
<script>
export default {
  name: "zoom-page",
  props:{
            total:{
                type:Number
            },
            prepage:{   // 每页要展示多少条数据
                type:Number,
                default:2
            },
            showPage:{//页面中要显示几个页码
                type:Number,
                default:3
            },
            value:{
                type:Number
            }
        },
        data(){
            return {
                pages:Math.ceil(this.total/this.prepage),//计算需要展示的总页数
                val:'',//记录输入框中的值
                currentPage:1,//记录当前页
                posPage:Math.floor(this.showPage/2)+1,//超过这个页码时，固定显示的位置
                start:1,//第一个页码的开始数字
            }
        },
        computed:{
            changeStart(){//分页逻辑
                if(this.pages<=this.showPage){
                    return this.start = 1
                }else{
                    if(this.currentPage<=this.posPage){
                        return this.start = 1
                    }else if(this.pages-this.currentPage<=this.posPage){
                        return  this.start = this.pages - this.showPage + 1
                    }else{
                        return  this.start = this.currentPage - this.posPage + 1
                    }
                }
            }
        },
        methods:{
            changeShow(page){
                this.currentPage = page
                this.$emit('input',page)
 
            },
            jump(){
                if(this.val<1){
                    this.val = 1
                }
                if(this.val>this.pages){
                    this.val = this.pages
                }
                this.val = Math.floor(this.val)
                this.$emit('input',this.val)
                this.currentPage = this.val
                this.val = ''
            },
            prePageHandle(){
                this.currentPage--
                if(this.currentPage<1){
                    this.currentPage = 1
                }
                this.$emit('input',this.currentPage)
            },
            nextPageHandle(){
                this.currentPage++
                if(this.currentPage>this.pages){
                    this.currentPage = this.pages
                }
                this.$emit('input',this.currentPage)
 
            }
 
        },
};
</script>
<style>
.box {
    margin: 100px auto 0;
    width: 80%;
}
.clear:after {
    content: '';
    display: block;
    clear: both;
}

.pagination {
    margin: 10px 0;
    user-select: none;
}

.pagination span {
    margin: 0 10px;
}

.pagination span.page, .pagination span.prev, .pagination span.next {
    cursor: pointer;
}

.pagination span.page:hover {
    color: #409eff;
}

.pagination span.page.active {
    color: #409eff;
    cursor: default;
}

.pagination span.prev.disabled, .pagination span.next.disabled {
    color: #cccccc;
    cursor: not-allowed;
}

.pagination input[type='text'] {
    padding: 2px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    outline: none;
    transition: .2s all;
}
.pagination input[type='text']:focus {
    border-color: #409eff;
}
</style>
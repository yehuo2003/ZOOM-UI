<template>
    <div class="zoom-carousel" :id="'zoom-carousel'+id" @mouseenter.stop="handleStop" @mouseleave.stop="handleGo">
    <!--图片轮播区域-->
        <transition-group :name="'list-'+ (direction === 'forward' ? 'in' : 'out')" tag="ul" class="swipe_list">
            <li v-for="(item,index) in op.images" :key="index+1" class="list-item" v-show="index===currentIndex">
                <a :href="item.url" target="_blank">
                    <img  alt="" :src="item.src">
                </a>
            </li>
        </transition-group>
    <!--控制点-->
        <div class="swipe_dian">
            <span v-for="(item,index) in op.images" :class="{'active':index===currentIndex}"
            :key="index" @mouseover="handleChange(index)"></span>
        </div>
    <!--左右控制，使用图标-->
        <div class="swipe_control" :id="'swipe_control'+id" v-show="control">
            <i class="zoom-icon-arrow-left prev" v-on:click="handleChange(prevIndex)"></i>
            <i class="zoom-icon-arrow-right next" v-on:click="handleChange(nextIndex)"></i>
        </div>
    <!--底部标题-->
        <div class="swipe_title" v-for="(item,index) in op.images" v-show="index===currentIndex" :key="index">
            {{item.title}}
        </div>
        <div class="swipe_bottom"></div>
    </div>
</template>
<script>
export default {
  name: "zoom-carousel",
  props: {
    op: {
        width: {
            type: String,
            default: '100%' //单位：rem
        },
        height: {
            type: String,
            default: '100%' //单位：rem
        },
        images: {
            type: Array,
            default: function () {
                return [];
            }
        }
    }
  },
  data() {
    return {
        id: 0,
        currentIndex: 0,
        timer: "",
        control: false,
        direction:'forward'
    }
  },
  created() {
    this.id = Math.random();
  },
  mounted() {
    if (this.$id("zoom-carousel"+this.id) && this.op) {
        let style = this.$id("zoom-carousel"+this.id).style
        style.width = this.op.width;
        style.height = this.op.height;
        style.top = this.op.height / 2 - 1;
        this.handleGo();
    }
  },
  computed: {
        prevIndex() {
            if (this.currentIndex === 0) {
                return this.op.images.length - 1;
            } else {
                return this.currentIndex - 1;
            }
        },
        nextIndex() {
            if (this.currentIndex === this.op.images.length - 1) {
                return 0;
            } else {
                return this.currentIndex + 1;
            }
        }
  },
  methods: {
    /**
     * 开始轮播
     */
    handleGo() {
    this.control = false;
    this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.op.images.length - 1) {
        this.currentIndex = 0;
        }
    }, 3000);
    },
    /**
     * 停止轮播
     */
    handleStop() {
        this.control = true;
        clearInterval(this.timer);
        this.timer = null;
    },
    /**
     * 控制左右切换
     * @param index
     */
    handleChange(index) {
        if(index> this.currentIndex){
            this.direction='forward'
        }else{
            this.direction=''
        }
        this.currentIndex = index;
    }
   }
};
</script>
<style>
.zoom-carousel {
    position: relative;
    width: 518px;
    height: 357px;
    overflow: hidden;
    background-color: #fff;
}

.swipe_list {
    width: 100%;
    height: 100%;
}

.swipe_list li {
    position: absolute;
    width: 100%;
    height: 100%;
}
.swipe_list li a {
    width: 100%;
    height: 100%;
}
.swipe_list li img {
    width: 100%;
    height: 100%;
}

.swipe_dian {
    position: absolute;
    z-index: 90;
    bottom: 0;
    height: 60px;
    text-align: center;
    font-size: 0;
    right: 10px;
}

.swipe_dian span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 26px 5px;
    background-color: #5f5853;
    cursor: pointer;
}

.swipe_dian .active {
    background-color: #ffffff;
}

.swipe_title {
    position: absolute;
    line-height: 60px;
    height: 60px;
    width: 76%;
    z-index: 20;
    text-align: left;
    color: white;
    font-size: 18px;
    margin-left: 10px;
    bottom: 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}

.swipe_bottom {
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0;
    background-color: #3a2113;
    opacity: 0.5;
    z-index: 10;
}

.swipe_control {
    position: absolute;
    z-index: 10;
    top: 185px;
    width: 100%;
    height: 30px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.swipe_control .prev,
.swipe_control .next {
    text-align: center;
    line-height: 30px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #190f0b;
    color: white;
}

.swipe_control .prev:hover {
    color: #cccccc;
    font-weight: bold;
    opacity: 0.7;
}

.swipe_control .next:hover {
    color: #cccccc;
    font-weight: bold;
    opacity: 0.7;
}
/*切换到下一张的变化*/
.list-in-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
}
.list-in-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%);
}
.list-in-enter {
    transform: translateX(100%);
}
.list-in-leave {
    transform: translateX(0);
}

/*切换到上一张的变化*/
.list-out-leave {
  transform: translateX(0);
}
.list-out-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.list-out-enter {
  transform: translateX(-100%);
}
.list-out-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
</style>
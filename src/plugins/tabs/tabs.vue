<template>
  <div class="zoom-tabs" style="margin: 20px;">
      <div class="zoom-tabs-top">
          <div v-for="(item, index) of titleList" :key="index" :data-id="item.id" @click="getItem(item,index)" :class="activeClass == index ? 'tab-active' : '' " class="zoom-tab-item">
              <div class="tab-tops-item">
                  {{item.title}}
                  <!-- <span class="zoom-icon icon-close" @click="deleteItem(item)"></span> -->
              </div>
          </div>
          <!-- <div class="zoom-tab-item tab-active">
              <div class="tab-tops-item">
                  Tab 2
                  <span class="zoom-icon icon-close"></span>
              </div>
          </div> -->
      </div>
      <div class="zoom-tabs-content">
          <slot></slot>
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-tabs',
    props: {
        op: {
        }
    },
    data() {
        return {
            activeClass: 0,
            titleList: []
        }
    },
    computed: {
        getters() {
            return this.$store.getters.targetTitle;
        }
    },
    watch: {
         getters(val) {
             this.titleList = val;
             console.log('新值', val);
         }
    },
    methods: {
        getItem(item, index) {
            this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
            let data = $Z('[zoom-title]');
            // 切换
            for(var i = 0; i < data.length; i++) {
                data[i].style = 'display: none;'
            }
            $Z(`[zoom-title=${item.title}]`)[0].style = 'display: block;'
        },
        // 删除
        deleteItem(e) {
            if (e.id) {
                this.titleList.forEach((item, index) => {
                    if (item.id === e.id) {
                        this.titleList.splice(index, 1);
                    }
                });
                this.$store.commit('deleteTabTitle', e.id);
                this.$nextTick(() => {
                    this.load();
                })
            }
        },
        load() {
            let data = $Z('[zoom-title]');
            data[0].style = 'display: block;';
            for(var i = 1; i < data.length; i++) {
                data[i].style = 'display: none;'
            }
        }
    },
    mounted() {
        this.load();
    }
}
</script>
<style>
.zoom-tabs-content {
    padding: 15px 24px;
    text-align: left;
    overflow: hidden;
}
.zoom-tabs .zoom-tabs-top .tab-tops-item .zoom-icon {
    position: relative;
    font-size: 12px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item.tab-active::before {
    content: " ";
    display: block;
    border-top: 3px solid #1890ff;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item.tab-active {
    border-bottom: 1px solid #fff;
    border-top: 0;
    color: #1890ff;
}
.zoom-tabs .zoom-tabs-top .tab-tops-item {
    padding: 0 24px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    -webkit-transition: color .3s cubic-bezier(645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
    transition: color .3s cubic-bezier(645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item:last-child {
    border-right: 1px solid #d9d9d9;
}
.zoom-tabs .zoom-tabs-top .zoom-tab-item {
    border: 1px solid #d9d9d9;
    border-right: none;
    border-bottom: none;
    top: 1px;
    white-space: nowrap;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    float: left;
    z-index: 2;
}
.zoom-tabs .zoom-tabs-top {
    border-bottom: 1px solid #d9d9d9;
    padding: 0;
    position: relative;
    margin: 0;
    width: 100%;
    float: left;
}
</style>

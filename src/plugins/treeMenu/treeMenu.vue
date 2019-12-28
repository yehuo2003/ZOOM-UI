<template>
  <div class="zoom-tree-menu" :style="Width ? 'width: ' + Width : '' ">
      <ul class="zoom-tree-menus">
          <!-- 一级菜单 -->
          <li v-for="(item, index) of treeList" :key="index" @click.stop="showTree(item, index)" :class="item.show ? 'tree-open' : '' " class="tree-item">
              <span v-if="item.children" :class="item.show ? 'icon-down' : 'icon-add' " class="zoom-icon"></span>
              <div @click="handleClick(item, index)" class="tree-item-link">
                  <a :href="item.url ? item.url : 'javascript:void(0);'" :target="item.target === 'blank' ? '_blank'  : '' " class="item-node">
                      <span class="node-name">{{item.title}}</span>
                  </a>
              </div>
              <!-- 二级菜单 -->
              <transition name="fade">
                <ul v-show="item.show" v-if="item.children" class="zoom-tree-menus">
                    <li v-for="(i, index) of item.children" :key="index" @click.stop="showTree(i, index)" :class="i.show ? 'tree-open' : '' " class="tree-item">
                        <span v-if="i.children" :class="i.show ? 'icon-down' : 'icon-add' " class="zoom-icon"></span>
                        <div class="tree-item-link">
                            <a :href="i.url ? i.url : 'javascript:void(0);'" :target="i.target === 'blank' ? '_blank'  : '' " class="item-node">
                                <span class="node-name">{{i.title}}</span>
                            </a>
                        </div>
                        <!-- 三级菜单 -->
                        <transition name="fade">
                            <ul v-show="i.show" v-if="i.children" class="zoom-tree-menus">
                                <li v-for="(j, index) of i.children" :key="index" @click.stop="showTree(j, index)" :class="j.show ? 'tree-open' : '' " class="tree-item">
                                    <div class="tree-item-link">
                                        <a :href="j.url ? j.url : 'javascript:void(0);'" :target="j.target === 'blank' ? '_blank'  : '' " class="item-node">
                                            <span class="node-name">{{j.title}}</span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </ul>
              </transition>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name: 'zoom-tree-menu',
    props: {
        op: {
            type: Object,
            data: {
                type: Array,
                default: []
            },
            accordion: {    // 手风琴效果
                type: Boolean,
                default: false
            }
        }
    },
    data() {
        return {
            Width: '210px',
            treeList: []
        }
    },
    created() {
        if (this.op) {
            if (this.op.data) {
                let data = [];
                // 如果是手风琴 默认第一个展开
                let count = 0;
                this.op.data.forEach(item => {
                    if (item.children) {
                        count += 1;
                        item.children.forEach(i => {
                            if (i.children) {
                                i.show = i.show ? i.show : false;
                            }
                        });
                        item.show = item.show ? item.show : false;
                        if (this.op.accordion && count === 1) {
                            item.show = true;
                        }
                    }
                    data.push(item);
                });
                // 调用深拷贝方法
                this.treeList = this.$zoom.clone(data);
            }
            if (this.op.width) {
                this.Width = this.op.width;
            }
        }
    },
    methods: {
        // 展开下拉树事件
        showTree(item, index) {
            let value = JSON.parse(JSON.stringify(item));
            if (item.load) {
                delete value.load;
                item.load(value, index);
            }
            // 判断是否开启手风琴模式
            if (this.op.accordion) {
                this.treeList.forEach(elem => {
                    elem.show = false;
                })
                item.show = true;
            } else {
                item.show = !item.show;
            }
        },
        // 点击节点事件
        handleClick(item, index) {
            let value = JSON.parse(JSON.stringify(item));
            if (item.onClick) {
                delete value.onClick;
                item.onClick(value, index);
            }
        }
    }
}
</script>
<style>
.zoom-tree-menu .fade-enter {
    opacity: 0;
}
.zoom-tree-menu .fade-enter-active {
    transition: opacity .5s;
}
.zoom-tree-menu .fade-leave-active {
    transition: opacity .5s;
}
.zoom-tree-menu .fade-leave-to {
    transition: opacity 0;
}
.zoom-tree-menu .zoom-tree-menus .tree-item:not(.tree-open):hover {
    background: #e4ecef;
}
.tree-item .zoom-tree-menus .tree-item .zoom-tree-menus .tree-item {
    margin-left: 36px;
}
/* 二级菜单 */
.tree-item .zoom-tree-menus .tree-item .item-node {
    margin-left: 18px;
}
/* 展开状态 */
.zoom-tree-menu .zoom-tree-menus .tree-item.tree-open>.tree-item-link>a.item-node {
    color: #1890ff;
}
.zoom-tree-menu .zoom-tree-menus .tree-item>.tree-item-link>.item-node>.node-name {
    white-space: nowrap;
    line-height: normal;
    display: inline-block;
    vertical-align: middle;
}
.zoom-tree-menu .zoom-tree-menus .tree-item>.tree-item-link>a.item-node {
    display: block;
    color: #333;
    background: 0 0;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
}
.zoom-tree-menu .zoom-tree-menus .tree-item>.tree-item-link {
    text-align: left;
    margin-left: 24px;
}
.zoom-tree-menu .zoom-tree-menus .tree-item>.zoom-icon {
    float: right;
    margin-right: 12px;
    color: #333;
    font-family: iconfont;
    font-style: normal;
    font-weight: 400;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.zoom-tree-menu .zoom-tree-menus .tree-item {
    line-height: 40px;
    overflow: hidden;
}
.zoom-tree-menu .zoom-tree-menus {
    list-style: none;
    margin: 0;
    padding: 0;
}
.zoom-tree-menu ul {
    font-size: 12px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
.zoom-tree-menu::before {
    content: "";
    border-right: 1px solid #d9d9d9;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
}
.zoom-tree-menu ul li {
    width: 100%;
}
.zoom-tree-menu {
    /* width: 210px; */
    width: 100%;
    background: #fff;
    position: relative;
    font-size: 12px;
}
</style>

<template>
  <div class="zoom-nav">
    <ul>
      <!-- 左边 -->
      <li v-if="showDownTree" class="tree">
        <a>|||</a>
        <div class="tree-list">
          <ul>
            <li
              @click="handleClick(item, index)"
              :class="item.children ? 'tree-extend' : '' "
              v-for="(item, index) of navList"
              :key="index"
            >
              <a
                :href="item.url ? item.url : 'javascript:void(0);' "
                :target="item.target == 'blank' ? '_blank' : '' "
              >
                <i v-show="item.icon" :class="item.icon ? item.icon : '' " class="zoom-icon"></i>
                {{item.title}}
              </a>
              <div v-if="item.children" class="zoom-menu">
                <ul @click="handleClick(i, index)" v-for="(i, index) of item.children" :key="index">
                  <li>
                    <a
                      :href="i.url ? i.url : 'javascript:void(0);' "
                      :target="i.target == 'blank' ? '_blank' : '' "
                    >{{i.title}}</a>
                  </li>
                  <li @click="handleClick(j, index)" v-for="(j, index) of i.children" :key="index">
                    <a
                      :href="j.url ? j.url : 'javascript:void(0);' "
                      :target="j.target == 'blank' ? '_blank' : '' "
                    >{{j.title}}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
      <!-- 右边 -->
      <li
        @click="handleClick(item, index)"
        v-for="(item, index) of navList"
        :key="index"
        class="zoom-list"
      >
        <a
          :href="item.url ? item.url : 'javascript:void(0);' "
          :target="item.target == 'blank' ? '_blank' : '' "
        >
          <i v-show="item.icon" :class="item.icon ? item.icon : '' " class="zoom-icon"></i>
          {{item.title}}
          <span v-if="item.children" class="zoom-icon icon-down"></span>
        </a>
        <div v-if="item.children" class="zoom-list-child">
          <ul>
            <li
              @click="handleClick(i, index)"
              v-for="(i, index) of item.children"
              :key="index"
              class="zoom-menu"
            >
              <ul>
                <li>
                  <a
                    :href="i.url ? i.url : 'javascript:void(0);' "
                    :target="i.target == 'blank' ? '_blank' : '' "
                  >{{i.title}}</a>
                </li>
                <li @click="handleClick(j, index)" v-for="(j, index) of i.children" :key="index">
                  <a
                    :href="j.url ? j.url : 'javascript:void(0);' "
                    :target="j.target == 'blank' ? '_blank' : '' "
                  >{{j.title}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "zoom-nav-menu",
  props: {
    op: {
      type: Object,
      data: {
        type: Array,
        default: []
      },
      hideTree: {
        type: Boolean,
        default: false
      }
    }
  },
  data() {
    return {
      showDownTree: true,
      navList: []
    };
  },
  created() {
    if (this.op) {
      if (this.op.hideTree) {
        this.showDownTree = false;
      } else {
        this.showDownTree = true;
      }
      if (this.op.data) {
        this.navList = this.op.data;
      }
    }
  },
  methods: {
    handleClick(item, index) {
      let value = JSON.parse(JSON.stringify(item));
      if (item.onClick) {
        delete value.onClick;
        item.onClick(value, index);
      }
    }
  }
};
</script>
<style>
.tree .tree-list > ul .tree-extend:hover::after {
  color: #1890ff;
}
.tree .tree-list > ul .tree-extend::after {
  content: ">";
  font-family: "\5B8B\4F53", sans-serif;
  font-weight: bold;
  color: #999;
  position: absolute;
  left: 140px;
}
.tree .tree-list > ul li .zoom-menu ul::after {
  content: " ";
  clear: both;
}
.tree .tree-list > ul a > i {
  position: absolute;
  left: 3px;
}
.tree .tree-list > ul li .zoom-menu ul > li a {
  color: #333;
}
.tree .tree-list > ul li .zoom-menu ul > li:hover {
  background: #eee;
}
.tree .tree-list > ul li .zoom-menu ul > li:first-child:hover {
  background: none;
  cursor: context-menu;
}
.tree .tree-list > ul li .zoom-menu ul > li:first-child {
  font-weight: bold;
  font-size: 16px;
}
.tree .tree-list > ul li .zoom-menu ul > li {
  padding: 10px;
  width: 160px;
  line-height: 16px;
  height: 36px;
}
.tree .tree-list > ul li .zoom-menu ul + ul {
  padding-left: 10px;
}
.tree .tree-list > ul li .zoom-menu ul {
  float: left;
}
.tree .tree-list > ul li .zoom-menu {
  display: none;
  position: absolute;
  border-top: none;
  border: 1px solid #e0e0e0;
  top: 0;
  left: 160px;
  min-width: 800px;
  min-height: 300px;
  background: #fff;
  padding: 0 10px;
}
.tree .tree-list > ul li:hover .zoom-menu {
  display: block;
  animation: showTree 0.5s;
}
.tree .tree-list > ul li {
  transition: all 0.3s ease-in-out;
  line-height: 48px;
  padding-left: 20px;
  text-align-last: left;
}
.tree:hover .tree-list > ul {
  display: block;
}
.tree .tree-list > ul li:hover a {
  color: #1890ff;
}
.tree .tree-list > ul li:hover {
  background: #e6f7ff;
}
.tree .tree-list > ul a {
  color: #333;
}
.tree .tree-list > ul {
  display: none;
  background: #fff;
  border: 1px solid #e0e0e0;
  font-size: 14px;
}
.tree .tree-list {
  width: 160px;
  position: absolute;
}
.tree:hover > a {
  background: #10a491;
  color: #fff;
  padding: 10px 20px;
  transform: rotate(0);
}
.tree > a {
  padding: 10px 20px;
  color: #fff;
  display: block;
  font-weight: bold;
  transform: rotate(90deg);
  transition: all 0.3s ease;
  -webkit-transform: rotate(90deg);
}
.tree {
  transition: all 0.5s linear;
  float: left;
  width: 50px;
}
/* 横向导航栏 */
.zoom-list > a:hover {
  background: #10a491;
}
.zoom-nav
  ul
  li.zoom-list
  .zoom-list-child
  > ul
  .zoom-menu
  ul
  > li:first-child
  a {
  background: none;
  cursor: context-menu;
}
.zoom-nav ul li.zoom-list .zoom-list-child > ul .zoom-menu ul > li:first-child {
  font-weight: bold;
  font-size: 16px;
}
.zoom-nav ul li.zoom-list .zoom-list-child .zoom-menu a {
  color: #333;
  padding: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.zoom-nav ul li.zoom-list .zoom-list-child > ul .zoom-menu:last-child {
  border-right: 1px solid #e0e0e0;
}
.zoom-nav ul li.zoom-list .zoom-list-child > ul .zoom-menu:first-child {
  border-left: 1px solid #e0e0e0;
}
.zoom-nav ul li.zoom-list .zoom-list-child > ul .zoom-menu {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}
.zoom-nav ul li.zoom-list .zoom-list-child > ul {
  display: flex;
}
.zoom-nav {
  background: #12bca6;
  height: 48px;
  z-index: 999;
  position: relative;
  padding: 0 24px;
}
.zoom-nav ul li.zoom-list {
  transition: background 0.3s ease-in-out;
  min-width: 100px;
  text-align: center;
  float: left;
}
.zoom-nav ul li.zoom-list a {
  text-align: center;
  color: #fff;
  display: inline-block;
  line-height: 48px;
  width: 100%;
}
.zoom-nav ul li.zoom-list:hover a span {
  transform: rotate(180deg);
}
.zoom-nav ul li.zoom-list .zoom-list-child {
  display: none;
  width: 160px;
}
.zoom-nav ul li.zoom-list:hover .zoom-list-child {
  display: block;
  position: absolute;
  animation: showIndex 0.5s;
}
.zoom-nav ul li.zoom-list .zoom-list-child ul li {
  margin: 1px 0;
  width: 160px;
}
.zoom-nav ul li.zoom-list .zoom-list-child ul li a:hover {
  background: #eee;
}
a {
  text-decoration: none;
}

@keyframes showIndex {
  0% {
    opacity: 0;
    transform: translate(-800px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes showTree {
  0% {
    opacity: 0;
    transform: translate(800px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
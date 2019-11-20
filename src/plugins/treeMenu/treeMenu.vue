<template>
  <div class="zoom-tree-menu">
      <ul class="zoom-tree-menus">
          <!-- 一级菜单 -->
          <li class="tree-item">
              <div class="tree-item-link">
                  <a class="item-node">
                      <span class="node-name">首页</span>
                  </a>
              </div>
          </li>
          <li class="tree-item tree-open">
              <span class="zoom-icon icon iconfont icon-down"></span>
              <div class="tree-item-link">
                  <a class="item-node">
                      <span class="node-name">指南</span>
                  </a>
              </div>
              <!-- 二级菜单 -->
              <ul class="zoom-tree-menus">
                  <li class="tree-item tree-open">
                      <span class="zoom-icon icon iconfont icon-down"></span>
                      <div class="tree-item-link">
                        <a class="item-node">
                            <span class="node-name">引入组件</span>
                        </a>
                      </div>
                      <!-- 三级菜单 -->
                      <ul class="zoom-tree-menus">
                          <li class="tree-item">
                              <div class="tree-item-link">
                                <a class="item-node">
                                    <span class="node-name">按需引入</span>
                                </a>
                              </div>
                          </li>
                          <li class="tree-item">
                              <div class="tree-item-link">
                                <a class="item-node">
                                    <span class="node-name">完整引入</span>
                                </a>
                              </div>
                          </li>
                      </ul>
                  </li>
                  <li class="tree-item">
                      <div class="tree-item-link">
                        <a class="item-node">
                            <span class="node-name">后端适配器</span>
                        </a>
                      </div>
                  </li>
                  <li class="tree-item">
                      <div class="tree-item-link">
                        <a class="item-node">
                            <span class="node-name">服务代理</span>
                        </a>
                      </div>
                  </li>
              </ul>
          </li>
          <li class="tree-item">
              <div class="tree-item-link">
                  <a class="item-node">
                      <span class="node-name">规范</span>
                  </a>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name: 'zoom-tree-menu',
    props: {
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>
<style>
.tree-item .zoom-tree-menus .tree-item .zoom-tree-menus .tree-item {
    margin-left: 36px;
}
/* 二级菜单 */
.tree-item .zoom-tree-menus .tree-item .item-node {
    margin-left: 24px;
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
    width: 210px;
    background: #fff;
    position: relative;
    font-size: 12px;
}
</style>

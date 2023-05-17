<!--
 * @Description:主页
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2023-04-21 21:23:38
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-05-17 21:03:32
-->
<template>
  <div class="zoom-home">
    <main>
      <div class="banner">
        <div class="banner-container">
          <h2 class="banner-title">
            ZOOM UI
          </h2>
          <h1 class="banner-sub-title">企业级前端UI设计的Vue组件</h1>
          <ul class="banner-feature">
            <li class="!ani#-18s"><p>企业级设计系统，追求极致体验</p></li>
            <li class="!ani#-12s"><p>多种前端设计方案融合</p></li>
            <li class="!ani#-6s"><p>开箱即用的Vue组件库</p></li>
            <li class="!ani#0s"><p>丰富的配套SDK</p></li>
          </ul>
          <h2 class="banner-button">
            <router-link to="/develop/install-develop" class="button-docs">
              <label v-tip.right="'开始使用组件'">快速上手</label>
            </router-link>
          </h2>
        </div>
      </div>
      <div class="mains">
        <div class="title-content">
          <h1 class="title">您需要的组件都有</h1>
          <h2 class="sub-title">
            为您的项目设计构建了基础组件，有助于您更快速构建出更好的产品
          </h2>
        </div>
        <div class="mains-container">
          <div class="inner">
            <div class="sum">
              <div class="cur-hand">
                <router-link to="/component/zoom-button" v-tip="'进入组件指南'" class="sum-title">
                  zoomUI 组件
                </router-link>
                <p class="sum-num">50+</p>
              </div>
            </div>
            <div class="mains-content">
              <div class="mains-content-left">
                <div class="content-inner-top">
                  <div class="content-inner-top-left border-show">
                    <zoom-form @submit.prevent="false">
                      <zoom-form-item>
                        <zoom-input placeholder="请输入"></zoom-input>
                      </zoom-form-item>
                      <zoom-form-item>
                        <zoom-dropdown :op="dropdownOp"></zoom-dropdown>
                      </zoom-form-item>
                      <zoom-form-item>
                        <zoom-date></zoom-date>
                      </zoom-form-item>
                      <zoom-form-item inline="true">
                        <zoom-search style="width: 130px;"></zoom-search>
                      </zoom-form-item>
                      <zoom-form-item inline="true">
                        <zoom-numeric style="width: 130px;"></zoom-numeric>
                      </zoom-form-item>
                      <zoom-form-item>
                        <zoom-rate></zoom-rate>
                      </zoom-form-item>
                      <zoom-form-item>
                        <zoom-text-popup></zoom-text-popup>
                      </zoom-form-item>
                      <zoom-form-item>
                        <!-- <zoom-date></zoom-date> -->
                        <zoom-testing></zoom-testing>
                      </zoom-form-item>
                    </zoom-form>
                  </div>
                  <div class="content-inner-top-right border-show">
                    <zoom-tree-menu :op="menuOp"></zoom-tree-menu>
                  </div>
                </div>
                <div class="content-inner-bottom">
                  <!-- <zoom-slider v-model="number2"></zoom-slider> -->
                  <zoom-notice>
                    <h5>zoomUI提供超多开箱即用的Vue前端组件、强大的SDK功能，让您的开发如虎添翼</h5>
                  </zoom-notice>
                </div>
              </div>
              <div class="mains-content-right border-show">
                <div class="item">
                  <zoom-button>按钮</zoom-button>&nbsp;
                  <zoom-button type="primary">按钮</zoom-button>&nbsp;
                  <zoom-button type="success">按钮</zoom-button>
                </div>
                <div class="item">
                  <zoom-checkbox :op="checkboxOp"></zoom-checkbox>
                </div>
                <div class="item">
                  <zoom-radio :op="checkOp"></zoom-radio>
                </div>
                <div class="item">
                  <zoom-steps type="timeLine" :op="stepsOp"></zoom-steps>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <!-- <p>
        <span class="zoom-icon icon-laugh"></span>
        <span class="zoom-icon icon-edit"></span>
        <span class="zoom-icon icon-fill"></span>
      </p> -->
      <p>
        遵循
        <a href="https://opensource.org/licenses/MIT" target="_blank">MIT 开源协议</a>
      </p>
      <p>Copyright © 2022-2026 zoom-ui</p>
    </footer>
    <!-- 手机端 -->
    <div class="zoom-mobile">
      <div class="midden">
        <img src="./component/static/logo.png" alt="zoomUI">
        <h1>ZOOM-UI</h1>
      </div>
      <div @click="$router.push('/develop')" class="go-to-btn go-to-btn-primary go-to-btn-ghost go-to-btn-shine">
        <!-- 进入 -->
        进入
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      stepsOp: {
        active: 6,
        data:  [
          {index: 5, time: '1998-05-12 14:25:32', name: 'Basic Info.'},
          {index: 6, time: '2008-08-08 08:08:08', name: 'Vics tab.'},
          {index: 7, time: '2018-08-08 08:08:08', name: 'not done.'},
        ]
      },
      checkboxOp: {
        name: 'hobby',
        data: [
          {text: '唱歌', value: 'sing'},
          {text: '跳舞', value: 'dance'},
          {text: '音乐', value: 'music'},
          {text: '运动', value: 'sports', checked: true}
        ]
      },
      menuOp: {
        hideTree: true,
        accordion: true,
        data: [
          {title: '首页'},
          {title: '环境搭建', children: [
            {title: '快速上手'},
            {title: '组件使用'}
          ]},
          {title: '表单组件', children: [
            {title: '按钮组件'},
            {title: '输入框组件'}
          ]},
          {title: '导航组件'},
          {title: '数据组件'},
          {title: '业务组件'},
          {title: '其它组件'},
        ]
      },
      number2: 60,
      checkOp: {
        data: [
          {text: '自动续费', value: 1},
          {text: '按需付费', value: 2, checked: true}
        ]
      },
      dropdownOp: {
        data: [
          {value: '1', text: '黄金糕'},
          {value: '2', text: '双皮奶'},
          {value: '3', text: '龙须面'},
          {value: '4', text: '北京烤鸭'}
        ],
      },
    }
  },
  created () {
    this.$emit('showHeader', false);
  },
  destroyed() {
    this.$emit('showHeader', true);
    this.$off('showHeader');
  }
};
</script>
<style lang="scss" scoped>
.border-show {
  border-radius: 14px;
  box-shadow: 0 0 10px #00000014;
  box-sizing: border-box;
  background: #fff;
  // display: flex;
}
.zoom-home {
  footer {
    p {
      margin: 0.2vw;
      a {
        color: #fff;
      }
      span {
        padding: 0 0.5vw;
      }
    }
    background: #3e4345;
    content-visibility: auto;
    font-size: 1vw;
    color: #fff;
    text-align: center;
    padding: 0.5vw;
  }
  .mains {
    width: 100%;
    padding: 2vw 0 2vw;
    box-sizing: border-box;
    border: 1px solid #f2f2f2;
    background: -webkit-linear-gradient(
    top,
    transparent 15px,
    #f2f2f2 15px,
    #f2f2f2 16px,
    transparent 16px,
    transparent 31px,
    #f2f2f2 31px,
    #f2f2f2 32px,
    transparent 32px,
    transparent 47px,
    #f2f2f2 47px,
    #f2f2f2 48px,
    transparent 48px,
    transparent 63px,
    #e5e5e5 63px,
    #e5e5e5 63px
      ),
    -webkit-linear-gradient(
    left,
    transparent 15px,
    #f2f2f2 15px,
    #f2f2f2 16px,
    transparent 16px,
    transparent 31px,
    #f2f2f2 31px,
    #f2f2f2 32px,
    transparent 32px,
    transparent 47px,
    #f2f2f2 47px,
    #f2f2f2 48px,
    transparent 48px,
    transparent 63px,
    #e5e5e5 63px,
    #e5e5e5 63px
      );
    background-size: 64px 64px;
    background-repeat: repeat;
    .title-content {
      .title {
        line-height: 3vw;
        font-size: 2vw;
        font-weight: bold;
        color: #252b3a;
      }
      .sub-title {
        margin: 1vw 0 1vw;
        font-size: 1.2vw;
        font-weight: 300;
        color: #575d6c;
        line-height: 2vw;
      }
      content-visibility: auto;
      width: 80vw;
      margin: 0 auto;
    }
    .mains-container {
      .inner {
        .sum {
          .cur-hand {
            .sum-title {
              &:hover {
                font-size: 1.7vw;
                float: left;
                width: 20vw;
                color: #505e80;
                font-weight: bold;
              }
              transition: font-size .5s, color .5s, font-weight .5s;
              font-size: 1.6vw;
              font-weight: 300;
              color: #252b3a;
              line-height: 3vw;
            }
            .sum-num {
              font-size: 2.5vw;
              font-weight: bold;
              color: #252b3a;
              line-height: 3vw;
              margin-bottom: 1vw;
            }
            text-decoration: none;
            cursor: pointer;
          }
          width: 13vw;
          padding-left: 1vw;
          box-sizing: border-box;
          flex: 0 1 auto;
        }
        .mains-content {
          .mains-content-left {
            .content-inner-top {
              .content-inner-top-left {
                // flex-basis: 45%;
                // padding-top: 1.2vw;
                padding: 1.2vw;
              }
              .content-inner-top-right {
                .zoom-tree-menu {
                  position: inherit;
                }
                flex-basis: 33%;
                padding: 0.3vw;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              display: flex;
              // gap: 5vw;
              justify-content: space-around;
            }
            .content-inner-bottom {
              margin-right: 3vw;
              margin-top: 1vw;
            }
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .mains-content-right {
            .item {
              width: 25vw;
              text-align: left;
              padding: 2vw 2vw;
            }
            width: fit-content;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          flex: 1 1 auto;
          display: flex;
          // gap: 0.3vw;
          gap: 2vw;
        }
        // -webkit-backdrop-filter: blur(8px);
        // backdrop-filter: blur(10px);
        background: rgba(255,255,255,.6);
        padding: 2vw 1.5vw;
        border-radius: 14px;
        box-shadow: 0 0 10px #00000014;
        box-sizing: border-box;
        display: flex;
      }
      width: 85vw;
      margin: 0 auto;
      background: url('./component/static/com-bg.png') no-repeat;
      background-size: 100% auto;
      // padding: 1.64vw 0;
      padding: 5vw 0;
      box-sizing: border-box;
    }
  }
  .banner {
    .banner-container {
      .banner-title {
        line-height: 3vw;
        font-size: 1.5vw;
        font-weight: normal;
        color: #2c2e30;
      }
      .banner-sub-title {
        line-height: 3.5vw;
        font-size: 3vw;
        margin: 1vw 0 1vw;
        color: #181818;
        font-weight: bold;
        letter-spacing: 3px;
      }
      .banner-feature {
        li {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          word-break: break-all;
          animation: text-toggle 24s linear infinite running;
        }
        .\!ani\#-18s {
          animation-delay: -18s !important;
        }
        .\!ani\#-12s {
          animation-delay: -12s !important;
        }
        .\!ani\#-6s {
          animation-delay: -6s !important;
        }
        .\!ani\#0s {
          animation-delay: 0s !important;
        }
        overflow: hidden;
        display: flex;
        justify-content: center;
        color: #5f646c;
        height: 4vw;
        font-size: 1.5vw;
        line-height: 4vw;
        letter-spacing: 0.5vw;
        margin-bottom: 2vw;
        position: relative;
        width: 100%;
      }
      .banner-button {
        .button-docs {
          &:hover {
            background: #40a9ff;
            border-color: #40a9ff;
          }
          transition: border .3s, background .3s;
          background: #2f5bea;
          color: #fff;
          box-shadow: 0 0 1vw #2f5bea26;
          width: fit-content;
          height: 3vw;
          line-height: 3vw;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.03vw;
          padding: 0 2vw;
          font-size: 2vw;
          text-decoration: none;
          border-radius: 25vw;
          label {
            cursor: pointer;
          }
        }
        letter-spacing: 2px;
        box-sizing: border-box;
        display: flex;
        gap: 1.03vw;
        margin-bottom: 3vw;
      }
      width: 70vw;
      margin: 0 auto;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -khtml-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
    width: 100%;
    height: 47vw;
    padding-top: 5vw;
    // background-image: url('./component/static/banner.png');
    // background-size: contain;
    // background-repeat: no-repeat;
    // animation: gradientBG 500s linear infinite running;
    animation: gradientBG 300s ease infinite;
    background:
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%) 0 0,
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%) 0 0,
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%) 0 110px,
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) -130px -170px,
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) 130px 370px,
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%) 0 0,
      linear-gradient(to right bottom, lightblue, #e2e7fb);
      background-size: 470px 470px, 970px 970px, 410px 410px, 610px 610px, 530px 530px, 730px 730px, 100% 100%;
      background-color: #840b2a;
  }
  background: #fff;
  width: 100%;
  height: 100%;
}
.zoom-main {
  top: 0 !important;
}

@keyframes gradientBG {
  0% {
    background-size: 24.5vw 24.5vw, 50.5vw 50.5vw, 21.37vw 21.37vw, 31.8vw 31.8vw, 27.6vw 27.6vw, 38vw 38vw, 100% 100%;
  }
  50% {
    background-size: 11.99vw 11.99vw, 41.2vw 41.2vw, 18.24vw 18.24vw, 14.59vw 14.59vw, 25.01vw 25.01vw, 23.46vw 23.46vw, 100% 100%;
  }
  100% {
    background-size: 24.5vw 24.5vw, 50.5vw 50.5vw, 21.37vw 21.37vw, 31.8vw 31.8vw, 27.6vw 27.6vw, 38vw 38vw, 100% 100%;
  }
}

@keyframes text-toggle {
  0%,
  75%,
  to {
    width: 0;
    opacity: 0;
  }

  76%,
  99% {
    opacity: 1;
  }

  85%,
  95% {
    width: 100%;
    opacity: 1;
  }
}

.zoom-mobile {
  display: none;
}
.go-to-btn {
  --hue: 190;
  position: absolute;
  bottom: 10%;
  padding: 1vw 3vw;
  font-size: 5vw;
  border-radius: 30vw;
  font-weight: bold;
  line-height: 1.5;
  text-decoration: none;
  text-transform: uppercase;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;
  a {
    color: #eee;
    font-weight: bold;
  }
  &:hover {
    background: hsl(var(--hue), 100%, 31%);
  }

  &-primary {
    --hue: 187;
  }

  &-ghost {
    color: hsl(var(--hue), 100%, 41%);
    background-color: transparent;
    border-color: hsl(var(--hue), 100%, 41%);

    &:hover {
      color: white;
    }
  }

  &-shine {
    color: white;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        hsla(var(--hue), 100%, 41%, 0.5),
        transparent
      );
      transform: translateX(-100%);
      transition: 0.6s;
    }

    &:hover {
      background: transparent;
      box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
    }

    &:hover::before {
      transform: translateX(100%);
    }
  }
}

// @media (min-width:501px) and (max-width:1020px) {
@media (min-width:501px) and (max-width:1080px) {
  #app {
    .zoom-home {
      .inner {
        .sum {
          padding-left: 0;
          width: 30vw;
        }
        .mains-content {
          .mains-content-left {
            .content-inner-top-right {
              flex-basis: 25%;
              .zoom-tree-menu {
                width: 26vw !important;
              }
            }
          }
          .mains-content-right {
            display: none;
          }
        }
        display: block;
      }
    }
  }
}
</style>
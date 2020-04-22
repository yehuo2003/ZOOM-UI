<template>
  <div>
    <zoom-steps :op="stepsOp" ref="steps"></zoom-steps>
    <zoom-button @click="handleClick('prev')">上一步</zoom-button>
    <zoom-button @click="handleClick('next')" type="primary">下一步</zoom-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        stepsOp: {
          active: 7,	//	要激活的下标, 和index绑定
          disabled: false,  //  是否禁止点击 默认false
          data:  [	//	类型为'timeLine'时候,time属性有效 time属性要传标准时间格式 类型为advanced时候,可自定义count和type,type属性有'done','doing'
            {index: 5, name: 'Basic Info.'},
            {index: 6, name: 'Vics tab.'},
            {index: 7, name: 'not done.'},
            {index: 8, name: 'not done2'}
          ]
        },
      }
    },
    methods: {
      handleClick(val) {
        if (val === 'next') {
          // 将激活条目往前移一格	如果目前没有激活的条目则无效
          this.$refs['steps'].next();
        } else {
          this.$refs['steps'].prev(); // 将激活条目往后移一格 如果目前步骤条已经全部完成则无效
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
// hover 按钮
// .btn {
//   --hue: 190;
//   position: relative;
//   padding: 1rem 3rem;
//   font-size: 1rem;
//   line-height: 1.5;
//   color: white;
//   text-decoration: none;
//   text-transform: uppercase;
//   background-color: hsl(var(--hue), 100%, 41%);
//   border: 1px solid hsl(var(--hue), 100%, 41%);
//   outline: transparent;
//   overflow: hidden;
//   cursor: pointer;
//   user-select: none;
//   white-space: nowrap;
//   transition: 0.25s;

//   &:hover {
//     background: hsl(var(--hue), 100%, 31%);
//   }

//   &-primary {
//     --hue: 187;
//   }

//   &-ghost {
//     color: hsl(var(--hue), 100%, 41%);
//     background-color: transparent;
//     border-color: hsl(var(--hue), 100%, 41%);

//     &:hover {
//       color: white;
//     }
//   }

//   &-shine {
//     color: white;

//     &::before {
//       position: absolute;
//       content: "";
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: linear-gradient(
//         120deg,
//         transparent,
//         hsla(var(--hue), 100%, 41%, 0.5),
//         transparent
//       );
//       transform: translateX(-100%);
//       transition: 0.6s;
//     }

//     &:hover {
//       background: transparent;
//       box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
//     }

//     &:hover::before {
//       transform: translateX(100%);
//     }
//   }
// }

// ×动画
// #burger-toggle {
//     appearance: none;
//     opacity: 0;
// }
// #burger-toggle:checked ~ .burger-menu .line:nth-child(1) {
//     transform: translateY(calc(var(--burger-menu-radius) / 5)) rotate(45deg);
// }
// #burger-toggle:checked ~ .burger-menu .line:nth-child(2) {
//     transform: scaleX(0);
// }
// #burger-toggle:checked ~ .burger-menu .line:nth-child(3) {
//     transform: translateY(calc(var(--burger-menu-radius) / -5)) rotate(-45deg);
// }
// .burger-menu {
//     --burger-menu-radius: 4em;
//     position: relative;
//     z-index: 100;
//     display: block;
//     width: var(--burger-menu-radius);
//     height: var(--burger-menu-radius);
//     background: white;
//     border: solid 2px rgba(149, 166, 167, 0.4);
//     border-radius: 50%;
//     outline: none;
//     cursor: pointer;
//     transition: 0.5s ease-in-out;
// }
// .burger-menu .line {
//     position: absolute;
//     left: 25%;
//     width: 50%;
//     height: 3px;
//     background: rgba(43, 61, 79, 0.3);
//     border-radius: 10px;
//     overflow: hidden;
//     transition: all 0.5s ease;
// }
// .burger-menu .line:nth-child(1) {
//     top: 30%;
// }
// .burger-menu .line:nth-child(2) {
//     top: 50%;
// }
// .burger-menu .line:nth-child(3) {
//     top: 70%;
// }
// .burger-menu .line::after {
//     position: absolute;
//     content:"";
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: #2980b9;
//     transform: translateX(-100%);
//     transition: all 0.25s ease;
// }
// .burger-menu .line:nth-child(2)::after {
//     transition-delay: 0.1s;
// }
// .burger-menu .line:nth-child(3)::after {
//     transition-delay: 0.2s;
// }
// .burger-menu:hover {
//     box-shadow: 0.4px 0.4px 0.8px rgba(0, 0, 0, 0.042), 1px 1px 2px rgba(0, 0, 0, 0.061), 1.9px 1.9px 3.8px rgba(0, 0, 0, 0.075), 3.4px 3.4px 6.7px rgba(0, 0, 0, 0.089), 6.3px 6.3px 12.5px rgba(0, 0, 0, 0.108), 15px 15px 30px rgba(0, 0, 0, 0.15);
// }
// .burger-menu:hover .line::after {
//     transform: translateX(0);
// }

// .todo-list {
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-orient: vertical;
//     -webkit-box-direction: normal;
//     flex-direction: column;
//     padding: 0 75px 10px 30px;
//     background: #162740;
//     border: transparent;
// }
// .todo-list .todo-list__title {
//     padding: 3px 6px;
//     color: #f1faee;
//     background-color: #264456;
// }
// .todo-list .todo-list__label {
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-align: center;
//     align-items: center;
//     margin: 40px 0;
//     font-size: 24px;
//     font-family: Lato, sans-serif;
//     color: #f1faee;
//     cursor: pointer;
// }
// .todo-list .todo-list__label input[type="checkbox"] {
//     opacity: 0;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
// }
// .todo-list .todo-list__label input[type="checkbox"] + .check {
//     position: absolute;
//     width: 25px;
//     height: 25px;
//     border: 2px solid #f1faee;
//     -webkit-transition: 0.2s;
//     transition: 0.2s;
// }
// .todo-list .todo-list__label input[type="checkbox"]:checked + .check {
//     width: 25px;
//     height: 15px;
//     border-top: transparent;
//     border-right: transparent;
//     -webkit-transform: rotate(-45deg);
//     transform: rotate(-45deg);
// }
// .todo-list .todo-list__label input[type="checkbox"] ~ span {
//     position: relative;
//     left: 40px;
//     white-space: nowrap;
//     -webkit-transition: 0.5s;
//     transition: 0.5s;
// }
// .todo-list .todo-list__label input[type="checkbox"] ~ span::before {
//     position: absolute;
//     content:"";
//     top: 50%;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     background: #f1faee;
//     -webkit-transform: scaleX(0);
//     transform: scaleX(0);
//     -webkit-transform-origin: right;
//     transform-origin: right;
//     -webkit-transition: -webkit-transform 0.5s;
//     transition: -webkit-transform 0.5s;
//     transition: transform 0.5s;
//     transition: transform 0.5s, -webkit-transform 0.5s;
// }
// .todo-list .todo-list__label input[type="checkbox"]:checked ~ span {
//     color: #585b57;
// }
// .todo-list .todo-list__label input[type="checkbox"]:checked ~ span::before {
//     -webkit-transform: scaleX(1);
//     transform: scaleX(1);
//     -webkit-transform-origin: left;
//     transform-origin: left;
// }
</style>
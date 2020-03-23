<template>
  <div>
    <zoom-date :op="dateOp"></zoom-date><br>
    禁用日期选择：<br>
    <zoom-date :op="dateOp2"></zoom-date>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dateOp2: {
          isdisabled: true,
          dateTime: '2020-02-02'
        },
        dateOp: {
          isdisabled: false,  //  是否禁用
          dateTime: 1396945578506,	//	或者字符串 '2019-01-01'  '2019-01-01 12:30:50'	也可以
          onComplete: (arr, time) => {	//	arr是日期数组(年月日周几 + 时分秒)
            console.log('组件编译完成onComplete', arr, time);
          },
          onRender: (arr, time) => {  //  组件渲染完成时执行的事件
            console.log('组件渲染完成onRender', arr, time);
          },
          onShow: day => {	// 选择日期框日期后执行的事件 日期对象 flag 是否当前月 false则表示不在当前月
            console.log('选择日期框日期后执行的事件', day);
          }
        }
      }
    }
  }
</script>
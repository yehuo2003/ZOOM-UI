<template>
  <div>
    <zoom-search :op="searchOp"></zoom-search>
    禁用搜索框：<zoom-search :op="searchOp2"></zoom-search>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchOp2: {
          isdisabled: true,
          placeHolder: '搜索框已禁用',
          hideClose: false,
          data: [
            {value: '1', text: '所有'},
            {value: '2', text: '找人'},
            {value: '3', text: '文章'}
          ],
        },
        searchOp: {
          isdisabled: false,			// 是否禁用
          placeHolder: '查找需要的内容',	//占位符  默认为 请输入关键词
          readonly: false,		//是否禁止输入
          errMsg: '必填',
          testing: val => {
            if (!val) {
              return false;
            } else {
              return true;
            }
          },
          onClick: (val, key) => {
            console.log(val, key);
          },
          data: [	//下拉框数据, 键值对的方式, text是展示的文本
            {value: '1', text: '所有'},
            {value: '2', text: '找人'},
            {value: '3', text: '文章'}
          ],
        },
      }
    }
  }
</script>
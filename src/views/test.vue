<template>
  <div>
    <zoom-file-upload :op="fileOp"></zoom-file-upload>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fileOp: {
          limit: 5, //  可上传最大文件数量
          fileSize: '5MB', //  单个文件大小
          custom: false, // 默认false 为true则开启自定义模式 自定义模式下点击后自动选择文件并上传
          fileType: 'image', //  文件类型, 如  image png
          multiple: true, //  是否多选 默认false
          notUpload: false, //  默认false 为true 关闭自动上传	开启时进度条会隐藏
          closeProgress: false, //  是否关闭进度条, 默认false 默认提交方法方法xhrSubmit, 如果设置true将使用fetchSubmit
          url: 'http://127.0.0.1:8081/profile', //  上传地址
          fileList: [],//上传文件列表，无论单选还是支持多选，文件都以列表格式保存
          params: {param1: '自定义参数1', param2: '自定义参数2' },//携带参数列表
          onDelete: (file) => { // 删除文件事件
            console.log( file, '文件被删除了');
          },
          onChange: fileList => {//监听文件变化，增减文件时都会被子组件调用
            console.log('文件变化了onChange', fileList);
          },
          onProgress: (index, e) => {//上传进度，上传时会不断被触发，需要进度指示时会很有用
            console.log(index, e, '上传进度被触发uploadProgress');
          },
          onSuccess: (index, response) => {// 某个文件上传成功都会执行该方法，index代表列表中第index个文件
            console.log(index, response, '文件上传成功uploadSuccess');
          },
          onFailed: (index, err) => {//某文件上传失败会执行，index代表列表中第index个文件
            console.log(index, err, '上传失败了uploadFailed');
          },
          onFinished: result => {//所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }
            console.log(' onFinished上传完毕,结果是:',result);
          },
          onBefore: file => {
            console.log('onBefore 触发', file);
            return true
          }
        }
      }
    }
  }
</script>
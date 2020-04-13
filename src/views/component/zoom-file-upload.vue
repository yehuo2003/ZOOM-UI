<template>
  <div class="custom-zoom-file-upload">
    <!-- 普通 -->
    <div class="tip">
      zoom-ui提供了强大的文件上传组件，组件分为三种模式，一种是列表模式，一种缩略图模式，用户可以自由切换，还有一种自定义模式，
      默认是用列表模式上传方式是采用原生ajax，分为两套，一套xhr一套fetch，默认使用xhr，带有进度条功能，上传成功进度条变为绿色，失败变红色，
      如果用户设置closeProgress为true关闭了进度条，则采用fetchSubmit上传。
      此外还提供了单文件上传和多文件上传，还可以自定义单个文件上传的大小和类型
    </div>
    <h2>使用方法</h2>
    <zoom-tabs class="data-drop" :value="curTab" @change="tabChange">
      <zoom-tab-item :index="0" label="效果">
        <zoom-file-upload :op="fileOp"></zoom-file-upload>
      </zoom-tab-item>
      <zoom-tab-item :index="1" label="代码">
        <custom-code :html="fileCode"></custom-code>
      </zoom-tab-item>
    </zoom-tabs>
    <attribute :list="attributeList"></attribute>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attributeList: [
        {
          id: 1,
          title: "属性",
          content: [
            {
              id: 1,
              title: "上传地址",
              name: "url",
              type: "String",
              text: "设置要上传的服务地址",
              text2: '用法: 配置op对象, 设置 <span>url: "服务地址"</span>'
            },
            {
              id: 2,
              title: "关闭自动上传",
              name: "notUpload",
              type: "Boolean",
              text: "默认为<span>false</span>, 为<span>true</span> 关闭自动上传	开启时进度条会隐藏",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>notUpload: "true"</span>'
            },
            {
              id: 3,
              title: "自定义上传",
              name: "custom",
              type: "Boolean",
              text: "默认为<span>false</span>, 为<span>true开始</span>, 则隐藏UI视图, 可在组件标签中自定义DOM元素, 自定义模式下点击后自动选择文件并上传",
              text2: '用法: 在组件标签上, 或者配置op对象, 设置 <span>custom: "true"</span>'
            },
            {
              id: 4,
              title: "上传的文件类型",
              name: "fileType",
              type: "String",
              text: "如  <span>image</span> <span>png</span>, 文件类型符合才会添加进上传列表",
              text2: '用法: 配置op对象, 设置 <span>fileType: "文件类型"</span>'
            },
            {
              id: 5,
              title: "上传的文件大小",
              name: "fileSize",
              type: "String",
              text: "如  <span>50KB</span>, 上传文件不超过此大小才会添加上传列表",
              text2: '用法: 配置op对象, 设置 <span>fileSize: "文件大小"</span>'
            },
            {
              id: 6,
              title: "文件列表",
              name: "fileList",
              type: "String",
              text: "上传文件列表，无论单选还是支持多选，文件都以列表格式保存进此列表",
              text2: '用法: 配置op对象, 设置 <span>fileList: []</span>'
            },
            {
              id: 7,
              title: "关闭进度条",
              name: "closeProgress",
              type: "Boolean",
              text: "是否关闭进度条, 默认false 默认提交方法方法xhrSubmit, 如果设置true将使用fetchSubmit",
              text2: '用法: 配置op对象, 设置 <span>closeProgress: true</span>'
            },
            {
              id: 8,
              title: "上传携带参数",
              name: "params",
              type: "Object",
              text: "上传时可追加的携带参数列表 比如token",
              text2: '用法: 配置op对象, 设置 <span>params: {param1: 自定义参数1, param2: 自定义参数2 }</span>'
            },
            {
              id: 9,
              title: "是否多选",
              name: "multiple",
              type: "String",
              text: "默认<span>false</span>, 为<span>true启用多选</span>",
              text2: '用法: 配置op对象, 设置 <span>multiple: true</span>'
            },
            {
              id: 10,
              title: "文件数量",
              name: "limit",
              type: "String",
              text: "当类型为多选的时候, 可以设置此项限制文件个数",
              text2: '用法: 配置op对象, 设置 <span>limit: 5</span>'
            }
          ]
        },
        {
          id: 2,
          title: "方法",
          content: [
            {
              id: 1,
              title: "文件删除事件",
              name: "onDelete",
              type: "Function",
              text: "每当有文件被删除时候调用",
              text2: '用法: 配置op对象后设置回调函数, 会返回一个参数, 记录被删除的文件'
            },
            {
              id: 2,
              title: "监听文件变化",
              name: "onChange",
              type: "Function",
              text: "增减文件或文件状态改变时都会被调用",
              text2: '用法: 配置op对象后设置回调函数, 会返回一个参数, 是当前文件列表'
            },
            {
              id: 3,
              title: "监听上传进度",
              name: "onProgress",
              type: "Function",
              text: "当开启进度条时, 上传文件过程中会不断触发此函数",
              text2: '用法: 配置op对象后设置回调函数, 会返回两个参数, 一个是当前文件下标, 一个是进度 <span>onProgress: (index, progress)</span>'
            },
            {
              id: 4,
              title: "监听上传成功的回调",
              name: "onSuccess",
              type: "Function",
              text: "某个文件上传成功就会执行该方法",
              text2: '用法: 配置op对象后设置回调函数, 会返回两个参数, 一个是当前文件下标, 一个是服务器返回的结果 <span>onSuccess: (index, response)</span>'
            },
            {
              id: 5,
              title: "监听上传失败的回调",
              name: "onFailed",
              type: "Function",
              text: "某文件上传失败就会执行该方法",
              text2: '用法: 配置op对象后设置回调函数, 会返回两个参数, 一个是当前文件下标, 一个是失败的信息 <span>onFailed: (index, error)</span>'
            },
            {
              id: 6,
              title: "上传文件前回调",
              name: "onBefore",
              type: "Function",
              text: "如果定义了onBefore方法且返回了false，或者文件列表为空，请求就不会发送",
              text2: '用法: 配置op对象后设置回调函数, <span>onBefore: file => {}</span>'
            },
            {
              id: 7,
              title: "上传文件结束的回调",
              name: "onFinished",
              type: "Function",
              text: "所有文件上传完毕后（无论成败）执行",
              text2: '用法: 配置op对象后设置回调函数, <span>result: { success: 成功数目, failed: 失败数目 }</span> <span>onFinished(result)</span>'
            },
            {
              id: 8,
              title: "获取上传文本框的DOM对象",
              name: "customUpload",
              type: "Function",
              text: "",
              text2: '用法: 设置<span>ref</span>属性, <span>this.$refs[属性].customUpload()</span> 返回input的dom对象'
            },
          ]
        }
      ],
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
      },
      curTab: 0,
      fileCode:
        `&lt;template&gt;
            &lt;div&gt;
              &lt;zoom-file-upload :op="fileOp"&gt;&lt;/zoom-file-upload&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
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
                    onDelete: (file) =&gt; { // 删除文件事件
                      console.log( file, '文件被删除了');
                    },
                    onChange: fileList =&gt; {//监听文件变化，增减文件时都会被子组件调用
                      console.log('文件变化了onChange', fileList);
                    },
                    onProgress: (index, e) =&gt; {//上传进度，上传时会不断被触发，需要进度指示时会很有用
                      console.log(index, e, '上传进度被触发uploadProgress');
                    },
                    onSuccess: (index, response) =&gt; {// 某个文件上传成功都会执行该方法，index代表列表中第index个文件
                      console.log(index, response, '文件上传成功uploadSuccess');
                    },
                    onFailed: (index, err) =&gt; {//某文件上传失败会执行，index代表列表中第index个文件
                      console.log(index, err, '上传失败了uploadFailed');
                    },
                    onFinished: result =&gt; {//所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }
                      console.log(' onFinished上传完毕,结果是:',result);
                    },
                    onBefore: file =&gt; {  // 如果定义了onBefore方法且返回了false，或者文件列表为空，请求就不会发送
                      console.log('onBefore 触发', file);
                      return true
                    }
                  }
                }
              }
            }
          &lt;/script&gt;`
    }
  },
  methods: {
    tabChange(index) {
      this.curTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
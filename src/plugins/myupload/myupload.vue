<template>
<div class="zoom-file-upload">
  <div class="upload-header">
     <div class="upload-title">选择文件</div>
     <div class="alert-upload upload-info">
        <i class="zoom-icon close-alert icon-info"></i>
        最多上传两个文件, 每个文件最大10M
     </div>
  </div>
  <div class="upload-toolbar zoom-clear">
      <zoom-button @click="addFileClick">添加文件</zoom-button>
      <div class="upload-switch">
          <zoom-radio checkname="list">列表模式</zoom-radio>
          <zoom-radio checkname="list">缩略图模式</zoom-radio>
      </div>
  </div>
  <div class="upload-content">
      <div v-show="!List" ref='select_frame'  ondragstart="return false" class="upload-text">
          <i class="zoom-icon icon-info"></i>
          <div>拖拽文件至此处</div>
      </div>
    <ul v-show="List" class="upload-file-list">
        <li v-for="(item, index) of List" :key="index" class="upload-file">
            <div class="upload-item">
                <img v-if="item.type === 'image/png' " :src="item.url" :alt="item.name">
                <span v-else class="zoom-icon icon-delete"></span>
            </div>
            <div class="file-name" title="">
                <span class="file-name-wrapper">{{item.name}}</span>
            </div>
            <div class="file-close">
                <a @click="remove(index)" class="zoom-icon icon-delete"></a>
            </div>
            <div class="file-size">
                {{item.size}}
            </div>
            <div class="file-status">
                <!-- {{isprogress}} -->
                <zoom-progress :op="proOp"></zoom-progress>
            </div>
        </li>
        <!-- <li class="upload-file">
            <div class="upload-item">
                <img src="../../../src/assets/logo.png" alt="">
            </div>
            <div class="file-name" title="">
                <span class="file-name-wrapper">这是一个文件.txt</span>
            </div>
            <div class="file-close">
                <a class="zoom-icon icon-delete"></a>
            </div>
            <div class="file-size">
                392KB
            </div>
            <div class="file-status"></div>
        </li> -->
    </ul>
  </div>
  <div class="upload-footer">
      <div class="upload-btns">
          <zoom-button :op="startUploadOp">开始上传</zoom-button>
          <zoom-button>停止上传</zoom-button>
          <zoom-button>关闭</zoom-button>
      </div>
  </div>
  <input style="display:none" @change="addFile" :multiple="multiple" type="file" :name="name" ref="zoom-upload"/>
</div>
</template>
<script>
export default {
 name: 'my-upload',
 props: {
 name: String,
 action: {
  type: String,
  required: true
 },
 fileList: {    //  上传文件列表，无论单选还是支持多选，文件都以列表格式保存
  type: Array,
  default: []
 },
 data: Object,  //  上传时可追加的携带参数列表 比如token    param: {param1: '', param2: '' },
 multiple: Boolean, //  是否多选
 limit: Number,     //  文件数量
 onChange: Function,
 onBefore: Function,
 onProgress: Function,
 onSuccess: Function,
 onFailed: Function,
 onFinished: Function
 },
 data() {
     return {
         size: '10GB',
         proOp: {
             progress: 0
         },
         isprogress: 0,
         filelist: [],
         List: null,
         startUploadOp: {
             onClick: () => {
                 this.submit();
             }
         }
     }
 },
 watch: {
     filelist(newVal, oldVal) {
         debugger
         console.log(this.filelist, 'this.filelist----');
         this.List = null;
         console.log(newVal, 'watch');
         this.List = newVal[newVal.length - 1];
     }
 },
 mounted() {
     this.$refs.select_frame.ondragleave = (e) => {
            e.preventDefault()  // 阻止离开时的浏览器默认行为
        }
        this.$refs.select_frame.ondrop = (e) => {
            e.preventDefault()    // 阻止拖放后的浏览器默认行为
            const data = e.dataTransfer.files[0]  // 获取文件对象
            if (data.length < 1) {
                return  // 检测是否有文件拖拽到页面
            }
            console.log(data)
            this.addFile({target: {files: [data]}})//上传文件的方法
        }
        this.$refs.select_frame.ondragenter = (e) => {
            e.preventDefault()  // 阻止拖入时的浏览器默认行为
            this.$refs.select_frame.border = '2px dashed red'
        }
        this.$refs.select_frame.ondragover = (e) => {
            e.preventDefault()    // 阻止拖来拖去的浏览器默认行为
        }
 },
 methods: {
    //  添加文件
    addFileClick() {
        this.$refs['zoom-upload'].click()
    },
    //  文件大小验证
    testSize(file) {
        if (!this.size) {
            return true
        }
        let self = this;
        function test(unit) {
            if (self.size.indexOf(unit) > -1) {
                return Number(self.size.split(unit)[0]);
            } else {
                return false;
            }
        }
        let size = 0;
        if (test('G')) {
            size = test('G') * 1024 * 1024;
        } else if (test('g')) {
            size = test('g') * 1024 * 1024;
        } else if (test('M')) {
            size = test('M') * 1024;
        } else if (test('m')) {
            size = test('m') * 1024;
        } else if (test('k')) {
            size = test('k');
        } else if (test('K')) {
            size = test('K');
        } else {
            size = Number(this.size);
        }
        if(isNaN(size)) {
            throw Error('zoom-ui TypeError: size类型错误, 必须为数字, 或以KB, MB, GB等形式结尾字符串');
            return
        } else {
            if (file && size) {
                let fileSize = file.size;
                // if (file.type.indexOf('image') == -1) {
                //     this.defeated('请选择图片文件!');
                //     return false
                // }
                if(fileSize > size * 1024) {
                    console.log(`文件大小不能大于${this.size}!`);
                    return false;
                } else if (fileSize <= 0) {
                    console.log(`文件大小不能为0!`);
                    return false;
                } else {
                    return true;
                }
            } else {
                console.log('成功');
                return true
            }
            this.size = size;
        }
    },
    //  methods内一共4个方法，添加文件、移除文件、提交、检测（上传之前的检验）
    //  添加文件
    addFile({target: {files}}){//input标签触发onchange事件时，将文件加入待上传列表
        for(let i = 0, l = files.length; i < l; i++){
            if (this.testSize(files[i])) {
                files[i].url = URL.createObjectURL(files[i]);//创建blob地址，不然图片怎么展示？
                files[i].status = 'ready';//开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
                files[i].progress = 0;    // 进度
            } else {
                return;
            }
        }
        let fileList = [...this.fileList];
        if(this.multiple){//多选时，文件全部压如列表末尾
            fileList = [...fileList, ...files];
            let len = fileList.length;
            let limit = this.limit;
            if(limit && typeof limit === "number" && Math.ceil(limit) > 0 && len > limit){//有数目限制时，取后面limit个文件
                limit = Math.ceil(limit);
                //  limit = limit > 10 ? 10 : limit;
                fileList = fileList.slice(len - limit);
            }
        } else {//单选时，只取最后一个文件。注意这里没写成fileList = files;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
            // fileList = [files[0]];
            fileList = files[0];
        }
        this.filelist.push(fileList);
        this.List = this.filelist;
        this.onChange(this.filelist);//调用父组件方法，将列表缓存到上一级data中的fileList属性
        // this.$parent.fileList.push(fileList);
        // this.fileList = this.$parent.fileList;
        // this.onChange(fileList);//调用父组件方法，将列表缓存到上一级data中的fileList属性
    },
    // 移除文件 这个简单,有时候在父组件叉掉某文件的时候，传一个index即可。
    remove(index){
        let fileList = [...this.fileList];
        if(fileList.length){
            fileList.splice(index, 1);
            this.onChange(fileList);
        }
    },
    // 提交上传 这里使用了两种方式，fetch和原生方式，由于fetch不支持获取上传的进度，如果不需要进度条或者自己模拟进度或者XMLHttpRequest对象不存在的时候，使用fetch请求上传逻辑会更简单一些
    submit(){
        if(this.checkIfCanUpload()){
            if(this.onProgress && typeof XMLHttpRequest !== 'undefined')
                this.xhrSubmit();
            else
                this.fetchSubmit();
        }
    },
    // 4.基于上传的两套逻辑，这里封装了两个方法xhrSubmit和fetchSubmit
    fetchSubmit(){
        let keys = Object.keys(this.data), values = Object.values(this.data), action = this.action;
        const promises = this.fileList.map(each => {
            each.status = "uploading";
            let data = new FormData();
            data.append(this.name || 'file', each);
            keys.forEach((one, index) => data.append(one, values[index]));
            return fetch(action, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body: data
            }).then(res => res.text()).then(res => JSON.parse(res));//这里res.text()是根据返回值类型使用的，应该视情况而定
        });
        Promise.all(promises).then(resArray => {//多线程同时开始，如果并发数有限制，可以使用同步的方式一个一个传，这里不再赘述。
            let success = 0, failed = 0;
            resArray.forEach((res, index) => {
                if(res.code == 1){
                    success++;         //统计上传成功的个数，由索引可以知道哪些成功了
                    this.onSuccess(index, res);
                }else if(res.code == 520){   //约定失败的返回值是520
                    failed++;         //统计上传失败的个数，由索引可以知道哪些失败了
                    this.onFailed(index, res);
                }
            });
            return { success, failed };   //上传结束，将结果传递到下文
        }).then(this.onFinished);      //把上传总结果返回
    },
    xhrSubmit(){
        const _this = this;
        // let options = this.fileList.map((rawFile, index) => ({
        let options = this.filelist.map((rawFile, index) => ({
            file: rawFile,
            data: _this.data,
            filename: _this.name || "file",
            action: _this.action,
            onProgress(e){
                _this.onProgress(index, e);//闭包，将index存住
            },
            onSuccess(res){
                _this.onSuccess(index, res);
            },
            onError(err){
                _this.onFailed(index, err);
            }
        }));
        // let l = this.fileList.length;
        let l = this.filelist.length;
        let send = async options => {
        for(let i = 0; i < l; i++){
            await _this.sendRequest(options[i]);//这里用了个异步方法，按次序执行this.sendRequest方法，参数为文件列表包装的每个对象，this.sendRequest下面紧接着介绍
        }
        };
        send(options);
    },
    // 这里借鉴了element-ui的上传源码
    sendRequest(option){
        const _this = this;
        upload(option);

        function getError(action, option, xhr) {
            var msg = void 0;
        if (xhr.response) {
            msg = xhr.status + ' ' + (xhr.response.error || xhr.response);
        } else if (xhr.responseText) {
            msg = xhr.status + ' ' + xhr.responseText;
        } else {
            msg = 'fail to post ' + action + ' ' + xhr.status;
        }

            var err = new Error(msg);
            err.status = xhr.status;
            err.method = 'post';
            err.url = action;
            return err;
        }

        function getBody(xhr) {
            var text = xhr.responseText || xhr.response;
            if (!text) {
                return text;
            }

            try {
                return JSON.parse(text);
            } catch (e) {
                throw Error(`zoom-ui Error: ${e}`);
                return text;
            }
        }

        function upload(option) {
            if (typeof XMLHttpRequest === 'undefined') {
            return;
        }

        var xhr = new XMLHttpRequest();
        var action = option.action;

        if (xhr.upload) {
            xhr.upload.onprogress = function progress(e) {
                if (e.total > 0) {
                     e.percent = e.loaded / e.total * 100;
                }
                _this.isprogress = e.percent;
                _this.proOp.progress = e.percent;
                console.log(_this.proOp.progress, '_this.proOp.progressrefs');
                option.onProgress(e);
            };
        }

        var formData = new FormData();

        if (option.data) {
            Object.keys(option.data).map(function (key) {
                formData.append(key, option.data[key]);
            });
        }

        formData.append(option.filename, option.file);

        xhr.onerror = function error(e) {
            option.onError(e);
        };

        xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr));
        }

        option.onSuccess(getBody(xhr));
        };

        xhr.open('post', action, true);

        if (option.withCredentials && 'withCredentials' in xhr) {
            xhr.withCredentials = true;
        }

        var headers = option.headers || {};

        for (var item in headers) {
            if (headers.hasOwnProperty(item) && headers[item] !== null) {
                xhr.setRequestHeader(item, headers[item]);
            }
        }
            xhr.send(formData);
            return xhr;
        }
    },
    // 如果父组件定义了onBefore方法且返回了false，或者文件列表为空，请求就不会发送。
    // 代码部分完了，使用时只要有了on-progress属性并且XMLHttpRequest对象可访问，就会使用原生方式发送请求，否则就用fetch发送请求（不展示进度）。
    checkIfCanUpload(){
        return this.fileList.length ? (this.onBefore && this.onBefore() || !this.onBefore) : false;
    }
 }
}
</script>
<style>
.file-status .zoom-progress-container {
    height: 2px;
}
.upload-content .upload-file .file-status .zoom-progress span {
    font-size: 3px;
}
.upload-content .upload-file .file-status {
    position: relative;
    bottom: 0;
    right: 0;
    height: 2px;
}
.upload-content .upload-file .file-close {
    cursor: pointer;
    position: absolute;
    bottom: 5px;
    right: 5px;
}
.upload-content .upload-file .file-name {
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.upload-content .upload-file-list li.upload-file .upload-item img {
    width: 60px;
    height: 60px;
}
.upload-content .upload-file-list li.upload-file .upload-item {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    overflow: hidden;
    font-size: .875em;
    font-weight: 700;
}
.upload-content .upload-file-list li.upload-file {
    width: 100px;
    padding: 6px;
    margin: 0 8px 8px 0;
    float: left;
    position: relative;
    font-size: 12px;
    background: rgba(51, 51, 51, .06);
}
.upload-content .upload-file-list {
    font-size: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.zoom-file-upload .upload-footer .upload-btns>.btn {
    margin-left: 5px;
}
.zoom-file-upload .upload-footer .upload-btns {
    width: 100%;
    position: relative;
    text-align: center;
}
.zoom-file-upload .upload-footer {
    width: 100%;
    margin-top: 10px;
}
.zoom-file-upload .upload-content .upload-text>.zoom-icon {
    margin-top: 50px;
    font-size: 3.6em;
    color: #bfbfbf;
}
.zoom-file-upload .upload-content .upload-text {
    cursor: pointer;
    text-align: center;
    padding: 20px 0;
}
.zoom-file-upload .upload-content {
    position: relative;
    min-width: 200px;
    overflow: auto;
    max-height: 260px;
    border: 1px solid #d9d9d9;
}
.zoom-file-upload .upload-toolbar .upload-switch {
    float: right;
    line-height: 30px;
}
.zoom-file-upload .upload-toolbar {
    margin: 10px 0;
}
.zoom-file-upload .upload-header .upload-info .icon-info {
    color: #1890ff;
}
.zoom-file-upload .upload-header .alert-upload {
    text-align: left;
    padding-top: 0;
    padding-bottom: 0;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    color: #333;
    margin-bottom: 8px;
    padding: 0 8px;
    border-radius: 2px;
    position: relative;
}
.zoom-file-upload .upload-header {
    position: relative;
    line-height: 36px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
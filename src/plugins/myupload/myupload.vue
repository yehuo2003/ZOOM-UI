<template>
<div>
 <input style="display:none" @change="addFile" :multiple="multiple" type="file" :name="name" id="my-upload"/>
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
 fileList: {
  type: Array,
  default: []
 },
 data: Object,
 multiple: Boolean,
 limit: Number,
 onChange: Function,
 onBefore: Function,
 onProgress: Function,
 onSuccess: Function,
 onFailed: Function,
 onFinished: Function
 },
 methods: {
    //  methods内一共4个方法，添加文件、移除文件、提交、检测（上传之前的检验）
    //  添加文件
    addFile({target: {files}}){//input标签触发onchange事件时，将文件加入待上传列表
        for(let i = 0, l = files.length; i < l; i++){
        files[i].url = URL.createObjectURL(files[i]);//创建blob地址，不然图片怎么展示？
        files[i].status = 'ready';//开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
        }
        let fileList = [...this.fileList];
        if(this.multiple){//多选时，文件全部压如列表末尾
        fileList = [...fileList, ...files];
        let l = fileList.length;
        let limit = this.limit;
        if(limit && typeof limit === "number" && Math.ceil(limit) > 0 && l > limit){//有数目限制时，取后面limit个文件
        limit = Math.ceil(limit);
        //  limit = limit > 10 ? 10 : limit;
        fileList = fileList.slice(l - limit);
        }
        }else{//单选时，只取最后一个文件。注意这里没写成fileList = files;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
        fileList = [files[0]];
        }
        this.onChange(fileList);//调用父组件方法，将列表缓存到上一级data中的fileList属性
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
        let options = this.fileList.map((rawFile, index) => ({
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
        let l = this.fileList.length;
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
    },
 }
}
</script>
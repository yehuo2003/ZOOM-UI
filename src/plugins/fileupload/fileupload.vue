<template>
  <div class="zoom-file-upload">
    <div v-if="custom" class="upload-custom">
      <div @click="addFileClick" class="custom-header">
        <slot></slot>
      </div>
      <div class="custom-content">
        <ul v-show="List.length > 0" class="upload-list">
          <li
            v-for="(item, index) of List"
            :key="index"
            :class="setStatus(item.status)"
            class="upload-list-item"
          >
            <a class="item-name">
              <i
                :class="item.type && item.type.indexOf('image') > -1 ? 'icon-img' : 'icon-channel' "
                class="zoom-icon"
              ></i>
              <span>{{item.name}}</span>
              <i @click="removeConfirmation(index)" class="zoom-icon icon-close-plus"></i>
            </a>
            <zoom-progress :status="item.status" :progress="testprogress[index].progress"></zoom-progress>
            <span
              v-show=" item.status === 'success' || item.status === 'error' "
              :class=" item.status === 'success' ? 'icon-success-fill' : 'icon-close-fill' "
              class="zoom-icon"
            ></span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="upload-header">
        <div class="upload-title">选择文件</div>
        <div class="alert-upload upload-info">
          <i class="zoom-icon close-alert icon-hint"></i>
          <span v-if="limit">最多上传{{limit}}个文件!</span>
          <span v-if="size">每个文件最大{{size}}</span>
        </div>
        <div v-show="successCount" class="alert-upload upload-success">
          <i class="zoom-icon close-alert icon-success"></i>
          上传成功{{successCount}}个文件
        </div>
        <div v-show="errCount" class="alert-upload upload-error">
          <i class="zoom-icon close-alert icon-close"></i>
          上传失败{{errCount}}个文件!
        </div>
      </div>
      <div class="upload-toolbar zoom-clear">
        <zoom-button ref="addUpload" @click="addFileClick">添加文件</zoom-button>
        <div class="upload-switch">
          <zoom-radio v-model="active" :op="radioOp"></zoom-radio>
        </div>
      </div>
      <div class="upload-content" ref="select_frame" ondragstart="return false">
        <div v-show="List.length === 0" class="upload-text">
          <i class="zoom-icon icon-edit"></i>
          <div>拖拽文件至此处</div>
        </div>
        <ul v-show="List.length > 0 && active === 'imgModel' " class="upload-file-list">
          <li v-for="(item, index) of List" :key="index" class="upload-file">
            <div class="upload-item">
              <img
                v-if="item.type && item.type.indexOf('image') > -1"
                :src="item.url"
                :alt="item.name"
              />
              <span v-else class="zoom-icon icon-channel"></span>
            </div>
            <div class="file-name" title>
              <span class="file-name-wrapper">{{item.name}}</span>
            </div>
            <div class="file-close">
              <a @click="removeConfirmation(index)" class="zoom-icon icon-delete"></a>
            </div>
            <div class="file-size">{{item.fileSize}}</div>
            <!-- 上传成功后显示 -->
            <div
              v-show="item.status === 'success' || item.status === 'error' "
              class="file-response"
            >
              <i
                :class="item.status === 'success' ? 'icon-success-fill' : 'icon-close-fill' "
                class="zoom-icon"
              ></i>
            </div>
            <div v-if="!closeProgress" class="file-status">
              <zoom-progress :status="item.status" :progress="testprogress[index].progress"></zoom-progress>
            </div>
          </li>
        </ul>

        <div v-show="List.length > 0 && active === 'listModel' " class="zoom-grid">
          <div class="zoom-grid-body">
            <!-- 表头 -->
            <div class="grid-head">
              <div class="grid-headbox">
                <table class="grid-table grid-thead">
                  <thead class="grid-head-content">
                    <tr>
                      <th
                        v-show="closeProgress && item.id !== 5 || !closeProgress"
                        v-for="item of title"
                        :key="item.id"
                        class="grid-item"
                        :style="'width: ' + item.width + '%;' "
                      >
                        <span class="thead-title">{{item.text}}</span>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <!-- 内容 -->
            <div class="grid-body">
              <div class="grid-bodybox">
                <table class="grid-table grid-tbody">
                  <tbody class="grid-body-content">
                    <tr v-for="(item, index) of List" :key="index" class="grid-row">
                      <td class="grid-item" style="width: 30%;">
                        <span class="grid-input">{{index + 1}}</span>
                      </td>
                      <td class="grid-item" style="width: 30%;">
                        <span class="grid-input">
                          <span>
                            <a title="删除文件" class="zoom-icon">
                              <span
                                @click="removeConfirmation(index)"
                                class="zoom-icon icon-delete"
                              ></span>
                            </a>
                          </span>
                        </span>
                      </td>
                      <td :zoom-tip="item.fileName" class="grid-item zoom-tip" style="width: 100%;">
                        <span class="grid-input">{{item.fileName}}</span>
                      </td>
                      <td class="grid-item" style="width: 50%;">
                        <span class="grid-input">{{formatStatus(item.status)}}</span>
                      </td>
                      <td v-if="!closeProgress" class="grid-item" style="width: 50%;">
                        <span class="grid-input">
                          <!-- 上传进度 -->
                          <zoom-progress
                            :status="item.status"
                            :progress="testprogress[index].progress"
                          ></zoom-progress>
                        </span>
                      </td>
                      <td class="grid-item" style="width: 40%;">
                        <span class="grid-input">{{item.fileSize}}</span>
                      </td>
                      <td class="grid-item" style="width: 60%;">
                        <span class="grid-input">{{item.fileDate}}</span>
                      </td>
                      <td :zoom-tip="item.type" class="grid-item zoom-tip" style="width: 120%;">
                        <span class="grid-input">{{item.type}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="upload-footer">
        <div class="upload-btns">
          <zoom-button :disabled="true" ref="startUpload" type="primary" @click="submit">开始上传</zoom-button>
          <!-- <zoom-button>停止上传</zoom-button>
          <zoom-button>关闭</zoom-button>-->
        </div>
      </div>
    </div>
    <input
      style="display:none"
      @change="addFile"
      :multiple="multiple"
      type="file"
      :name="name"
      ref="zoom-upload"
    />
  </div>
</template>
<script>
export default {
  name: "zoom-file-upload",
  props: {
    op: {
      type: Object,
      custom: Boolean, // 为true则开启自定义模式 自定义模式下点击后自动选择文件并上传
      url: {
        // 要上传的服务器地址
        type: String,
        required: true
      },
      fileType: String, //  文件类型, 如  image png
      fileSize: String, //  文件大小 如 10M 10KB 10kb
      fileList: {
        //  上传文件列表，无论单选还是支持多选，文件都以列表格式保存
        type: Array,
        default: function() {
          return [];
        }
      },
      closeProgress: Boolean, //  是否关闭进度条, 默认false 默认提交方法方法xhrSubmit, 如果设置tru将使用fetchSubmit
      params: Object, //  上传时可追加的携带参数列表 比如token    param: {param1: '', param2: '' },
      multiple: Boolean, //  是否多选
      limit: Number, //  文件数量
      onChange: Function, //监听文件变化，增减文件时都会被子组件调用
      onProgress: Function, //上传进度，上传时会不断被触发，需要进度指示时会很有用  uploadProgress(index, progress)
      onSuccess: Function, //某个文件上传成功都会执行该方法，index代表列表中第index个文件  uploadSuccess(index, response)
      onFailed: Function, //某文件上传失败会执行，index代表列表中第index个文件    uploadFailed(index, err)
      onBefore: Function, // 如果父组件定义了onBefore方法且返回了false，或者文件列表为空，请求就不会发送
      onFinished: Function //所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }   onFinished(result)
    },
    name: String
  },
  data() {
    return {
      limit: 0, //  文件数量
      custom: false, //  自定义模式
      data: {}, //  上传时携带的参数
      fileType: "", //  文件类型
      action: "", //  要上传的服务器地址
      closeProgress: false, //  为true关闭进度条
      multiple: false, //  是否多选
      title: [
        { id: 1, text: "编号", width: 30 },
        { id: 2, text: "操作", width: 30 },
        { id: 3, text: "文件名", width: 100 },
        { id: 4, text: "状态", width: 50 },
        { id: 5, text: "上传进度", width: 50 },
        { id: 6, text: "文件大小", width: 40 },
        { id: 7, text: "修改日期", width: 60 },
        { id: 8, text: "文件件类型", width: 120 }
      ],
      testList: [],
      radioOp: {
        name: "list",
        isdisabled: false,
        data: [
          { text: "列表模式", value: "listModel", checked: true },
          { text: "缩略图模式", value: "imgModel" }
        ]
      },
      testprogress: [],
      active: "", // 单选框
      successCount: 0, //上传成功的文件数量
      errCount: 0, //上传失败的文件数量
      size: "10GB",
      filelist: [],
      List: []
    };
  },
  watch: {
    List(newVal, oldVal) {
      this.successCount = 0;
      this.errCount = 0;
      if (this.op && this.op.onChange) {
        this.op.onChange(newVal);
      }
      //  如果没有要上传的文件, 禁用 开始上传 按钮
      if (!this.custom) {
        if (newVal.length > 0) {
          this.$refs["startUpload"].isdisabled = false;
        } else {
          this.$refs["startUpload"].isdisabled = true;
        }
        // 如果文件数量大于等于limit, 禁用 添加文件 按钮0
        if (newVal.length >= this.limit) {
          this.List.length = this.limit;
          this.$refs["addUpload"].isdisabled = true;
        } else {
          this.$refs["addUpload"].isdisabled = false;
        }
      }
    }
  },
  created() {
    if (this.op) {
      if (this.op.url) {
        this.action = this.op.url;
      }
      if (this.op.fileSize) {
        this.size = this.op.fileSize;
      }
      if (this.op.params) {
        this.data = this.op.params;
      }
      if (this.op.multiple) {
        this.multiple = this.op.multiple;
      }
      if (this.op.limit) {
        this.limit = this.op.limit;
      }
      if (this.op.closeProgress) {
        this.closeProgress = this.op.closeProgress;
      }
      if (this.op.fileType) {
        this.fileType = this.op.fileType;
      }
      if (this.op.custom) {
        this.custom = this.op.custom;
      }
    }
  },
  mounted() {
    if (!this.custom) {
      this.successCount = 0;
      this.errCount = 0;
      let select_frame = this.$refs["select_frame"];
      select_frame.ondragleave = e => {
        e.preventDefault(); // 阻止离开时的浏览器默认行为
      };
      select_frame.ondrop = e => {
        e.preventDefault(); // 阻止拖放后的浏览器默认行为
        const data = e.dataTransfer.files[0]; // 获取文件对象
        if (data.length < 1) {
          return; // 检测是否有文件拖拽到页面
        }
        this.addFile({ target: { files: [data] } }); //上传文件的方法
      };
      select_frame.ondragenter = e => {
        e.preventDefault(); // 阻止拖入时的浏览器默认行为
        select_frame.border = "2px dashed red";
      };
      select_frame.ondragover = e => {
        e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
      };
    }
  },
  methods: {
    //  自定义模式下的格式化状态
    setStatus(status) {
      switch (status) {
        case "success":
          return "upload-success";
        case "error":
          return "upload-failed";
        default:
          return "";
      }
    },
    //  格式化状态
    formatStatus(val) {
      switch (val) {
        case "success":
          return "成功";
        case "error":
          return "失败";
        case "start":
          return "上传中";
        default:
          return "等待上传";
      }
    },
    //  添加文件
    addFileClick() {
      this.$refs["zoom-upload"].click();
    },
    //  文件大小验证
    testSize(file) {
      if (!this.size) {
        return true;
      }
      if (this.fileType) {
        if (file.type.indexOf(this.fileType) === -1) {
          this.$zoom.alert({
            title: "提示",
            content: `${file.name}的文件类型${file.type}错误, 请传入${this.fileType}类型文件`,
            type: "warning"
          });
          return false;
        }
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
      if (test("G")) {
        size = test("G") * 1024 * 1024;
      } else if (test("g")) {
        size = test("g") * 1024 * 1024;
      } else if (test("M")) {
        size = test("M") * 1024;
      } else if (test("m")) {
        size = test("m") * 1024;
      } else if (test("k")) {
        size = test("k");
      } else if (test("K")) {
        size = test("K");
      } else {
        size = Number(this.size);
      }
      if (isNaN(size)) {
        throw new Error(
          "zoom-ui TypeError: size类型错误, 必须为数字, 或以KB, MB, GB等形式结尾字符串"
        );
      } else {
        if (file && size) {
          let fileSize = file.size;
          if (fileSize > size * 1024) {
            this.$zoom.alert({
              title: "提示",
              content: `文件大小不能大于${this.size}!`,
              type: "warning"
            });
            return false;
          } else if (fileSize <= 0) {
            this.$zoom.alert({
              title: "提示",
              content: "文件大小不能为0! ",
              type: "warning"
            });
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
        this.size = size;
      }
    },
    //  methods内一共4个方法，添加文件、移除文件、提交、检测（上传之前的检验）
    //  添加文件
    addFile({ target: { files } }) {
      //input标签触发onchange事件时，将文件加入待上传列表
      for (let i = 0, l = files.length; i < l; i++) {
        if (this.testSize(files[i])) {
          // 计算文件大小并转换
          let fileSize = 0;
          let size = files[i].size;
          if (Math.floor(size / 1024) < 1024) {
            fileSize = Math.floor(size / 1024) + "KB";
          } else if (Math.floor(size / 1024 / 1024) < 1024) {
            fileSize = Math.floor(size / 1024 / 1024) + "MB";
          } else if (Math.floor(size / 1024 / 1024 / 1024) < 1024) {
            fileSize = Math.floor(size / 1024 / 1024 / 1024) + "GB";
          } else {
            fileSize = size + "B";
          }
          files[i].fileName = files[i].name; // 文件名
          files[i].url = URL.createObjectURL(files[i]); //创建blob地址，不然图片怎么展示？
          files[i].status = "ready"; //开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
          files[i].id =
            (Math.random() * 10000000).toString(16).substr(0, 4) +
            "-" +
            new Date().getTime() +
            "-" +
            Math.random()
              .toString()
              .substr(2, 5); // 随机id
          files[i].fileSize = fileSize; //  给用户展示的文件大小
          files[i].fileDate = this.$zoom.dateFormat(
            "YYYY-mm-dd HH:MM",
            files[i].lastModifiedDate
          ); // 格式化日期 展示给用户看
          let obj = {
            //  文件对象比较特殊 直接添加progress不生效 只能用一个其他数组代替,删除时候也删除相应下标的数据
            progress: 0
          };
          this.testprogress.push(obj);
        } else {
          return;
        }
      }
      // let fileList = [...this.filelist];
      let fileList = [];
      if (this.multiple && files.length > 1) {
        //多选时，文件全部压如列表末尾
        fileList = [...fileList, ...files];
        let len = fileList.length;
        let limit = this.limit;
        if (
          limit &&
          typeof limit === "number" &&
          Math.ceil(limit) > 0 &&
          len > limit
        ) {
          //有数目限制时，取后面limit个文件
          limit = Math.ceil(limit);
          //  limit = limit > 10 ? 10 : limit;
          fileList = fileList.slice(len - limit);
        }
      } else {
        //单选时，只取最后一个文件。注意这里没写成fileList = files;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
        fileList = files;
      }
      let List = [];
      this.filelist.push(fileList);
      // 如果状态是delete的不加进来
      this.filelist.forEach(item => {
        if (item.length === 1 && item[0].status !== "delete") {
          List.push(item[0]);
        } else if (item.length > 1) {
          item.forEach(i => {
            if (i.status !== "delete") {
              List.push(i);
            }
          });
        }
      });
      this.List = Array.from(new Set(List));
      // this.onChange(this.List);//调用父组件方法，将列表缓存到上一级data中的fileList属性
      if (this.custom) {
        // 如果是自定义上传方法 直接调用
        this.submit();
      }
    },
    // 移除文件 中转方法
    removeConfirmation(index) {
      this.$zoom.popup({
        content: "确认要删除该文件吗?",
        status: "primary",
        onClick: () => {
          this.remove(index);
        }
      });
    },
    // 移除文件 这个简单,有时候在父组件叉掉某文件的时候，传一个index即可。
    remove(index) {
      // let fileList = [...this.fileList];
      let fileList = [...this.List];
      if (fileList[index]) {
        let fileId = fileList[index].id;
        let files = this.$refs["zoom-upload"].files;
        let len = files.length;
        this.testprogress.splice(index, 1);
        // 把已经删除的文件状态标记为delete 因为文件对象无法直接删除
        if (fileList.length) {
          for (var i = 0; i < len; i++) {
            if (files[i].fileId === fileId) {
              // 标记当前文件状态
              this.$refs["zoom-upload"].files[i].status = "delete";
              break;
            }
          }
          fileList.splice(index, 1);
          // 把已经删除的文件状态标记为delete
          this.filelist.forEach(item => {
            if (item.length === 1) {
              item.status = "delete";
            } else {
              item.forEach(i => {
                if (fileId === i.id) {
                  i.status = "delete";
                }
              });
            }
          });
          this.List = fileList;
        }
      }
    },
    // 提交上传 这里使用了两种方式，fetch和原生方式，由于fetch不支持获取上传的进度，如果不需要进度条或者自己模拟进度或者XMLHttpRequest对象不存在的时候，使用fetch请求上传逻辑会更简单一些
    submit() {
      this.successCount = 0;
      this.errCount = 0;
      if (this.checkIfCanUpload()) {
        if (!this.closeProgress && typeof XMLHttpRequest !== "undefined")
          this.xhrSubmit();
        else this.fetchSubmit();
      } else {
        this.$zoom.alert({
          title: "提示",
          content: "请检查要上传文件",
          type: "warning"
        });
      }
      if (!this.custom) {
        setTimeout(() => {
          this.$refs["startUpload"].isdisabled = true;
        });
      }
    },
    // 4.基于上传的两套逻辑，这里封装了两个方法xhrSubmit和fetchSubmit
    fetchSubmit() {
      this.successCount = 0;
      this.errCount = 0;
      let keys = Object.keys(this.data),
        values = Object.values(this.data),
        action = this.action;
      const promises = this.List.map(each => {
        each.status = "start";
        let data = new FormData();
        data.append(this.name || "file", each);
        keys.forEach((one, index) => data.append(one, values[index]));
        return fetch(action, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: data
        })
          .then(res => {
            //这里res.text()是根据返回值类型使用的，应该视情况而定
            res.text();
            if (res.status === 200) {
              each.status = "success";
            } else {
              each.status = "error";
            }
          })
          .catch(err => {
            console.error("zoom-ui Error: ", err);
          });
      });
      Promise.all(promises)
        .then(resArray => {
          //多线程同时开始，如果并发数有限制，可以使用同步的方式一个一个传，这里不再赘述。
          let success = 0,
            failed = 0;
          resArray.forEach((res, index) => {
            if (res.code === 1) {
              success++; //统计上传成功的个数，由索引可以知道哪些成功了
              this.List[index].status = "success";
              if (this.op && this.op.onSuccess) {
                this.op.onSuccess(index, res);
              }
            } else {
              failed++; //统计上传失败的个数，由索引可以知道哪些失败了
              this.List[index].status = "error";
              if (this.op && this.op.onFailed) {
                this.op.onFailed(index, res);
              }
            }
            this.successCount = success;
            this.errCount = failed;
          });
          return { success, failed }; //上传结束，将结果传递到下文
        })
        .then(res => {
          if (this.op && this.op.onFinished) {
            this.op.onFinished(res);
          }
        }); //把上传总结果返回
    },
    xhrSubmit() {
      const _this = this;
      let options = this.List.map((rawFile, index) => ({
        file: rawFile,
        data: _this.data,
        filename: _this.name || "file",
        action: _this.action,
        onProgress(e) {
          _this.$set(_this.testprogress[index], "progress", e.percent);
          if (_this.op && _this.op.onProgress) {
            _this.op.onProgress(index, e); //闭包，将index存住
          }
        },
        onSuccess(res) {
          _this.successCount += 1;
          rawFile.status = "success";
          if (_this.op && _this.op.onSuccess) {
            _this.op.onSuccess(index, res);
          }
          // 成功后删除
          // _this.remove(index);
        },
        onError(err) {
          _this.errCount += 1;
          rawFile.status = "error";
          if (_this.op && _this.op.onFailed) {
            _this.op.onFailed(index, err);
          }
        }
      }));
      let len = this.List.length;
      let send = options => {
        for (let i = 0; i < len; i++) {
          if (options[i].file.status === "ready") {
            options[i].file.status = "start";
            _this.sendRequest(options[i]); //这里用了个异步方法，按次序执行this.sendRequest方法，参数为文件列表包装的每个对象，this.sendRequest下面紧接着介绍
          }
        }
      };
      send(options);
      this.List = [];
      options.forEach(item => {
        this.List.push(item.file);
      });
    },
    // 这里借鉴了element-ui的上传源码
    sendRequest(option) {
      const _this = this;
      upload(option);

      function getError(action, option, xhr) {
        var msg = void 0;
        if (xhr.response) {
          msg = xhr.status + " " + (xhr.response.error || xhr.response);
        } else if (xhr.responseText) {
          msg = xhr.status + " " + xhr.responseText;
        } else {
          msg = "fail to post " + action + " " + xhr.status;
        }
        var err = new Error(msg);
        err.status = xhr.status;
        err.method = "post";
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
        if (typeof XMLHttpRequest === "undefined") {
          return;
        }

        var xhr = new XMLHttpRequest();
        var action = option.action;

        if (xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = (e.loaded / e.total) * 100;
            }
            option.onProgress(e);
          };
        }
        var formData = new FormData();

        if (option.data) {
          Object.keys(option.data).map(function(key) {
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

        xhr.open("post", action, true);

        if (option.withCredentials && "withCredentials" in xhr) {
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
    checkIfCanUpload() {
      return this.List.length
        ? (this.op && this.op.onBefore && this.op.onBefore(this.List)) ||
            !this.op.onBefore
        : false;
    }
  }
};
</script>
<style>
/* 自定义上传模式 */
.zoom-file-upload .upload-custom .zoom-progress .zoom-progress-container {
  margin-left: 0;
  height: 2px;
}
.zoom-file-upload .upload-custom .upload-list .upload-list-item > .zoom-icon {
  line-height: inherit;
  position: absolute;
  display: block;
  right: 5px;
  top: 0;
}
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-list-item
  .item-name
  > .zoom-icon {
  height: 100%;
  font-size: 16px;
  margin-right: 4px;
  color: #909399;
  fill: #909399;
}
.zoom-file-upload .upload-custom .upload-list .upload-list-item:active,
.zoom-file-upload .upload-custom .upload-list .upload-list-item:focus {
  outline-width: 0;
}
.zoom-file-upload .upload-custom .upload-list .upload-list-item:hover {
  background-color: #f5f7fa;
}
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-list-item:focus
  .item-name
  > span,
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-list-item:hover
  .item-name
  > span {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
.zoom-file-upload .upload-custom .upload-list .upload-failed .icon-close-fill,
.zoom-file-upload .upload-custom .upload-list .upload-failed .item-name span {
  color: #f56c6c;
}
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-success
  .icon-success-fill,
.zoom-file-upload .upload-custom .upload-list .upload-success .item-name span {
  color: #3eaf7c;
}
.zoom-file-upload .upload-custom .custom-header,
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-list-item:hover
  .item-name
  .icon-close-plus {
  display: inline-block;
}
.zoom-file-upload
  .upload-custom
  .upload-list
  .upload-list-item
  .item-name
  .icon-close-plus {
  display: none;
}
.zoom-file-upload .upload-custom .upload-list .upload-list-item .item-name {
  display: block;
  margin-right: 40px;
  padding-left: 4px;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}
.zoom-file-upload .upload-custom .upload-list .upload-list-item {
  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  margin-top: 8px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
  width: 100%;
  outline: 0;
}
.zoom-file-upload .upload-custom .upload-list {
  font-size: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.zoom-file-upload .upload-custom .upload-content {
  text-align: left;
}
.zoom-file-upload .upload-custom {
  display: inline-block;
  text-align: left;
  cursor: pointer;
  width: 100%;
  outline: 0;
}
/* 普通上传模式 */
.zoom-file-upload .upload-content th.grid-item:first-child {
  text-align: center;
}
.zoom-file-upload .upload-content .grid-input .zoom-progress {
  line-height: 0;
}
.zoom-file-upload .upload-content .file-response .zoom-icon {
  font-size: 50px;
  position: relative;
  top: 10px;
  z-index: 3;
}
.zoom-file-upload .upload-content .file-response .icon-close-fill {
  color: #f5222d;
}
.zoom-file-upload .upload-content .file-response .icon-success-fill {
  color: #52c41a;
}
.zoom-file-upload .upload-content .file-response::after {
  content: "";
  width: 100%;
  height: 75%;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(23px);
  background: #fff;
  opacity: 0.8;
  z-index: 2;
}
.zoom-file-upload .upload-content .file-response {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
}
.zoom-file-upload .upload-content .file-status .zoom-progress-container {
  height: 2px;
}
.upload-content .upload-file .file-status .zoom-progress span {
  font-size: 3px;
}
.upload-content .upload-file .file-status {
  position: relative;
  bottom: 0;
  right: 0;
  /* height: 2px; */
  max-height: 30px;
}
.upload-content .upload-file .file-close {
  z-index: 11;
  cursor: pointer;
  position: absolute;
  bottom: 2px;
  right: 5px;
}
.upload-content .upload-file .file-name {
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upload-content .upload-file-list li.upload-file .upload-item .icon-channel {
  font-size: 50px;
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
  font-size: 0.875em;
  font-weight: 700;
}
.upload-content .upload-file-list li.upload-file {
  width: 100px;
  padding: 6px;
  margin: 0 8px 8px 0;
  float: left;
  position: relative;
  font-size: 12px;
  background: rgba(51, 51, 51, 0.06);
}
.upload-content .upload-file-list {
  font-size: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.zoom-file-upload .upload-footer .upload-btns > .btn {
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
.zoom-file-upload .upload-content .upload-text > .zoom-icon {
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
.zoom-file-upload .upload-toolbar .zoom-btn {
  float: left;
}
.zoom-file-upload .upload-toolbar .upload-switch {
  float: right;
  line-height: 30px;
}
.zoom-file-upload .upload-toolbar {
  margin: 10px 0;
}
/* 上传成功 */
.zoom-file-upload .upload-header .upload-success .icon-success {
  color: #52c41a;
}
.zoom-file-upload .upload-header .alert-upload.upload-success {
  background: #f6ffed;
  border: 1px solid #95de64;
}

/* 上传失败 */
.zoom-file-upload .upload-header .upload-error .icon-close {
  color: #f5222d;
}
.zoom-file-upload .upload-header .alert-upload.upload-error {
  background: #fff1f0;
  border: 1px solid #ff7875;
}
/* 上传提示 */
.zoom-file-upload .upload-header .upload-info .icon-hint {
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
  text-align: left;
  position: relative;
  line-height: 36px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
<template>
  <div class="zoom-upload">
    <zoom-button v-if="!link" :op="btnOp" ref="uploadButton" v-show="!coverPicture">{{text}}</zoom-button>
    <div v-else class="custom" v-html="link" @click="imgClick"></div>
    <div v-if="coverPicture" @click="deleteFile" title="删除" class="del" v-html="del"></div>
    <ul class="coverPicture">
      <li v-if="coverPicture">
        <a href="javascript:void(0);">
          <img :src="coverPicture" :alt="fileName" :title="fileName" />
        </a>
      </li>
    </ul>
    <input
      type="file"
      id="zoom-upload-file"
      v-show="false"
      class="getImgUrl_file"
      @change="uploadImg($event)"
      accept="image/*"
    />
  </div>
</template>
<script>
export default {
  name: "zoom-img-upload",
  props: {
    op: Object
  },
  data() {
      return {
          size: 50,     //规定大小
          del: '<button class="zoom-btn">删除</button>',
          link: '',
          text: '开始上传',
          coverPicture: '',     //保存图片信息
          fileName: '',
          showFile: false,
          btnOp: {
              isdisabled: false,
              onClick: this.imgClick
          }
      }
  },
  created() {
      this.loadData();
  },
  methods: {
    // 加载组件
    loadData() {
        if (this.op) {
          if (this.op.isdisabled) this.btnOp.isdisabled = this.op.isdisabled;
          if (this.op.type) this.btnOp.type = this.op.type;
          if (this.op.content) this.text = this.op.content;
          if (this.op.custom) this.link = this.op.custom;
          if (this.op.customdel) this.del = this.op.customdel;
          if (this.op.size) {
              let size = 50;
              if (this.op.size.indexOf('M') > -1) {
                  size = this.op.size.split('M')[0] * 1024
              } else if (this.op.size.indexOf('K') > -1) {
                  size = this.op.size.split('K')[0]
              } else {
                  size = this.op.size
              }
              size = Number(size)
              if (isNaN(size)) {
                  throw Error('zoom-ui error: size必须为数字,或者以KB, MB结尾');
                  return
              } else {
                  this.size = size;
              }
          }
        }
    },
    //   上传图片点击事件
    imgClick() {
        this.$zoom.$id('zoom-upload-file').click();
    },
    // 上传失败
    defeated(msg) {
        this.deleteFile();
        if (msg) {
            this.$zoom.alert({
                content: msg,
                type: 'danger'
            })
            throw Error('zoom-ui error:',msg);
        }
        if (this.op && this.op.defeatedEvent) {
            if (typeof this.op.defeatedEvent === 'function') {
                this.op.defeatedEvent();
            } else {
                throw Error('zoom-ui error: defeatedEvent必须是一个方法!');
                return
            }
        }
    },
    // 将上传图片转换成base64位编码
    uploadImg(e) {
        if (this.op && this.op.beforeEvent) {
            if (typeof this.op.beforeEvent === 'function') {
                this.op.beforeEvent();
            } else {
                throw Error('zoom-ui error: beforeEvent必须是一个方法!');
                return
            }
        }
        let files = this.$zoom.$id('zoom-upload-file').files[0];
        let name = files.name;
        let arr = name.split('.');
        let fileSize = 0;
        // let fileMaxSize = 10240;    //1M
        if (files) {
            fileSize = files.size;
            if (files.type.indexOf('image') == -1) {
                this.defeated('请选择图片文件!');
                return false;
            }
            if (fileSize > this.size * 1024) {
                this.defeated(`文件大小不能大于${this.size}KB!`);
                return false;
            } else if (fileSize <= 0) {
                this.defeated('文件大小不能为0KB!');
                return false;
            } else {
                this.fileName = name;
                this.showFile = true;
            }
        } else {
            this.defeated();
            return false;
        }

        // 转码base64
        let reader = new FileReader();
        let data = {};
        let imgFile
        reader.readAsDataURL(files)
        reader.onload = e => {
            imgFile = e.target.result;
            this.coverPicture = imgFile;
            data.base64 = this.coverPicture
        }
        data.fileName = this.fileName;
        data.fileSize = (fileSize / 1024).toFixed(2) + 'KB';
        this.$emit('imgData', data);

        if (this.op && this.op.afterEvent) {
            if (typeof this.op.afterEvent === 'function') {
                this.op.afterEvent();
            } else {
                throw Error('zoom-ui error: afterEvent必须是一个方法!');
                return
            }
        }
    },
    // 删除图片
    deleteFile() {
        this.$zoom.$id('zoom-upload-file').value = '';
        this.coverPicture = this.fileName = ''
        this.showFile = false;
        if (this.op && this.op.deleteEvent) {
            if (typeof this.op.deleteEvent === 'function') {
                this.op.deleteEvent();
            } else {
                throw Error('zoom-ui error: deleteEvent必须是一个方法!');
                return
            }
        }
    }
  }
};
</script>
<style>
.custom {
    cursor: pointer;
}
.coverPicture {
    margin: 20px;
}
</style>
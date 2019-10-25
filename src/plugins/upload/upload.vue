<template>
  <div class="zoom-upload">
    <zoom-button v-if="!link" :op="btnOp" ref="uploadButton" v-show="!coverPicture">{{text}}</zoom-button>
    <div v-else class="custom" v-html="link" @click="imgClick">
    </div>
    <ul v-if="coverPicture" class="coverPicture">
      <li>
        <a href="javascript:void(0);">
          <img :src="coverPicture" :alt="fileName" :title="fileName" />
        </a>
        <a href="javascript:void(0);" @click="deleteFile" title="删除" class="del" v-html="del">
          <!-- <span class="hae-icon icon-del">删除</span> -->
        </a>
      </li>
    </ul>
    <zoom-msg ref="msg"></zoom-msg>
    <input
      type="file"
      id="zoom-upload-file"
      v-show="false"
      class="getImgUrl_file"
      @change="uploadImg($event)"
      accept="image/jpg, imgage/jpeg, image/png"
    />
  </div>
</template>
<script>
export default {
  name: "zoom-upload",
  props: {
    op: Object
  },
  data() {
      return {
          size: 50,     //规定大小
          del: '<span class="hae-icon icon-del">删除</span>',
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
      this.btnOp.isdisabled = this.op.isdisabled;
      this.btnOp.hue = this.op.hue;
      this.text = this.op.content;
      this.link = this.op.custom;
      this.del = this.op.customdel;
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
  },
  methods: {
    //   上传图片点击事件
    imgClick() {
        this.$id('zoom-upload-file').click();
    },
    // 上传失败
    defeated(msg) {
        this.deleteFile();
        if (msg) {
            this.$refs['msg'].msgPlugin(msg);
            throw Error('zoom-ui error:',msg);
        }
        if (this.op.defeatedEvent) {
            this.op.defeatedEvent();
        }
    },
    // 将上传图片转换成base64位编码
    uploadImg(e) {
        if (this.op.beforeEvent) {
            this.op.beforeEvent();
        }
        let files = this.$id('zoom-upload-file').files[0];
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
    },
    // 删除图片
    deleteFile() {
        this.$id('zoom-upload-file').value = '';
        this.coverPicture = this.fileName = ''
        this.showFile = false;
        if (this.op.deleteEvent) {
            this.op.deleteEvent();
        }
    } 
  }
};
</script>
<style>
.custom {
    cursor: pointer;
}
</style>
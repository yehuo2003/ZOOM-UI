<template>
  <div class="about">
    <!-- <zoom-nav-menu :op="navOp"></zoom-nav-menu> -->
    <!--<zoom-tag ref="tag" :op="tagOp"></zoom-tag> -->
    <!-- <zoom-grid ref="grid" :op="gridOp"></zoom-grid> -->
    <!-- <zoom-testing ref="test" :op="testOp"></zoom-testing> -->
    <!-- <zoom-pubu></zoom-pubu>
    <zoom-button @click.native="handleClick">测试按钮</zoom-button> -->
    <!-- <zoom-alert ref="msg"></zoom-alert> -->
    <!-- <h1 id="title">晚上好</h1>
    <div class="p-con">
      <p>111</p>
      <p>222</p>
      <p>333</p>
      <p class="p4">444</p>
    </div> -->
    <!-- <zoom-tabs>
      <zoom-tab-item title="组件1" id="title-d1">
        组件1
      </zoom-tab-item>
      <zoom-tab-item title="组件2" id="title-d2">
        组件2
      </zoom-tab-item>
    </zoom-tabs> -->
    <!-- <zoom-tree-menu :op="navOp"></zoom-tree-menu> -->
    <!-- <zoom-transfer></zoom-transfer> -->
    <zoom-file-upload :op="uploadOp"></zoom-file-upload>
    <!-- <zoom-rate :op="rateOp" ref="rate"></zoom-rate>
    <zoom-floatbar ref="bar" :op="barOp">
      <h1>自定义</h1>
      浮动框
      好
    </zoom-floatbar>
    <zoom-userinfo :op="userOp" ref="user">
      <ul>
        <li @click="usetTest(1)">1号美女</li>
        <li @click="usetTest(2)">2号美女</li>
        <li @click="usetTest(3)">3号美女</li>
        <li @click="usetTest(2)">2号美女</li>
        <li @click="usetTest(1)">1号美女</li>
      </ul>
    </zoom-userinfo> -->
    <zoom-button @click="test">测试</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadOp: {
        limit: 5,
        fileSize: '50MB',
        multiple: true,
        closeProgress: false,
        url: 'http://127.0.0.1:8081/profile',
        fileList: [],//上传文件列表，无论单选还是支持多选，文件都以列表格式保存
        params: {param1: '自定义参数1', param2: '自定义参数2' },//携带参数列表
        onDelete: (file) => { // 删除文件事件
          console.log( file, '文件被删除了');
        },
        onChange: fileList => {//监听文件变化，增减文件时都会被子组件调用
          console.log('New文件变化了onChange', fileList);
        },
        onProgress: (index, e) => {//上传进度，上传时会不断被触发，需要进度指示时会很有用
          console.log(index, e, 'New上传进度被触发uploadProgress');
        },
        onSuccess: (index, response) => {// 某个文件上传成功都会执行该方法，index代表列表中第index个文件
          console.log(index, response, 'New文件上传成功uploadSuccess');
        },
        onFailed: (index, err) => {//某文件上传失败会执行，index代表列表中第index个文件
          console.log(index, err, 'New上传失败了uploadFailed');
        },
        onFinished: result => {//所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }
          console.log('New onFinished上传完毕,结果是:',result);
        },
        onBefore: file => {
          console.log('onBefore 触发', file);
          return true
        }
      },
      userOp: {
        title: '1号美女',
        img: 'http://img0.imgtn.bdimg.com/it/u=2964920801,3888518063&fm=26&gp=0.jpg'
      },
      barOp: {  //  浮动框
        data: [
          {text: '客服', icon: 'icon-service', onClick: val => {console.log(val);}},
          {text: '电话', icon: 'icon-phone', url: 'wwww.baidu.com', target: 'blank'},
          {text: '导航', icon: 'icon-nav'}
        ]
      },
      rateOp: {
        mode: 'xiao',
        disabled: false,
        data: ['很差', '差', '一般', '好', '很好'],
      },
      // url: 'https://www.lagou.com/nearBy/updateMyResume',

      tagOp: {
        addTag: true,
        title: '添加',
        addType: 'danger',
        data: [
          {title: 'javascript', type: 'success', active: true},
          {title: 'Python', type: 'warning'},
          {title: 'Java', type: 'danger'},
          {title: 'PHP', type: 'info'}
        ]
      },
      navOp: {
        accordion: false,
        data: [
          {title: '首页', url: ''},
          {title: '商品详情', url: '', children: [
            {title: '评论', children: [
              {title: '小明'},
              {title: '小红'},
              {title: '小兰'},
            ]},
            {title: '图片'},
            {title: '销量'},
          ]},
          {title: '详情商品', url: '', children: [
            {title: '购物车', children: [
              {title: '小明'},
              {title: '小红'},
              {title: '小兰'},
            ]},
            {title: '图片'},
            {title: '销量'},
          ]},
          {title: '最新商品', url: '#/shop'},
          {title: '火热潮款', url: '#/home', target: 'blank'},
          {title: '冬季爆款', url: ''},
        ]
      },
      testOp: {
        id: 'test666',
        pool: '的方式发生的范德萨发生的方法规范的格式共和国凤凰家园如一日同年级和成本',
        hideText: true
      },
      pageOp: {
        pageVal: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      },
      gridOp: {
        onClick: (dom, ele, col) => {
          console.log(dom, ele, col);
        },
        tip: true,
        hideIndex: false,
        title: [
          {
            fieId: 'indexId',
            header: '编号',
            width: 50,
            sort: true
          },
          {
            fieId: 'btns',
            header: '操作',
            btns: [
              {
                title: '关闭',
                css: {
                  icon: 'icon-close'
                },
                onClick: val => {
                  console.log('点击的当前行是:', val);
                }
              },
              {
                title: '减少',
                css: {
                  icon: 'icon-search'
                },
                onClick: val => {
                  console.log('点击的当前行是jian:', val);
                }
              }
            ],
            width: 30
          },
          {
            fieId: 'userName',
            header: '用户名',
            width: 120
          },
          {
            fieId: 'fullName',
            header: '中文名',
            sort: true,
            width: 80
          },
          {
            fieId: 'userEmail',
            header: '电子邮箱',
            tip: true,
            width: 80
          },
          {
            fieId: 'role',
            header: '权限',
            width: 60
          },
          {
            fieId: 'phone',
            header: '电话',
            width: 80
          },
          {
            fieId: 'addr',
            header: '联系地址',
            width: 200
          },
          {
            fieId: 'createDate',
            header: '创建时间',
            tip: true,
            width: 200
          },
        ],
        datas: [],
        beforeLoad: () => {
          this.handleClick();
        },
        pagerOp: {
          total: 100,
          curPage: 3,
          pageSize: 20
        }
      }
    }
  },
  mounted() {
    // $('p').addClass('blue');

    // $('.p4').setText('666666666666');
    // $('div').find('p').eq(1).setText(66666666666).addClass('blue');
    // let title = $Z('.p-con');
    // console.log(title,'sss');

  },
  methods: {
    usetTest(num) {
      let data = {
        title: '',
        img: ''
      }
      if (num === 1) {
        data = {
          title: '1号美女',
          img: 'http://img0.imgtn.bdimg.com/it/u=2964920801,3888518063&fm=26&gp=0.jpg'
        }
      } else if  (num === 2) {
        data = {
          title: '2号美女',
          img: 'http://img0.imgtn.bdimg.com/it/u=1764295227,2578268989&fm=26&gp=0.jpg'
        }
      } else {
        data = {
          title: '3号美女',
          img: 'http://img0.imgtn.bdimg.com/it/u=3293099503,606929711&fm=26&gp=0.jpg'
        }
      }
      this.$refs['user'].load(data);
    },
    test() {
      this.$zoom.alert({
        title: '标题自定义',
        content: '自定义内容',
        type: 'warning',
        time: 5000
      })
      // this.$zoom.popup({
      //   title: '我是标题',
      //   content: '我是内容',
      //   btnText: '我是按钮',
      //   onClick: () => {
      //     // 点击按钮事件
      //     console.log(666);
      //   }
      // })
      // let data = [
      //     // {text: '客服', icon: 'icon-service', onClick: val => {console.log(val);}},
      //     // {text: '电话', icon: 'icon-phone', url: 'wwww.baidu.com', target: 'blank'},
      //     {text: '导航', icon: 'icon-nav'}
      //   ]
      // this.$refs['bar'].load(data)
      // console.log(this.$refs['bar'].load(data), '--status');
    },
    handleClick() {
      // this.$zoom.alert('6666')
      //  let code = this.$refs['test'].testCode;
      //  console.log(code);
      // let data = [
      //       {userName: 'Tom', fullName: '汤姆', userEmail: 'Tom@qq.com', role: '游客', phone: '12345678901', addr: '联系地址', createDate: '2019-11-11'},
      //       {userName: 'Jerry', fullName: '杰瑞', userEmail: 'Jerry@qq.com', role: 'VIP1', phone: '138445156166', addr: '联系地址', createDate: '2019-11-12'},
      //       {userName: 'dingding', fullName: '钉钉', userEmail: 'dingding@qq.com', role: 'VIP2', phone: '15415163154', addr: '联系地址', createDate: '2019-11-13'},
      //       {userName: 'Lin', fullName: '林主明', userEmail: 'linzhuming@qq.com', role: 'BOSS', phone: '13666990716', addr: '联系地址', createDate: '2019-10-11'},
      //       {userName: 'yangmi', fullName: '杨幂', userEmail: 'yangmi@qq.com', role: 'VIP6', phone: '13906080567', addr: '联系地址', createDate: '2019-11-15'},
      //       {userName: 'renzhengfei', fullName: '阿飞', userEmail: 'renzhengfei@qq.com', role: 'BOSS', phone: '15115156748', addr: '联系地址', createDate: '2018-11-11'}
      //   ]
      //   this.$refs['grid'].load(data);
      // console.log(this.$refs['tag'].tagList, 'tagList');
    },
    upload(){//触发子组件的上传方法
      this.$refs.myUpload.submit();
    },
  }
}
</script>
<style>
.blue {
  color: blue;
}
</style>
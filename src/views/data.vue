<template>
  <div>
    <zoom-notice></zoom-notice>
    <zoom-grid ref="grid" :op="gridOp" @editChange="handlerEdit"></zoom-grid>
    <zoom-pager ref="page" :op="pageOp"></zoom-pager>
    <zoom-slider :min=0 :max=500 v-model="per"></zoom-slider>
    <!-- <zoom-slider :op="sliderOp" v-model="per"></zoom-slider> -->
    <zoom-logout :op="logOp"></zoom-logout>
    <zoom-button @click="test">进度条</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logOp: {
        text: '退出',
        point: '确定要退出吗?',
        onClick: () => {
          console.log(666);
        }
      },
      sliderOp: {
        min: 0,
        max: 50
      },
      per: 0,
      list: [
          {name: '大声道', age: 27, gender: '男', city: '深圳', phone: 13666990716},
          {name: '石佛寺', age: 130, gender: '男', city: '武当', phone: 13876935716},
          {name: '规范化的', age: 30, gender: '男', city: '丐帮', phone: 13356956816},
          {name: '和的规范化', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '兔兔呀', age: 25, gender: '女', city: '新疆', phone: 18766944416},
          {name: '大大', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '请问', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '和几个减肥', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '广东佛山个', age: 86, gender: '男', city: '魏国', phone: 13746995936},
          {name: '热天', age: 27, gender: '男', city: '德云社', phone: 13666990716},
          {name: '评级哦', age: 130, gender: '男', city: '海清', phone: 13876935716},
          {name: '徐晓晨', age: 30, gender: '女', city: '台湾', phone: 13356956816},
          {name: '上大学', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '电风扇', age: 25, gender: '男', city: '新疆', phone: 18766944416},
          {name: '拿灰姑娘', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '浩如烟海', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '个梵蒂冈', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '就欧冠', age: 27, gender: '男', city: '深圳', phone: 13666990716},
          {name: '佛挡杀佛', age: 130, gender: '男', city: '武当', phone: 13876935716},
          {name: '大顺德区', age: 30, gender: '男', city: '丐帮', phone: 13356956816},
          {name: '而无法', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '体育菊花哥', age: 25, gender: '女', city: '新疆', phone: 18766944416},
          {name: '破啤酒', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '范德萨发', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '多渠道', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '妖精的尾巴', age: 86, gender: '男', city: '魏国', phone: 13746995936},
          {name: '露西', age: 27, gender: '男', city: '德云社', phone: 13666990716},
          {name: '的方法但是', age: 130, gender: '男', city: '海清', phone: 13876935716},
          {name: '迁安镇', age: 30, gender: '女', city: '台湾', phone: 13356956816},
          {name: '大的范德萨', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '防守打法', age: 25, gender: '男', city: '新疆', phone: 18766944416},
          {name: '大是非法的', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '豹哥', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '豹姐', age: 86, gender: '男', city: '魏国', phone: 13746995936}
      ],
      curPage: 1,
      pageSize: 10,
      pageOp: {
        pageSizes: [5, 10, 20],	// 可选择每页展示数量
        mode: 'Number',	// 展示模式 mini为简单版, Number为完全版 默认Number
        pageVal: {
          total: 100,	// 总条数
          curPage: 1,	// 展示的当前页
          pageSize: 10	// 每页要展示多少条数据
        },
        pageSizeSkip: (val, pageVal) => {
          this.pageSize = val;
          this.loadData();
        },
        beforeSkip: (val, pageVal) => {
          console.log('要跳转到',val);	//跳转前事件
        },
        skip: (val, pageVal) => {
          // console.log('当前页是',val);	//点击跳转触发获取当前页
          this.next(val, pageVal);
        },
      },
      gridOp: {
        hideIndex: false,
        editMode: true,
        tip: true,
        title: [
          // {fieId: 'Index', header: '.No'},
          {
            fieId: "btns",
            header: this.$zoom.$t('public.operation'), //  操作
            btns: [
              {
                title: this.$zoom.$t('public.remove'), //  移除
                css: {
                  icon: "icon-close"
                }
              }
            ]
          },
          {fieId: 'age',tip: false, header: '年龄'},
          {fieId: 'name',tip: false, header: '姓名', editable: true},
          {fieId: 'gender', header: '性别'},
          {fieId: 'city',tip: true, header: '地址'},
          {fieId: 'phone',tip: true, header: '联系方式'}
        ],
        data: []
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    handlerEdit(oldVal, newVal) {
      console.log(oldVal, newVal, '父组件');
    },
    test() {
      console.log(this.per);
    },
    loadData() {
      let pages = {
        total: this.list.length,
        curPage: this.curPage,
        pageSize: this.pageSize
      }
      this.$refs['page'].load(pages);
      let arr = this.$zoom.clone(this.list);
      let list = arr.splice(this.curPage - 1, pages.pageSize);
      this.$refs['grid'].load(list);
    },
    next(val, pageVal) {
      let start = (val - 1) * pageVal.pageSize;
      let arr = this.$zoom.clone(this.list);
      let list = arr.splice(start, pageVal.pageSize);
      this.$refs['grid'].load(list);
    }
  }
};
</script>
<style>
</style>
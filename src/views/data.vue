<template>
  <div>
    <zoom-grid ref="grid" :op="gridOp"></zoom-grid>
    <zoom-pager ref="page" :op="pageOp"></zoom-pager>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
          {name: '林主明', age: 27, gender: '男', city: '深圳', phone: 13666990716},
          {name: '张三丰', age: 130, gender: '男', city: '武当', phone: 13876935716},
          {name: '乔峰', age: 30, gender: '男', city: '丐帮', phone: 13356956816},
          {name: '杨幂', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '迪丽热巴', age: 25, gender: '女', city: '新疆', phone: 18766944416},
          {name: '易烊千玺', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '陆逊', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '诸葛亮', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '司马懿', age: 86, gender: '男', city: '魏国', phone: 13746995936},
          {name: '郭德纲', age: 27, gender: '男', city: '德云社', phone: 13666990716},
          {name: '曹云金', age: 130, gender: '男', city: '海清', phone: 13876935716},
          {name: '蔡依林', age: 30, gender: '女', city: '台湾', phone: 13356956816},
          {name: '林诗音', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '楚留香', age: 25, gender: '男', city: '新疆', phone: 18766944416},
          {name: '陆小凤', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '叶问', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '李小龙', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '八神庵', age: 27, gender: '男', city: '深圳', phone: 13666990716},
          {name: '草薙京', age: 130, gender: '男', city: '武当', phone: 13876935716},
          {name: '不知火舞', age: 30, gender: '男', city: '丐帮', phone: 13356956816},
          {name: '纲手', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '漩涡鸣人', age: 25, gender: '女', city: '新疆', phone: 18766944416},
          {name: '六道佩恩', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '宇智波佐助', age: 86, gender: '男', city: '吴国', phone: 13886696796},
          {name: '火影', age: 53, gender: '男', city: '蜀国', phone: 15966590766},
          {name: '妖精的尾巴', age: 86, gender: '男', city: '魏国', phone: 13746995936},
          {name: '露西', age: 27, gender: '男', city: '德云社', phone: 13666990716},
          {name: '苍井空', age: 130, gender: '男', city: '海清', phone: 13876935716},
          {name: '波多野结衣', age: 30, gender: '女', city: '台湾', phone: 13356956816},
          {name: '三上悠亚', age: 28, gender: '女', city: '北京', phone: 13956998886},
          {name: '冲田杏梨', age: 25, gender: '男', city: '新疆', phone: 18766944416},
          {name: '周艺', age: 18, gender: '男', city: '千禧', phone: 15966350784},
          {name: '李平丹', age: 86, gender: '男', city: '吴国', phone: 13886696796},
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
        title: [
          {fieId: 'Index', header: '.No'},
          {fieId: 'name', header: '姓名'},
          {fieId: 'age', header: '年龄'},
          {fieId: 'gender', header: '性别'},
          {fieId: 'city', header: '地址'},
          {fieId: 'phone', header: '联系方式'}
        ],
        data: []
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
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
<template>
  <div>
    <zoom-transfer ref="transfer" :op="tranOp"></zoom-transfer>
      <!-- <zoom-date ref="date" :op="dateOp"></zoom-date> -->
      <zoom-button @click="test">测试</zoom-button>
  </div>
</template>
<script>
export default {
  data() {
      return {
        tranOp: {
          serach: 'province',
          title: [
            {fieId: 'name', header: '公司名称'},
            {fieId: 'area', header: '区域'},
            {fieId: 'province', header: '省份'},
            {fieId: 'city', header: '城市'}
          ],
          data: [
            {name: '腾讯公司', area: '华南区', province: '广东省', city: '深圳市'},
            {name: '小米公司', area: '华北区', province: '河北省', city: '北京市'},
            {name: '肯德基公司', area: '华东区', province: '福建省', city: '福州市'},
            {name: '华为公司', area: '华南区', province: '广东省', city: '深圳市'},
            {name: '麦当劳公司', area: '华东区', province: '福建省', city: '三明市'},
            {name: '软通动力', area: '华北区', province: '河北省', city: '北京市'},
            {name: '平安金融', area: '华南区', province: '广东省', city: '广州市'},
            {name: '阿里巴巴', area: '华中区', province: '浙江省', city: '杭州市'},
            {name: '微软公司', area: '华东区', province: '福建省', city: '三明市'}
          ]
        },
        dateOp: {
          dateTime: 1396945578506,
          maxDate: 1296945578506,
          onComplete: (arr, time) => {
            console.log('组件编译完成onComplete', arr, time);
          },
          onRender: (arr, time) => {
            console.log('组件渲染完成onRender', arr, time);
          },
          onShow: day => {
            console.log('选择日期框日期后执行的事件', day);
          }
        }
      }
  },
  methods: {
    test() {
      let data = [
        {name: '野火集团', area: '华南区', province: '广东省', city: '深圳市'},
        {name: '小明创新', area: '华北区', province: '河北省', city: '北京市'},
        {name: '注明企业', area: '华东区', province: '福建省', city: '福州市'},
        {name: '主明原创', area: '华南区', province: '广东省', city: '深圳市'},
        {name: 'ZOOM-UI', area: '华东区', province: '福建省', city: '三明市'},
      ];
      // this.$refs['date'].load(1196945578506)
      // this.$refs['transfer'].load(data);
      console.log(this.$refs['transfer'].list,'--listy');
    }
  }
};
</script>
<style>

</style>
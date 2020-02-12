<template>
  <div class="cus-tab">
    <tabs :value="curTab" @tabChange="tabChange">
      <tab :index="0" :label="'Tab1'">
        <zoom-card border="true" hover-shadow="true">
          <div>
            Tab1的内容
          </div>
        </zoom-card>
      </tab>
      <tab :index="1" :label="'Tab2'">
        <span slot="label">我是tab2</span>
        <div>Tab2的内容</div>
      </tab>
      <tab :index="2" :label="'Tab3'">
        <div>Tab3的内容</div>
      </tab>
    </tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        curTab: 0 // 当前激活的tab索引
      }
    },
    methods: {
      tabChange(index) {
        this.curTab = index
      }
    }
  }
</script>
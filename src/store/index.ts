import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabsTitle: []
  },
  getters: {
    targetTitle: state => state.tabsTitle
  },
  mutations: {
    // 设置tabs的title
    setTabTitle(state:any, val) {
      let count = 0;
      let data = state.tabsTitle;
      for (var i = 0; i < data; i ++) {
        if (val.id === data[i].id) {
          data[i].id.id = val.id;
          data[i].id.title = val.title;
          count += 1;
        }
      }
      // state.tabsTitle.forEach(item => {
      //   if (val.id === item.id) {
      //     item.id = val.id;
      //     item.title = val.title;
      //     count += 1;
      //   }
      // })
      if (!count) {
        state.tabsTitle.push(val);
      }
    },
    // 删除tabs的title
    // deleteTabTitle(state, val) {
    //   state.tabsTitle.forEach((item, index) => {
    //     if (item.id === val) {
    //       state.tabsTitle.splice(index, 1);
    //     }
    //   });
    // }
  },
  actions: {
    setTitle({ commit }, val) {
      commit("setTabTitle", val);
    }
  },
  modules: {
  }
})

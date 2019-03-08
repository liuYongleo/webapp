import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let obj = localStorage.getItem('shopRecord');
obj = obj ? JSON.parse(obj) : {};

export default new Vuex.Store({
  state: {
    headMsg: '',
    shopRecord: obj
  },
  mutations: {
    setHeadMsg(state, text) {
      state.headMsg = text;
    },
    setShop(state, obj) {
      state.shopRecord = obj;
      localStorage.setItem('shopRecord', JSON.stringify(obj));
    }
  }
})

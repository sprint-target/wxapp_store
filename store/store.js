import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: false,
    text: ''
  },
  mutations: {
    showLoading(state, res) {
      state.loading = true
      state.text = res.text
    },
    hideLoading(state) {
      state.loading = false
    }
  }
})

export default store
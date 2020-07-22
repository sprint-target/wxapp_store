import Vue from 'vue'
import App from './App'
import utils from './utils/utils.js' // 公共工具方法
import store from './store/store' // vuex状态管理文件
import emptyPage from '@/components/empty'
import loading from './components/loading.vue'
import routes from './utils/router.js'
import '@/utils/bar.js' // 系统适配文件

Vue.component('loading', loading)
Vue.component('empty', emptyPage);

function showLoading(res) {
    store.commit('showLoading', res)
}
function hideLoading() {
    store.commit('hideLoading')
}

Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
Vue.prototype.$loading = loading;
Vue.prototype.$store = store;
Vue.prototype.$u = utils
Vue.prototype.$r = routes

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

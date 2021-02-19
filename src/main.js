if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

import '@babel/polyfill'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/base.scss'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible'
import global from './utils/common'
import sanh from '@/components/sanh'

// console.log("process.env.VUE_APP_PORT=" + process.env.VUE_APP_PORT)
// axios.defaults.baseURL = process.env.VUE_APP_PORT || ''
// store.state.baseUrl = process.env.VUE_APP_PORT || ''


Vue.config.devtools = true;

Vue.use(Vant)
Vue.use(sanh)
Vue.use(global)


Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vm
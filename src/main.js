import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(ElementUI)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

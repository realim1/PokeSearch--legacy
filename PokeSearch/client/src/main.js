import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
import VueToasted from 'vue-toasted';

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueToasted, {
  iconPack: 'fontawesome'
});

export const EventBus = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

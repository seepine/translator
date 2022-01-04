import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import store from './store/index'
import router from './router/index'

import './assets/css/crco.css'
// @ts-ignore
import crco from './assets/js/crco.es'

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(crco)
  .use(store)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)

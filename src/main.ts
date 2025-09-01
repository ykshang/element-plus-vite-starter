import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import '~/styles/index.scss'
import 'uno.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

import 'element-plus/theme-chalk/src/notification.scss'

const app = createApp(App)
app.use(createRouter({
  history: createWebHistory(),
  routes,
}))
app.mount('#app')

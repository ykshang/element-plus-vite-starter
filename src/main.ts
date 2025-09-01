import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import '~/styles/index.scss'
// UnoCSS
import 'uno.css'

// If you want to use ElMessage, import it.

const app = createApp(App)
app.use(createRouter({
  history: createWebHistory(),
  routes,
}))
app.mount('#app')

import { createPinia } from 'pinia' // pinia
import { createApp } from 'vue'
// 导入路由相关的配置
import router from '~/config/router'

import App from './App.vue'

// ElementPlus 全局配置
import '~/config/ElementPlus.config'
// 样式相关
import '~/styles/index.scss'
// UnoCSS
import 'uno.css'

// 创建 APP 实例
const app = createApp(App)

// 路由配置
app.use(router)

// pinia 相关
const pinia = createPinia() // 创建 pinia 实例
app.use(pinia)

// 挂载
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import '@/icons' //导入svg图标
import globalComponent from '@/global'

import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import esES from 'vant/es/locale/lang/es-ES'
import zhCN from 'vant/es/locale/lang/zh-CN'
Locale.use('en-US', enUS)

const app = createApp(App)

app.use(globalComponent) //注册所有全局组件
app.use(store)
app.use(router)
app.mount('#app')

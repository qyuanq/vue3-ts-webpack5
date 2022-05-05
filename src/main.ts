import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const fastClick = require('fastclick')
fastClick.attach(document.body)
import '@/icons' //导入svg图标
import globalComponent from '@/global'
import i18n from './lang' // 国际化
import localCache from '@/utils/cache'

const app = createApp(App)

app.config.globalProperties.$ls = localCache //挂载全局属性

app.use(globalComponent) //注册所有全局组件
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')

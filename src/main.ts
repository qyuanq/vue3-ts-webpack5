import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
fastClick.attach(document.body)

import { Loading, Toast, Button } from 'vant'

const app = createApp(App)
const components = [Loading, Toast, Button]

for (const cpn of components) {
  app.component(cpn.name, cpn)
}

app.use(store)
app.use(router)
app.mount('#app')

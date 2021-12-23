import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Loading, Toast } from 'vant'

const app = createApp(App)
const components = [Loading, Toast]

for (const cpn of components) {
  app.component(cpn.name, cpn)
}

app.use(store)
app.use(router)
app.mount('#app')

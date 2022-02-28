import { App } from 'vue'
import { Loading, Toast, Button } from 'vant'
import SvgIcon from '@/components/SvgIcon/index.vue' //全局svg组件

const components = [Loading, Toast, Button, SvgIcon]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

import { createStore } from 'vuex'
import { IRootState } from './type'
import user from './user'
export default createStore<IRootState>({
  state: {
    lang: 'zh'
  },
  mutations: {},
  actions: {},
  modules: {
    user
  }
})

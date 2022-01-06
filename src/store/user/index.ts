import { Module } from 'vuex'
import { IUserState } from './type'
import { IRootState } from '../type'

const userModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '111'
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    }
  },
  actions: {
    changeToken({ commit }, token: string) {
      commit('changeToken', token)
    }
  }
}

export default userModule

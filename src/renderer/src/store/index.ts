import { createStore } from 'vuex'
import { Plug, Plugs } from '../types/Plug'
import { setStore } from '../utils/storage'
// import { serialize, deserialize } from '../utils/util'
// import { getStore, setStore } from '../utils/storage'
import initPlug from './init-plug'

export const defaultState = {
  useDataPath: '',
  plugs: {
    in: [],
    extra: []
  } as Plugs,
  services: [] as Array<Plug>
}

const store = createStore({
  state() {
    return defaultState
  },
  mutations: {
    setPlugs(state: typeof defaultState, payload: Plugs) {
      state.plugs = payload
    },
    addPlug(state: typeof defaultState, payload: Plug) {
      state.plugs.extra.push(payload)
    },
    setServices(state: typeof defaultState, payload: Array<Plug>) {
      state.services = payload
    },
    addService(state: typeof defaultState, payload: Plug) {
      state.services.push({
        ...payload,
        active: true
      })
      setStore('services', state.services)
    },
    delService(state: typeof defaultState, index: number) {
      state.services.splice(index, 1)
      setStore('services', state.services)
    },
    changeService(state: typeof defaultState, payload: { index: number; checked: boolean }) {
      state.services[payload.index].active = payload.checked
      setStore('services', state.services)
    }
  }
})
initPlug(store)
export default store

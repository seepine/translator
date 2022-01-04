import { Store } from 'vuex'
import { Plug } from '../types/Plug'
import { getStore } from '../utils/storage'
import { defaultState } from './index'

export default (store: Store<typeof defaultState>) => {
  // 添加内置服务
  const modules: object = import.meta.globEager('../plugs/*.ts')
  const inPlugs = Object.keys(modules).map((key: string) => {
    return {
      // @ts-ignore
      ...modules[key].default,
      path: key
    }
  })
  const extraPlugs: Array<Plug> = []
  window.ipcRenderer
    .invoke('getCachePath')
    .then((cachePath) => {
      // 添加外置插件
      const dirs = window.fs.readdirSync(`${cachePath}\\plugs`)
      dirs.forEach((item) => {
        const files = window.fs.readdirSync(`${cachePath}\\plugs\\${item}`)
        if (files.indexOf('index.js') >= 0) {
          extraPlugs.push({
            ...window.require(`${cachePath}\\plugs\\${item}\\index.js`),
            path: `${cachePath}\\plugs\\${item}\\index.js`
          })
        }
      })
    })
    .finally(() => {
      store.commit('setPlugs', {
        in: inPlugs,
        extra: extraPlugs
      })
      // 初始化 services
      const services = getStore('services')
      if (services && services.length > 0) {
        store.commit(
          'setServices',
          services.map((item: Plug) => {
            try {
              return {
                ...item,
                // @ts-ignore
                ...window.require(item.path)
              }
            } catch (e) {
              // @ts-ignore
              const plug = modules[item.path] ? modules[item.path] : {}
              return {
                ...item,
                ...plug.default
              }
            }
          })
        )
      } else {
        store.commit('setServices', [
          {
            // @ts-ignore
            ...modules['../plugs/baidu-free.ts'].default,
            path: '../plugs/baidu-free.ts',
            active: true
          }
        ])
      }
    })
}

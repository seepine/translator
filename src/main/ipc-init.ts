/* eslint-disable no-empty */
import { BrowserWindow, ipcMain, globalShortcut, app, clipboard, shell } from 'electron'

export default (win: BrowserWindow) => {
  const handleShortcut = () => {
    win?.show()
    win?.webContents.send('show')
  }

  globalShortcut.register('alt+a', handleShortcut)
  ipcMain.handle('getCachePath', () => {
    return app.getPath('userData')
  })
  ipcMain.on('resize', (e, size) => {
    if (size.width > 0 && size.height > 0) {
      if (process.platform === 'win32') {
        win.setContentSize(size.width, size.height)
      } else {
        win.setSize(size.width, size.height, false)
      }
    }
  })
  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url)
  })
  ipcMain.on('copy', (e, value: string) => {
    if (value) {
      clipboard.writeText(value)
    }
  })
  ipcMain.handle('set-always-on-top', (e, flag) => {
    if (flag !== undefined) {
      win?.setAlwaysOnTop(flag)
    }
    return win.isAlwaysOnTop()
  })
  let oldShortcut = 'alt+a'
  const setShortcut = (shortcut: string): string => {
    try {
      if (shortcut !== oldShortcut && shortcut) {
        const res = globalShortcut.register(shortcut, handleShortcut)
        if (res) {
          globalShortcut.unregister(oldShortcut)
          oldShortcut = shortcut
          return ''
        }
        return '快捷键已被占用'
      }
      return ''
    } catch (e) {
      return '不是合法的快捷键'
    }
  }
  try {
    ipcMain.handle('config', (e, config) => {
      const res1 = setShortcut(config.shortcut)
      if (res1) {
        return res1
      }

      return true
    })
  } catch (e) {}
}

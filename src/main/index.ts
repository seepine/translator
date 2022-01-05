import os from 'os'
import path from 'path'
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeTheme,
  systemPreferences,
  Tray,
  nativeImage
} from 'electron'
import ipcInit from './ipc-init'

// https://stackoverflow.com/questions/42524606/how-to-get-windows-version-using-node-js
const isWin7 = os.release().startsWith('6.1')
if (isWin7) app.disableHardwareAcceleration()
app.dock.hide()
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

async function bootstrap() {
  win = new BrowserWindow({
    icon: path.join(__dirname, '../renderer/icon.png'),
    title: 'translator',
    frame: false,
    transparent: true,
    resizable: false,
    show: false,
    skipTaskbar: true,
    width: 440,
    height: 177,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, '../preload/index.cjs')
    }
  })
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  } else {
    const pkg = await import('../../package.json')
    const url = `http://${pkg.env.HOST || '127.0.0.1'}:${pkg.env.PORT}`

    win.loadURL(url)
    win.webContents.openDevTools()
  }
  win.on('blur', () => {
    if (!win?.isAlwaysOnTop()) {
      win?.hide()
    }
  })
  win.on('ready-to-show', () => {
    //
  })
  ipcInit(win as BrowserWindow)
  setTimeout(() => {
    win?.show()
  }, 100)
}
try {
  ipcMain.on('quit', () => {
    process.exit(0)
  })
  ipcMain.handle('is-dark-mode', () => {
    return nativeTheme.shouldUseDarkColors
  })
  systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
    win?.webContents.send('themeChange', !nativeTheme.shouldUseDarkColors)
  })
  // eslint-disable-next-line no-empty
} catch (e) {}

const tray = null
app.whenReady().then(() => {
  bootstrap()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('second-instance', () => {
  if (win) {
    // someone tried to run a second instance, we should focus our window.
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})
// @TODO
// auto update
/* if (app.isPackaged) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) =>
      // maybe you need to record some log files.
      console.error('Failed check update:', e)
    )
} */

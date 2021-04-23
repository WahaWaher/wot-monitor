require('dotenv').config();
const { app, BrowserWindow, globalShortcut } = require('electron');
const { appLock } = require('./appLock');
const { createAppStore } = require('./stores/appStore');
const { createMainWindow } = require('./windows/mainWindow');
const { createMainTray } = require('./tray/mainTray');
const { setIpcHandlers } = require('./ipc/ipcHandlers');
const { setAppLauncher } = require('./appLauncher');
const { setAppUpdaterListeners } = require('./appUpdater');
const path = require('path');
const isDev = require('electron-is-dev');

appLock(() => {
  const appStore = createAppStore();
  const mainWindow = createMainWindow();
  const mainTray = createMainTray(mainWindow);

  setIpcHandlers({ appStore, mainWindow, mainTray });
  setAppLauncher();
  setAppUpdaterListeners();

  if (isDev) {
    const {
      default: installExtension,
      REDUX_DEVTOOLS,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');

    const devToolsOptions = { mode: 'detach' };

    // Load chrome devtools
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools(devToolsOptions);
    });

    // Register shortcut for devtools reloding
    globalShortcut.register('CommandOrControl+5', () => {
      mainWindow.webContents.closeDevTools(devToolsOptions);
      mainWindow.webContents.openDevTools(devToolsOptions);
    });

    // Main window — always on top
    mainWindow.setAlwaysOnTop('toolbar');

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

/**
 * Hot reloading
 */
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(
      __dirname,
      '../node_modules',
      'electron',
      'dist',
      'electron.exe'
    ),
  });
}

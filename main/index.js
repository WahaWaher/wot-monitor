require('dotenv').config();
const { app, BrowserWindow, globalShortcut } = require('electron');
const { createAppStore } = require('./stores/appStore');
const { createMainWindow, getMainWindow } = require('./windows/mainWindow');
const { createMainTray } = require('./tray/mainTray');
const { setIpcHandlers } = require('./ipc/ipcHandlers');
const { setAppLauncher } = require('./appLauncher');
const { registerAppUpdaterListeners } = require('./appUpdater');
const path = require('path');
const open = require('open');
const isDev = require('electron-is-dev');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const mainWindow = getMainWindow();

    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    const appStore = createAppStore();
    const mainWindow = createMainWindow();
    const mainTray = createMainTray(mainWindow);

    setIpcHandlers({ appStore, mainWindow, mainTray });
    setAppLauncher();
    registerAppUpdaterListeners();

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
}

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

/**
 * Open external link in OS default browser
 */
app.on('web-contents-created', (e, contents) => {
  contents.on('new-window', (e, url) => {
    e.preventDefault();
    open(url);
  });
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) {
      e.preventDefault();
      open(url);
    }
  });
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

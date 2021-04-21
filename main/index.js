require('dotenv').config();
const { app, BrowserWindow, globalShortcut } = require('electron');
const { createAppStore } = require('./stores/appStore');
const { createMainWindow, getMainWindow } = require('./windows/mainWindow');
const { createMainTray } = require('./tray/mainTray');
const { setIpcHandlers } = require('./ipc/ipcHandlers');
const { setAppLauncher } = require('./appLauncher');
const { autoUpdater } = require('electron-updater');
const path = require('path');
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

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
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

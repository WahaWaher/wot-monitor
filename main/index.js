require('dotenv').config();
const { app, BrowserWindow, globalShortcut } = require('electron');
const { createAppStore } = require('./stores/appStore');
const { createMainWindow, getMainWindow } = require('./windows/mainWindow');
const { createMainTray } = require('./tray/mainTray');
const { setIpcHandlers } = require('./ipc/ipcHandlers');
const { setAppLauncher } = require('./appLauncher');
const { registerUpdateListeners } = require('./appUpdater');
const path = require('path');
const isDev = require('electron-is-dev');

const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

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
    registerUpdateListeners();

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

// autoUpdater.on('checking-for-update', () => {
//   console.log('Checking for update...');
// });
// autoUpdater.on('update-available', (info) => {
//   console.log('Update available.', info);
// });
// autoUpdater.on('update-not-available', (info) => {
//   console.log('Update not available.', info);
// });
// autoUpdater.on('error', (err) => {
//   console.log('Error in auto-updater. ', err);
// });
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = 'Download speed: ' + progressObj.bytesPerSecond;

//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message =
//     log_message +
//     ' (' +
//     progressObj.transferred +
//     '/' +
//     progressObj.total +
//     ')';

//   console.log('download-progress', log_message);
// });
// autoUpdater.on('update-downloaded', (info) => {
//   console.log('Update downloaded', info);
//   // autoUpdater.quitAndInstall();
// });

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

const {
  BrowserWindow,
  ipcMain,
  globalShortcut /* , session */,
} = require('electron');
const { getAppStore } = require('../stores/appStore');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createMainWindow = () => {
  const appStore = getAppStore();
  const lastWindowBounds =
    appStore.get('commonState.lastMainWindowBounds') || {};

  mainWindow = new BrowserWindow(
    Object.assign(
      {
        title: 'WOT Monitor',
        icon: path.join(__dirname, '../assets/icons/favicon.ico'),
        width: 360,
        height: 600,
        minWidth: 360,
        maxWidth: 360,
        minHeight: 250,
        frame: false,
        show: true,
        fullscreenable: false,
        backgroundColor: '#1c1c1e',
        // resizable: false,
        // transparent: false,
        // skipTaskbar: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false,
        },
      },
      lastWindowBounds
    )
  );

  ipcMain.handle('app-close', (e) => mainWindow.close());
  ipcMain.handle('app-minimize', (e) => mainWindow.minimize());
  ipcMain.handle('fetch-profile', (e) => {
    const curProfileID = appStore.get('commonState.currentProfileID');

    return appStore.get('profiles')[curProfileID];
  });

  mainWindow.on('close', () => {
    appStore.set('commonState.lastMainWindowBounds', mainWindow.getBounds());
  });

  if (isDev) {
    // session.defaultSession.loadExtension(path.join(__dirname, '../../redux-devtools/'), {
    //   allowFileAccess: true
    // }).then((data) => {
    //   console.log(data);
    // });

    globalShortcut.register('CommandOrControl+5', () => {
      mainWindow.webContents.closeDevTools({
        mode: 'detach',
      });
      mainWindow.webContents.openDevTools({
        mode: 'detach',
      });
    });
  }

  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/index.html')}`
  );

  /**
   * DevTools
   */
  if (isDev) {
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools({
        mode: 'detach',
      });
    });
  }

  if (isDev) {
    mainWindow.setAlwaysOnTop('toolbar');
  }

  return mainWindow;
};

const getMainWindow = () => mainWindow;

module.exports = {
  getMainWindow,
  createMainWindow,
};

const { app, BrowserWindow } = require('electron');
const { getAppStore } = require('../stores/appStore');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createMainWindow = () => {
  const appStore = getAppStore();
  const lastWindowBounds = appStore.get('mainWindowBounds') || {};

  mainWindow = new BrowserWindow(
    Object.assign(
      {
        title: 'WOT Monitor',
        icon: path.join(__dirname, '../assets/icons/favicon.ico'),
        width: 320,
        height: 600,
        minWidth: 320,
        // minHeight: 600,
        frame: true,
        show: true,
        fullscreenable: false,
        // resizable: false,
        transparent: false,
        // skipTaskbar: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      },
      lastWindowBounds
    )
  );

  mainWindow.on('close', () => {
    appStore.set('mainWindowBounds', mainWindow.getBounds());
  });

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
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  /**
   * React DevTools
   */
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        console.log(`Added Extension:  ${name}`);
      })
      .catch((err) => {
        console.log('An error occurred: ', err);
      });
  }

  return mainWindow;
};

const getMainWindow = () => mainWindow;

module.exports = { getMainWindow, createMainWindow };

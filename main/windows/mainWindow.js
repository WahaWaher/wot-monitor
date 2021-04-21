const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow } = require('electron');
const {
  setWindowBounds,
  getLastWindowBounds,
  getProfileSettings,
} = require('../stores/appStore');
const { regularIcon } = require('../utils/iconPaths');

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'WOT Monitor',
    icon: regularIcon,
    width: 385,
    height: 475,
    minWidth: 385,
    maxWidth: 385,
    minHeight: 475,
    frame: false,
    show: false,
    fullscreenable: false,
    backgroundColor: '#1c1c1e',
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    ...getLastWindowBounds(),
  });

  mainWindow.once('ready-to-show', () => {
    const {
      common: { openMinimized },
    } = getProfileSettings();

    if (!openMinimized) {
      mainWindow.show();
    }
  });
  mainWindow.on('close', () => setWindowBounds(mainWindow));
  mainWindow.on('closed', () => mainWindow.destroy());

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../view/index.html')}`
  );

  return mainWindow;
};

const getMainWindow = () => mainWindow;

module.exports = {
  getMainWindow,
  createMainWindow,
};
import { BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import open from 'open';
import path from 'path';
import {
  getLastWindowBounds,
  getProfileSettings,
  setWindowBounds,
} from '@/stores/appStore';
import { iconRegular } from '@/utils/iconPaths';

let mainWindow: Nullable<Electron.BrowserWindow> = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'WOT Monitor',
    icon: iconRegular,
    width: 385,
    height: 545,
    minWidth: 385,
    maxWidth: 385,
    minHeight: 545,
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

  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (!mainWindow) return;

    if (url !== mainWindow.webContents.getURL()) {
      e.preventDefault();
      open(url);
    }
  });

  mainWindow.once('ready-to-show', () => {
    const {
      common: { openMinimized },
    } = getProfileSettings();

    if (!openMinimized && mainWindow) {
      mainWindow.show();
    }
  });
  mainWindow.on('close', () => setWindowBounds(mainWindow));
  mainWindow.on('closed', () => mainWindow && mainWindow.destroy());

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../ui/index.html')}`
  );

  return mainWindow;
};

const getMainWindow = () => mainWindow;

export { getMainWindow, createMainWindow };

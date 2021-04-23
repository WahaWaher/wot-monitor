const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const { getMainWindow } = require('./windows/mainWindow');
const {
  name,
  author,
  repository,
  private: isPrivate,
} = require('../package.json');

autoUpdater.setFeedURL({
  provider: repository.provider,
  repo: name,
  owner: author.name,
  private: isPrivate,
  token: process.env.GH_TOKEN,
});

autoUpdater.autoDownload = false;

const setAppUpdaterListeners = () => {
  const mainWindow = getMainWindow();

  autoUpdater.on('error', ({ name, message, stack } = {}) => {
    mainWindow.webContents.send('update-error', { name, message, stack });
  });

  autoUpdater.on('update-available', (info) => {
    const { version, path, releaseDate } = info;

    mainWindow.webContents.send('update-available', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    const { version, path, releaseDate } = info;

    mainWindow.webContents.send('update-not-available', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    const { version, path, releaseDate } = info;

    mainWindow.webContents.send('update-downloaded', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('download-progress', (progress) => {
    return mainWindow.webContents.send('update-download-progress', progress);
  });

  ipcMain.handle('update-check-for-updates', () => {
    return autoUpdater.checkForUpdates();
  });

  ipcMain.handle('update-download', () => {
    return autoUpdater.downloadUpdate();
  });

  ipcMain.handle('update-quit-and-install', () => {
    return autoUpdater.quitAndInstall();
  });
};

module.exports = { setAppUpdaterListeners };

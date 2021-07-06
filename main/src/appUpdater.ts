import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { getMainWindow } from '@/windows/mainWindow';
import { pkg } from '@/utils/pkgUtils';

autoUpdater.setFeedURL({
  provider: 'github',
  repo: pkg?.name,
  owner: pkg?.author?.name,
  private: pkg?.private,
  token: process.env.GH_TOKEN,
});

autoUpdater.autoDownload = false;

const setAppUpdaterListeners = () => {
  const mainWindow = getMainWindow();

  autoUpdater.on('error', ({ name, message, stack } = {}) => {
    if (!mainWindow) return;

    mainWindow.webContents.send('update-error', { name, message, stack });
  });

  autoUpdater.on('update-available', (info) => {
    const { version, path, releaseDate } = info;

    if (!mainWindow) return;

    mainWindow.webContents.send('update-available', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    const { version, path, releaseDate } = info;

    if (!mainWindow) return;

    mainWindow.webContents.send('update-not-available', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    const { version, path, releaseDate } = info;

    if (!mainWindow) return;

    mainWindow.webContents.send('update-downloaded', {
      version,
      path,
      releaseDate,
    });
  });

  autoUpdater.on('download-progress', (progress) => {
    if (!mainWindow) return;

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

export { setAppUpdaterListeners };
